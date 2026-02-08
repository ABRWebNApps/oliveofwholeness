-- Drop conflicting admin_users table if it exists
DROP TABLE IF EXISTS public.admin_users;

-- Ensure admin_profiles table exists
CREATE TABLE IF NOT EXISTS public.admin_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  role text default 'admin',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Drop existing RLS policies
DROP POLICY IF EXISTS "Admin profiles are viewable by authenticated admins" ON public.admin_profiles;
DROP POLICY IF EXISTS "Admin profiles are insertable by the user themselves" ON public.admin_profiles;
DROP POLICY IF EXISTS "Admin profiles are updatable by the user themselves" ON public.admin_profiles;

-- Create new, less restrictive policies
CREATE POLICY "Allow anyone to check admin status"
  ON public.admin_profiles FOR SELECT
  USING (true);

CREATE POLICY "Admin profiles are insertable by themselves or other admins"
  ON public.admin_profiles FOR INSERT
  WITH CHECK (
    auth.uid() = id OR 
    EXISTS (
      SELECT 1 FROM public.admin_profiles
      WHERE admin_profiles.id = auth.uid()
    )
  );

CREATE POLICY "Admin profiles are updatable by themselves or other admins"
  ON public.admin_profiles FOR UPDATE
  USING (
    auth.uid() = id OR 
    EXISTS (
      SELECT 1 FROM public.admin_profiles
      WHERE admin_profiles.id = auth.uid()
    )
  );

-- Ensure the trigger function exists
CREATE OR REPLACE FUNCTION public.handle_new_admin_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.admin_profiles (id, email, full_name)
  VALUES (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', null)
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN new;
END;
$$;

-- Recreate the trigger
DROP TRIGGER IF EXISTS on_auth_admin_user_created ON auth.users;
CREATE TRIGGER on_auth_admin_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_admin_user();