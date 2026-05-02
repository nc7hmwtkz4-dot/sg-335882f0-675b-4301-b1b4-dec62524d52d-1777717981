import { useState } from "react";
import { useRouter } from "next/router";
import { SEO } from "@/components/SEO";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { importArcherySessions, importHealthMetrics, type ImportResult } from "@/services/csvImportService";
import { Upload, FileText, Activity, CheckCircle2, AlertCircle } from "lucide-react";

export default function ImportPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [archeryFile, setArcheryFile] = useState<File | null>(null);
  const [healthFile, setHealthFile] = useState<File | null>(null);
  const [archeryResult, setArcheryResult] = useState<ImportResult | null>(null);
  const [healthResult, setHealthResult] = useState<ImportResult | null>(null);
  const [isImporting, setIsImporting] = useState(false);
  const [activeTab, setActiveTab] = useState("archery");

  const handleArcheryFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "text/csv") {
      setArcheryFile(file);
      setArcheryResult(null);
    }
  };

  const handleHealthFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "text/csv") {
      setHealthFile(file);
      setHealthResult(null);
    }
  };

  const handleArcheryImport = async () => {
    if (!archeryFile || !user) return;

    setIsImporting(true);
    try {
      const result = await importArcherySessions(archeryFile);
      setArcheryResult(result);
    } catch (error) {
      setArcheryResult({
        success: false,
        totalRows: 0,
        recordsInserted: 0,
        errors: [error instanceof Error ? error.message : "Erreur inconnue"],
      });
    } finally {
      setIsImporting(false);
    }
  };

  const handleHealthImport = async () => {
    if (!healthFile || !user) return;

    setIsImporting(true);
    try {
      const result = await importHealthMetrics(healthFile);
      setHealthResult(result);
    } catch (error) {
      setHealthResult({
        success: false,
        totalRows: 0,
        recordsInserted: 0,
        errors: [error instanceof Error ? error.message : "Erreur inconnue"],
      });
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col bg-background">
        <SEO
          title="Import de Données | Thomas Aubert"
          description="Importer vos sessions de tir et données de santé"
        />
        <Navigation />
        
        <main className="flex-1 py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-foreground mb-2">Import de Données</h1>
              <p className="text-muted-foreground">
                Importez vos fichiers CSV de sessions de tir à l'arc et de données WHOOP
              </p>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="archery" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Sessions de Tir
                </TabsTrigger>
                <TabsTrigger value="health" className="flex items-center gap-2">
                  <Activity className="h-4 w-4" />
                  Données WHOOP
                </TabsTrigger>
              </TabsList>

              <TabsContent value="archery" className="space-y-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Importer les Sessions de Tir</CardTitle>
                    <CardDescription>
                      Format CSV attendu : date, type_arc, distance, meteo, temperature, vent, sensations, score
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="border-2 border-dashed border-muted rounded-lg p-8 text-center">
                      <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                      <input
                        type="file"
                        accept=".csv"
                        onChange={handleArcheryFileChange}
                        className="hidden"
                        id="archery-file"
                      />
                      <label htmlFor="archery-file" className="cursor-pointer">
                        <Button variant="outline" asChild>
                          <span>Choisir un fichier CSV</span>
                        </Button>
                      </label>
                      {archeryFile && (
                        <p className="mt-2 text-sm text-muted-foreground">
                          Fichier sélectionné : {archeryFile.name}
                        </p>
                      )}
                    </div>

                    {archeryFile && !archeryResult && (
                      <Button
                        onClick={handleArcheryImport}
                        disabled={isImporting}
                        className="w-full"
                      >
                        {isImporting ? "Import en cours..." : "Importer"}
                      </Button>
                    )}

                    {archeryResult && (
                      <Alert variant={archeryResult.success ? "default" : "destructive"}>
                        <div className="flex items-start gap-2">
                          {archeryResult.success ? (
                            <CheckCircle2 className="h-5 w-5 text-green-600" />
                          ) : (
                            <AlertCircle className="h-5 w-5" />
                          )}
                          <div className="flex-1">
                            <AlertDescription>
                              <p className="font-semibold mb-2">
                                {archeryResult.success ? "Import réussi !" : "Import terminé avec des erreurs"}
                              </p>
                              <ul className="space-y-1 text-sm">
                                <li>Lignes traitées : {archeryResult.totalRows}</li>
                                <li>Sessions créées : {archeryResult.recordsInserted}</li>
                                {archeryResult.errors.length > 0 && (
                                  <li className="mt-2">
                                    <p className="font-semibold">Erreurs :</p>
                                    <ul className="list-disc list-inside mt-1">
                                      {archeryResult.errors.slice(0, 5).map((error, i) => (
                                        <li key={i}>{error}</li>
                                      ))}
                                      {archeryResult.errors.length > 5 && (
                                        <li>... et {archeryResult.errors.length - 5} autres erreurs</li>
                                      )}
                                    </ul>
                                  </li>
                                )}
                              </ul>
                            </AlertDescription>
                          </div>
                        </div>
                      </Alert>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="health" className="space-y-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Importer les Données WHOOP</CardTitle>
                    <CardDescription>
                      Format CSV attendu : date, sleep_hours, sleep_quality, resting_hr, hrv, recovery, respiratory_rate, skin_temp, spo2
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="border-2 border-dashed border-muted rounded-lg p-8 text-center">
                      <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                      <input
                        type="file"
                        accept=".csv"
                        onChange={handleHealthFileChange}
                        className="hidden"
                        id="health-file"
                      />
                      <label htmlFor="health-file" className="cursor-pointer">
                        <Button variant="outline" asChild>
                          <span>Choisir un fichier CSV</span>
                        </Button>
                      </label>
                      {healthFile && (
                        <p className="mt-2 text-sm text-muted-foreground">
                          Fichier sélectionné : {healthFile.name}
                        </p>
                      )}
                    </div>

                    {healthFile && !healthResult && (
                      <Button
                        onClick={handleHealthImport}
                        disabled={isImporting}
                        className="w-full"
                      >
                        {isImporting ? "Import en cours..." : "Importer"}
                      </Button>
                    )}

                    {healthResult && (
                      <Alert variant={healthResult.success ? "default" : "destructive"}>
                        <div className="flex items-start gap-2">
                          {healthResult.success ? (
                            <CheckCircle2 className="h-5 w-5 text-green-600" />
                          ) : (
                            <AlertCircle className="h-5 w-5" />
                          )}
                          <div className="flex-1">
                            <AlertDescription>
                              <p className="font-semibold mb-2">
                                {healthResult.success ? "Import réussi !" : "Import terminé avec des erreurs"}
                              </p>
                              <ul className="space-y-1 text-sm">
                                <li>Lignes traitées : {healthResult.totalRows}</li>
                                <li>Métriques créées : {healthResult.recordsInserted}</li>
                                {healthResult.errors.length > 0 && (
                                  <li className="mt-2">
                                    <p className="font-semibold">Erreurs :</p>
                                    <ul className="list-disc list-inside mt-1">
                                      {healthResult.errors.slice(0, 5).map((error, i) => (
                                        <li key={i}>{error}</li>
                                      ))}
                                      {healthResult.errors.length > 5 && (
                                        <li>... et {healthResult.errors.length - 5} autres erreurs</li>
                                      )}
                                    </ul>
                                  </li>
                                )}
                              </ul>
                            </AlertDescription>
                          </div>
                        </div>
                      </Alert>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Guide d'Import</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Sessions de Tir</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Colonnes attendues (ordre flexible) :
                  </p>
                  <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
                    <li><code>date</code> ou <code>Date</code> - Format : YYYY-MM-DD</li>
                    <li><code>bow_type</code> ou <code>type_arc</code> - recurve, compound, barebow</li>
                    <li><code>distance</code> - En mètres (ex: 70)</li>
                    <li><code>weather</code> ou <code>meteo</code> - sunny, cloudy, rainy, windy</li>
                    <li><code>temperature</code> - En degrés Celsius</li>
                    <li><code>wind_speed</code> ou <code>vent</code> - En km/h</li>
                    <li><code>feeling</code> ou <code>sensations</code> - good, average, bad</li>
                    <li><code>score</code> ou <code>total_score</code> - Score total (optionnel)</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Données WHOOP</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Colonnes attendues (ordre flexible) :
                  </p>
                  <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
                    <li><code>date</code> ou <code>Cycle start time</code> - Format : YYYY-MM-DD</li>
                    <li><code>sleep_hours</code> ou <code>Sleep duration</code> - En heures</li>
                    <li><code>sleep_quality</code> ou <code>Sleep quality</code> - 0-100</li>
                    <li><code>resting_hr</code> ou <code>Resting heart rate</code> - BPM</li>
                    <li><code>hrv</code> ou <code>HRV</code> - En ms</li>
                    <li><code>recovery</code> ou <code>Recovery score</code> - 0-100</li>
                    <li><code>respiratory_rate</code> ou <code>Respiratory rate</code> - Par minute</li>
                    <li><code>skin_temp</code> ou <code>Skin temp</code> - En degrés</li>
                    <li><code>spo2</code> ou <code>SpO2</code> - 0-100%</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>

        <Footer />
      </div>
    </ProtectedRoute>
  );
}