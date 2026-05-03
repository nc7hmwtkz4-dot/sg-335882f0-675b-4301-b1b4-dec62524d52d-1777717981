-- Modifier les RLS policies pour permettre l'accès anonyme
ALTER TABLE competitions DISABLE ROW LEVEL SECURITY;

-- Alternative : garder RLS mais autoriser tout le monde
ALTER TABLE competitions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_competitions" ON competitions;
DROP POLICY IF EXISTS "insert_own_competitions" ON competitions;
DROP POLICY IF EXISTS "update_own_competitions" ON competitions;
DROP POLICY IF EXISTS "delete_own_competitions" ON competitions;

-- Autoriser tout le monde à tout faire (puisque l'accès se fait par obscurcissement de l'URL)
CREATE POLICY "anon_all_competitions" ON competitions FOR ALL USING (true) WITH CHECK (true);