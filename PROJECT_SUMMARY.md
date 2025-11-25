# 🎴 Wabi Market - Complete E-commerce Platform

## Project Overview

A full-stack, production-ready e-commerce platform for trading card collectors featuring:
- **Japanese Minimalist Design** (Wabi-Sabi aesthetic)
- **Next.js 14** frontend with TypeScript & Tailwind CSS
- **Express.js** backend with MongoDB & TypeScript
- **Stripe Payment Integration**
- **JWT Authentication**
- **Persistent Shopping Cart & Wishlist**
- **Product Reviews & Ratings**
- **Admin Dashboard**

---

## 🎨 Design Highlights

### Visual Identity
- **Philosophy**: Wabi-Sabi (侘寂) - beauty in imperfection and impermanence
- **Colors**: 
  - Sumi (墨) - Charcoal blacks for text and primary elements
  - Wabi (侘) - Warm beiges for backgrounds
  - Sakura (桜) - Cherry blossom pink for accents
  - Matcha (抹茶) - Natural greens for secondary elements
- **Typography**:
  - Display: Noto Serif JP (Japanese-inspired serif)
  - Body: Inter (modern sans-serif)
- **UI Elements**: Sharp corners, subtle shadows, smooth transitions

---

## 📂 Complete File Structure

### Frontend (Next.js)
```
app/
├── layout.tsx                  # Root layout with fonts, Toaster
├── page.tsx                    # Homepage
├── globals.css                 # Tailwind + custom styles
├── products/
│   └── page.tsx               # Product listing with filters
├── cart/
│   └── page.tsx               # Shopping cart
├── wishlist/
│   └── page.tsx               # Wishlist page
├── login/
│   └── page.tsx               # Login/Register
└── about/
    └── page.tsx               # About page

components/
├── layout/
│   ├── Header.tsx             # Navigation header with cart icon
│   ├── Footer.tsx             # Footer with links
│   └── SearchBar.tsx          # Search component
├── home/
│   ├── Hero.tsx               # Hero section with CTA
│   ├── Categories.tsx         # Category cards
│   ├── FeaturedProducts.tsx   # Featured product grid
│   └── Newsletter.tsx         # Newsletter subscription
└── products/
    ├── ProductCard.tsx        # Individual product card
    └── ProductFilters.tsx     # Filter sidebar

store/
├── cartStore.ts               # Zustand cart state
├── authStore.ts               # Zustand auth state
└── wishlistStore.ts           # Zustand wishlist state
```

### Backend (Express.js)
```
server/src/
├── server.ts                  # Express app entry point
├── models/
│   ├── User.ts               # User schema with auth
│   ├── Product.ts            # Product schema
│   ├── Order.ts              # Order schema
│   ├── Review.ts             # Review schema
│   └── Category.ts           # Category schema
├── routes/
│   ├── auth.ts               # Auth routes (login, register)
│   ├── products.ts           # Product CRUD & filtering
│   ├── orders.ts             # Order management & Stripe
│   ├── reviews.ts            # Product reviews
│   ├── newsletter.ts         # Newsletter subscription
│   ├── categories.ts         # Category routes
│   ├── cart.ts               # Cart routes
│   ├── users.ts              # User management
│   └── admin.ts              # Admin-only routes
├── middleware/
│   └── auth.ts               # JWT auth & admin middleware
└── scripts/
    └── seed.ts               # Database seeding script
```

---

## 🚀 Key Features Implemented

### Customer Features ✅
- [x] Browse products with advanced filtering (category, price, condition, stock)
- [x] Search functionality with full-text search
- [x] User registration and JWT authentication
- [x] Persistent shopping cart (Zustand + localStorage)
- [x] Wishlist management
- [x] Product reviews and ratings
- [x] Order creation and tracking
- [x] Stripe payment integration
- [x] Responsive design (mobile-first)
- [x] Newsletter subscription
- [x] Japanese minimalist UI/UX

### Admin Features ✅
- [x] Protected admin routes
- [x] Admin middleware for authorization
- [x] Product management endpoints
- [x] Order management system
- [x] User management capabilities

### Technical Features ✅
- [x] TypeScript throughout (frontend & backend)
- [x] MongoDB with Mongoose ODM
- [x] Password hashing with bcryptjs
- [x] JWT token-based authentication
- [x] Rate limiting and security headers
- [x] CORS configuration
- [x] File upload capability (Multer/Cloudinary)
- [x] Email service integration (Nodemailer)
- [x] Environment variable management
- [x] Error handling middleware
- [x] API documentation

---

## 🛠️ Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend Framework** | Next.js 14 | React framework with App Router |
| **Language** | TypeScript | Type safety |
| **Styling** | Tailwind CSS | Utility-first CSS |
| **State Management** | Zustand | Lightweight state management |
| **HTTP Client** | Axios | API requests |
| **Forms** | React Hook Form | Form handling |
| **Validation** | Zod | Schema validation |
| **Icons** | Heroicons | Icon library |
| **Notifications** | React Hot Toast | Toast notifications |
| **Animations** | Framer Motion | Smooth animations |
| **Payment** | Stripe | Payment processing |
| **Backend Framework** | Express.js | Node.js web framework |
| **Database** | MongoDB | NoSQL database |
| **ODM** | Mongoose | MongoDB object modeling |
| **Authentication** | JWT | Token-based auth |
| **Password Hashing** | bcryptjs | Secure password storage |
| **File Upload** | Multer + Cloudinary | Image management |
| **Email** | Nodemailer | Email notifications |
| **Security** | Helmet | Security headers |
| **Rate Limiting** | express-rate-limit | API protection |

---

## 📊 Database Schema

### User
- name, email, password (hashed)
- role (user/admin)
- address, phone
- avatar
- timestamps

### Product
- name, description, price
- category, subcategory
- images (array)
- condition (Mint, Near Mint, etc.)
- rarity, set, cardNumber, artist
- inStock, stockQuantity
- featured flag
- tags, specifications
- averageRating, numReviews
- timestamps

### Order
- user (ref)
- orderItems (array)
- shippingAddress
- paymentMethod, paymentResult
- prices (items, tax, shipping, total)
- isPaid, paidAt
- isDelivered, deliveredAt
- status (pending, processing, shipped, delivered, cancelled)
- trackingNumber
- timestamps

### Review
- user (ref), product (ref)
- rating (1-5)
- title, comment
- helpful count
- verified purchase flag
- timestamps

### Category
- name, slug
- description, image
- productCount
- timestamps

---

## 🔐 API Endpoints

### Authentication
```
POST   /api/auth/register          Register new user
POST   /api/auth/login             Login user
GET    /api/auth/me                Get current user (Protected)
```

### Products
```
GET    /api/products               List products (with filters)
GET    /api/products/:id           Get single product
GET    /api/products/:id/reviews   Get product reviews
```

### Orders
```
POST   /api/orders                 Create order (Protected)
GET    /api/orders/:id             Get order (Protected)
GET    /api/orders/user/my-orders  Get user's orders (Protected)
POST   /api/orders/:id/pay         Create Stripe payment intent (Protected)
PUT    /api/orders/:id/confirm     Confirm payment (Protected)
```

### Reviews
```
POST   /api/reviews                Create review (Protected)
```

### Newsletter
```
POST   /api/newsletter/subscribe   Subscribe to newsletter
```

### Admin
```
GET    /api/admin/dashboard        Admin dashboard (Protected + Admin)
```

---

## 🎯 Next Steps / Future Enhancements

### Priority Features
- [ ] Email notifications (order confirmations, shipping updates)
- [ ] Advanced admin dashboard with analytics
- [ ] Product recommendations engine
- [ ] Multiple image upload per product
- [ ] Real-time stock updates with WebSockets
- [ ] Advanced search with Algolia or Elasticsearch

### Nice-to-Have Features
- [ ] Social authentication (Google, Facebook)
- [ ] Multi-language support (EN/JP)
- [ ] Dark mode toggle
- [ ] Saved addresses for checkout
- [ ] Order invoice generation (PDF)
- [ ] Gift card system
- [ ] Loyalty points program
- [ ] Advanced filtering (by artist, year, etc.)
- [ ] Bulk import for products (CSV)
- [ ] Export orders functionality

### Technical Improvements
- [ ] Unit tests (Jest, React Testing Library)
- [ ] E2E tests (Playwright, Cypress)
- [ ] Performance optimization (Image optimization, lazy loading)
- [ ] PWA support (offline mode)
- [ ] Docker containerization
- [ ] CI/CD pipeline (GitHub Actions)
- [ ] Monitoring (Sentry, LogRocket)
- [ ] CDN for static assets

---

## 📝 Notes

### TypeScript Errors
The TypeScript errors shown in the IDE are expected before running `npm install`. They will be resolved after installing dependencies.

### Placeholder Images
Sample products use placeholder images. In production, integrate with actual card image APIs or upload real product images to Cloudinary.

### Stripe Configuration
Configure Stripe webhooks for production to handle payment confirmations automatically.

### Environment Variables
Never commit `.env` or `.env.local` files. Use `.env.example` as a template.

---

## 🙏 Credits

- **Design Inspiration**: Traditional Japanese Wabi-Sabi philosophy
- **Color Palette**: Inspired by Japanese natural materials and aesthetics
- **Typography**: Google Fonts (Inter, Noto Serif JP)
- **Icons**: Heroicons by Tailwind Labs
- **Framework**: Next.js by Vercel

---

**侘市場 (Wabi Market)** - Where simplicity meets elegance in trading card collecting.

Built with ❤️ using modern web technologies and Japanese design principles.
