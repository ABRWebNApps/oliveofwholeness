-- Add time_slots column to available_dates table
ALTER TABLE available_dates
ADD COLUMN IF NOT EXISTS time_slots JSONB DEFAULT '[]'::jsonb;

-- Migrate existing data: create a slot from start/end times if they exist and time_slots is empty
-- explicit cast to text might be needed for TIME types depending on postgres version, but usually it handles it.
-- We format it to HH:MM to be clean, or just let it be default string representation.
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
