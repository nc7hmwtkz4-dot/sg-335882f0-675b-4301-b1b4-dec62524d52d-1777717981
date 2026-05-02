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
import { Activity, TrendingUp, Target, Trophy } from "lucide-react";
import { 
  getSessionDetails, 
  getPerformanceEvolution, 
  getRecoveryPerformanceCorrelation,
  getUpcomingCompetitions,
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
  const [upcomingCompetitions, setUpcomingCompetitions] = useState<SessionWithDetails[]>([]);

  useEffect(() => {
    async function loadData() {
      if (!user) {
        console.log("Analytics: No user found");
        return;
      }
      
      console.log("Analytics: Loading data for user", user.id);
      
      const now = new Date();
      const threeMonthsAgo = new Date(now);
      threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
      
      console.log("Analytics: Fetching performance data from", threeMonthsAgo.toISOString(), "to", now.toISOString());
      const perf = await getPerformanceEvolution(
        user.id,
        threeMonthsAgo.toISOString().split("T")[0],
        now.toISOString().split("T")[0]
      );
      console.log("Analytics: Performance data received", perf);
      setPerformanceData(perf);

      console.log("Analytics: Fetching correlation data");
      const corr = await getRecoveryPerformanceCorrelation(
        user.id,
        threeMonthsAgo.toISOString().split("T")[0],
        now.toISOString().split("T")[0]
      );
      console.log("Analytics: Correlation data received", corr);
      setCorrelationData(corr);

      console.log("Analytics: Fetching upcoming competitions");
      const upcoming = await getUpcomingCompetitions(user.id);
      console.log("Analytics: Upcoming competitions received", upcoming);
      setUpcomingCompetitions(upcoming);
    }

    loadData();
  }, [user]);

  const handleDateClick = async (date: string) => {
    if (!user) return;
    console.log("Analytics: Date clicked", date);
    setSelectedDate(date);
    const details = await getSessionDetails(user.id, date);
    console.log("Analytics: Session details received", details);
    setSessionDetails(details);
  };

  if (!user) {
    console.log("Analytics: Rendering - no user");
    return null;
  }

  console.log("Analytics: Rendering with data", {
    performanceDataLength: performanceData.length,
    correlationDataLength: correlationData.length,
    upcomingCompetitionsLength: upcomingCompetitions.length
  });

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

            <Tabs defaultValue="upcoming" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="upcoming" className="gap-2">
                  <Trophy className="h-4 w-4" />
                  Compétitions
                </TabsTrigger>
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

              <TabsContent value="upcoming">
                <Card>
                  <CardHeader>
                    <CardTitle>Compétitions à venir</CardTitle>
                    <CardDescription>
                      Vos prochaines compétitions programmées
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {upcomingCompetitions.length > 0 ? (
                      <div className="space-y-4">
                        {upcomingCompetitions.map((comp) => (
                          <div key={comp.id} className="p-4 border rounded-lg">
                            <div className="flex items-center justify-between">
                              <div>
                                <h3 className="font-semibold flex items-center gap-2">
                                  <Trophy className="h-4 w-4 text-accent" />
                                  {new Date(comp.session_date).toLocaleDateString("fr-FR", { 
                                    weekday: "long", 
                                    day: "numeric", 
                                    month: "long", 
                                    year: "numeric" 
                                  })}
                                </h3>
                                <p className="text-sm text-muted-foreground mt-1">
                                  Distance: {comp.distance}m • Type: {comp.bow_type === "recurve" ? "Arc classique" : "Arc à poulies"}
                                </p>
                                {comp.notes && (
                                  <p className="text-sm mt-2">{comp.notes}</p>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-64 text-muted-foreground">
                        Aucune compétition programmée pour le futur
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

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
                      <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
                        <p>Pas encore de données de performance sur les 3 derniers mois</p>
                        <p className="text-xs mt-2">Assurez-vous d'avoir importé des sessions avec des scores (table matches)</p>
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
                      <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
                        <p>Pas encore assez de données pour calculer la corrélation</p>
                        <p className="text-xs mt-2">Importez des sessions avec scores + métriques WHOOP</p>
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