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
 * Récupère les compétitions à venir (futures)
 */
export async function getUpcomingCompetitions(
  userId: string,
  startDate?: string
): Promise<SessionWithDetails[]> {
  const today = startDate || new Date().toISOString().split("T")[0];

  const { data: sessions, error } = await supabase
    .from("archery_sessions")
    .select(`
      *,
      matches(*),
      arrows(*)
    `)
    .eq("user_id", userId)
    .eq("session_type", "competition")
    .gte("session_date", today)
    .order("session_date", { ascending: true });

  if (error) {
    console.error("Error fetching upcoming competitions:", error);
    return [];
  }

  return (sessions || []).map((session) => ({
    ...session,
    matches: Array.isArray(session.matches) ? session.matches : [],
    arrows: Array.isArray(session.arrows) ? session.arrows : [],
    health_metric: null,
  }));
}

/**
 * Récupère les sessions pour un mois donné (historique)
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
  const { data: sessions, error: sessionsError } = await supabase
    .from("archery_sessions")
    .select(`
      session_date,
      matches(score)
    `)
    .eq("user_id", userId)
    .gte("session_date", startDate)
    .lte("session_date", endDate)
    .order("session_date", { ascending: true });

  if (sessionsError) {
    console.error("Error fetching performance data:", sessionsError);
    return [];
  }

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

  const healthMap = new Map<string, number>();
  healthMetrics?.forEach((metric) => {
    healthMap.set(metric.metric_date.split("T")[0], metric.recovery_score || 0);
  });

  const performanceMap = new Map<string, number[]>();
  
  sessions?.forEach((session) => {
    const dateStr = session.session_date.split("T")[0];
    const matches = Array.isArray(session.matches) ? session.matches : [];
    
    matches.forEach((match: Match) => {
      if (match.score) {
        if (!performanceMap.has(dateStr)) {
          performanceMap.set(dateStr, []);
        }
        performanceMap.get(dateStr)!.push(match.score);
      }
    });
  });

  const result: PerformanceData[] = [];
  performanceMap.forEach((scores, dateStr) => {
    const avgScore = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
    result.push({
      date: dateStr,
      score: avgScore,
      recovery: healthMap.get(dateStr),
    });
  });

  return result.sort((a, b) => a.date.localeCompare(b.date));
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

  const groups: Record<number, number[]> = {
    0: [],
    1: [],
    2: [],
  };

  performanceData.forEach((data) => {
    if (data.recovery !== undefined) {
      const group = data.recovery <= 33 ? 0 : data.recovery <= 66 ? 1 : 2;
      groups[group].push(data.score);
    }
  });

  return [
    {
      recovery: 17,
      avgScore: groups[0].length > 0 
        ? Math.round(groups[0].reduce((a, b) => a + b, 0) / groups[0].length)
        : 0,
    },
    {
      recovery: 50,
      avgScore: groups[1].length > 0
        ? Math.round(groups[1].reduce((a, b) => a + b, 0) / groups[1].length)
        : 0,
    },
    {
      recovery: 84,
      avgScore: groups[2].length > 0
        ? Math.round(groups[2].reduce((a, b) => a + b, 0) / groups[2].length)
        : 0,
    },
  ].filter((item) => item.avgScore > 0);
}