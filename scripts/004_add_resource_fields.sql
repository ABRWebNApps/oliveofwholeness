-- Add new columns to resources table
ALTER TABLE public.resources 
  ADD COLUMN IF NOT EXISTS excerpt TEXT,
  ADD COLUMN IF NOT EXISTS image_url TEXT,
  ADD COLUMN IF NOT EXISTS resource_url TEXT,
  ADD COLUMN IF NOT EXISTS author_id UUID REFERENCES auth.users(id);

-- Drop the old author column since we'll use author_id instead
ALTER TABLE public.resources DROP COLUMN IF EXISTS author;