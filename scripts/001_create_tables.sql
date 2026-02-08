-- Create resources table for admin-managed articles, guides, sermons, etc.
CREATE TABLE IF NOT EXISTS public.resources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL,
  author TEXT DEFAULT 'Admin',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  published BOOLEAN DEFAULT true
);

-- Create community_feed table for admin-only posts (updates, encouragement, events)
CREATE TABLE IF NOT EXISTS public.community_feed (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  image_url TEXT,
  link_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  published BOOLEAN DEFAULT true
);

-- Create help_requests table for visitor contact form submissions
CREATE TABLE IF NOT EXISTS public.help_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  consent_given BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status TEXT DEFAULT 'new' -- new, reviewed, responded
);

-- Create admin_users table for admin authentication
CREATE TABLE IF NOT EXISTS public.admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_login TIMESTAMP WITH TIME ZONE
);

-- Enable Row Level Security on all tables
ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_feed ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.help_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Create policies for resources table
CREATE POLICY "Allow public read access to published resources" ON public.resources
  FOR SELECT USING (published = true);

CREATE POLICY "Allow authenticated users full access to resources" ON public.resources
  FOR ALL USING (auth.uid() IS NOT NULL);

-- Create policies for community_feed table
CREATE POLICY "Allow public read access to published community posts" ON public.community_feed
  FOR SELECT USING (published = true);

CREATE POLICY "Allow authenticated users full access to community feed" ON public.community_feed
  FOR ALL USING (auth.uid() IS NOT NULL);

-- Create policies for help_requests table
CREATE POLICY "Allow public insert to help requests" ON public.help_requests
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow authenticated users full access to help requests" ON public.help_requests
  FOR ALL USING (auth.uid() IS NOT NULL);

-- Create policies for admin_users table
CREATE POLICY "Allow authenticated users to view admin users" ON public.admin_users
  FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "Allow authenticated users to update admin users" ON public.admin_users
  FOR UPDATE USING (auth.uid() IS NOT NULL);
