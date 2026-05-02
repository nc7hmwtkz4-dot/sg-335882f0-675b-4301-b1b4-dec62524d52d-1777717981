import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type ArcherySession = Database["public"]["Tables"]["archery_sessions"]["Insert"];
type Match = Database["public"]["Tables"]["matches"]["Insert"];
type Arrow = Database["public"]["Tables"]["arrows"]["Insert"];
type HealthMetric = Database["public"]["Tables"]["health_metrics"]["Insert"];

export interface ImportResult {
  success: boolean;
  recordsProcessed: number;
  recordsInserted: number;
  errors: string[];
}

// Parser pour les sessions de tir à l'arc
export async function importArcherySessions(
  csvContent: string,
  userId: string
): Promise<ImportResult> {
  const result: ImportResult = {
    success: true,
    recordsProcessed: 0,
    recordsInserted: 0,
    errors: [],
  };

  try {
    const lines = csvContent.split("\n").filter((line) => line.trim());
    const headers = lines[0].split(",").map((h) => h.trim());
    
    // Skip header row
    for (let i = 1; i < lines.length; i++) {
      result.recordsProcessed++;
      
      try {
        const values = parseCSVLine(lines[i]);
        const row: Record<string, string> = {};
        headers.forEach((header, index) => {
          row[header] = values[index] || "";
        });

        // Créer la session
        const sessionData: ArcherySession = {
          user_id: userId,
          session_date: new Date(row["date"] || row["Date"]).toISOString(),
          bow_type: row["bow_type"] || row["type_arc"] || "recurve",
          distance: parseInt(row["distance"] || "70"),
          weather: row["weather"] || row["meteo"],
          temperature: row["temperature"] ? parseFloat(row["temperature"]) : null,
          wind_speed: row["wind_speed"] || row["vent"] ? parseFloat(row["wind_speed"] || row["vent"]) : null,
          feeling: row["feeling"] || row["sensations"],
          notes: row["notes"] || row["remarques"],
        };

        const { data: session, error: sessionError } = await supabase
          .from("archery_sessions")
          .insert(sessionData)
          .select()
          .single();

        if (sessionError) {
          result.errors.push(`Ligne ${i + 1}: ${sessionError.message}`);
          continue;
        }

        // Si des scores sont présents, créer un match
        if (row["score"] || row["total_score"]) {
          const matchData: Match = {
            session_id: session.id,
            match_number: 1,
            total_score: parseInt(row["score"] || row["total_score"] || "0"),
            arrows_count: parseInt(row["arrows"] || row["fleches"] || "72"),
          };

          await supabase.from("matches").insert(matchData);
        }

        result.recordsInserted++;
      } catch (error) {
        result.errors.push(
          `Ligne ${i + 1}: ${error instanceof Error ? error.message : "Erreur inconnue"}`
        );
      }
    }

    result.success = result.errors.length === 0;
  } catch (error) {
    result.success = false;
    result.errors.push(
      `Erreur globale: ${error instanceof Error ? error.message : "Erreur inconnue"}`
    );
  }

  return result;
}

// Parser pour les données WHOOP
export async function importHealthMetrics(
  csvContent: string,
  userId: string
): Promise<ImportResult> {
  const result: ImportResult = {
    success: true,
    recordsProcessed: 0,
    recordsInserted: 0,
    errors: [],
  };

  try {
    const lines = csvContent.split("\n").filter((line) => line.trim());
    const headers = lines[0].split(",").map((h) => h.trim());
    
    for (let i = 1; i < lines.length; i++) {
      result.recordsProcessed++;
      
      try {
        const values = parseCSVLine(lines[i]);
        const row: Record<string, string> = {};
        headers.forEach((header, index) => {
          row[header] = values[index] || "";
        });

        const metricData: HealthMetric = {
          user_id: userId,
          recorded_at: new Date(row["date"] || row["Date"] || row["Cycle start time"]).toISOString(),
          sleep_hours: row["sleep_hours"] || row["Sleep duration"] ? parseFloat(row["sleep_hours"] || row["Sleep duration"]) : null,
          sleep_quality: row["sleep_quality"] || row["Sleep quality"] ? parseFloat(row["sleep_quality"] || row["Sleep quality"]) : null,
          resting_heart_rate: row["resting_hr"] || row["Resting heart rate"] ? parseInt(row["resting_hr"] || row["Resting heart rate"]) : null,
          heart_rate_variability: row["hrv"] || row["HRV"] ? parseFloat(row["hrv"] || row["HRV"]) : null,
          recovery_score: row["recovery"] || row["Recovery score"] ? parseFloat(row["recovery"] || row["Recovery score"]) : null,
          respiratory_rate: row["respiratory_rate"] || row["Respiratory rate"] ? parseFloat(row["respiratory_rate"] || row["Respiratory rate"]) : null,
          skin_temp: row["skin_temp"] || row["Skin temp"] ? parseFloat(row["skin_temp"] || row["Skin temp"]) : null,
          spo2: row["spo2"] || row["SpO2"] ? parseFloat(row["spo2"] || row["SpO2"]) : null,
        };

        const { error } = await supabase
          .from("health_metrics")
          .insert(metricData);

        if (error) {
          result.errors.push(`Ligne ${i + 1}: ${error.message}`);
          continue;
        }

        result.recordsInserted++;
      } catch (error) {
        result.errors.push(
          `Ligne ${i + 1}: ${error instanceof Error ? error.message : "Erreur inconnue"}`
        );
      }
    }

    result.success = result.errors.length === 0;
  } catch (error) {
    result.success = false;
    result.errors.push(
      `Erreur globale: ${error instanceof Error ? error.message : "Erreur inconnue"}`
    );
  }

  return result;
}

// Helper pour parser une ligne CSV (gère les virgules entre guillemets)
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