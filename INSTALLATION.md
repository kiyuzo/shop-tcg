# Complete Setup Instructions for Wabi Market

## Prerequisites Installation

### 1. Install Node.js
Download and install Node.js 18 or higher from https://nodejs.org/

Verify installation:
```powershell
node --version
npm --version
```

### 2. Install MongoDB

**Option A: Local MongoDB**
- Download from https://www.mongodb.com/try/download/community
- Install MongoDB Community Server
- Start MongoDB service

**Option B: MongoDB Atlas (Cloud - Recommended)**
- Create free account at https://www.mongodb.com/cloud/atlas
- Create a cluster
- Get connection string
- Use this in your `server/.env` file

### 3. Get Stripe Account
- Sign up at https://stripe.com
- Get your test API keys from Dashboard > Developers > API keys

---

## Installation Steps

### Step 1: Navigate to Project Directory
```powershell
cd Y:\07\PRPL\TCG_EcommerceWOWOWOW
```

### Step 2: Install Frontend Dependencies
```powershell
npm install
```

This will install:
- next
- react, react-dom
- typescript
- tailwindcss, autoprefixer, postcss
- @heroicons/react
- axios
- zustand
- framer-motion
- react-hot-toast
- react-hook-form
- zod
- stripe, @stripe/stripe-js
- And all other dependencies...

### Step 3: Install Backend Dependencies
```powershell
cd server
npm install
```

This will install:
- express
- mongoose
- typescript
- bcryptjs
- jsonwebtoken
- cors
- dotenv
- stripe
- nodemailer
- helmet
- express-rate-limit
- And all dev dependencies...

```powershell
cd ..
```

### Step 4: Configure Environment Variables

#### Frontend Configuration
Create `.env.local` in the root directory:
```powershell
# Create the file
New-Item -Path .\.env.local -ItemType File

# Or copy from example
Copy-Item .\.env.local.example .\.env.local
```

Edit `.env.local` with your text editor and add:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_STRIPE_PUBLISHABLE_KEY
```

#### Backend Configuration
```powershell
cd server
Copy-Item .\.env.example .\.env
```

Edit `server/.env` with your values:
```env
PORT=5000
NODE_ENV=development

# MongoDB - Use one of these options:
# Option 1: Local MongoDB
MONGODB_URI=mongodb://localhost:27017/tcg-ecommerce

# Option 2: MongoDB Atlas (Cloud)
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/tcg-ecommerce

# JWT Secret - Generate a random string
JWT_SECRET=your_super_secret_jwt_key_minimum_32_characters_long
JWT_EXPIRE=7d

# Stripe Secret Key - Get from Stripe Dashboard
STRIPE_SECRET_KEY=sk_test_YOUR_STRIPE_SECRET_KEY

# Cloudinary (Optional - for image uploads)
# CLOUDINARY_CLOUD_NAME=your_cloud_name
# CLOUDINARY_API_KEY=your_api_key
# CLOUDINARY_API_SECRET=your_api_secret

# Email (Optional - for notifications)
# SMTP_HOST=smtp.gmail.com
# SMTP_PORT=587
# SMTP_USER=your_email@gmail.com
# SMTP_PASS=your_app_specific_password
# FROM_EMAIL=noreply@wabimarket.com
# FROM_NAME=Wabi Market

# Frontend URL
CLIENT_URL=http://localhost:3000
```

```powershell
cd ..
```

### Step 5: Start MongoDB

**If using local MongoDB:**
```powershell
# Start MongoDB service
net start MongoDB

# Or if installed manually, run:
mongod
```

**If using MongoDB Atlas:**
- No need to start anything locally
- Just ensure your connection string is correct in `server/.env`

### Step 6: Seed the Database (Optional but Recommended)

This will create sample products and an admin user:
```powershell
cd server
npm run seed
```

You should see:
```
✓ Connected to MongoDB
✓ Cleared existing data
✓ Created categories
✓ Created products
✓ Created admin user (email: admin@wabimarket.com, password: admin123)

✅ Database seeded successfully!
```

```powershell
cd ..
```

### Step 7: Start the Application

**Option 1: Run Everything Together (Recommended)**
```powershell
npm run dev:all
```

This starts both frontend and backend concurrently.

**Option 2: Run Separately**

Terminal 1 - Frontend:
```powershell
npm run dev
```

Terminal 2 - Backend:
```powershell
cd server
npm run dev
```

---

## Verify Installation

### Check Frontend
Open your browser to: http://localhost:3000

You should see:
- ✅ Wabi Market homepage
- ✅ Japanese minimalist design
- ✅ Navigation header
- ✅ Featured products section

### Check Backend
Open your browser to: http://localhost:5000/health

You should see:
```json
{
  "status": "OK",
  "message": "Server is running"
}
```

### Test API
```powershell
# Get products
curl http://localhost:5000/api/products

# Should return a JSON array of products
```

---

## Test the Application

### 1. Create an Account
- Go to http://localhost:3000/login
- Click "Don't have an account? Sign up"
- Fill in the form
- Click "Create Account"

### 2. Browse Products
- Go to http://localhost:3000/products
- Use filters to search
- Click on a product card

### 3. Add to Cart
- Click the shopping cart icon on a product card
- Go to cart page
- Verify items are there

### 4. Test Wishlist
- Click the heart icon on a product card
- Go to wishlist page
- Verify product is saved

### 5. Login as Admin
- Email: `admin@wabimarket.com`
- Password: `admin123`
- Access admin features

---

## Common Issues & Solutions

### Issue: Port 3000 or 5000 already in use
```powershell
# Find process on port 3000
netstat -ano | findstr :3000

# Kill the process
taskkill /PID <PID_NUMBER> /F

# Same for port 5000
netstat -ano | findstr :5000
taskkill /PID <PID_NUMBER> /F
```

### Issue: MongoDB connection error
**Solution 1:** Start MongoDB service
```powershell
net start MongoDB
```

**Solution 2:** Use MongoDB Atlas
- Get connection string from MongoDB Atlas
- Update `MONGODB_URI` in `server/.env`

### Issue: TypeScript errors in VS Code
These are expected before installing dependencies.
```powershell
# Install all dependencies
npm install
cd server && npm install
```

### Issue: Module not found errors
```powershell
# Clear node_modules and reinstall
Remove-Item -Recurse -Force node_modules
Remove-Item -Recurse -Force server/node_modules
npm install
cd server && npm install
```

### Issue: Stripe payments not working
- Verify your Stripe keys are correct (test mode keys start with `pk_test_` and `sk_test_`)
- Check both frontend and backend environment variables
- Ensure you're using matching key pairs from the same Stripe account

---

## Development Commands

### Frontend
```powershell
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run ESLint
```

### Backend
```powershell
cd server
npm run dev          # Start with nodemon (hot reload)
npm run build        # Compile TypeScript
npm start            # Start production server
npm run seed         # Seed database
```

---

## Production Deployment

### Frontend (Vercel)
```powershell
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

Add environment variables in Vercel dashboard.

### Backend (Railway/Render)
1. Push code to GitHub
2. Connect repository to Railway/Render
3. Add environment variables
4. Deploy

---

## Additional Resources

- **Next.js Documentation**: https://nextjs.org/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Express.js**: https://expressjs.com/
- **MongoDB**: https://docs.mongodb.com/
- **Stripe**: https://stripe.com/docs

---

## Support

If you encounter any issues:
1. Check the error message carefully
2. Verify all environment variables are set
3. Ensure all dependencies are installed
4. Check MongoDB is running
5. Verify ports 3000 and 5000 are available

---

## Success Checklist

- [ ] Node.js and npm installed
- [ ] MongoDB running (local or Atlas)
- [ ] Frontend dependencies installed
- [ ] Backend dependencies installed
- [ ] Environment variables configured
- [ ] Database seeded with sample data
- [ ] Frontend running on http://localhost:3000
- [ ] Backend running on http://localhost:5000
- [ ] Can create account and login
- [ ] Can browse products
- [ ] Can add items to cart
- [ ] Can add items to wishlist

**Congratulations! Your Wabi Market is ready! 🎴 侘市場**
