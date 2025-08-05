# Rural Hub - Shopping & Service Booking App

A modern e-commerce and service booking platform built with Next.js, connecting rural communities with quality products and essential services.

## 🚀 Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **React 18** - User interface library
- **Tailwind CSS** - Utility-first CSS framework
- **JavaScript/JSX** - Programming language

### Backend
- **Next.js API Routes** - Server-side API endpoints
- **MongoDB Atlas** - Cloud database
- **Mongoose** - MongoDB object modeling

### Authentication & Security
- **JWT (JSON Web Tokens)** - User authentication
- **bcryptjs** - Password hashing
- **HTTP-only cookies** - Secure token storage

### Additional Libraries
- **React Context API** - State management (Auth & Cart)
- **Axios/Fetch** - HTTP client for API calls
- **React Hooks** - State and lifecycle management

## 🏃‍♂️ How to Run the App Locally

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- MongoDB Atlas account (or local MongoDB)

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd shopping-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   MONGODB_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_jwt_secret_key
   NEXTAUTH_SECRET=your_nextauth_secret
   NEXTAUTH_URL=http://localhost:3000
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Database Setup
- Create a MongoDB Atlas cluster
- Add your connection string to `.env.local`
- The app will automatically create collections on first run

## ✨ Features Covered

### 🔐 Authentication System
- **User Registration** - Create new accounts with email validation
- **User Login** - Secure authentication with JWT tokens
- **Protected Routes** - Dashboard and profile pages require authentication
- **Session Management** - Persistent login sessions with secure cookies

### 🛍️ E-commerce Functionality
- **Product Catalog** - Browse products with categories and search
- **Service Listings** - View available services (healthcare, agriculture, etc.)
- **Shopping Cart** - Add/remove items with quantity management
- **Price Display** - Regular and discounted pricing
- **Stock Management** - Real-time inventory tracking

### 📱 User Dashboard
- **Welcome Message** - Personalized user greeting
- **Booking History** - View all past orders and bookings
- **Profile Management** - Edit user information
- **Order Status** - Track order progress (pending, confirmed, delivered)

### 🎯 Service Booking System
- **Mixed Cart** - Add both products (bread, butter) and services
- **Booking Creation** - Save bookings to MongoDB database
- **Delivery Address** - Specify delivery location
- **Order Notes** - Add special instructions

### 🎨 User Interface
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Modern UI Components** - Cards, buttons, forms with consistent styling
- **Background Images** - Aesthetic Unsplash integration
- **Loading States** - User feedback during API calls
- **Error Handling** - Graceful error messages and validation

### 🔍 Search & Filter
- **Category Filtering** - Filter by product/service categories
- **Search Functionality** - Find items by name or description
- **Pagination** - Handle large datasets efficiently

### 💾 Database Integration
- **MongoDB Models** - User, Product, Booking, Service schemas
- **Data Validation** - Schema-based validation with Mongoose
- **Relationship Management** - User-to-booking associations
- **Stock Updates** - Automatic inventory management

## 📁 Project Structure

```
shopping-app/
├── src/
│   ├── app/
│   │   ├── api/           # API routes
│   │   │   ├── auth/      # Authentication endpoints
│   │   │   ├── users/     # User management
│   │   │   ├── bookings/  # Order management
│   │   │   └── services/  # Service listings
│   │   ├── auth/          # Auth pages (login/signup)
│   │   ├── dashboard/     # User dashboard
│   │   ├── services/      # Services catalog
│   │   └── globals.css    # Global styles
│   ├── components/        # Reusable components
│   │   ├── ui/           # UI primitives
│   │   ├── forms/        # Form components
│   │   └── Footer.js     # Site footer
│   ├── context/          # React Context providers
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions
│   ├── models/           # MongoDB schemas
│   └── types/            # TypeScript definitions
├── public/               # Static assets
└── package.json         # Dependencies
```

## 🌟 Key Features Highlights

### Authentication Flow
- Secure registration with password hashing
- JWT-based session management
- Protected dashboard and profile pages

### Shopping Experience
- Mixed product and service cart
- Real-time stock validation
- Seamless checkout process

### Admin Capabilities
- Service management through API
- Order tracking and status updates
- User management system

## 🚀 Deployment

The app is ready for deployment on Vercel:

```bash
npm run build
# Deploy to Vercel
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For support, email: info@ruralhub.com
