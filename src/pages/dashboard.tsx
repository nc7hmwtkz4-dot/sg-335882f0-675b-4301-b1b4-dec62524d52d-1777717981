import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useAuth } from "@/contexts/AuthContext";
import { SEO } from "@/components/SEO";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Calendar, Activity, TrendingUp } from "lucide-react";

function DashboardContent() {
  const { profile } = useAuth();

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
                  <div className="text-3xl font-bold">0</div>
                  <p className="text-xs text-muted-foreground mt-1">Ce mois</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Score moyen</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">-</div>
                  <p className="text-xs text-muted-foreground mt-1">Sur 720</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Récupération</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">-</div>
                  <p className="text-xs text-muted-foreground mt-1">WHOOP</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Tendance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">-</div>
                  <p className="text-xs text-muted-foreground mt-1">30 derniers jours</p>
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
                  <Button variant="outline" className="w-full justify-start">
                    <Upload className="w-4 h-4 mr-2" />
                    Import CSV entraînements
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Upload className="w-4 h-4 mr-2" />
                    Import CSV WHOOP
                  </Button>
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
                  <Button variant="outline" className="w-full justify-start">
                    <Calendar className="w-4 h-4 mr-2" />
                    Calendrier des sessions
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
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