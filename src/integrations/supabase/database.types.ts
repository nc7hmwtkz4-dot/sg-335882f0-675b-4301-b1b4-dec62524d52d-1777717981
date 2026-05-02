 
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      archery_sessions: {
        Row: {
          bow_type: string
          created_at: string | null
          csv_data: Json | null
          distance: number | null
          energy_level: number | null
          feelings: string | null
          focus_level: number | null
          id: string
          notes: string | null
          session_date: string
          session_type: string
          target_size: number | null
          temperature: number | null
          total_arrows: number | null
          total_score: number | null
          updated_at: string | null
          user_id: string
          weather_conditions: string | null
          wind_speed: number | null
        }
        Insert: {
          bow_type: string
          created_at?: string | null
          csv_data?: Json | null
          distance?: number | null
          energy_level?: number | null
          feelings?: string | null
          focus_level?: number | null
          id?: string
          notes?: string | null
          session_date: string
          session_type: string
          target_size?: number | null
          temperature?: number | null
          total_arrows?: number | null
          total_score?: number | null
          updated_at?: string | null
          user_id: string
          weather_conditions?: string | null
          wind_speed?: number | null
        }
        Update: {
          bow_type?: string
          created_at?: string | null
          csv_data?: Json | null
          distance?: number | null
          energy_level?: number | null
          feelings?: string | null
          focus_level?: number | null
          id?: string
          notes?: string | null
          session_date?: string
          session_type?: string
          target_size?: number | null
          temperature?: number | null
          total_arrows?: number | null
          total_score?: number | null
          updated_at?: string | null
          user_id?: string
          weather_conditions?: string | null
          wind_speed?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "archery_sessions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      arrows: {
        Row: {
          arrow_number: number
          horizontal_position: string | null
          id: string
          is_x: boolean | null
          match_id: string | null
          notes: string | null
          score: number
          session_id: string
          timestamp: string | null
          vertical_position: string | null
        }
        Insert: {
          arrow_number: number
          horizontal_position?: string | null
          id?: string
          is_x?: boolean | null
          match_id?: string | null
          notes?: string | null
          score: number
          session_id: string
          timestamp?: string | null
          vertical_position?: string | null
        }
        Update: {
          arrow_number?: number
          horizontal_position?: string | null
          id?: string
          is_x?: boolean | null
          match_id?: string | null
          notes?: string | null
          score?: number
          session_id?: string
          timestamp?: string | null
          vertical_position?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "arrows_match_id_fkey"
            columns: ["match_id"]
            isOneToOne: false
            referencedRelation: "matches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "arrows_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "archery_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      health_metrics: {
        Row: {
          blood_oxygen: number | null
          created_at: string | null
          csv_data: Json | null
          hrv: number | null
          id: string
          metric_date: string
          recovery_score: number | null
          respiratory_rate: number | null
          resting_hr: number | null
          skin_temperature: number | null
          sleep_duration_hours: number | null
          sleep_performance: number | null
          sleep_quality_score: number | null
          strain_score: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          blood_oxygen?: number | null
          created_at?: string | null
          csv_data?: Json | null
          hrv?: number | null
          id?: string
          metric_date: string
          recovery_score?: number | null
          respiratory_rate?: number | null
          resting_hr?: number | null
          skin_temperature?: number | null
          sleep_duration_hours?: number | null
          sleep_performance?: number | null
          sleep_quality_score?: number | null
          strain_score?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          blood_oxygen?: number | null
          created_at?: string | null
          csv_data?: Json | null
          hrv?: number | null
          id?: string
          metric_date?: string
          recovery_score?: number | null
          respiratory_rate?: number | null
          resting_hr?: number | null
          skin_temperature?: number | null
          sleep_duration_hours?: number | null
          sleep_performance?: number | null
          sleep_quality_score?: number | null
          strain_score?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "health_metrics_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      matches: {
        Row: {
          arrows_per_end: number | null
          created_at: string | null
          id: string
          match_number: number
          max_score: number | null
          notes: string | null
          score: number | null
          session_id: string
        }
        Insert: {
          arrows_per_end?: number | null
          created_at?: string | null
          id?: string
          match_number: number
          max_score?: number | null
          notes?: string | null
          score?: number | null
          session_id: string
        }
        Update: {
          arrows_per_end?: number | null
          created_at?: string | null
          id?: string
          match_number?: number
          max_score?: number | null
          notes?: string | null
          score?: number | null
          session_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "matches_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "archery_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string
          role: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          role?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          role?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      shared_access: {
        Row: {
          access_type: string
          created_at: string | null
          id: string
          owner_id: string
          viewer_id: string
        }
        Insert: {
          access_type?: string
          created_at?: string | null
          id?: string
          owner_id: string
          viewer_id: string
        }
        Update: {
          access_type?: string
          created_at?: string | null
          id?: string
          owner_id?: string
          viewer_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "shared_access_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shared_access_viewer_id_fkey"
            columns: ["viewer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      situations: {
        Row: {
          arrows_count: number | null
          created_at: string | null
          description: string | null
          id: string
          notes: string | null
          score: number | null
          session_id: string
          situation_type: string
          success_rate: number | null
        }
        Insert: {
          arrows_count?: number | null
          created_at?: string | null
          description?: string | null
          id?: string
          notes?: string | null
          score?: number | null
          session_id: string
          situation_type: string
          success_rate?: number | null
        }
        Update: {
          arrows_count?: number | null
          created_at?: string | null
          description?: string | null
          id?: string
          notes?: string | null
          score?: number | null
          session_id?: string
          situation_type?: string
          success_rate?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "situations_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "archery_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      training_sessions: {
        Row: {
          created_at: string | null
          csv_data: Json | null
          id: string
          notes: string | null
          score: number | null
          session_date: string
          session_type: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          csv_data?: Json | null
          id?: string
          notes?: string | null
          score?: number | null
          session_date: string
          session_type: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          csv_data?: Json | null
          id?: string
          notes?: string | null
          score?: number | null
          session_date?: string
          session_type?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "training_sessions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
