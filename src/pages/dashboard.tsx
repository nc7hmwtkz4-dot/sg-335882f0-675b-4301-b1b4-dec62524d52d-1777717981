import { useState, useEffect } from "react";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useAuth } from "@/contexts/AuthContext";
import { SEO } from "@/components/SEO";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Upload, Calendar, Activity, TrendingUp, TrendingDown } from "lucide-react";
import { getDashboardStats, type DashboardStats } from "@/services/dashboardService";
import Link from "next/link";

function DashboardContent() {
  const { profile, user } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      if (!user) return;
      
      try {
        const data = await getDashboardStats(user.id);
        setStats(data);
      } catch (error) {
        console.error("Error loading dashboard stats:", error);
      } finally {
        setIsLoading(false);
      }
    }

    loadStats();
  }, [user]);

  return (
    <>
      <SEO
        title="Mon Dashboard - Thomas Aubert"
        description="Tableau de bord personnel d'entraînement"
      />
      <div className="min-h-screen flex flex-col bg-background">
        <Navigation />
        
        <main className="flex-1 py-12">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-2">Mon Dashboard</h1>
              <p className="text-muted-foreground">
                Bienvenue {profile?.full_name || profile?.email}
                {profile?.role === "super_admin" && " (Super Admin)"}
                {profile?.role === "coach" && " (Entraîneur)"}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Sessions</CardTitle>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <Skeleton className="h-10 w-16" />
                  ) : (
                    <>
                      <div className="text-3xl font-bold">{stats?.sessionsThisMonth || 0}</div>
                      <p className="text-xs text-muted-foreground mt-1">Ce mois</p>
                    </>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Score moyen</CardTitle>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <Skeleton className="h-10 w-16" />
                  ) : (
                    <>
                      <div className="text-3xl font-bold">
                        {stats?.averageScore !== null ? stats.averageScore : "-"}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">Sur 720</p>
                    </>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Récupération</CardTitle>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <Skeleton className="h-10 w-16" />
                  ) : (
                    <>
                      <div className="text-3xl font-bold">
                        {stats?.latestRecovery !== null ? `${stats.latestRecovery}%` : "-"}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">WHOOP</p>
                    </>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Tendance</CardTitle>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <Skeleton className="h-10 w-16" />
                  ) : (
                    <>
                      <div className="text-3xl font-bold flex items-center gap-2">
                        {stats?.trend30Days !== null ? (
                          <>
                            {stats.trend30Days > 0 && (
                              <>
                                <TrendingUp className="w-6 h-6 text-green-600" />
                                <span className="text-green-600">+{stats.trend30Days}</span>
                              </>
                            )}
                            {stats.trend30Days < 0 && (
                              <>
                                <TrendingDown className="w-6 h-6 text-red-600" />
                                <span className="text-red-600">{stats.trend30Days}</span>
                              </>
                            )}
                            {stats.trend30Days === 0 && <span>→</span>}
                          </>
                        ) : (
                          "-"
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">30 derniers jours</p>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Upload className="w-5 h-5" />
                    Import des données
                  </CardTitle>
                  <CardDescription>
                    Importez vos historiques d'entraînement et de santé
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Link href="/import">
                    <Button variant="outline" className="w-full justify-start">
                      <Upload className="w-4 h-4 mr-2" />
                      Import CSV entraînements
                    </Button>
                  </Link>
                  <Link href="/import">
                    <Button variant="outline" className="w-full justify-start">
                      <Upload className="w-4 h-4 mr-2" />
                      Import CSV WHOOP
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    Accès rapide
                  </CardTitle>
                  <CardDescription>
                    Visualisez et analysez vos données
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start" disabled>
                    <Calendar className="w-4 h-4 mr-2" />
                    Calendrier des sessions
                  </Button>
                  <Button variant="outline" className="w-full justify-start" disabled>
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Analyse des performances
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}