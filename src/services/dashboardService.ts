import { supabase } from "@/integrations/supabase/client";

export interface DashboardStats {
  sessionsThisMonth: number;
  averageScore: number | null;
  latestRecovery: number | null;
  trend30Days: number | null;
}

/**
 * Récupère les statistiques pour le dashboard
 */
export async function getDashboardStats(userId: string): Promise<DashboardStats> {
  const now = new Date();
  const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const thirtyDaysAgo = new Date(now);
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  // Nombre de sessions ce mois
  const { data: sessionsThisMonth, error: sessionsError } = await supabase
    .from("archery_sessions")
    .select("id", { count: "exact", head: true })
    .eq("user_id", userId)
    .gte("session_date", firstDayOfMonth.toISOString().split("T")[0]);

  if (sessionsError) {
    console.error("Error fetching sessions count:", sessionsError);
  }

  // Score moyen (basé sur total_score dans archery_sessions)
  const { data: scoresData, error: scoresError } = await supabase
    .from("archery_sessions")
    .select("total_score")
    .eq("user_id", userId)
    .not("total_score", "is", null);

  let averageScore: number | null = null;
  if (!scoresError && scoresData && scoresData.length > 0) {
    const total = scoresData.reduce((sum, session) => sum + (session.total_score || 0), 0);
    averageScore = Math.round(total / scoresData.length);
  }

  // Dernière métrique de récupération WHOOP
  const { data: latestMetric, error: metricError } = await supabase
    .from("health_metrics")
    .select("recovery_score")
    .eq("user_id", userId)
    .not("recovery_score", "is", null)
    .order("metric_date", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (metricError) {
    console.error("Error fetching latest recovery:", metricError);
  }

  // Tendance sur 30 jours (évolution du score moyen)
  const { data: recentSessions, error: trendError } = await supabase
    .from("archery_sessions")
    .select("total_score, session_date")
    .eq("user_id", userId)
    .not("total_score", "is", null)
    .gte("session_date", thirtyDaysAgo.toISOString().split("T")[0])
    .order("session_date", { ascending: true });

  let trend30Days: number | null = null;
  if (!trendError && recentSessions && recentSessions.length >= 2) {
    // Calculer la différence entre les 3 premières et les 3 dernières sessions
    const firstHalf = recentSessions.slice(0, Math.max(1, Math.floor(recentSessions.length / 2)));
    const secondHalf = recentSessions.slice(Math.floor(recentSessions.length / 2));
    
    const avgFirst = firstHalf.reduce((sum, s) => sum + (s.total_score || 0), 0) / firstHalf.length;
    const avgSecond = secondHalf.reduce((sum, s) => sum + (s.total_score || 0), 0) / secondHalf.length;
    
    trend30Days = Math.round(avgSecond - avgFirst);
  }

  return {
    sessionsThisMonth: sessionsThisMonth?.length || 0,
    averageScore,
    latestRecovery: latestMetric?.recovery_score || null,
    trend30Days,
  };
}