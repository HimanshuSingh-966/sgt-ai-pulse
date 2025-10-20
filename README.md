# AI Club News Portal - SGT University

A modern news portal for the AI Club at SGT University, built with React, TypeScript, and Supabase.

## Features

- News article browsing and filtering
- Admin authentication and dashboard
- Secure content management system
- Responsive design with Tailwind CSS

## Tech Stack

- **Frontend**: React 18, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Backend**: Supabase (Auth & Database)
- **Build Tool**: Vite
- **Routing**: React Router

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- A Supabase account ([Sign up here](https://supabase.com))

### Installation

1. Clone the repository
```sh
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>
```

2. Install dependencies
```sh
npm install
```

3. Set up Supabase

   a. Create a new project at [Supabase](https://app.supabase.com)

   b. Run the database migration from `supabase/migrations/20251018153308_create_admin_roles.sql` in your Supabase SQL Editor

   c. Get your credentials from Project Settings > API:
      - Project URL
      - Anon (public) key

4. Configure environment variables

   Copy `.env.example` to `.env` and add your Supabase credentials:
   ```sh
   cp .env.example .env
   ```

   Then edit `.env` and replace with your actual values:
   ```
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

5. Start the development server
```sh
npm run dev
```

## Database Setup

### Running Migrations

1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Copy and paste the contents of `supabase/migrations/20251018153308_create_admin_roles.sql`
4. Execute the SQL

### Creating an Admin User

1. Open `create_admin_user.sql` in your editor
2. Replace the email and password with your credentials
3. Copy and paste the SQL into your Supabase SQL Editor
4. Execute the SQL

## Deployment

### Deploy to Render

1. Push your code to GitHub
2. Create a new Web Service on [Render](https://render.com)
3. Connect your GitHub repository
4. Set the following environment variables in Render dashboard:
   - `VITE_SUPABASE_URL` - Your Supabase project URL
   - `VITE_SUPABASE_ANON_KEY` - Your Supabase anon key
5. Deploy

### Important Notes

- The `.env` file is gitignored for security
- Use `.env.example` as a template for required environment variables
- Always use environment variables for sensitive credentials
- On Render, environment variables are set in the dashboard, not in `.env` files

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## License

MIT
