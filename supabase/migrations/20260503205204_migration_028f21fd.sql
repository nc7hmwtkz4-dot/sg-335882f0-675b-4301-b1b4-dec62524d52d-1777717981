-- Créer la table profiles pour l'authentification
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Trigger pour créer automatiquement un profil
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, email) VALUES (NEW.id, NEW.email) ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Backfill
INSERT INTO public.profiles (id, email) 
SELECT u.id, u.email FROM auth.users u 
LEFT JOIN public.profiles p ON p.id = u.id 
WHERE p.id IS NULL;

-- RLS pour profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "select_own" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "update_own" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Créer la table competitions
CREATE TABLE IF NOT EXISTS competitions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  location TEXT,
  program_details TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS pour competitions (T1 - Private user data)
ALTER TABLE competitions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "select_own_competitions" ON competitions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "insert_own_competitions" ON competitions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "update_own_competitions" ON competitions FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "delete_own_competitions" ON competitions FOR DELETE USING (auth.uid() = user_id);