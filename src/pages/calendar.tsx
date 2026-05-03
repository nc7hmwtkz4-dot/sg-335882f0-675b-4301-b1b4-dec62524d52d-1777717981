import { useState, useEffect } from "react";
import Head from "next/head";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Trash2, Edit, Download, Calendar as CalendarIcon, ChevronLeft, ChevronRight, List } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

interface Competition {
  id: string;
  title: string;
  start_date: string;
  end_date: string;
  location: string | null;
  program_details: string | null;
  created_at: string;
}

export default function CalendarPage() {
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingCompetition, setEditingCompetition] = useState<Competition | null>(null);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    start_date: "",
    end_date: "",
    location: "",
    program_details: "",
  });

  const MAX_DATE = "2028-08-31";

  // États pour la vue calendrier
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedCompetition, setSelectedCompetition] = useState<Competition | null>(null);

  useEffect(() => {
    loadCompetitions();
  }, []);

  const loadCompetitions = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("competitions")
      .select("*")
      .order("start_date", { ascending: true });

    if (error) {
      console.error("Erreur chargement:", error);
    } else {
      setCompetitions(data || []);
    }
    setLoading(false);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      start_date: "",
      end_date: "",
      location: "",
      program_details: "",
    });
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase.from("competitions").insert(formData);

    if (error) {
      console.error("Erreur ajout:", error);
      alert("Erreur lors de l'ajout");
    } else {
      setShowAddDialog(false);
      resetForm();
      loadCompetitions();
    }
  };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCompetition) return;

    const { error } = await supabase
      .from("competitions")
      .update(formData)
      .eq("id", editingCompetition.id);

    if (error) {
      console.error("Erreur modification:", error);
      alert("Erreur lors de la modification");
    } else {
      setShowEditDialog(false);
      setEditingCompetition(null);
      resetForm();
      loadCompetitions();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Supprimer cette compétition ?")) return;

    const { error } = await supabase.from("competitions").delete().eq("id", id);

    if (error) {
      console.error("Erreur suppression:", error);
      alert("Erreur lors de la suppression");
    } else {
      loadCompetitions();
    }
  };

  const openEditDialog = (competition: Competition) => {
    setEditingCompetition(competition);
    setFormData({
      title: competition.title,
      start_date: competition.start_date,
      end_date: competition.end_date,
      location: competition.location || "",
      program_details: competition.program_details || "",
    });
    setShowEditDialog(true);
  };

  const exportToICS = (competition: Competition) => {
    const formatDate = (date: string) => {
      return date.replace(/-/g, "");
    };

    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Thomas Aubert//Calendrier Compétitions//FR
BEGIN:VEVENT
UID:${competition.id}@thomasaubert.com
DTSTAMP:${formatDate(new Date().toISOString().split("T")[0])}
DTSTART:${formatDate(competition.start_date)}
DTEND:${formatDate(competition.end_date)}
SUMMARY:${competition.title}
LOCATION:${competition.location || ""}
DESCRIPTION:${(competition.program_details || "").replace(/\n/g, "\\n")}
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: "text/calendar" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${competition.title.replace(/[^a-z0-9]/gi, "_")}.ics`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // Fonctions pour le calendrier
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    return { daysInMonth, startingDayOfWeek: startingDayOfWeek === 0 ? 6 : startingDayOfWeek - 1 };
  };

  const getCompetitionsForDay = (day: number) => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    
    return competitions.filter(comp => {
      const start = comp.start_date;
      const end = comp.end_date;
      return dateStr >= start && dateStr <= end;
    });
  };

  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    const nextMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1);
    const maxDate = new Date("2028-08-31");
    if (nextMonth <= maxDate) {
      setCurrentMonth(nextMonth);
    }
  };

  const getMonthName = (date: Date) => {
    return date.toLocaleDateString("fr-FR", { month: "long", year: "numeric" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Head>
        <title>Calendrier Compétitions | Thomas Aubert</title>
      </Head>

      <Navigation />

      <div className="container mx-auto px-4 py-32">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="font-heading text-4xl md:text-5xl font-bold uppercase tracking-tighter mb-2">
              Calendrier <span className="text-accent">Compétitions</span>
            </h1>
            <p className="text-muted-foreground">
              Jusqu'au 31 Août 2028
            </p>
          </div>

          <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
            <DialogTrigger asChild>
              <Button className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-none">
                <Plus className="w-4 h-4 mr-2" />
                Ajouter une compétition
              </Button>
            </DialogTrigger>
            <DialogContent className="rounded-none max-w-2xl">
              <DialogHeader>
                <DialogTitle className="font-heading text-2xl uppercase">
                  Nouvelle Compétition
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAdd} className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Titre</label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Championnats du Monde 2026"
                    required
                    className="rounded-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Date de début</label>
                    <Input
                      type="date"
                      value={formData.start_date}
                      onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                      max={MAX_DATE}
                      required
                      className="rounded-none"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Date de fin</label>
                    <Input
                      type="date"
                      value={formData.end_date}
                      onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                      max={MAX_DATE}
                      required
                      className="rounded-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Lieu</label>
                  <Input
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Paris, France"
                    className="rounded-none"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Programme détaillé (optionnel)</label>
                  <Textarea
                    value={formData.program_details}
                    onChange={(e) => setFormData({ ...formData, program_details: e.target.value })}
                    placeholder="Détails du programme..."
                    rows={6}
                    className="rounded-none"
                  />
                </div>

                <Button type="submit" className="w-full bg-foreground text-background hover:bg-accent rounded-none">
                  Ajouter
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Tabs defaultValue="list" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="list" className="rounded-none">
              <List className="w-4 h-4 mr-2" />
              Vue Liste
            </TabsTrigger>
            <TabsTrigger value="calendar" className="rounded-none">
              <CalendarIcon className="w-4 h-4 mr-2" />
              Vue Calendrier
            </TabsTrigger>
          </TabsList>

          {/* Vue Liste */}
          <TabsContent value="list">
            {loading ? (
              <div className="text-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
                <p className="text-muted-foreground">Chargement...</p>
              </div>
            ) : competitions.length === 0 ? (
              <div className="text-center py-20 border border-border bg-card">
                <CalendarIcon className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Aucune compétition planifiée</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {competitions.map((competition) => (
                  <div
                    key={competition.id}
                    className="border border-border bg-card p-6 hover:border-accent/50 transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-heading text-xl font-bold mb-2">
                          {competition.title}
                        </h3>
                        <div className="text-sm text-muted-foreground space-y-1">
                          <p>
                            📅 {formatDate(competition.start_date)} → {formatDate(competition.end_date)}
                          </p>
                          {competition.location && <p>📍 {competition.location}</p>}
                        </div>
                        {competition.program_details && (
                          <div className="mt-4 pt-4 border-t border-border">
                            <p className="text-sm font-medium mb-2">Programme :</p>
                            <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                              {competition.program_details}
                            </p>
                          </div>
                        )}
                      </div>

                      <div className="flex gap-2 ml-4">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => exportToICS(competition)}
                          className="rounded-none"
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => openEditDialog(competition)}
                          className="rounded-none"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(competition.id)}
                          className="rounded-none text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Vue Calendrier */}
          <TabsContent value="calendar">
            <div className="bg-card border border-border p-6">
              {/* Navigation du calendrier */}
              <div className="flex justify-between items-center mb-6">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={goToPreviousMonth}
                  className="rounded-none"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <h2 className="font-heading text-2xl font-bold uppercase">
                  {getMonthName(currentMonth)}
                </h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={goToNextMonth}
                  className="rounded-none"
                  disabled={currentMonth >= new Date("2028-08-01")}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>

              {/* Grille du calendrier */}
              <div className="grid grid-cols-7 gap-2">
                {/* Jours de la semaine */}
                {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map((day) => (
                  <div key={day} className="text-center font-semibold text-sm text-muted-foreground p-2">
                    {day}
                  </div>
                ))}

                {/* Cellules du calendrier */}
                {(() => {
                  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentMonth);
                  const cells = [];

                  // Cellules vides avant le premier jour
                  for (let i = 0; i < startingDayOfWeek; i++) {
                    cells.push(
                      <div key={`empty-${i}`} className="aspect-square border border-border/50 bg-muted/20 p-2"></div>
                    );
                  }

                  // Cellules des jours du mois
                  for (let day = 1; day <= daysInMonth; day++) {
                    const dayCompetitions = getCompetitionsForDay(day);
                    cells.push(
                      <div
                        key={day}
                        className="aspect-square border border-border bg-background p-2 hover:border-accent/50 transition-colors overflow-hidden"
                      >
                        <div className="text-sm font-semibold mb-1">{day}</div>
                        <div className="space-y-1">
                          {dayCompetitions.slice(0, 2).map((comp) => (
                            <div
                              key={comp.id}
                              onClick={() => setSelectedCompetition(comp)}
                              className="text-xs bg-accent/20 text-accent-foreground px-1 py-0.5 truncate cursor-pointer hover:bg-accent/30 transition-colors"
                              title={comp.title}
                            >
                              {comp.title}
                            </div>
                          ))}
                          {dayCompetitions.length > 2 && (
                            <div className="text-xs text-muted-foreground">
                              +{dayCompetitions.length - 2} autres
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  }

                  return cells;
                })()}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Dialog pour voir les détails d'une compétition depuis le calendrier */}
      <Dialog open={!!selectedCompetition} onOpenChange={() => setSelectedCompetition(null)}>
        <DialogContent className="rounded-none max-w-2xl">
          <DialogHeader>
            <DialogTitle className="font-heading text-2xl uppercase">
              {selectedCompetition?.title}
            </DialogTitle>
          </DialogHeader>
          {selectedCompetition && (
            <div className="space-y-4">
              <div className="text-sm text-muted-foreground space-y-2">
                <p>
                  📅 {formatDate(selectedCompetition.start_date)} → {formatDate(selectedCompetition.end_date)}
                </p>
                {selectedCompetition.location && <p>📍 {selectedCompetition.location}</p>}
              </div>
              
              {selectedCompetition.program_details && (
                <div className="pt-4 border-t border-border">
                  <p className="text-sm font-medium mb-2">Programme :</p>
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                    {selectedCompetition.program_details}
                  </p>
                </div>
              )}

              <div className="flex gap-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => exportToICS(selectedCompetition)}
                  className="rounded-none flex-1"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Exporter ICS
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedCompetition(null);
                    openEditDialog(selectedCompetition);
                  }}
                  className="rounded-none flex-1"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Modifier
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedCompetition(null);
                    handleDelete(selectedCompetition.id);
                  }}
                  className="rounded-none flex-1 text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Supprimer
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Dialog d'édition */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="rounded-none max-w-2xl">
          <DialogHeader>
            <DialogTitle className="font-heading text-2xl uppercase">
              Modifier la Compétition
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEdit} className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Titre</label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                className="rounded-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Date de début</label>
                <Input
                  type="date"
                  value={formData.start_date}
                  onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                  max={MAX_DATE}
                  required
                  className="rounded-none"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Date de fin</label>
                <Input
                  type="date"
                  value={formData.end_date}
                  onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                  max={MAX_DATE}
                  required
                  className="rounded-none"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Lieu</label>
              <Input
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="rounded-none"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Programme détaillé</label>
              <Textarea
                value={formData.program_details}
                onChange={(e) => setFormData({ ...formData, program_details: e.target.value })}
                rows={6}
                className="rounded-none"
              />
            </div>

            <Button type="submit" className="w-full bg-foreground text-background hover:bg-accent rounded-none">
              Enregistrer
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}