# disc-app-2 (Meovv)

A full-stack app to help Northwestern students find community on campus — create an account, sign in, and connect with people.

## Stack
- **Frontend:** React 19 + Vite, React Router, Supabase Auth (`@supabase/supabase-js`)
- **Backend:** Node.js + Express 5, `pg` (Postgres), CORS
- **Database/Auth:** Supabase

## Project structure
```
frontend/   React app (Vite)
backend/    Express API (routers, controllers, middleware, config)
```

## Running locally

**Backend**
```bash
cd backend
npm install
# create a .env with your Supabase/Postgres credentials
npm run dev   # nodemon, http://localhost:3001
```

**Frontend**
```bash
cd frontend
npm install
# create a .env with VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY
npm run dev   # http://localhost:5173
```
