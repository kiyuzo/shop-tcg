# KON - Japanese TCG E-commerce Platform

A modern, minimalist e-commerce platform for trading card collectors, inspired by Japanese aesthetics (Wabi-Sabi philosophy). Built with Next.js, React, TypeScript, Tailwind CSS, Express.js, and MongoDB.

## 🎴 Features

### Customer Features
- **Product Browsing & Search**: Advanced filtering by category, price, condition, and availability
- **User Authentication**: Secure JWT-based authentication with registration and login
- **Shopping Cart**: Persistent cart with Zustand state management
- **Wishlist**: Save favorite cards for later
- **Product Reviews**: Rate and review purchased products
- **Order Management**: Track order history and status
- **Stripe Payment Integration**: Secure checkout with Stripe
- **Responsive Design**: Mobile-first Japanese minimalist aesthetic
- **Newsletter Subscription**: Stay updated with new arrivals

### Admin Features
- **Product Management**: CRUD operations for products
- **Order Management**: Track and update order statuses
- **User Management**: View and manage customers
- **Analytics Dashboard**: Sales and product performance metrics

### Design Philosophy
- **Wabi-Sabi Aesthetic**: Minimalist Japanese design with earthy color palette
- **Typography**: Google Fonts - Inter (primary), Noto Serif JP (display)
- **Color Scheme**: 
  - Sumi (charcoal blacks)
  - Wabi (warm beiges)
  - Sakura (cherry blossom pink accents)
  - Matcha (natural greens)

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom Japanese-inspired theme
- **State Management**: Zustand with persist middleware
- **HTTP Client**: Axios
- **Forms**: React Hook Form with Zod validation
- **Icons**: Heroicons
- **Animations**: Framer Motion
- **Notifications**: React Hot Toast
- **Payment**: Stripe.js

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcryptjs
- **Payment Processing**: Stripe
- **File Upload**: Multer + Cloudinary
- **Email**: Nodemailer
- **Security**: Helmet, CORS, Rate Limiting

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm
- MongoDB (local or MongoDB Atlas)
- Stripe account for payments
- Cloudinary account for image hosting (optional)

### 1. Clone and Install

```bash
# Clone the repository
git clone <your-repo-url>
cd TCG_EcommerceWOWOWOW

# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
cd ..
```

### 2. Environment Setup

#### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_key
```

#### Backend (server/.env)
```env
PORT=5000
NODE_ENV=development

# MongoDB
MONGODB_URI=mongodb://localhost:27017/tcg-ecommerce

# JWT
JWT_SECRET=your_super_secret_jwt_key_change_in_production
JWT_EXPIRE=7d

# Stripe
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key

# Cloudinary (Optional - for image uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email (Optional - for notifications)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
FROM_EMAIL=noreply@wabimarket.com
FROM_NAME=Wabi Market

# Frontend URL
CLIENT_URL=http://localhost:3000
```

### 3. Database Setup

```bash
# Start MongoDB locally
mongod

# Or use MongoDB Atlas connection string in MONGODB_URI
```

### 4. Run the Application

#### Development Mode (Recommended)
```bash
# Terminal 1 - Run both frontend and backend concurrently
npm run dev:all

# Or run separately:

# Terminal 1 - Frontend
npm run dev

# Terminal 2 - Backend
npm run server
```

The application will be available at:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

### 5. Seed Database (Optional)

```bash
cd server
npm run seed
```

## 📁 Project Structure

```
TCG_EcommerceWOWOWOW/
├── app/                      # Next.js App Router pages
│   ├── layout.tsx           # Root layout with fonts & toast
│   ├── page.tsx             # Homepage
│   ├── products/            # Product pages
│   ├── cart/                # Shopping cart
│   └── ...
├── components/              # React components
│   ├── layout/              # Header, Footer, SearchBar
│   ├── home/                # Hero, Categories, Featured, Newsletter
│   ├── products/            # ProductCard, ProductFilters
│   └── ...
├── store/                   # Zustand state management
│   ├── cartStore.ts         # Shopping cart state
│   ├── authStore.ts         # Authentication state
│   └── wishlistStore.ts     # Wishlist state
├── server/                  # Backend Express API
│   ├── src/
│   │   ├── models/          # Mongoose models
│   │   ├── routes/          # API routes
│   │   ├── middleware/      # Auth & error middleware
│   │   └── server.ts        # Express app entry
│   ├── package.json
│   └── tsconfig.json
├── public/                  # Static assets
├── tailwind.config.js       # Tailwind with Japanese theme
├── next.config.js           # Next.js configuration
├── package.json             # Frontend dependencies
└── README.md
```

## 🎨 Design System

### Color Palette
```css
/* Sumi (Charcoal) - Primary */
sumi-50  to sumi-900

/* Wabi (Warm Beige) - Background */
wabi-50  to wabi-900

/* Sakura (Pink) - Accent */
sakura-50 to sakura-900

/* Matcha (Green) - Secondary */
matcha-50 to matcha-900
```

### Typography
- **Display/Headings**: Noto Serif JP (Japanese-inspired serif)
- **Body**: Inter (clean, modern sans-serif)

### Components
- Minimalist cards with subtle shadows
- Sharp corners (no border-radius) for authenticity
- Smooth transitions (300ms cubic-bezier)
- Zen-inspired spacing and layouts

## 🔐 API Endpoints

### Authentication
```
POST   /api/auth/register    - Register new user
POST   /api/auth/login       - Login user
GET    /api/auth/me          - Get current user (Protected)
```

### Products
```
GET    /api/products         - Get all products (with filters)
GET    /api/products/:id     - Get single product
GET    /api/products/:id/reviews - Get product reviews
```

### Orders
```
POST   /api/orders           - Create order (Protected)
GET    /api/orders/:id       - Get order by ID (Protected)
GET    /api/orders/user/my-orders - Get user orders (Protected)
POST   /api/orders/:id/pay   - Create payment intent (Protected)
PUT    /api/orders/:id/confirm-payment - Confirm payment (Protected)
```

### Reviews
```
POST   /api/reviews          - Create review (Protected)
```

### Newsletter
```
POST   /api/newsletter/subscribe - Subscribe to newsletter
```

### Admin (Protected + Admin Role)
```
GET    /api/admin/dashboard  - Admin dashboard
```

## 🚀 Deployment

### Frontend (Vercel)
```bash
# Build for production
npm run build

# Deploy to Vercel
vercel --prod
```

### Backend (Railway/Render/Heroku)
```bash
cd server

# Build TypeScript
npm run build

# Start production server
npm start
```

### Environment Variables
Remember to set all environment variables in your hosting platform.

## 🧪 Features to Implement

- [ ] Email notifications (order confirmations, shipping updates)
- [ ] Advanced admin dashboard with charts
- [ ] Product recommendations based on browsing history
- [ ] Multiple image upload for products
- [ ] Real-time stock updates
- [ ] Advanced search with Algolia/Elasticsearch
- [ ] Social authentication (Google, Facebook)
- [ ] Multi-language support (EN/JP)
- [ ] Dark mode toggle

## 📝 License

MIT License - Feel free to use this project for learning or commercial purposes.

## 👨‍💻 Author

Created with ❤️ by incorporating Japanese minimalist design principles.

## 🙏 Acknowledgments

- Inspired by Japanese Wabi-Sabi philosophy
- Design influenced by traditional Japanese art and modern minimalism
- Trading card imagery and data would require proper licensing

---

**侘市場** - Where simplicity meets elegance in trading card collecting.
