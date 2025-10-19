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

3. Set up environment variables
Create a `.env` file with your Supabase credentials:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Start the development server
```sh
npm run dev
```

## Admin Setup

To create an admin user:

1. Navigate to your Supabase SQL Editor
2. Open and edit `create_admin_user.sql`
3. Replace the email and password with your credentials
4. Run the SQL script

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## License

MIT
