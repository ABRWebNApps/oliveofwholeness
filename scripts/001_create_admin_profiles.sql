-- Create admin profiles table for admin user management
create table if not exists public.admin_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  role text default 'admin',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.admin_profiles enable row level security;

-- Create policies for admin profiles
create policy "Admin profiles are viewable by authenticated admins"
  on public.admin_profiles for select
  using (auth.uid() = id);

create policy "Admin profiles are insertable by the user themselves"
  on public.admin_profiles for insert
  with check (auth.uid() = id);

create policy "Admin profiles are updatable by the user themselves"
  on public.admin_profiles for update
  using (auth.uid() = id);

-- Create function to handle new admin user creation
create or replace function public.handle_new_admin_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.admin_profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', null)
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

-- Create trigger for new admin users
drop trigger if exists on_auth_admin_user_created on auth.users;

create trigger on_auth_admin_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_admin_user();
