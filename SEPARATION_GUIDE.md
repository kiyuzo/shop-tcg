# Backend and Frontend Separation Guide

This guide explains how to separate the backend and frontend into distinct projects without changing functionality.

## Current Structure
Your project currently has both frontend (Next.js) and backend (Express) in one repository:
- Frontend: Root directory with Next.js app
- Backend: `server/` directory with Express API

## Recommended Structure

### Option 1: Keep in Same Repository (Monorepo)
```
shop-tcg/
├── frontend/          # Next.js application
│   ├── app/
│   ├── components/
│   ├── store/
│   ├── public/
│   ├── package.json
│   ├── next.config.js
│   └── .env.local
│
└── backend/           # Express API
    ├── src/
    ├── package.json
    └── .env
```

### Option 2: Separate Repositories
```
shop-tcg-frontend/     # Separate repo
├── app/
├── components/
├── store/
└── ...

shop-tcg-backend/      # Separate repo  
├── src/
├── package.json
└── ...
```

## Manual Separation Steps

### Step 1: Create New Directories
```powershell
# In shop-tcg root
New-Item -ItemType Directory -Path "frontend" -Force
New-Item -ItemType Directory -Path "backend" -Force
```

### Step 2: Move Frontend Files to `frontend/`
Move these files/folders:
- `app/`
- `components/`
- `store/`
- `public/`
- `lib/`
- `.env.local`
- `.env.local.example`
- `next.config.js`
- `next-env.d.ts`
- `package.json` (frontend)
- `tsconfig.json` (frontend)
- `tailwind.config.js`
- `postcss.config.js`
- `.prettierrc`
- `.gitignore`
- `README.md`

### Step 3: Move Backend Files to `backend/`
Move/copy these from `server/` to `backend/`:
- `src/` → `backend/src/`
- `package.json` → `backend/package.json`
- `tsconfig.json` → `backend/tsconfig.json`
- `nodemon.json` → `backend/nodemon.json`
- `.env` → `backend/.env`

### Step 4: Update Configuration Files

#### Frontend (`frontend/.env.local`)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

#### Backend (`backend/.env`)
```env
PORT=5000
NODE_ENV=development
JWT_SECRET=your_jwt_secret_here
DB_HOST=localhost
DB_PORT=5432
DB_NAME=tcg
DB_USER=postgres
DB_PASSWORD=db225
CLIENT_URL=http://localhost:3002
```

### Step 5: Update npm Scripts

#### Frontend `package.json`
```json
{
  "scripts": {
    "dev": "next dev -p 3002",
    "build": "next build",
    "start": "next start -p 3002",
    "lint": "next lint"
  }
}
```

#### Backend `package.json`
```json
{
  "scripts": {
    "dev": "nodemon src/server.ts",
    "build": "tsc",
    "start": "node dist/server.js"
  }
}
```

### Step 6: Install Dependencies

```powershell
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

### Step 7: Run Both Servers

#### Terminal 1 - Backend
```powershell
cd backend
npm run dev
```

#### Terminal 2 - Frontend
```powershell
cd frontend
npm run dev
```

## No Code Changes Required!

✅ All API routes remain the same (`/api/products`, `/api/auth`, etc.)
✅ Frontend still calls backend via `NEXT_PUBLIC_API_URL`
✅ Backend CORS already configured for `CLIENT_URL`
✅ Database connection unchanged
✅ All functionality preserved

## Optional: Root-Level Scripts

Create `package.json` in root to run both:

```json
{
  "name": "shop-tcg",
  "version": "1.0.0",
  "scripts": {
    "install:all": "cd frontend && npm install && cd ../backend && npm install",
    "dev": "concurrently \"npm run dev:backend\" \"npm run dev:frontend\"",
    "dev:backend": "cd backend && npm run dev",
    "dev:frontend": "cd frontend && npm run dev"
  },
  "devDependencies": {
    "concurrently": "^8.2.2"
  }
}
```

Then run:
```powershell
npm install
npm run dev
```

## Git Structure

### If keeping as monorepo:
```
.gitignore          # Root gitignore
frontend/.env.local # Ignored
backend/.env        # Ignored
```

### If splitting into separate repos:
1. Create new repo: `shop-tcg-frontend`
2. Create new repo: `shop-tcg-backend`
3. Copy respective files to each repo
4. Keep .env files out of version control

## Current Working Setup

Your current structure actually works fine as-is:
- Backend in `server/` directory
- Frontend in root directory
- Both can run simultaneously

**You don't need to separate unless you want to:**
- Deploy separately
- Have different git repositories
- Better organization for larger teams
