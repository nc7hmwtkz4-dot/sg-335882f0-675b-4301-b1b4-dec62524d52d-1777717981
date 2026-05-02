-- Ajouter le champ role à la table profiles
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS role text DEFAULT 'viewer' CHECK (role IN ('super_admin', 'coach'));

-- Mettre à jour les politiques RLS pour tenir compte des rôles
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;

-- Nouvelle politique : tout le monde peut voir les profils
CREATE POLICY "Anyone can view profiles"
  ON profiles FOR SELECT
  USING (true);

-- Nouvelle politique : les utilisateurs peuvent créer leur propre profil
CREATE POLICY "Users can create own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Nouvelle politique : les utilisateurs peuvent mettre à jour leur propre profil
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Créer une table pour les sessions d'entraînement
CREATE TABLE IF NOT EXISTS training_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  session_date date NOT NULL,
  session_type text NOT NULL CHECK (session_type IN ('training', 'competition', 'test')),
  score integer,
  notes text,
  csv_data jsonb,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- RLS pour training_sessions : seul le propriétaire et les super_admin peuvent voir/modifier
ALTER TABLE training_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own sessions or if super_admin"
  ON training_sessions FOR SELECT
  USING (
    auth.uid() = user_id 
    OR EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'super_admin'
    )
  );

CREATE POLICY "Users can insert own sessions"
  ON training_sessions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own sessions"
  ON training_sessions FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own sessions"
  ON training_sessions FOR DELETE
  USING (auth.uid() = user_id);

-- Créer une table pour les métriques de santé (WHOOP)
CREATE TABLE IF NOT EXISTS health_metrics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  metric_date date NOT NULL,
  recovery_score integer,
  hrv integer,
  resting_hr integer,
  sleep_performance integer,
  strain_score numeric(4,2),
  csv_data jsonb,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- RLS pour health_metrics : même logique que training_sessions
ALTER TABLE health_metrics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own metrics or if super_admin"
  ON health_metrics FOR SELECT
  USING (
    auth.uid() = user_id 
    OR EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'super_admin'
    )
  );

CREATE POLICY "Users can insert own metrics"
  ON health_metrics FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own metrics"
  ON health_metrics FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own metrics"
  ON health_metrics FOR DELETE
  USING (auth.uid() = user_id);

-- Créer une table pour les accès partagés (pour l'entraîneur)
CREATE TABLE IF NOT EXISTS shared_access (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  viewer_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  access_type text NOT NULL DEFAULT 'read_only' CHECK (access_type IN ('read_only', 'read_write')),
  created_at timestamp with time zone DEFAULT now(),
  UNIQUE(owner_id, viewer_id)
);

-- RLS pour shared_access
ALTER TABLE shared_access ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own shared access"
  ON shared_access FOR SELECT
  USING (auth.uid() = owner_id OR auth.uid() = viewer_id);

CREATE POLICY "Owners can manage shared access"
  ON shared_access FOR ALL
  USING (auth.uid() = owner_id);