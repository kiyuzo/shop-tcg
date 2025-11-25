# Wabi Market - Quick Start Guide

## Step 1: Install Dependencies

```powershell
# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
cd ..
```

## Step 2: Setup Environment Variables

Create `.env.local` in the root directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
```

Create `.env` in the server directory (copy from .env.example):
```powershell
cd server
copy .env.example .env
```

Then edit `server/.env` with your actual values:
- MongoDB connection string
- JWT secret
- Stripe secret key
- Email configuration (optional)

## Step 3: Start MongoDB

Make sure MongoDB is running:
```powershell
# If using local MongoDB
mongod

# Or use MongoDB Atlas cloud database
```

## Step 4: Run the Application

```powershell
# Option 1: Run everything together (recommended)
npm run dev:all

# Option 2: Run separately in different terminals
# Terminal 1 - Frontend
npm run dev

# Terminal 2 - Backend
cd server
npm run dev
```

## Step 5: Access the Application

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Optional: Seed Sample Data

```powershell
cd server
npm run seed
```

## Troubleshooting

### Port Already in Use
If port 3000 or 5000 is in use:
```powershell
# Find and kill process on port 3000
netstat -ano | findstr :3000
taskkill /PID <process_id> /F

# Or change port in .env files
```

### MongoDB Connection Error
- Ensure MongoDB is running
- Check MONGODB_URI in server/.env
- Try MongoDB Atlas if local connection fails

### TypeScript Errors
These are expected before installing dependencies. Run:
```powershell
npm install
cd server && npm install
```

## Next Steps

1. Create an account at http://localhost:3000/login
2. Browse products at http://localhost:3000/products
3. Configure Stripe for payments
4. Add sample products via API or admin panel

Enjoy building with Wabi Market! 侘市場
