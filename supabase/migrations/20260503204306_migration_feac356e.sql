-- Supprimer toutes les tables créées pour le backend
DROP TABLE IF EXISTS arrows CASCADE;
DROP TABLE IF EXISTS matches CASCADE;
DROP TABLE IF EXISTS health_metrics CASCADE;
DROP TABLE IF EXISTS archery_sessions CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;

-- Supprimer la fonction de création automatique de profil
DROP FUNCTION IF EXISTS public.handle_new_user() CASCADE;