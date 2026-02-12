-- SQL Script to seed admin user
-- Run this in your Supabase SQL Editor

-- 1. Ensure the uuid-ossp extension is enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. Create the user in auth.users if they don't exist
DO $$
DECLARE
  new_user_id UUID := uuid_generate_v4();
  target_email TEXT := 'lazarus99x@gmail.com';
  target_password TEXT := '@Adminn321';
BEGIN
  -- Check if user already exists
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = target_email) THEN
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
    
    RAISE NOTICE 'User created with ID %', new_user_id;
  ELSE
    SELECT id INTO new_user_id FROM auth.users WHERE email = target_email;
    RAISE NOTICE 'User already exists with ID %', new_user_id;
  END IF;

  -- 3. Ensure the user is in public.admin_profiles
  INSERT INTO public.admin_profiles (id, email, full_name, role)
  VALUES (new_user_id, target_email, 'Admin', 'admin')
  ON CONFLICT (id) DO UPDATE SET role = 'admin';

END $$;
