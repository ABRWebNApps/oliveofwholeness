-- Create available_dates table for simplified availability management
CREATE TABLE IF NOT EXISTS available_dates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  date DATE NOT NULL UNIQUE,
  is_available BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on date for faster lookups
CREATE INDEX IF NOT EXISTS idx_available_dates_date ON available_dates(date);

-- Enable RLS
ALTER TABLE available_dates ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS allow_admin_all_available_dates ON available_dates;
DROP POLICY IF EXISTS allow_public_read_available_dates ON available_dates;

-- Allow admins to manage availability
CREATE POLICY allow_admin_all_available_dates
  ON available_dates
  FOR ALL
  USING (true);

-- Allow public to read available dates
CREATE POLICY allow_public_read_available_dates
  ON available_dates
  FOR SELECT
  USING (true);
