# 🛒 NeoCommerce

NeoCommerce is a full-stack modern E-Commerce web application built using the **MERN Stack**. It provides a complete online shopping experience with authentication, product browsing, cart management, order processing, and an admin dashboard.

---

## 🚀 Features

### 👤 User Features
- User Registration & Login (JWT Authentication)
- Browse Products
- Search, Filter and Sort Products
- Product Details Page
- Add to Cart / Update Quantity
- Shopping Cart Persistence
- Checkout Flow
- Place Orders
- Order History
- User Profile
- Product Reviews & Ratings

---

### 🛠 Admin Features
- Admin Dashboard
- Add / Edit / Delete Products
- Manage Inventory
- Manage Orders
- Manage Users
- Sales Overview

---

## 🧰 Tech Stack

### Frontend
- React (Vite)
- React Router
- Redux Toolkit
- Tailwind CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

### Authentication
- JWT
- bcrypt

### Media Storage
- Cloudinary

---

## 📂 Project Structure

```bash
NeoCommerce/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── screens/
│   │   ├── redux/
│   │   └── App.jsx
│   └── package.json
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
│
└── README.md
```

---

## ⚙️ Environment Variables

Create a `.env` file inside backend:

```env
PORT=5001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Frontend `.env`

```env
VITE_API_URL=http://localhost:5001
```

---

## 📦 Installation

### Clone Repository

```bash
git clone https://github.com/yourusername/neocommerce.git
cd neocommerce
```

---

## Install Dependencies

### Backend

```bash
cd backend
npm install
```

### Frontend

```bash
cd frontend
npm install
```

---

## ▶ Run Application

### Start Backend

```bash
cd backend
npm run dev
```

### Start Frontend

```bash
cd frontend
npm run dev
```

---

## 🌐 Application Runs At

Frontend:

```bash
http://localhost:5173
```

Backend:

```bash
http://localhost:5001
```

---

## 🗄 Database Models

- User
- Product
- Category
- Cart
- Order
- Review

---

## 🔥 Sample Features Implemented

- Product Catalog
- Pagination
- Category Filters
- Secure Auth
- Cart Management
- Order Processing
- Admin Product CRUD
- Responsive UI


---

## 🛣 Future Improvements

- Wishlist
- Coupons & Discounts
- Payment Gateway Integration
- Recommendation Engine
- Multi Vendor Marketplace
- Real-time Order Tracking
- PWA Support

---

## 🤝 Contributing

Contributions are welcome.

```bash
Fork the repository
Create your feature branch
Commit changes
Open a Pull Request
```

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

Developed by **Saiman**

---

## ⭐ Support

If you like this project:

```bash
Give it a star ⭐
```

---



