import { useState, useEffect } from "react";
import Head from "next/head";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Trash2, Edit, Download, Calendar as CalendarIcon, ChevronLeft, ChevronRight, List, Clock, X } from "lucide-react";
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

interface ProgramActivity {
  start_time: string;
  end_time: string;
  description: string;
}

interface ProgramDay {
  date: string;
  activities: ProgramActivity[];
}

interface Competition {
  id: string;
  title: string;
  start_date: string;
  end_date: string;
  location: string | null;
  program_details: ProgramDay[] | null;
  flight_train_cost: number | null;
  accommodation_cost: number | null;
  food_cost: number | null;
  local_transport_cost: number | null;
  registration_cost: number | null;
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
    program_details: [] as ProgramDay[],
    flight_train_cost: 0,
    accommodation_cost: 0,
    food_cost: 0,
    local_transport_cost: 0,
    registration_cost: 0,
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
      const formattedData = (data || []).map(comp => ({
        ...comp,
        program_details: (typeof comp.program_details === 'string' 
          ? JSON.parse(comp.program_details || '[]') 
          : comp.program_details) as ProgramDay[] || [],
      }));
      setCompetitions(formattedData as Competition[]);
    }
    setLoading(false);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      start_date: "",
      end_date: "",
      location: "",
      program_details: [],
      flight_train_cost: 0,
      accommodation_cost: 0,
      food_cost: 0,
      local_transport_cost: 0,
      registration_cost: 0,
    });
  };

  // Fonctions pour gérer le programme
  const addProgramDay = () => {
    setFormData({
      ...formData,
      program_details: [...formData.program_details, { date: formData.start_date, activities: [] }],
    });
  };

  const removeProgramDay = (dayIndex: number) => {
    const newProgram = [...formData.program_details];
    newProgram.splice(dayIndex, 1);
    setFormData({ ...formData, program_details: newProgram });
  };

  const updateProgramDay = (dayIndex: number, date: string) => {
    const newProgram = [...formData.program_details];
    newProgram[dayIndex].date = date;
    setFormData({ ...formData, program_details: newProgram });
  };

  const addActivity = (dayIndex: number) => {
    const newProgram = [...formData.program_details];
    newProgram[dayIndex].activities.push({ start_time: "09:00", end_time: "10:00", description: "" });
    setFormData({ ...formData, program_details: newProgram });
  };

  const removeActivity = (dayIndex: number, activityIndex: number) => {
    const newProgram = [...formData.program_details];
    newProgram[dayIndex].activities.splice(activityIndex, 1);
    setFormData({ ...formData, program_details: newProgram });
  };

  const updateActivity = (dayIndex: number, activityIndex: number, field: keyof ProgramActivity, value: string) => {
    const newProgram = [...formData.program_details];
    newProgram[dayIndex].activities[activityIndex][field] = value;
    setFormData({ ...formData, program_details: newProgram });
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();

    const dataToSubmit = {
      ...formData,
      program_details: formData.program_details as any,
    };

    const { error } = await supabase.from("competitions").insert(dataToSubmit);

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

    const dataToSubmit = {
      ...formData,
      program_details: formData.program_details as any,
    };

    const { error } = await supabase
      .from("competitions")
      .update(dataToSubmit)
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
      program_details: competition.program_details || [],
      flight_train_cost: competition.flight_train_cost || 0,
      accommodation_cost: competition.accommodation_cost || 0,
      food_cost: competition.food_cost || 0,
      local_transport_cost: competition.local_transport_cost || 0,
      registration_cost: competition.registration_cost || 0,
    });
    setShowEditDialog(true);
  };

  const exportToICS = (competition: Competition) => {
    const formatDate = (date: string) => {
      return date.replace(/-/g, "");
    };

    const formatDateTime = (date: string, time: string) => {
      return `${formatDate(date)}T${time.replace(":", "")}00`;
    };

    let events = "";

    if (competition.program_details && competition.program_details.length > 0) {
      // Exporter chaque activité comme un événement séparé
      competition.program_details.forEach((day) => {
        day.activities.forEach((activity, index) => {
          events += `BEGIN:VEVENT
UID:${competition.id}-${day.date}-${index}@thomasaubert.com
DTSTAMP:${formatDate(new Date().toISOString().split("T")[0])}
DTSTART:${formatDateTime(day.date, activity.start_time)}
DTEND:${formatDateTime(day.date, activity.end_time)}
SUMMARY:${competition.title} - ${activity.description}
LOCATION:${competition.location || ""}
END:VEVENT
`;
        });
      });
    } else {
      // Événement global si pas de programme détaillé
      events = `BEGIN:VEVENT
UID:${competition.id}@thomasaubert.com
DTSTAMP:${formatDate(new Date().toISOString().split("T")[0])}
DTSTART:${formatDate(competition.start_date)}
DTEND:${formatDate(competition.end_date)}
SUMMARY:${competition.title}
LOCATION:${competition.location || ""}
END:VEVENT
`;
    }

    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Thomas Aubert//Calendrier Compétitions//FR
${events}END:VCALENDAR`;

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

  // Fonction pour calculer le budget total
  const calculateTotalBudget = (comp: Competition | typeof formData) => {
    const flight = Number(comp.flight_train_cost) || 0;
    const accommodation = Number(comp.accommodation_cost) || 0;
    const food = Number(comp.food_cost) || 0;
    const transport = Number(comp.local_transport_cost) || 0;
    const registration = Number(comp.registration_cost) || 0;
    return flight + accommodation + food + transport + registration;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("fr-CH", {
      style: "currency",
      currency: "CHF",
    }).format(amount);
  };

  // Fonctions pour la vue timeline
  const getCompetitionsByYear = () => {
    const byYear: Record<string, Competition[]> = {};
    
    competitions.forEach(comp => {
      const year = comp.start_date.split("-")[0];
      if (!byYear[year]) {
        byYear[year] = [];
      }
      byYear[year].push(comp);
    });

    return byYear;
  };

  const getMonthsForYear = (year: string) => {
    const months = [];
    const startYear = parseInt(year);
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1; // getMonth() retourne 0-11
    
    const startMonth = (startYear === currentYear) ? currentMonth : 1;
    const endMonth = year === "2028" ? 8 : 12; // Jusqu'à août 2028
    
    for (let month = startMonth; month <= endMonth; month++) {
      months.push({
        number: month,
        name: new Date(startYear, month - 1, 1).toLocaleDateString("fr-FR", { month: "short" }),
      });
    }
    
    return months;
  };

  const getCompetitionsForMonth = (year: string, month: number) => {
    return competitions.filter(comp => {
      const compYear = comp.start_date.split("-")[0];
      const compMonth = parseInt(comp.start_date.split("-")[1]);
      return compYear === year && compMonth === month;
    });
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
            <DialogContent className="rounded-none max-w-2xl max-h-[90vh] overflow-y-auto">
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

                {/* Section Budget */}
                <div className="border-t border-border pt-4">
                  <h3 className="font-semibold mb-4">Budget de participation (CHF)</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Avion / Train</label>
                      <Input
                        type="number"
                        step="0.01"
                        min="0"
                        value={formData.flight_train_cost}
                        onChange={(e) => setFormData({ ...formData, flight_train_cost: parseFloat(e.target.value) || 0 })}
                        placeholder="0.00"
                        className="rounded-none"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Hébergement</label>
                      <Input
                        type="number"
                        step="0.01"
                        min="0"
                        value={formData.accommodation_cost}
                        onChange={(e) => setFormData({ ...formData, accommodation_cost: parseFloat(e.target.value) || 0 })}
                        placeholder="0.00"
                        className="rounded-none"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Nourriture</label>
                      <Input
                        type="number"
                        step="0.01"
                        min="0"
                        value={formData.food_cost}
                        onChange={(e) => setFormData({ ...formData, food_cost: parseFloat(e.target.value) || 0 })}
                        placeholder="0.00"
                        className="rounded-none"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Transport Local</label>
                      <Input
                        type="number"
                        step="0.01"
                        min="0"
                        value={formData.local_transport_cost}
                        onChange={(e) => setFormData({ ...formData, local_transport_cost: parseFloat(e.target.value) || 0 })}
                        placeholder="0.00"
                        className="rounded-none"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Inscription</label>
                      <Input
                        type="number"
                        step="0.01"
                        min="0"
                        value={formData.registration_cost}
                        onChange={(e) => setFormData({ ...formData, registration_cost: parseFloat(e.target.value) || 0 })}
                        placeholder="0.00"
                        className="rounded-none"
                      />
                    </div>
                  </div>
                  
                  {/* Ligne Total */}
                  <div className="mt-4 pt-4 border-t border-accent/30 bg-accent/5 -mx-4 px-4 py-3">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-lg">TOTAL</span>
                      <span className="font-bold text-2xl text-accent">
                        {formatCurrency(calculateTotalBudget(formData))}
                      </span>
                    </div>
                  </div>
                </div>

                <Button type="submit" className="w-full bg-foreground text-background hover:bg-accent rounded-none">
                  Ajouter
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Tabs defaultValue="list" className="w-full">
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-3 mb-8">
            <TabsTrigger value="list" className="rounded-none">
              <List className="w-4 h-4 mr-2" />
              Vue Liste
            </TabsTrigger>
            <TabsTrigger value="calendar" className="rounded-none">
              <CalendarIcon className="w-4 h-4 mr-2" />
              Vue Calendrier
            </TabsTrigger>
            <TabsTrigger value="timeline" className="rounded-none">
              <Clock className="w-4 h-4 mr-2" />
              Vue Timeline
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
                    <div className="flex justify-between items-start gap-6">
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
                        {competition.program_details && competition.program_details.length > 0 && (
                          <div className="mt-4 pt-4 border-t border-border">
                            <p className="text-sm font-medium mb-2">Programme :</p>
                            <div className="text-sm text-muted-foreground space-y-3">
                              {competition.program_details.map((day, dayIndex) => (
                                <div key={dayIndex}>
                                  <p className="font-semibold text-foreground">
                                    {new Date(day.date).toLocaleDateString("fr-FR", { 
                                      weekday: "long", 
                                      day: "numeric", 
                                      month: "long", 
                                      year: "numeric" 
                                    })}
                                  </p>
                                  <div className="pl-4 space-y-1">
                                    {day.activities.map((activity, actIndex) => (
                                      <p key={actIndex}>
                                        {activity.start_time} - {activity.end_time}: {activity.description}
                                      </p>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Budget total - Rectangle */}
                      <div className="border-2 border-accent bg-accent/10 px-4 py-2 min-w-[120px] text-center">
                        <div className="text-xs text-muted-foreground mb-1">Budget</div>
                        <div className="font-bold text-lg text-accent">
                          {formatCurrency(calculateTotalBudget(competition))}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
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

          {/* Vue Timeline */}
          <TabsContent value="timeline">
            <div className="space-y-12">
              {Object.entries(getCompetitionsByYear())
                .sort(([yearA], [yearB]) => parseInt(yearA) - parseInt(yearB))
                .map(([year, yearCompetitions]) => (
                  <div key={year} className="border border-border bg-card p-6">
                    <h2 className="font-heading text-3xl font-bold uppercase mb-6 text-accent">
                      {year}
                    </h2>

                    {/* Grille des mois */}
                    <div className="space-y-4">
                      {getMonthsForYear(year).map(({ number, name }) => {
                        const monthCompetitions = getCompetitionsForMonth(year, number);
                        
                        return (
                          <div key={number} className="border-l-4 border-accent/30 pl-4">
                            <div className="flex items-start gap-4">
                              <div className="min-w-[80px]">
                                <div className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">
                                  {name}
                                </div>
                              </div>
                              
                              <div className="flex-1">
                                {monthCompetitions.length === 0 ? (
                                  <div className="text-sm text-muted-foreground italic py-1">
                                    Aucune compétition
                                  </div>
                                ) : (
                                  <div className="space-y-2">
                                    {monthCompetitions.map((comp) => (
                                      <div
                                        key={comp.id}
                                        className="bg-background border border-border p-3 hover:border-accent/50 transition-colors cursor-pointer group"
                                        onClick={() => setSelectedCompetition(comp)}
                                      >
                                        <div className="flex justify-between items-start gap-4">
                                          <div className="flex-1">
                                            <h3 className="font-semibold text-sm mb-1 group-hover:text-accent transition-colors">
                                              {comp.title}
                                            </h3>
                                            <div className="text-xs text-muted-foreground space-y-0.5">
                                              <p>
                                                📅 {new Date(comp.start_date).toLocaleDateString("fr-FR", { day: "numeric", month: "short" })}
                                                {comp.start_date !== comp.end_date && (
                                                  <> → {new Date(comp.end_date).toLocaleDateString("fr-FR", { day: "numeric", month: "short" })}</>
                                                )}
                                              </p>
                                              {comp.location && <p>📍 {comp.location}</p>}
                                            </div>
                                          </div>
                                          
                                          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Button
                                              size="sm"
                                              variant="ghost"
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                exportToICS(comp);
                                              }}
                                              className="rounded-none h-7 w-7 p-0"
                                            >
                                              <Download className="w-3 h-3" />
                                            </Button>
                                            <Button
                                              size="sm"
                                              variant="ghost"
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                openEditDialog(comp);
                                              }}
                                              className="rounded-none h-7 w-7 p-0"
                                            >
                                              <Edit className="w-3 h-3" />
                                            </Button>
                                            <Button
                                              size="sm"
                                              variant="ghost"
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                handleDelete(comp.id);
                                              }}
                                              className="rounded-none h-7 w-7 p-0 text-destructive hover:text-destructive"
                                            >
                                              <Trash2 className="w-3 h-3" />
                                            </Button>
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}

              {competitions.length === 0 && (
                <div className="text-center py-20 border border-border bg-card">
                  <Clock className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Aucune compétition planifiée</p>
                </div>
              )}
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
              
              {selectedCompetition.program_details && selectedCompetition.program_details.length > 0 && (
                <div className="pt-4 border-t border-border">
                  <p className="text-sm font-medium mb-2">Programme :</p>
                  <div className="text-sm text-muted-foreground space-y-3">
                    {selectedCompetition.program_details.map((day, dayIndex) => (
                      <div key={dayIndex}>
                        <p className="font-semibold text-foreground">
                          {new Date(day.date).toLocaleDateString("fr-FR", { 
                            weekday: "long", 
                            day: "numeric", 
                            month: "long", 
                            year: "numeric" 
                          })}
                        </p>
                        <div className="pl-4 space-y-1">
                          {day.activities.map((activity, actIndex) => (
                            <p key={actIndex}>
                              {activity.start_time} - {activity.end_time}: {activity.description}
                            </p>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
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
        <DialogContent className="rounded-none max-w-2xl max-h-[90vh] overflow-y-auto">
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
              <div className="space-y-4 border border-border p-4 bg-muted/20">
                {formData.program_details.map((day, dayIndex) => (
                  <div key={dayIndex} className="border border-border bg-background p-4 space-y-3">
                    <div className="flex justify-between items-center">
                      <div className="flex gap-2 items-center flex-1">
                        <label className="text-sm font-medium">Date:</label>
                        <Input
                          type="date"
                          value={day.date}
                          onChange={(e) => updateProgramDay(dayIndex, e.target.value)}
                          min={formData.start_date}
                          max={formData.end_date}
                          className="rounded-none max-w-xs"
                        />
                      </div>
                      <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        onClick={() => removeProgramDay(dayIndex)}
                        className="rounded-none text-destructive"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="space-y-2 pl-4 border-l-2 border-accent/30">
                      {day.activities.map((activity, activityIndex) => (
                        <div key={activityIndex} className="grid grid-cols-12 gap-2 items-start">
                          <Input
                            type="time"
                            value={activity.start_time}
                            onChange={(e) => updateActivity(dayIndex, activityIndex, "start_time", e.target.value)}
                            className="rounded-none col-span-2"
                          />
                          <span className="col-span-1 text-center pt-2">→</span>
                          <Input
                            type="time"
                            value={activity.end_time}
                            onChange={(e) => updateActivity(dayIndex, activityIndex, "end_time", e.target.value)}
                            className="rounded-none col-span-2"
                          />
                          <Input
                            value={activity.description}
                            onChange={(e) => updateActivity(dayIndex, activityIndex, "description", e.target.value)}
                            placeholder="Description de l'activité"
                            className="rounded-none col-span-6"
                          />
                          <Button
                            type="button"
                            size="sm"
                            variant="ghost"
                            onClick={() => removeActivity(dayIndex, activityIndex)}
                            className="rounded-none text-destructive col-span-1"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={() => addActivity(dayIndex)}
                        className="rounded-none w-full"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Ajouter une activité
                      </Button>
                    </div>
                  </div>
                ))}
                
                <Button
                  type="button"
                  variant="outline"
                  onClick={addProgramDay}
                  className="rounded-none w-full"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Ajouter un jour
                </Button>
              </div>
            </div>

            {/* Section Budget */}
            <div className="border-t border-border pt-4">
              <h3 className="font-semibold mb-4">Budget de participation (CHF)</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Avion / Train</label>
                  <Input
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.flight_train_cost}
                    onChange={(e) => setFormData({ ...formData, flight_train_cost: parseFloat(e.target.value) || 0 })}
                    placeholder="0.00"
                    className="rounded-none"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Hébergement</label>
                  <Input
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.accommodation_cost}
                    onChange={(e) => setFormData({ ...formData, accommodation_cost: parseFloat(e.target.value) || 0 })}
                    placeholder="0.00"
                    className="rounded-none"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Nourriture</label>
                  <Input
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.food_cost}
                    onChange={(e) => setFormData({ ...formData, food_cost: parseFloat(e.target.value) || 0 })}
                    placeholder="0.00"
                    className="rounded-none"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Transport Local</label>
                  <Input
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.local_transport_cost}
                    onChange={(e) => setFormData({ ...formData, local_transport_cost: parseFloat(e.target.value) || 0 })}
                    placeholder="0.00"
                    className="rounded-none"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Inscription</label>
                  <Input
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.registration_cost}
                    onChange={(e) => setFormData({ ...formData, registration_cost: parseFloat(e.target.value) || 0 })}
                    placeholder="0.00"
                    className="rounded-none"
                  />
                </div>
              </div>
              
              {/* Ligne Total */}
              <div className="mt-4 pt-4 border-t border-accent/30 bg-accent/5 -mx-4 px-4 py-3">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-lg">TOTAL</span>
                  <span className="font-bold text-2xl text-accent">
                    {formatCurrency(calculateTotalBudget(formData))}
                  </span>
                </div>
              </div>
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