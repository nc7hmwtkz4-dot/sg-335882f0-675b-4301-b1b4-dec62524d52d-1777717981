UPDATE competitions SET program_details = '[]'::jsonb;
ALTER TABLE competitions ALTER COLUMN program_details TYPE jsonb USING program_details::jsonb;