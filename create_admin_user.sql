-- Create Admin User Script
-- Run this SQL in your Supabase SQL Editor to create an admin account

-- Replace these values with your desired admin credentials:
-- EMAIL: Change 'admin@sgtuniversity.edu' to your admin email
-- PASSWORD: Change 'your_secure_password_here' to your desired password

-- Create the admin user
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  recovery_sent_at,
  last_sign_in_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'admin@sgtuniversity.edu', -- CHANGE THIS EMAIL
  crypt('your_secure_password_here', gen_salt('bf')), -- CHANGE THIS PASSWORD
  NOW(),
  NOW(),
  NOW(),
  '{"provider":"email","providers":["email"]}',
  '{}',
  NOW(),
  NOW(),
  '',
  '',
  '',
  ''
);

-- Get the user ID that was just created
DO $$
DECLARE
  new_user_id uuid;
BEGIN
  SELECT id INTO new_user_id
  FROM auth.users
  WHERE email = 'admin@sgtuniversity.edu' -- MAKE SURE THIS MATCHES THE EMAIL ABOVE
  LIMIT 1;

  -- Create admin profile entry
  INSERT INTO admin_profiles (id, email, full_name, role)
  VALUES (
    new_user_id,
    'admin@sgtuniversity.edu', -- MAKE SURE THIS MATCHES THE EMAIL ABOVE
    'Admin User', -- CHANGE THIS TO YOUR NAME
    'admin'
  );
END $$;
