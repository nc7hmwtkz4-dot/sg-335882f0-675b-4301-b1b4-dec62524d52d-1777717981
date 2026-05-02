import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type ArcherySession = Database["public"]["Tables"]["archery_sessions"]["Row"];
type Match = Database["public"]["Tables"]["matches"]["Row"];
type Arrow = Database["public"]["Tables"]["arrows"]["Row"];
type HealthMetric = Database["public"]["Tables"]["health_metrics"]["Row"];

export interface SessionWithDetails extends ArcherySession {
  matches: Match[];
  arrows: Arrow[];
  health_metric?: HealthMetric | null;
}

export interface CalendarDay {
  date: string;
  hasSession: boolean;
  sessionCount: number;
  sessionTypes: string[];
}

export interface PerformanceData {
  date: string;
  score: number;
  recovery?: number;
}

/**
 * Récupère les sessions pour un mois donné
 */
export async function getMonthSessions(
  userId: string,
  year: number,
  month: number
): Promise<CalendarDay[]> {
  const firstDay = new Date(year, month - 1, 1);
  const lastDay = new Date(year, month, 0);

  const { data: sessions, error } = await supabase
    .from("archery_sessions")
    .select("id, session_date, session_type")
    .eq("user_id", userId)
    .gte("session_date", firstDay.toISOString().split("T")[0])
    .lte("session_date", lastDay.toISOString().split("T")[0])
    .order("session_date", { ascending: true });

  if (error) {
    console.error("Error fetching month sessions:", error);
    return [];
  }

  // Créer un objet avec toutes les dates du mois
  const days: Record<string, CalendarDay> = {};
  for (let d = 1; d <= lastDay.getDate(); d++) {
    const date = new Date(year, month - 1, d);
    const dateStr = date.toISOString().split("T")[0];
    days[dateStr] = {
      date: dateStr,
      hasSession: false,
      sessionCount: 0,
      sessionTypes: [],
    };
  }

  // Ajouter les sessions
  sessions?.forEach((session) => {
    const dateStr = session.session_date.split("T")[0];
    if (days[dateStr]) {
      days[dateStr].hasSession = true;
      days[dateStr].sessionCount++;
      if (!days[dateStr].sessionTypes.includes(session.session_type)) {
        days[dateStr].sessionTypes.push(session.session_type);
      }
    }
  });

  return Object.values(days).sort((a, b) => a.date.localeCompare(b.date));
}

/**
 * Récupère les détails d'une session spécifique
 */
export async function getSessionDetails(
  userId: string,
  date: string
): Promise<SessionWithDetails[]> {
  const { data: sessions, error } = await supabase
    .from("archery_sessions")
    .select(`
      *,
      matches(*),
      arrows(*)
    `)
    .eq("user_id", userId)
    .eq("session_date", date)
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Error fetching session details:", error);
    return [];
  }

  // Récupérer la métrique de santé du même jour
  const { data: healthMetric } = await supabase
    .from("health_metrics")
    .select("*")
    .eq("user_id", userId)
    .eq("metric_date", date)
    .maybeSingle();

  return (sessions || []).map((session) => ({
    ...session,
    matches: Array.isArray(session.matches) ? session.matches : [],
    arrows: Array.isArray(session.arrows) ? session.arrows : [],
    health_metric: healthMetric,
  }));
}

/**
 * Récupère l'évolution des performances sur une période
 */
export async function getPerformanceEvolution(
  userId: string,
  startDate: string,
  endDate: string
): Promise<PerformanceData[]> {
  // Récupérer les sessions avec leurs scores
  const { data: sessions, error: sessionsError } = await supabase
    .from("archery_sessions")
    .select("session_date, total_score")
    .eq("user_id", userId)
    .gte("session_date", startDate)
    .lte("session_date", endDate)
    .not("total_score", "is", null)
    .order("session_date", { ascending: true });

  if (sessionsError) {
    console.error("Error fetching performance data:", sessionsError);
    return [];
  }

  // Récupérer les métriques de santé
  const { data: healthMetrics, error: healthError } = await supabase
    .from("health_metrics")
    .select("metric_date, recovery_score")
    .eq("user_id", userId)
    .gte("metric_date", startDate)
    .lte("metric_date", endDate)
    .not("recovery_score", "is", null)
    .order("metric_date", { ascending: true });

  if (healthError) {
    console.error("Error fetching health data:", healthError);
  }

  // Créer un map des métriques de santé par date
  const healthMap = new Map<string, number>();
  healthMetrics?.forEach((metric) => {
    healthMap.set(metric.metric_date.split("T")[0], metric.recovery_score || 0);
  });

  // Combiner les données
  return (sessions || []).map((session) => ({
    date: session.session_date.split("T")[0],
    score: session.total_score || 0,
    recovery: healthMap.get(session.session_date.split("T")[0]),
  }));
}

/**
 * Analyse la corrélation entre récupération et performance
 */
export async function getRecoveryPerformanceCorrelation(
  userId: string,
  startDate: string,
  endDate: string
): Promise<{ recovery: number; avgScore: number }[]> {
  const performanceData = await getPerformanceEvolution(userId, startDate, endDate);

  // Grouper par tranches de récupération
  const groups: Record<number, number[]> = {
    0: [], // 0-33%
    1: [], // 34-66%
    2: [], // 67-100%
  };

  performanceData.forEach((data) => {
    if (data.recovery !== undefined) {
      const group = data.recovery <= 33 ? 0 : data.recovery <= 66 ? 1 : 2;
      groups[group].push(data.score);
    }
  });

  return [
    {
      recovery: 17, // Moyenne de 0-33%
      avgScore: groups[0].length > 0 
        ? Math.round(groups[0].reduce((a, b) => a + b, 0) / groups[0].length)
        : 0,
    },
    {
      recovery: 50, // Moyenne de 34-66%
      avgScore: groups[1].length > 0
        ? Math.round(groups[1].reduce((a, b) => a + b, 0) / groups[1].length)
        : 0,
    },
    {
      recovery: 84, // Moyenne de 67-100%
      avgScore: groups[2].length > 0
        ? Math.round(groups[2].reduce((a, b) => a + b, 0) / groups[2].length)
        : 0,
    },
  ].filter((item) => item.avgScore > 0);
}