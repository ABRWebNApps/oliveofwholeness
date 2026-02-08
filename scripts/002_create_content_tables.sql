-- Create resources table for articles, guides, and materials
create table if not exists public.resources (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  content text not null,
  excerpt text,
  category text default 'general',
  author_id uuid references auth.users(id) on delete cascade,
  published boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create community_feed table for community posts
create table if not exists public.community_feed (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  content text not null,
  author_id uuid references auth.users(id) on delete cascade,
  published boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create help_requests table for visitor inquiries
create table if not exists public.help_requests (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text,
  message text not null,
  status text default 'new',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS on all tables
alter table public.resources enable row level security;
alter table public.community_feed enable row level security;
alter table public.help_requests enable row level security;

-- Create policies for resources
create policy "Resources are viewable by everyone when published"
  on public.resources for select
  using (published = true);

create policy "Resources are manageable by admins"
  on public.resources for all
  using (
    exists (
      select 1 from public.admin_profiles 
      where id = auth.uid()
    )
  );

-- Create policies for community_feed
create policy "Community posts are viewable by everyone when published"
  on public.community_feed for select
  using (published = true);

create policy "Community posts are manageable by admins"
  on public.community_feed for all
  using (
    exists (
      select 1 from public.admin_profiles 
      where id = auth.uid()
    )
  );

-- Create policies for help_requests
create policy "Help requests are manageable by admins"
  on public.help_requests for all
  using (
    exists (
      select 1 from public.admin_profiles 
      where id = auth.uid()
    )
  );

create policy "Anyone can insert help requests"
  on public.help_requests for insert
  with check (true);
