-- Availability Overrides for specific dates
CREATE TABLE IF NOT EXISTS public.availability_overrides (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    override_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    is_available BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(override_date)
);

-- Enable RLS
ALTER TABLE public.availability_overrides ENABLE ROW LEVEL SECURITY;

-- Allow admins to manage all overrides
CREATE POLICY "Allow authenticated admins to manage overrides"
ON public.availability_overrides
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.admin_profiles
    WHERE admin_profiles.id = auth.uid()
  )
);

-- Allow public to view overrides (needed for booking widget)
CREATE POLICY "Allow anyone to view overrides"
ON public.availability_overrides
FOR SELECT
USING (true);
