-- Apply this migration in the existing Medvade Supabase project.
-- The UI keeps a local fallback until these tables are available.

create table if not exists public.medweg_community_posts (
  id text primary key,
  author_id uuid not null references auth.users(id) on delete cascade,
  body text not null check (char_length(body) between 1 and 600),
  topic text not null,
  country_id text,
  created_at timestamptz not null default now(),
  hidden boolean not null default false
);

create table if not exists public.medweg_community_comments (
  id text primary key,
  post_id text not null references public.medweg_community_posts(id) on delete cascade,
  author_id uuid not null references auth.users(id) on delete cascade,
  body text not null check (char_length(body) between 1 and 300),
  created_at timestamptz not null default now(),
  hidden boolean not null default false
);

create table if not exists public.medweg_community_follows (
  follower_id uuid not null references auth.users(id) on delete cascade,
  following_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (follower_id, following_id),
  check (follower_id <> following_id)
);

create table if not exists public.medweg_community_reports (
  id bigint generated always as identity primary key,
  post_id text not null references public.medweg_community_posts(id) on delete cascade,
  reporter_id uuid not null references auth.users(id) on delete cascade,
  reason text not null default 'community report',
  created_at timestamptz not null default now()
);

alter table public.medweg_community_posts enable row level security;
alter table public.medweg_community_comments enable row level security;
alter table public.medweg_community_follows enable row level security;
alter table public.medweg_community_reports enable row level security;

create policy "published posts are readable" on public.medweg_community_posts for select using (hidden = false);
create policy "signed in users can create posts" on public.medweg_community_posts for insert to authenticated with check (auth.uid() = author_id);
create policy "authors can edit their posts" on public.medweg_community_posts for update to authenticated using (auth.uid() = author_id) with check (auth.uid() = author_id);

create policy "comments on visible posts are readable" on public.medweg_community_comments for select using (hidden = false);
create policy "signed in users can create comments" on public.medweg_community_comments for insert to authenticated with check (auth.uid() = author_id);

create policy "users can read their follows" on public.medweg_community_follows for select to authenticated using (auth.uid() = follower_id or auth.uid() = following_id);
create policy "users can follow" on public.medweg_community_follows for insert to authenticated with check (auth.uid() = follower_id);
create policy "users can unfollow" on public.medweg_community_follows for delete to authenticated using (auth.uid() = follower_id);

create policy "users can submit reports" on public.medweg_community_reports for insert to authenticated with check (auth.uid() = reporter_id);

create index if not exists medweg_community_posts_created_idx on public.medweg_community_posts(created_at desc);
create index if not exists medweg_community_comments_post_idx on public.medweg_community_comments(post_id, created_at);
