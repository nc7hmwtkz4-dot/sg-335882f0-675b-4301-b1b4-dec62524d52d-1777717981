ALTER TABLE matches ADD COLUMN IF NOT EXISTS opponent_name TEXT;
ALTER TABLE matches ADD COLUMN IF NOT EXISTS opponent_score INTEGER;

-- S'assurer que health_metrics peut recevoir toutes les données Whoop sans planter
ALTER TABLE health_metrics ADD COLUMN IF NOT EXISTS energy_burned_cal NUMERIC;
ALTER TABLE health_metrics ADD COLUMN IF NOT EXISTS max_hr INTEGER;
ALTER TABLE health_metrics ADD COLUMN IF NOT EXISTS activity_strain NUMERIC;