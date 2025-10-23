-- ============================================
-- AI CLUB NEWS PORTAL - DATABASE SETUP
-- ============================================
-- This script creates tables for posts and user roles
-- Works with your existing admin_profiles table
-- 
-- WHAT THIS CREATES:
-- 1. Posts table (for News, Events, Research articles)
-- 2. User roles table (secure admin permissions)
-- 3. RLS policies (security)
-- 4. Indexes (performance)
-- 5. Helper functions (role checking)
--
-- INSTRUCTIONS:
-- 1. Copy this entire script
-- 2. Go to Supabase Dashboard > SQL Editor > New Query
-- 3. Paste and click "Run"
-- 4. Then follow steps in 'create_admin_user.sql'
-- ============================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Drop existing types if they exist (for clean reinstall)
DROP TYPE IF EXISTS post_category CASCADE;
DROP TYPE IF EXISTS post_status CASCADE;
DROP TYPE IF EXISTS app_role CASCADE;

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

-- ============================================
-- SETUP COMPLETE!
-- ============================================
-- Next step: Create your admin user
-- See 'create_admin_user.sql' or follow the guide
-- in 'supabase-setup-guide.md'
-- ============================================
