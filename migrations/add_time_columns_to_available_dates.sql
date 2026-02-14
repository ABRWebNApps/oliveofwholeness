-- Add start_time and end_time columns to available_dates table
ALTER TABLE available_dates 
ADD COLUMN IF NOT EXISTS start_time TIME DEFAULT '09:00:00',
ADD COLUMN IF NOT EXISTS end_time TIME DEFAULT '17:00:00';
