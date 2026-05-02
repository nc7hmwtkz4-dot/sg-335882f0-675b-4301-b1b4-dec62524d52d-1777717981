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
 * Parse les flèches au format "score:x:y" ou "score"
 * Note: x et y sont ignorés car le schéma utilise horizontal_position/vertical_position
 */
function parseArrows(arrowsString: string): Array<{ score: number }> {
  if (!arrowsString || arrowsString === "[object Object]") return [];
  
  const arrows = arrowsString.split(",");
  return arrows.map((arrow) => {
    const parts = arrow.trim().split(":");
    const score = parseInt(parts[0]) || 0;
    return { score };
  }).filter((arrow) => arrow.score >= 0 && arrow.score <= 10);
}

/**
 * Convertit une valeur vide ou "[object Object]" en null
 */
function safeValue(value: string | undefined): string | null {
  if (!value || value === "" || value === "[object Object]") return null;
  return value;
}

/**
 * Convertit en nombre ou retourne null si invalide
 */
function safeNumber(value: string | undefined): number | null {
  if (!value || value === "" || value === "[object Object]") return null;
  const num = parseFloat(value);
  return isNaN(num) ? null : num;
}

/**
 * Convertit en entier ou retourne null si invalide
 */
function safeInt(value: string | undefined): number | null {
  if (!value || value === "" || value === "[object Object]") return null;
  const num = parseInt(value);
  return isNaN(num) ? null : num;
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

    console.log(`Import de ${rows.length} lignes pour l'utilisateur ${user.id}`);

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];

      try {
        // Détecter le type de fichier et parser en conséquence
        if (row["arrows"] && row["date"]) {
          // Format: date,id,idTraining,title,arrows
          console.log(`Ligne ${i + 2}: Format avec flèches détaillées`);
          await importTrainingSession(row, user.id);
        } else if (row["player1Name"]) {
          // Format: match avec joueurs
          console.log(`Ligne ${i + 2}: Format match`);
          await importMatchSession(row, user.id);
        } else if (row["trainingDate"] && row["total"]) {
          // Format: training avec statistiques (le nouveau format)
          console.log(`Ligne ${i + 2}: Format statistiques agrégées (trainingDate + total)`);
          await importTrainingStatsSession(row, user.id);
        } else if (row["average"]) {
          // Format: training simple
          console.log(`Ligne ${i + 2}: Format training simple`);
          await importSimpleTrainingSession(row, user.id);
        } else {
          console.warn(`Ligne ${i + 2}: Format non reconnu, colonnes:`, Object.keys(row));
          throw new Error("Format de CSV non reconnu");
        }

        result.recordsInserted++;
      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : "Erreur inconnue";
        result.errors.push(`Ligne ${i + 2}: ${errorMsg}`);
        console.error(`Erreur ligne ${i + 2}:`, error, "Row:", row);
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
    session_date: sessionDate.toISOString().split("T")[0],
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
    session_date: new Date(row["date"]).toISOString().split("T")[0],
    session_type: row["phase"] ? "competition" : "training",
    bow_type: row["weapon"] === "1" ? "recurve" : row["weapon"] === "3" ? "compound" : "recurve",
    distance: safeInt(row["distance"]) || 70,
    weather_conditions: safeValue(row["weather"]),
    wind_speed: safeInt(row["wind"]),
    notes: safeValue(row["title"]),
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
      score: safeInt(row["player1Score"]) || 0,
      arrows_per_end: 3,
      opponent_name: safeValue(row["player2Name"]),
      opponent_score: safeInt(row["player2Score"]),
    };

    await supabase.from("matches").insert(matchData);
  }
}

async function importTrainingStatsSession(row: Record<string, string>, userId: string) {
  const dateStr = row["trainingDate"];
  if (!dateStr) {
    throw new Error("Date manquante (trainingDate)");
  }

  const sessionDate = new Date(dateStr);
  if (isNaN(sessionDate.getTime())) {
    throw new Error(`Date invalide: ${dateStr}`);
  }

  const sessionData: ArcherySession = {
    user_id: userId,
    session_date: sessionDate.toISOString().split("T")[0],
    session_type: row["isCompetition"] === "1" ? "competition" : "training",
    bow_type: row["weapon"] === "1" ? "recurve" : row["weapon"] === "3" ? "compound" : "recurve",
    distance: safeInt(row["distance"]) || 70,
    weather_conditions: safeValue(row["weather"]),
    wind_speed: safeInt(row["wind"]),
    temperature: safeNumber(row["temperature"]),
    notes: null,
  };

  console.log("Création session statistiques:", sessionData);

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

  // Créer un match avec le score total
  if (row["total"]) {
    const matchData: Match = {
      session_id: session.id,
      match_number: 1,
      score: safeInt(row["total"]) || 0,
      arrows_per_end: safeInt(row["arrows"]) || 3,
    };

    console.log("Création match:", matchData);

    const { error: matchError } = await supabase.from("matches").insert(matchData);
    
    if (matchError) {
      console.error("Erreur création match:", matchError);
      throw matchError;
    }

    console.log("Match créé avec succès");
  }
}

async function importSimpleTrainingSession(row: Record<string, string>, userId: string) {
  const sessionData: ArcherySession = {
    user_id: userId,
    session_date: new Date(row["date"]).toISOString().split("T")[0],
    session_type: "training",
    bow_type: row["bowUsed"] === "1" ? "recurve" : row["bowUsed"] === "3" ? "compound" : "recurve",
    distance: safeInt(row["distance"]) || 70,
    weather_conditions: safeValue(row["weather"]),
    wind_speed: safeInt(row["wind"]),
    temperature: safeNumber(row["temperature"]),
    notes: safeValue(row["title"]),
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
      score: safeInt(row["total"]) || 0,
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
          metric_date: new Date(row["Cycle start time"] || row["date"] || row["Date"]).toISOString().split("T")[0],
          sleep_duration_hours: safeNumber(row["Sleep duration (hr)"] || row["Sleep duration"]),
          sleep_quality_score: safeNumber(row["Sleep performance %"] || row["Sleep quality"]),
          resting_hr: safeInt(row["Resting heart rate (bpm)"] || row["Resting heart rate"]),
          hrv: safeNumber(row["Heart rate variability (ms)"] || row["HRV"]),
          recovery_score: safeNumber(row["Recovery score %"] || row["Recovery score"]),
          respiratory_rate: safeNumber(row["Respiratory rate (rpm)"] || row["Respiratory rate"]),
          skin_temperature: safeNumber(row["Skin temp (celsius)"] || row["Skin temp"]),
          blood_oxygen: safeNumber(row["SpO2 %"] || row["SpO2"]),
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