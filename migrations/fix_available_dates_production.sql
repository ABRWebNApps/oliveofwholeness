-- ============================================================
-- Production fix: ensure available_dates has all required columns
-- Run this in your Supabase SQL Editor
-- ============================================================

-- 1. Add start_time column if it doesn't exist
ALTER TABLE available_dates
ADD COLUMN IF NOT EXISTS start_time TIME DEFAULT '09:00:00';

-- 2. Add end_time column if it doesn't exist
ALTER TABLE available_dates
ADD COLUMN IF NOT EXISTS end_time TIME DEFAULT '17:00:00';

-- 3. Add time_slots JSONB column if it doesn't exist
ALTER TABLE available_dates
ADD COLUMN IF NOT EXISTS time_slots JSONB DEFAULT '[]'::jsonb;

-- 4. Migrate any existing rows that have start/end time but no time_slots yet
UPDATE available_dates
SET time_slots = jsonb_build_array(
    jsonb_build_object(
        'start', to_char(start_time, 'HH24:MI'),
        'end', to_char(end_time, 'HH24:MI')
    )
)
WHERE (time_slots IS NULL OR time_slots = '[]'::jsonb)
  AND start_time IS NOT NULL
  AND end_time IS NOT NULL;

-- 5. Make sure RLS policies allow all operations (upsert requires INSERT + UPDATE)
ALTER TABLE available_dates ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS allow_admin_all_available_dates ON available_dates;
DROP POLICY IF EXISTS allow_public_read_available_dates ON available_dates;

CREATE POLICY allow_admin_all_available_dates
  ON available_dates
  FOR ALL
  USING (true)
  WITH CHECK (true);

CREATE POLICY allow_public_read_available_dates
  ON available_dates
  FOR SELECT
  USING (true);
