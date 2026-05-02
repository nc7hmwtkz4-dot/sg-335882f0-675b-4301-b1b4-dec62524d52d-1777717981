-- ============================================
-- ARCHERY SESSIONS - Table principale
-- ============================================
CREATE TABLE IF NOT EXISTS archery_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  session_date DATE NOT NULL,
  session_type TEXT NOT NULL CHECK (session_type IN ('training', 'competition', 'test')),
  bow_type TEXT NOT NULL CHECK (bow_type IN ('recurve', 'compound', 'barebow', 'longbow')),
  distance INTEGER, -- distance en mètres
  target_size INTEGER, -- taille de la cible en cm
  weather_conditions TEXT, -- ensoleillé, nuageux, pluie, vent
  wind_speed INTEGER, -- vitesse du vent en km/h
  temperature NUMERIC(4,1), -- température en °C
  feelings TEXT, -- sensations subjectives (confiant, fatigué, concentré, etc.)
  energy_level INTEGER CHECK (energy_level BETWEEN 1 AND 10),
  focus_level INTEGER CHECK (focus_level BETWEEN 1 AND 10),
  total_score INTEGER,
  total_arrows INTEGER,
  notes TEXT,
  csv_data JSONB, -- données brutes du CSV
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index pour performances
CREATE INDEX idx_archery_sessions_user_date ON archery_sessions(user_id, session_date DESC);
CREATE INDEX idx_archery_sessions_type ON archery_sessions(session_type);

-- ============================================
-- MATCHES - Matchs/Ends dans une session
-- ============================================
CREATE TABLE IF NOT EXISTS matches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL REFERENCES archery_sessions(id) ON DELETE CASCADE,
  match_number INTEGER NOT NULL, -- numéro du match/end
  arrows_per_end INTEGER DEFAULT 3, -- nombre de flèches par volée
  score INTEGER,
  max_score INTEGER,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index pour performances
CREATE INDEX idx_matches_session ON matches(session_id, match_number);

-- ============================================
-- SITUATIONS - Situations de tir spécifiques
-- ============================================
CREATE TABLE IF NOT EXISTS situations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL REFERENCES archery_sessions(id) ON DELETE CASCADE,
  situation_type TEXT NOT NULL, -- ex: "pressure", "fatigue", "wind", "final_end"
  description TEXT,
  score INTEGER,
  arrows_count INTEGER,
  success_rate NUMERIC(5,2), -- pourcentage de réussite
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index pour performances
CREATE INDEX idx_situations_session ON situations(session_id);
CREATE INDEX idx_situations_type ON situations(situation_type);

-- ============================================
-- ARROWS - Flèches comptées individuellement
-- ============================================
CREATE TABLE IF NOT EXISTS arrows (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL REFERENCES archery_sessions(id) ON DELETE CASCADE,
  match_id UUID REFERENCES matches(id) ON DELETE CASCADE, -- optionnel si flèche dans un match
  arrow_number INTEGER NOT NULL, -- numéro de la flèche dans la session
  score INTEGER NOT NULL CHECK (score >= 0 AND score <= 10),
  is_x BOOLEAN DEFAULT FALSE, -- pour le 10 au centre (X)
  horizontal_position TEXT CHECK (horizontal_position IN ('left', 'center', 'right')),
  vertical_position TEXT CHECK (vertical_position IN ('high', 'center', 'low')),
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  notes TEXT
);

-- Index pour performances
CREATE INDEX idx_arrows_session ON arrows(session_id, arrow_number);
CREATE INDEX idx_arrows_match ON arrows(match_id);
CREATE INDEX idx_arrows_score ON arrows(score);

-- ============================================
-- HEALTH METRICS - Amélioration pour WHOOP
-- ============================================
-- Ajout de colonnes supplémentaires pour WHOOP si elles n'existent pas
DO $$ 
BEGIN
  -- Ajout de nouvelles colonnes pour WHOOP
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'health_metrics' AND column_name = 'sleep_duration_hours') THEN
    ALTER TABLE health_metrics ADD COLUMN sleep_duration_hours NUMERIC(4,2);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'health_metrics' AND column_name = 'sleep_quality_score') THEN
    ALTER TABLE health_metrics ADD COLUMN sleep_quality_score INTEGER CHECK (sleep_quality_score BETWEEN 0 AND 100);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'health_metrics' AND column_name = 'respiratory_rate') THEN
    ALTER TABLE health_metrics ADD COLUMN respiratory_rate NUMERIC(4,2);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'health_metrics' AND column_name = 'skin_temperature') THEN
    ALTER TABLE health_metrics ADD COLUMN skin_temperature NUMERIC(4,2);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'health_metrics' AND column_name = 'blood_oxygen') THEN
    ALTER TABLE health_metrics ADD COLUMN blood_oxygen NUMERIC(5,2);
  END IF;
END $$;

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Activation RLS sur toutes les nouvelles tables
ALTER TABLE archery_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE situations ENABLE ROW LEVEL SECURITY;
ALTER TABLE arrows ENABLE ROW LEVEL SECURITY;

-- ============================================
-- POLICIES pour ARCHERY_SESSIONS
-- ============================================

-- Les utilisateurs peuvent voir leurs propres sessions
CREATE POLICY "Users can view own archery sessions"
  ON archery_sessions FOR SELECT
  USING (
    auth.uid() = user_id 
    OR 
    -- Super admin peut tout voir
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'super_admin'
    )
    OR
    -- Coach avec accès partagé peut voir (lecture seule)
    EXISTS (
      SELECT 1 FROM shared_access sa
      JOIN profiles p ON p.id = sa.viewer_id
      WHERE sa.owner_id = archery_sessions.user_id
      AND sa.viewer_id = auth.uid()
      AND p.role = 'coach'
    )
  );

-- Les utilisateurs peuvent créer leurs propres sessions
CREATE POLICY "Users can insert own archery sessions"
  ON archery_sessions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Les utilisateurs peuvent modifier leurs propres sessions
-- Les coaches ne peuvent PAS modifier (même avec accès partagé)
CREATE POLICY "Users can update own archery sessions"
  ON archery_sessions FOR UPDATE
  USING (
    auth.uid() = user_id
    AND NOT EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'coach'
    )
  );

-- Les utilisateurs peuvent supprimer leurs propres sessions
-- Les coaches ne peuvent PAS supprimer
CREATE POLICY "Users can delete own archery sessions"
  ON archery_sessions FOR DELETE
  USING (
    auth.uid() = user_id
    AND NOT EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'coach'
    )
  );

-- ============================================
-- POLICIES pour MATCHES
-- ============================================

CREATE POLICY "Users can view matches from their sessions"
  ON matches FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM archery_sessions 
      WHERE archery_sessions.id = matches.session_id
      AND (
        archery_sessions.user_id = auth.uid()
        OR EXISTS (
          SELECT 1 FROM profiles 
          WHERE profiles.id = auth.uid() 
          AND profiles.role = 'super_admin'
        )
        OR EXISTS (
          SELECT 1 FROM shared_access sa
          JOIN profiles p ON p.id = sa.viewer_id
          WHERE sa.owner_id = archery_sessions.user_id
          AND sa.viewer_id = auth.uid()
          AND p.role = 'coach'
        )
      )
    )
  );

CREATE POLICY "Users can insert matches in their sessions"
  ON matches FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM archery_sessions 
      WHERE archery_sessions.id = matches.session_id
      AND archery_sessions.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update matches in their sessions"
  ON matches FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM archery_sessions 
      WHERE archery_sessions.id = matches.session_id
      AND archery_sessions.user_id = auth.uid()
    )
    AND NOT EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'coach'
    )
  );

CREATE POLICY "Users can delete matches from their sessions"
  ON matches FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM archery_sessions 
      WHERE archery_sessions.id = matches.session_id
      AND archery_sessions.user_id = auth.uid()
    )
    AND NOT EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'coach'
    )
  );

-- ============================================
-- POLICIES pour SITUATIONS
-- ============================================

CREATE POLICY "Users can view situations from their sessions"
  ON situations FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM archery_sessions 
      WHERE archery_sessions.id = situations.session_id
      AND (
        archery_sessions.user_id = auth.uid()
        OR EXISTS (
          SELECT 1 FROM profiles 
          WHERE profiles.id = auth.uid() 
          AND profiles.role = 'super_admin'
        )
        OR EXISTS (
          SELECT 1 FROM shared_access sa
          JOIN profiles p ON p.id = sa.viewer_id
          WHERE sa.owner_id = archery_sessions.user_id
          AND sa.viewer_id = auth.uid()
          AND p.role = 'coach'
        )
      )
    )
  );

CREATE POLICY "Users can insert situations in their sessions"
  ON situations FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM archery_sessions 
      WHERE archery_sessions.id = situations.session_id
      AND archery_sessions.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update situations in their sessions"
  ON situations FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM archery_sessions 
      WHERE archery_sessions.id = situations.session_id
      AND archery_sessions.user_id = auth.uid()
    )
    AND NOT EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'coach'
    )
  );

CREATE POLICY "Users can delete situations from their sessions"
  ON situations FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM archery_sessions 
      WHERE archery_sessions.id = situations.session_id
      AND archery_sessions.user_id = auth.uid()
    )
    AND NOT EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'coach'
    )
  );

-- ============================================
-- POLICIES pour ARROWS
-- ============================================

CREATE POLICY "Users can view arrows from their sessions"
  ON arrows FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM archery_sessions 
      WHERE archery_sessions.id = arrows.session_id
      AND (
        archery_sessions.user_id = auth.uid()
        OR EXISTS (
          SELECT 1 FROM profiles 
          WHERE profiles.id = auth.uid() 
          AND profiles.role = 'super_admin'
        )
        OR EXISTS (
          SELECT 1 FROM shared_access sa
          JOIN profiles p ON p.id = sa.viewer_id
          WHERE sa.owner_id = archery_sessions.user_id
          AND sa.viewer_id = auth.uid()
          AND p.role = 'coach'
        )
      )
    )
  );

CREATE POLICY "Users can insert arrows in their sessions"
  ON arrows FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM archery_sessions 
      WHERE archery_sessions.id = arrows.session_id
      AND archery_sessions.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update arrows in their sessions"
  ON arrows FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM archery_sessions 
      WHERE archery_sessions.id = arrows.session_id
      AND archery_sessions.user_id = auth.uid()
    )
    AND NOT EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'coach'
    )
  );

CREATE POLICY "Users can delete arrows from their sessions"
  ON arrows FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM archery_sessions 
      WHERE archery_sessions.id = arrows.session_id
      AND archery_sessions.user_id = auth.uid()
    )
    AND NOT EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'coach'
    )
  );

-- ============================================
-- MISE À JOUR des POLICIES pour HEALTH_METRICS
-- ============================================

-- Supprimer les anciennes policies
DROP POLICY IF EXISTS "Users can view own metrics or if super_admin" ON health_metrics;
DROP POLICY IF EXISTS "Users can insert own metrics" ON health_metrics;
DROP POLICY IF EXISTS "Users can update own metrics" ON health_metrics;
DROP POLICY IF EXISTS "Users can delete own metrics" ON health_metrics;

-- Recréer avec accès coach en lecture seule
CREATE POLICY "Users and coaches can view health metrics"
  ON health_metrics FOR SELECT
  USING (
    auth.uid() = user_id 
    OR 
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'super_admin'
    )
    OR
    EXISTS (
      SELECT 1 FROM shared_access sa
      JOIN profiles p ON p.id = sa.viewer_id
      WHERE sa.owner_id = health_metrics.user_id
      AND sa.viewer_id = auth.uid()
      AND p.role = 'coach'
    )
  );

CREATE POLICY "Users can insert own health metrics"
  ON health_metrics FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own health metrics"
  ON health_metrics FOR UPDATE
  USING (
    auth.uid() = user_id
    AND NOT EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'coach'
    )
  );

CREATE POLICY "Users can delete own health metrics"
  ON health_metrics FOR DELETE
  USING (
    auth.uid() = user_id
    AND NOT EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'coach'
    )
  );