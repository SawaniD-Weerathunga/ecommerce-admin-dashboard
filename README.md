# eCommerce Role-Based Admin Dashboard

A secure, role-based eCommerce Admin Panel built using Node.js, Express, Sequelize, PostgreSQL, and AdminJS. This application features robust authentication, Role-Based Access Control (RBAC), and custom-tailored dashboards for managing users, products, and orders efficiently.

## 🚀 Live Demo
**Live URL:** https://ecommerce-admin-dashboard-9hth.onrender.com/

---

## ✨ Features

**Core Requirements**
* **Secure Authentication:** Implemented `/api/login` endpoint with secure password hashing using `bcrypt`.
* **Session Management:** Secure session handling using JSON Web Tokens (JWT).
* **AdminJS Integration:** Fully integrated AdminJS interface for managing all database resources.
* **Relational Data View:** Built-in customization to display relational data clearly (e.g., viewing Order Items within an Order).

**Role-Based Access Control (RBAC)**
* **Administrators (Admins):**
  * Full access to all AdminJS resources.
  * Can add, edit, delete users, products, categories, orders, and settings.
  * Custom Admin Dashboard showing system summaries (Total Users, Total Products, Total Orders).
* **Regular Users:**
  * Restricted access to sensitive resources. Cannot see or access `Users` and `Settings` tables.
  * Read-only access to products and orders.
  * Custom User Dashboard displaying their personal information and recent order history.

**Bonus Features**
* Remote server deployment (Render).
* Password fields are hidden from all list, show, and filter views for security.

---

## 🛠️ Tech Stack

**Backend**
* Node.js
* Express.js
* AdminJS & @adminjs/express

**Database & ORM**
* PostgreSQL (Neon Cloud)
* Sequelize ORM
* @adminjs/sequelize

**Authentication & Security**
* JSON Web Tokens (JWT)
* Bcrypt

---

## 📂 Project Structure

```text
ecommerce-admin-dashboard/
├── admin/
│   ├── components/
│   │   └── Dashboard.jsx      # Custom Dashboard Component
│   └── adminSetup.js          # AdminJS Configuration & RBAC Rules
├── config/
│   └── database.js            # PostgreSQL Connection & SSL Setup
├── models/
│   ├── index.js               # Model Associations (Relationships)
│   ├── User.js                # User Model (with Bcrypt Hooks)
│   ├── Category.js            
│   ├── Product.js             
│   ├── Order.js               
│   ├── OrderItem.js           
│   └── Setting.js             
├── routes/
│   └── authRoutes.js          # /api/login and authentication routes
├── public/                    # Static assets
├── .env                       # Environment Variables
├── server.js                  # App Entry Point
└── package.json
```

---

## ⚙️ Setup Instructions

**1. Clone the repository**
```bash
git clone [https://github.com/SawaniD-Weerathunga/ecommerce-admin-dashboard.git](https://github.com/SawaniD-Weerathunga/ecommerce-admin-dashboard.git)
cd ecommerce-admin-dashboard
```

**2. Install dependencies**
```bash
npm install
```

**3. Create `.env` file**
Create a `.env` file in the root directory and add your configuration:
```env
PORT=3000
DB_NAME=your_database_name
DB_USER=your_database_user
DB_PASS=your_database_password
DB_HOST=your_database_host
JWT_SECRET=your_super_secret_jwt_key
NODE_ENV=development
```

**4. Run the application**
```bash
npm start
```
*The server will start on `http://localhost:3000`. Access the admin panel at `http://localhost:3000/admin`.*

---

## 🗄️ Database Models & Relationships

* **User:** Stores user details and roles (Admin/User). Has many Orders.
* **Category:** Product categories. Has many Products.
* **Product:** Product details. Belongs to Category, has many OrderItems.
* **Order:** Customer orders. Belongs to User, has many OrderItems.
* **OrderItem:** Line items for orders. Belongs to Order and Product.
* **Setting:** Key-value configuration data for system preferences.

---

## 📸 Screenshots

*(Add your image links below)*

**1. Login & Registration**
![Login Page](https://github.com/SawaniD-Weerathunga/ecommerce-admin-dashboard/blob/main/screenshots/Login%20page.png)

**2. Admin Dashboard (System Summary)**
![Admin Dashboard](Insert_Image_Link_Here)

**3. User Dashboard (Recent Orders)**
![User Dashboard](Insert_Image_Link_Here)

**4. Resource Management (Products & Relationships)**
![Products Management](Insert_Image_Link_Here)

**5. Settings Management**
![Settings Page](Insert_Image_Link_Here)

---

## 👨‍💻 Author
**Sawani Dilmini Weerathunga**
```

***
