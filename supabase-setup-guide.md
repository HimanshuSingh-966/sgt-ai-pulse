# Supabase Setup Guide for AI Club News Portal

## Step-by-Step Instructions

### Step 1: Create Posts Storage Tables

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Click **New Query**
4. Copy and paste the SQL from `setup-database.sql` file
5. Click **Run** to execute

### Step 2: Create Your First Admin User

#### Option A: Create a brand new admin user with SQL
1. Open `create_admin_user.sql` file
2. Replace the email and password with your desired credentials
3. Copy the entire SQL script
4. Run it in Supabase SQL Editor

#### Option B: Grant admin role to existing user in admin_profiles
1. Get your user ID from admin_profiles:
```sql
SELECT id, email FROM admin_profiles;
```
2. Copy your `id` value
3. Run this SQL (replace `YOUR_USER_ID` with the copied ID):
```sql
INSERT INTO user_roles (user_id, role) 
VALUES ('YOUR_USER_ID', 'admin');
```

### Step 3: Verify Setup

1. Log in at `/admin/login`
2. You should be redirected to `/admin/dashboard`
3. Try creating a test post
4. Verify the post appears on the appropriate page (News/Events/Research)

## Database Structure Overview

### Tables Created:
- **posts**: Stores all news, events, and research articles
- **user_roles**: Manages admin permissions (separate from admin_profiles for security)

### Your Existing Table:
- **admin_profiles**: Still used for admin profile information (name, email)

## Security Notes

- Your `admin_profiles` table remains for profile data
- The new `user_roles` table handles permissions securely
- RLS policies ensure only admins can create/edit posts
- Published posts are publicly visible, drafts are admin-only

## Need Help?

If you encounter issues:
1. Check Supabase logs in Dashboard > Logs
2. Verify RLS policies in Dashboard > Authentication > Policies
3. Ensure your user has a role in the `user_roles` table
