import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target, Cloud, Wind, Thermometer, Trophy, Activity } from "lucide-react";
import type { SessionWithDetails } from "@/services/calendarService";

interface SessionDetailProps {
  sessions: SessionWithDetails[];
  date: string;
}

export function SessionDetail({ sessions, date }: SessionDetailProps) {
  if (sessions.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Aucune session</CardTitle>
          <CardDescription>Pas de données pour cette date</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const formattedDate = new Date(date).toLocaleDateString("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold capitalize">{formattedDate}</h3>
      
      {sessions.map((session, index) => {
        const totalScore = session.total_score || session.matches[0]?.score || 0;
        const arrows = session.arrows;
        
        return (
          <Card key={session.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {session.session_type === "competition" ? (
                      <Trophy className="h-5 w-5 text-accent" />
                    ) : (
                      <Target className="h-5 w-5 text-primary" />
                    )}
                    Session {index + 1}
                  </CardTitle>
                  <CardDescription>
                    {session.bow_type === "recurve" && "Arc Classique"}
                    {session.bow_type === "compound" && "Arc à Poulies"}
                    {session.bow_type === "barebow" && "Arc Nu"}
                    {" · "}
                    {session.distance}m
                  </CardDescription>
                </div>
                {totalScore > 0 && (
                  <div className="text-right">
                    <div className="text-3xl font-bold">{totalScore}</div>
                    <div className="text-sm text-muted-foreground">/ 720</div>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Conditions météo */}
              {(session.weather_conditions || session.temperature || session.wind_speed) && (
                <div className="flex flex-wrap gap-2">
                  {session.weather_conditions && (
                    <Badge variant="outline" className="gap-1">
                      <Cloud className="h-3 w-3" />
                      {session.weather_conditions === "sunny" && "Ensoleillé"}
                      {session.weather_conditions === "cloudy" && "Nuageux"}
                      {session.weather_conditions === "rainy" && "Pluvieux"}
                      {session.weather_conditions === "windy" && "Venteux"}
                    </Badge>
                  )}
                  {session.temperature !== null && (
                    <Badge variant="outline" className="gap-1">
                      <Thermometer className="h-3 w-3" />
                      {session.temperature}°C
                    </Badge>
                  )}
                  {session.wind_speed !== null && (
                    <Badge variant="outline" className="gap-1">
                      <Wind className="h-3 w-3" />
                      {session.wind_speed} km/h
                    </Badge>
                  )}
                </div>
              )}

              {/* Métriques WHOOP */}
              {session.health_metric && (
                <div className="border-t pt-4">
                  <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                    <Activity className="h-4 w-4" />
                    Métriques WHOOP
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {session.health_metric.recovery_score !== null && (
                      <div>
                        <div className="text-xs text-muted-foreground">Récupération</div>
                        <div className="text-lg font-semibold">
                          {session.health_metric.recovery_score}%
                        </div>
                      </div>
                    )}
                    {session.health_metric.sleep_duration_hours !== null && (
                      <div>
                        <div className="text-xs text-muted-foreground">Sommeil</div>
                        <div className="text-lg font-semibold">
                          {session.health_metric.sleep_duration_hours}h
                        </div>
                      </div>
                    )}
                    {session.health_metric.hrv !== null && (
                      <div>
                        <div className="text-xs text-muted-foreground">HRV</div>
                        <div className="text-lg font-semibold">
                          {session.health_metric.hrv} ms
                        </div>
                      </div>
                    )}
                    {session.health_metric.resting_hr !== null && (
                      <div>
                        <div className="text-xs text-muted-foreground">FC repos</div>
                        <div className="text-lg font-semibold">
                          {session.health_metric.resting_hr} bpm
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Flèches */}
              {arrows.length > 0 && (
                <div className="border-t pt-4">
                  <h4 className="text-sm font-medium mb-3">Flèches ({arrows.length})</h4>
                  <div className="grid grid-cols-6 sm:grid-cols-10 gap-2">
                    {arrows.map((arrow) => (
                      <div
                        key={arrow.id}
                        className={cn(
                          "aspect-square rounded-lg flex items-center justify-center text-sm font-semibold",
                          arrow.score === 10 ? "bg-accent text-accent-foreground" :
                          arrow.score >= 9 ? "bg-primary text-primary-foreground" :
                          arrow.score >= 7 ? "bg-primary/70 text-primary-foreground" :
                          "bg-muted text-muted-foreground"
                        )}
                      >
                        {arrow.score === 11 ? "X" : arrow.score}
                      </div>
                    ))}
                  </div>
                  <div className="mt-2 text-xs text-muted-foreground">
                    Score total : {arrows.reduce((sum, a) => sum + (a.score || 0), 0)}
                  </div>
                </div>
              )}

              {/* Matches */}
              {session.matches.length > 0 && session.matches[0].opponent_name && (
                <div className="border-t pt-4">
                  <h4 className="text-sm font-medium mb-2">Match</h4>
                  {session.matches.map((match) => (
                    <div key={match.id} className="flex items-center justify-between p-3 rounded-lg bg-muted">
                      <div>
                        <div className="font-medium">vs {match.opponent_name}</div>
                        <div className="text-sm text-muted-foreground">
                          {match.arrows_per_end} flèches/volée
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold">
                          {match.score} - {match.opponent_score}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Notes */}
              {session.notes && (
                <div className="border-t pt-4">
                  <h4 className="text-sm font-medium mb-2">Notes</h4>
                  <p className="text-sm text-muted-foreground">{session.notes}</p>
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}