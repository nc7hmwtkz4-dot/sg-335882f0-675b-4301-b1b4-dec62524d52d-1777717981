import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Target, Trophy } from "lucide-react";
import { getMonthSessions, type CalendarDay } from "@/services/calendarService";
import { cn } from "@/lib/utils";

interface SessionCalendarProps {
  userId: string;
  onDateClick: (date: string) => void;
}

export function SessionCalendar({ userId, onDateClick }: SessionCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarDays, setCalendarDays] = useState<CalendarDay[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;

  useEffect(() => {
    async function loadCalendar() {
      setIsLoading(true);
      const days = await getMonthSessions(userId, year, month);
      setCalendarDays(days);
      setIsLoading(false);
    }
    loadCalendar();
  }, [userId, year, month]);

  const previousMonth = () => {
    setCurrentDate(new Date(year, month - 2, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month, 1));
  };

  const monthName = currentDate.toLocaleDateString("fr-FR", { month: "long", year: "numeric" });

  // Calculer le premier jour de la semaine du mois
  const firstDayOfMonth = new Date(year, month - 1, 1);
  const startingDayOfWeek = firstDayOfMonth.getDay();
  const daysInMonth = new Date(year, month, 0).getDate();

  // Créer un tableau de 42 cases (6 semaines)
  const calendarCells: (CalendarDay | null)[] = [];
  
  // Ajouter les cases vides avant le premier jour
  for (let i = 0; i < (startingDayOfWeek === 0 ? 6 : startingDayOfWeek - 1); i++) {
    calendarCells.push(null);
  }

  // Ajouter les jours du mois
  calendarDays.forEach((day) => {
    calendarCells.push(day);
  });

  // Compléter avec des cases vides
  while (calendarCells.length < 42) {
    calendarCells.push(null);
  }

  const weekDays = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Calendrier des Sessions</CardTitle>
            <CardDescription className="capitalize">{monthName}</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" onClick={previousMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={nextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-2">
          {weekDays.map((day) => (
            <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
              {day}
            </div>
          ))}
          {calendarCells.map((day, index) => {
            if (!day) {
              return <div key={`empty-${index}`} className="aspect-square" />;
            }

            const dayNumber = new Date(day.date).getDate();
            const hasTraining = day.sessionTypes.includes("training");
            const hasCompetition = day.sessionTypes.includes("competition");

            return (
              <button
                key={day.date}
                onClick={() => day.hasSession && onDateClick(day.date)}
                disabled={!day.hasSession}
                className={cn(
                  "aspect-square rounded-lg border-2 transition-all relative",
                  "hover:border-primary hover:bg-accent",
                  day.hasSession
                    ? "border-primary/50 bg-primary/5 cursor-pointer"
                    : "border-transparent bg-muted/30 cursor-default opacity-50",
                  "flex flex-col items-center justify-center gap-1"
                )}
              >
                <span className="text-sm font-medium">{dayNumber}</span>
                {day.hasSession && (
                  <div className="flex gap-1">
                    {hasTraining && <Target className="h-3 w-3 text-primary" />}
                    {hasCompetition && <Trophy className="h-3 w-3 text-accent" />}
                  </div>
                )}
              </button>
            );
          })}
        </div>
        <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-primary" />
            <span>Entraînement</span>
          </div>
          <div className="flex items-center gap-2">
            <Trophy className="h-4 w-4 text-accent" />
            <span>Compétition</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}