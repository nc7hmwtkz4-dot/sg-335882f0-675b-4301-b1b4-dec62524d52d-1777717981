import { useState, useEffect } from "react";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useAuth } from "@/contexts/AuthContext";
import { SEO } from "@/components/SEO";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SessionCalendar } from "@/components/SessionCalendar";
import { SessionDetail } from "@/components/SessionDetail";
import { Activity, TrendingUp, Target } from "lucide-react";
import { 
  getSessionDetails, 
  getPerformanceEvolution, 
  getRecoveryPerformanceCorrelation,
  type SessionWithDetails,
  type PerformanceData
} from "@/services/calendarService";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

function AnalyticsContent() {
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [sessionDetails, setSessionDetails] = useState<SessionWithDetails[]>([]);
  const [performanceData, setPerformanceData] = useState<PerformanceData[]>([]);
  const [correlationData, setCorrelationData] = useState<{ recovery: number; avgScore: number }[]>([]);

  useEffect(() => {
    async function loadPerformanceData() {
      if (!user) return;
      
      const now = new Date();
      const threeMonthsAgo = new Date(now);
      threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
      
      const perf = await getPerformanceEvolution(
        user.id,
        threeMonthsAgo.toISOString().split("T")[0],
        now.toISOString().split("T")[0]
      );
      setPerformanceData(perf);

      const corr = await getRecoveryPerformanceCorrelation(
        user.id,
        threeMonthsAgo.toISOString().split("T")[0],
        now.toISOString().split("T")[0]
      );
      setCorrelationData(corr);
    }

    loadPerformanceData();
  }, [user]);

  const handleDateClick = async (date: string) => {
    if (!user) return;
    setSelectedDate(date);
    const details = await getSessionDetails(user.id, date);
    setSessionDetails(details);
  };

  if (!user) return null;

  return (
    <>
      <SEO
        title="Analytique - Thomas Aubert"
        description="Analyse des performances et corrélation avec les métriques de santé"
      />
      <div className="min-h-screen flex flex-col bg-background">
        <Navigation />
        
        <main className="flex-1 py-12">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-2">Analytique</h1>
              <p className="text-muted-foreground">
                Visualisez et analysez vos performances de tir à l'arc
              </p>
            </div>

            <Tabs defaultValue="calendar" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="calendar" className="gap-2">
                  <Target className="h-4 w-4" />
                  Calendrier
                </TabsTrigger>
                <TabsTrigger value="evolution" className="gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Évolution
                </TabsTrigger>
                <TabsTrigger value="correlation" className="gap-2">
                  <Activity className="h-4 w-4" />
                  Corrélation
                </TabsTrigger>
              </TabsList>

              <TabsContent value="calendar" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <SessionCalendar userId={user.id} onDateClick={handleDateClick} />
                  
                  <div>
                    {selectedDate ? (
                      <SessionDetail sessions={sessionDetails} date={selectedDate} />
                    ) : (
                      <Card>
                        <CardHeader>
                          <CardTitle>Détail de la session</CardTitle>
                          <CardDescription>
                            Cliquez sur une date du calendrier pour voir les détails
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="flex items-center justify-center h-64 text-muted-foreground">
                          Sélectionnez une date avec une session
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="evolution">
                <Card>
                  <CardHeader>
                    <CardTitle>Évolution des performances</CardTitle>
                    <CardDescription>
                      Moyenne des scores sur les 3 derniers mois
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {performanceData.length > 0 ? (
                      <ResponsiveContainer width="100%" height={400}>
                        <LineChart data={performanceData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis 
                            dataKey="date" 
                            tickFormatter={(value) => new Date(value).toLocaleDateString("fr-FR", { day: "2-digit", month: "short" })}
                          />
                          <YAxis domain={[0, 720]} />
                          <Tooltip 
                            labelFormatter={(value) => new Date(value as string).toLocaleDateString("fr-FR")}
                            formatter={(value: number, name: string) => {
                              if (name === "score") return [value, "Score"];
                              if (name === "recovery") return [`${value}%`, "Récupération"];
                              return [value, name];
                            }}
                          />
                          <Legend 
                            formatter={(value) => value === "score" ? "Score" : "Récupération (%)"}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="score" 
                            stroke="hsl(var(--primary))" 
                            strokeWidth={2}
                            dot={{ fill: "hsl(var(--primary))" }}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="recovery" 
                            stroke="hsl(var(--accent))" 
                            strokeWidth={2}
                            dot={{ fill: "hsl(var(--accent))" }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    ) : (
                      <div className="flex items-center justify-center h-64 text-muted-foreground">
                        Pas encore de données de performance
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="correlation">
                <Card>
                  <CardHeader>
                    <CardTitle>Impact de la récupération sur la performance</CardTitle>
                    <CardDescription>
                      Corrélation entre le score WHOOP de récupération et la moyenne des scores
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {correlationData.length > 0 ? (
                      <ResponsiveContainer width="100%" height={400}>
                        <BarChart data={correlationData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis 
                            dataKey="recovery" 
                            tickFormatter={(value) => {
                              if (value <= 33) return "Faible (0-33%)";
                              if (value <= 66) return "Moyen (34-66%)";
                              return "Élevé (67-100%)";
                            }}
                          />
                          <YAxis domain={[0, 720]} />
                          <Tooltip 
                            formatter={(value: number, name: string) => {
                              if (name === "avgScore") return [value, "Score moyen"];
                              return [value, name];
                            }}
                            labelFormatter={(value: number) => {
                              if (value <= 33) return "Récupération faible (0-33%)";
                              if (value <= 66) return "Récupération moyenne (34-66%)";
                              return "Récupération élevée (67-100%)";
                            }}
                          />
                          <Legend formatter={() => "Score moyen"} />
                          <Bar 
                            dataKey="avgScore" 
                            fill="hsl(var(--accent))" 
                            radius={[8, 8, 0, 0]}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    ) : (
                      <div className="flex items-center justify-center h-64 text-muted-foreground">
                        Pas encore assez de données pour calculer la corrélation
                      </div>
                    )}
                    
                    {correlationData.length > 0 && (
                      <div className="mt-6 p-4 bg-muted rounded-lg">
                        <h4 className="font-semibold mb-2">Analyse</h4>
                        <p className="text-sm text-muted-foreground">
                          Ce graphique montre l'impact de votre niveau de récupération WHOOP sur vos scores de tir.
                          Une corrélation positive indique que de meilleurs scores de récupération sont associés
                          à de meilleures performances au tir.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}

export default function AnalyticsPage() {
  return (
    <ProtectedRoute>
      <AnalyticsContent />
    </ProtectedRoute>
  );
}