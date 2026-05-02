import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type ArcherySession = Database["public"]["Tables"]["archery_sessions"]["Insert"];
type Match = Database["public"]["Tables"]["matches"]["Insert"];
type Arrow = Database["public"]["Tables"]["arrows"]["Insert"];
type HealthMetric = Database["public"]["Tables"]["health_metrics"]["Insert"];

export interface ImportResult {
  success: boolean;
  recordsInserted: number;
  errors: string[];
  totalRows: number;
}

/**
 * Parse un fichier CSV en tableau d'objets
 */
function parseCSV(csvText: string): Record<string, string>[] {
  const lines = csvText.split("\n").filter((line) => line.trim());
  if (lines.length < 2) return [];

  const headers = parseCSVLine(lines[0]);
  const rows: Record<string, string>[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);
    if (values.length === headers.length) {
      const row: Record<string, string> = {};
      headers.forEach((header, index) => {
        row[header.trim()] = values[index].trim();
      });
      rows.push(row);
    }
  }

  return rows;
}

/**
 * Parse une ligne CSV en tenant compte des guillemets
 */
function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === "," && !inQuotes) {
      result.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }

  result.push(current.trim());
  return result;
}

/**
 * Parse les flèches au format "score:x:y"
 */
function parseArrows(arrowsString: string): Array<{ score: number; x?: number; y?: number }> {
  if (!arrowsString) return [];
  
  const arrows = arrowsString.split(",");
  return arrows.map((arrow) => {
    const parts = arrow.trim().split(":");
    const score = parseInt(parts[0]) || 0;
    const x = parts[1] ? parseFloat(parts[1]) : undefined;
    const y = parts[2] ? parseFloat(parts[2]) : undefined;
    
    return { score, x, y };
  });
}

/**
 * Import des sessions de tir à l'arc depuis CSV
 */
export async function importArcherySessions(file: File): Promise<ImportResult> {
  const result: ImportResult = {
    success: true,
    recordsInserted: 0,
    errors: [],
    totalRows: 0,
  };

  try {
    const text = await file.text();
    const rows = parseCSV(text);
    result.totalRows = rows.length;

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Non authentifié");

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];

      try {
        // Détecter le type de fichier et parser en conséquence
        if (row["arrows"]) {
          // Format: date,id,idTraining,title,arrows
          await importTrainingSession(row, user.id);
        } else if (row["player1Name"]) {
          // Format: match avec joueurs
          await importMatchSession(row, user.id);
        } else if (row["total"] && row["grouping"]) {
          // Format: training avec statistiques
          await importTrainingStatsSession(row, user.id);
        } else if (row["average"]) {
          // Format: training simple
          await importSimpleTrainingSession(row, user.id);
        }

        result.recordsInserted++;
      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : "Erreur inconnue";
        result.errors.push(`Ligne ${i + 2}: ${errorMsg}`);
        console.error(`Erreur ligne ${i + 2}:`, error);
      }
    }

    if (result.errors.length > 0) {
      result.success = false;
    }
  } catch (error) {
    result.success = false;
    result.errors.push(error instanceof Error ? error.message : "Erreur lors de la lecture du fichier");
    console.error("Erreur globale:", error);
  }

  return result;
}

async function importTrainingSession(row: Record<string, string>, userId: string) {
  // Vérifier que la date est valide
  const dateStr = row["date"];
  if (!dateStr) {
    throw new Error("Date manquante");
  }

  const sessionDate = new Date(dateStr);
  if (isNaN(sessionDate.getTime())) {
    throw new Error(`Date invalide: ${dateStr}`);
  }

  const sessionData: ArcherySession = {
    user_id: userId,
    session_date: sessionDate.toISOString(),
    session_type: "training",
    bow_type: "recurve",
    distance: 70,
    notes: row["title"] || null,
  };

  console.log("Création session:", sessionData);

  const { data: session, error: sessionError } = await supabase
    .from("archery_sessions")
    .insert(sessionData)
    .select()
    .single();

  if (sessionError) {
    console.error("Erreur création session:", sessionError);
    throw sessionError;
  }

  console.log("Session créée:", session);

  // Parser et insérer les flèches
  const arrows = parseArrows(row["arrows"]);
  if (arrows.length > 0) {
    const arrowsData: Arrow[] = arrows.map((arrow, index) => ({
      session_id: session.id,
      arrow_number: index + 1,
      score: arrow.score,
      x_coordinate: arrow.x || null,
      y_coordinate: arrow.y || null,
    }));

    console.log(`Insertion de ${arrowsData.length} flèches`);

    const { error: arrowsError } = await supabase
      .from("arrows")
      .insert(arrowsData);

    if (arrowsError) {
      console.error("Erreur insertion flèches:", arrowsError);
      throw arrowsError;
    }

    console.log(`${arrowsData.length} flèches insérées`);
  }
}

async function importMatchSession(row: Record<string, string>, userId: string) {
  const sessionData: ArcherySession = {
    user_id: userId,
    session_date: new Date(row["date"]).toISOString(),
    session_type: row["phase"] ? "competition" : "training",
    bow_type: row["weapon"] === "1" ? "recurve" : row["weapon"] === "3" ? "compound" : "recurve",
    distance: parseInt(row["distance"]) || 70,
    weather_conditions: row["weather"],
    wind_speed: row["wind"] ? parseInt(row["wind"]) : null,
    notes: row["title"] || null,
  };

  const { data: session, error: sessionError } = await supabase
    .from("archery_sessions")
    .insert(sessionData)
    .select()
    .single();

  if (sessionError) throw sessionError;

  // Créer un match si les scores sont présents
  if (row["player1Score"]) {
    const matchData: Match = {
      session_id: session.id,
      match_number: 1,
      score: parseInt(row["player1Score"]) || 0,
      arrows_per_end: 3,
      opponent_name: row["player2Name"] || null,
      opponent_score: row["player2Score"] ? parseInt(row["player2Score"]) : null,
    };

    await supabase.from("matches").insert(matchData);
  }
}

async function importTrainingStatsSession(row: Record<string, string>, userId: string) {
  const sessionData: ArcherySession = {
    user_id: userId,
    session_date: new Date(row["trainingDate"]).toISOString(),
    session_type: row["isCompetition"] === "1" ? "competition" : "training",
    bow_type: row["weapon"] === "1" ? "recurve" : row["weapon"] === "3" ? "compound" : "recurve",
    distance: parseInt(row["distance"]) || 70,
    weather_conditions: row["weather"],
    wind_speed: row["wind"] ? parseInt(row["wind"]) : null,
    temperature: row["temperature"] ? parseFloat(row["temperature"]) : null,
  };

  const { data: session, error: sessionError } = await supabase
    .from("archery_sessions")
    .insert(sessionData)
    .select()
    .single();

  if (sessionError) throw sessionError;

  // Créer un match avec le score total
  if (row["total"]) {
    const matchData: Match = {
      session_id: session.id,
      match_number: 1,
      score: parseInt(row["total"]) || 0,
      arrows_per_end: parseInt(row["arrows"]) || 3,
    };

    await supabase.from("matches").insert(matchData);
  }
}

async function importSimpleTrainingSession(row: Record<string, string>, userId: string) {
  const sessionData: ArcherySession = {
    user_id: userId,
    session_date: new Date(row["date"]).toISOString(),
    session_type: "training",
    bow_type: row["bowUsed"] === "1" ? "recurve" : row["bowUsed"] === "3" ? "compound" : "recurve",
    distance: parseInt(row["distance"]) || 70,
    weather_conditions: row["weather"],
    wind_speed: row["wind"] ? parseInt(row["wind"]) : null,
    temperature: row["temperature"] ? parseFloat(row["temperature"]) : null,
    notes: row["title"] || null,
  };

  const { data: session, error: sessionError } = await supabase
    .from("archery_sessions")
    .insert(sessionData)
    .select()
    .single();

  if (sessionError) throw sessionError;

  // Créer un match avec le score total
  if (row["total"]) {
    const matchData: Match = {
      session_id: session.id,
      match_number: 1,
      score: parseInt(row["total"]) || 0,
      arrows_per_end: 3,
    };

    await supabase.from("matches").insert(matchData);
  }
}

/**
 * Import des données de santé WHOOP depuis CSV
 */
export async function importHealthMetrics(file: File): Promise<ImportResult> {
  const result: ImportResult = {
    success: true,
    recordsInserted: 0,
    errors: [],
    totalRows: 0,
  };

  try {
    const text = await file.text();
    const rows = parseCSV(text);
    result.totalRows = rows.length;

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Non authentifié");

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];

      try {
        const metricData: HealthMetric = {
          user_id: user.id,
          metric_date: new Date(row["Cycle start time"] || row["date"] || row["Date"]).toISOString(),
          sleep_duration_hours: row["Sleep duration (hr)"] || row["Sleep duration"] ? parseFloat(row["Sleep duration (hr)"] || row["Sleep duration"]) : null,
          sleep_quality_score: row["Sleep performance %"] || row["Sleep quality"] ? parseFloat(row["Sleep performance %"] || row["Sleep quality"]) : null,
          resting_hr: row["Resting heart rate (bpm)"] || row["Resting heart rate"] ? parseInt(row["Resting heart rate (bpm)"] || row["Resting heart rate"]) : null,
          hrv: row["Heart rate variability (ms)"] || row["HRV"] ? parseFloat(row["Heart rate variability (ms)"] || row["HRV"]) : null,
          recovery_score: row["Recovery score %"] || row["Recovery score"] ? parseFloat(row["Recovery score %"] || row["Recovery score"]) : null,
          respiratory_rate: row["Respiratory rate (rpm)"] || row["Respiratory rate"] ? parseFloat(row["Respiratory rate (rpm)"] || row["Respiratory rate"]) : null,
          skin_temperature: row["Skin temp (celsius)"] || row["Skin temp"] ? parseFloat(row["Skin temp (celsius)"] || row["Skin temp"]) : null,
          blood_oxygen: row["SpO2 %"] || row["SpO2"] ? parseFloat(row["SpO2 %"] || row["SpO2"]) : null,
        };

        const { error } = await supabase
          .from("health_metrics")
          .insert(metricData);

        if (error) throw error;

        result.recordsInserted++;
      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : "Erreur inconnue";
        result.errors.push(`Ligne ${i + 2}: ${errorMsg}`);
      }
    }

    if (result.errors.length > 0) {
      result.success = false;
    }
  } catch (error) {
    result.success = false;
    result.errors.push(error instanceof Error ? error.message : "Erreur lors de la lecture du fichier");
  }

  return result;
}