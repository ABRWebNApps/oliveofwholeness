-- Create a default admin user for the system
-- In production, this should be done securely with proper password hashing

-- First, let's create the admin user in Supabase Auth
-- This will be done through the Supabase dashboard or via the auth.users table

-- For now, we'll create a placeholder entry that can be updated
-- The actual user creation should be done through Supabase Auth signup

-- Update the admin_users table to link with auth.users
ALTER TABLE public.admin_users ADD COLUMN IF NOT EXISTS auth_user_id UUID REFERENCES auth.users(id);

-- Create a policy to allow admin users to manage content
CREATE POLICY "Allow admin users to manage all content" ON public.resources
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.admin_users 
      WHERE admin_users.auth_user_id = auth.uid()
    )
  );

CREATE POLICY "Allow admin users to manage community feed" ON public.community_feed
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.admin_users 
      WHERE admin_users.auth_user_id = auth.uid()
    )
  );

CREATE POLICY "Allow admin users to view help requests" ON public.help_requests
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.admin_users 
      WHERE admin_users.auth_user_id = auth.uid()
    )
  );
