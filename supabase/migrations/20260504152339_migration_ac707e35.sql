-- Ajouter les champs de budget à la table competitions
ALTER TABLE competitions
ADD COLUMN IF NOT EXISTS flight_train_cost DECIMAL(10, 2) DEFAULT 0,
ADD COLUMN IF NOT EXISTS accommodation_cost DECIMAL(10, 2) DEFAULT 0,
ADD COLUMN IF NOT EXISTS food_cost DECIMAL(10, 2) DEFAULT 0,
ADD COLUMN IF NOT EXISTS local_transport_cost DECIMAL(10, 2) DEFAULT 0,
ADD COLUMN IF NOT EXISTS registration_cost DECIMAL(10, 2) DEFAULT 0;