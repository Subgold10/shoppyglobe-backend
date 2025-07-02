Created By: SUBHA GOLDAR
Subgold10@gmail.com

# ShoppyGlobe Backend

A powerful backend system for an e-commerce platform, developed using Node.js, Express.js, and MongoDB. It supports product management, user authentication, and cart functionality, making it easy to integrate with any frontend stack.

---

## github repository

🔗 [ShoppyGlobe github repository](https://github.com/Subgold10/shoppyglobe-backend.git)

---

## 🚀 Features

- ✅ **User Registration & Authentication** (with hashed passwords)
- 📦 **Product Catalog Management**
- 🛒 **Shopping Cart System**
- 🔐 **JWT-secured Routes**
- 💾 **MongoDB Integration with Mongoose**
- ♻️ **RESTful API Design**
- 🛠️ **Centralized Error Handling**

---

## 🛠 Tech Stack

| Tech       | Usage                           |
| ---------- | ------------------------------- |
| Node.js    | Backend JavaScript runtime      |
| Express.js | Web application framework       |
| MongoDB    | NoSQL document database         |
| Mongoose   | ODM for MongoDB in Node.js      |
| JWT        | Stateless authentication        |
| dotenv     | Environment variable management |

---

## 🧩 Project Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Subgold10/shoppyglobe-backend.git
cd ShoppyGlobe_backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/shoppy
JWT_SECRET=your_jwt_secret_here
```

## Environment Variables

This project uses environment variables to configure sensitive information.

1. Create a `.env` file in the root directory of the project.
2. Copy the contents from `.env` and fill in the values.

### 4. Set up MongoDB Locally

- Download MongoDB and install MongoDB Compass: [https://www.mongodb.com/products/self-managed/community-edition](https://www.mongodb.com/products/self-managed/community-edition)
- Start MongoDB Server
- Open MongoDB Compass
- Connect using:

```
mongodb://localhost:27017/shoppy
```

- Create a database called `shoppy` manually or it will be auto-created on app start.

---

## Development Commands

```bash
npm run dev     # Start server with nodemon for auto-reloading
```

### Optional: Seed Products Data

```bash
npm run import:products  # Runs importProducts.js to populate products collection
```

---

## Production Commands

```bash
npm start       # Runs app in production mode (without nodemon)
```

---

## 🔌 API Endpoints

### Auth

- `POST /register` – Register new user
- `POST /login` – Login user and return token

### Products

- `GET /products` – Get all products
- `GET /products/:id` – Get product by ID
- `POST /products` – Add a product

### Cart _(Protected Routes)_

- `GET /cart` – Get current user cart
- `POST /cart` – Add product to cart
- `PUT /cart/:productId` – Update cart item
- `DELETE /cart/:productId` – Remove item from cart

```bash
npm run import:products  # Runs importProducts.js to populate products collection
```

---

## 📬 Sample Request Body

Below are some example JSON payloads for making requests to various endpoints:

### 🔐 Register User

`POST /register`

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### 🔐 Login User

`POST /login`

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

### 🛒 Add Product to Cart

`POST /cart`
(Requires Bearer Token)

```json
{
  "productId": "YOUR_PRODUCT_ID_HERE",
  "quantity": 2
}
```

### 🛒 Update Cart Item Quantity

`PUT /cart/:productId`
(Requires Bearer Token)

```json
{
  "quantity": 3
}
```

### ❌ Remove Product from Cart

`DELETE /cart/:productId`
(Requires Bearer Token)
(No body required)

### Create and Update products

`(POST/PUT) /products`
(body required)

```json
{
  "title": "Top Gadget",
  "description": "Superb features",
  "price": 199,
  "stock": 50,
  "category": "gadgets"
}
```
