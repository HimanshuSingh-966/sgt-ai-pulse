-- ========================================
-- AI CLUB NEWS PORTAL - DATABASE SETUP
-- ========================================
-- Run this SQL in your Supabase SQL Editor
--
-- This will create:
-- 1. Posts table for News, Events, and Research
-- 2. User roles table for admin access control
-- 3. Row Level Security (RLS) policies
-- 4. Indexes for performance
-- ========================================

-- Create enum for post categories
CREATE TYPE post_category AS ENUM ('News', 'Events', 'Research');

-- Create enum for post status
CREATE TYPE post_status AS ENUM ('Draft', 'Published');

-- Create enum for user roles
CREATE TYPE app_role AS ENUM ('admin', 'user');

-- Create posts table
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  category post_category NOT NULL,
  status post_status NOT NULL DEFAULT 'Draft',
  image TEXT,
  author TEXT NOT NULL,
  views INTEGER DEFAULT 0,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  author_id UUID REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Create user_roles table
CREATE TABLE user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE(user_id, role)
);

-- Enable RLS
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;

-- Create function to check if user has role
CREATE OR REPLACE FUNCTION has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- RLS Policies for posts
-- Everyone can read published posts
CREATE POLICY "Anyone can view published posts"
  ON posts FOR SELECT
  USING (status = 'Published');

-- Admins can do everything
CREATE POLICY "Admins can insert posts"
  ON posts FOR INSERT
  TO authenticated
  WITH CHECK (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update posts"
  ON posts FOR UPDATE
  TO authenticated
  USING (has_role(auth.uid(), 'admin'))
  WITH CHECK (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete posts"
  ON posts FOR DELETE
  TO authenticated
  USING (has_role(auth.uid(), 'admin'));

-- Admins can view all posts (including drafts)
CREATE POLICY "Admins can view all posts"
  ON posts FOR SELECT
  TO authenticated
  USING (has_role(auth.uid(), 'admin'));

-- RLS Policies for user_roles
-- Users can view their own roles
CREATE POLICY "Users can view their own roles"
  ON user_roles FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- Only admins can manage roles
CREATE POLICY "Admins can manage roles"
  ON user_roles FOR ALL
  TO authenticated
  USING (has_role(auth.uid(), 'admin'))
  WITH CHECK (has_role(auth.uid(), 'admin'));

-- Create indexes for better performance
CREATE INDEX idx_posts_category ON posts(category);
CREATE INDEX idx_posts_status ON posts(status);
CREATE INDEX idx_posts_created_at ON posts(created_at DESC);
CREATE INDEX idx_user_roles_user_id ON user_roles(user_id);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update updated_at
CREATE TRIGGER update_posts_updated_at
  BEFORE UPDATE ON posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ========================================
-- STEP 2: CREATE YOUR ADMIN USER
-- ========================================
-- After running the above, you need to:
-- 1. Create a user account in Supabase Authentication
-- 2. Get that user's ID from the auth.users table
-- 3. Run this command with your user's email:

-- INSERT INTO user_roles (user_id, role)
-- SELECT id, 'admin'::app_role
-- FROM auth.users
-- WHERE email = 'your-admin-email@example.com'
-- ON CONFLICT DO NOTHING;

-- ========================================
-- DONE!
-- ========================================
-- Your database is now ready to use!
