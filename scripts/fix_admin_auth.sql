-- FINAL FOOLPROOF ADMIN FIX
-- Run this in your Supabase SQL Editor

-- 1. Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. Clean up the deprecated table that was causing confusion
DROP TABLE IF EXISTS public.admin_users CASCADE;

-- 3. Ensure the active 'admin_profiles' table is ready
CREATE TABLE IF NOT EXISTS public.admin_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  role text default 'admin',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. Seed the admin user correctly
DO $$
DECLARE
  new_user_id UUID := uuid_generate_v4();
  target_email TEXT := 'lazarus99x@gmail.com';
  target_password TEXT := '@Adminn321';
BEGIN
  -- If the user ALREADY exists in Supabase Auth, we just update their password
  IF EXISTS (SELECT 1 FROM auth.users WHERE email = target_email) THEN
    SELECT id INTO new_user_id FROM auth.users WHERE email = target_email;
    
    UPDATE auth.users 
    SET encrypted_password = crypt(target_password, gen_salt('bf')),
        email_confirmed_at = now(), -- Ensure they don't need to click a link
        updated_at = now(),
        raw_app_meta_data = '{"provider":"email","providers":["email"]}',
        raw_user_meta_data = '{"full_name":"Admin"}'
    WHERE id = new_user_id;
    
    RAISE NOTICE 'Updated existing user credentials for ID: %', new_user_id;
  ELSE
    -- If they don't exist, we create them from scratch
    INSERT INTO auth.users (
      id,
      instance_id,
      email,
      encrypted_password,
      email_confirmed_at,
      raw_app_meta_data,
      raw_user_meta_data,
      aud,
      role,
      created_at,
      updated_at
    ) VALUES (
      new_user_id,
      '00000000-0000-0000-0000-000000000000',
      target_email,
      crypt(target_password, gen_salt('bf')),
      now(),
      '{"provider":"email","providers":["email"]}',
      '{"full_name":"Admin"}',
      'authenticated',
      'authenticated',
      now(),
      now()
    );
    RAISE NOTICE 'Successfully created new admin user with ID: %', new_user_id;
  END IF;

  -- 5. Promote the user in the ACTIVE table (admin_profiles)
  INSERT INTO public.admin_profiles (id, email, full_name, role)
  VALUES (new_user_id, target_email, 'Admin', 'admin')
  ON CONFLICT (id) DO UPDATE SET role = 'admin', updated_at = now();

  RAISE NOTICE 'Admin permissions granted in public.admin_profiles.';

END $$;
