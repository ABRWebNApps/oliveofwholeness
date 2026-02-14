-- FORCE EMAIL CONFIRMATION & ADMIN PROMOTION
-- Run this in your Supabase SQL Editor

DO $$
BEGIN
  -- 1. Force confirm the email in the auth system
  UPDATE auth.users 
  SET email_confirmed_at = now(),
      updated_at = now(),
      last_sign_in_at = now()
  WHERE email = 'olivesofwholeness@gmail.com';

  -- 2. Ensure the user is in the admin_profiles table
  INSERT INTO public.admin_profiles (id, email, full_name, role)
  SELECT id, email, 'Admin', 'admin'
  FROM auth.users
  WHERE email = 'olivesofwholeness@gmail.com'
  ON CONFLICT (id) DO UPDATE SET role = 'admin', updated_at = now();

  RAISE NOTICE 'Email confirmed and admin privileges granted for olivesofwholeness@gmail.com';
END $$;
