# 🚗 DRIVEHUB – Car Rental Platform Across India

**DRIVEHUB** is a modern car rental platform enabling users to browse, book, and manage car rentals across India. Built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js), it offers a seamless experience for both customers and admins.

---

## 🌟 Features

- ✅ **Car Listings** – Browse available cars with images, details, and prices  
- 🔐 **User Authentication** – Secure login/signup using **JWT** & **HTTP-only cookies**  
- 🔍 **Search & Filter** – Filter by **location, price, or type** (SUV, Sedan, etc.)  
- 📅 **Booking System** – Book cars with date selection and confirmation  
- 📂 **User Dashboard** – Manage bookings, profile, and history  
- 🛠️ **Admin Panel** – Manage cars and all bookings  
- 📱 **Responsive Design** – Optimized for **mobile, tablet, and desktop**  
- 🎥 **Media Support** – Upload **car images, videos**, and **user documents**

---

## 🛠️ Tech Stack

### 🔧 Frontend
- ⚛️ React.js (Vite-powered)
- 📡 Axios for API calls
- 🚏 React Router DOM
- 🎨 Tailwind CSS

### 🔧 Backend
- 🟢 Node.js & Express.js
- 🗄️ MongoDB with Mongoose
- 🔐 JWT + Cookies for secure sessions

---

## 🚀 Getting Started

### ✅ Prerequisites
- Node.js (v14+)
- MongoDB (Local or Atlas)
- npm or yarn

---

### 📦 Installation

#### 1️⃣ Clone the Repository
```bash
git clone https://github.com/diganta688/DRIVEHUB.git
cd DRIVEHUB
```

#### 2️⃣ Backend Setup
```bash
cd backend
npm install
```

##### Create a `.env` file in the `backend` folder:
```env
PORT=8080
MONGO_URL=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret>
FRONTEND=http://localhost:5173

EMAIL_USER=<your_email>
EMAIL_PASS=<your_email_app_password>

CLOUD_NAME=<your_cloudinary_name>
CLOUD_API_KEY=<your_cloudinary_api_key>
CLOUD_API_SECRET=<your_cloudinary_secret>

RAZOR_PAY_ID=<your_razorpay_id>
RAZOR_PAY_SECRET=<your_razorpay_secret>
```

#### 3️⃣ Frontend Setup
```bash
cd ../client
npm install
```

##### Create a `.env` file in the `client` folder:
```env
VITE_BACKEND_URL=http://localhost:8080
VITE_FRONTEND_URL=http://localhost:5173
VITE_MAP_TOKEN=<your_mapbox_mapToken>
VITE_RAZOR_PAY_ID=<your_razorpay_id>
```

---

## 🎬 Running the Application

### ▶️ Start Backend
```bash
cd backend
npm start
```

### ▶️ Start Frontend
```bash
cd ../client
npm run dev
```

Then open your browser and go to:  
📍 `http://localhost:5173`

---

## 🔒 Authentication & Authorization

- 🔐 **JWT Authentication** – Secure token-based login  
- 🍪 **Cookies** – HTTP-only cookies for sessions  
- 🛡️ **Protected Routes** – Dashboard & bookings accessible only by logged-in users

---

## 🚘 Car Listings & Booking Flow

- View cars with **images, descriptions, and pricing**
- Filter by **type, price range, and location**
- Book by selecting **pickup & return dates**
- Manage bookings via **User Dashboard**
- Admins can **approve/reject** bookings & manage cars

---

## 🖼️ Media & File Management

- **Car Images** – Stored under `public/media/Images`
- **Promo Videos** – Displayed on homepage
- **User Docs** – Optional uploads like driver's license

> ⚠️ For better performance, large media should be hosted on **Cloudinary** or **AWS S3**

---

## 🧱 Security & Error Handling

- ✅ Input validation on frontend & backend  
- 🔐 Session handling for each API request  
- ⚠️ Clear error messages for users

---

## 🔮 Future Enhancements

- 💳 **Payment Integration** (Razorpay, Stripe)  
- 🧠 **Advanced Filters** – Fuel type, transmission, brand  
- 📍 **Location-based Car Suggestions**  
- ⭐ **Car Ratings & Reviews**  
- ☁️ **Cloud Storage Migration** for large files

---

## 🤝 Contributing

1. Fork the repo  
2. Create a feature branch: `feature/your-feature-name`  
3. Commit changes  
4. Push to your branch & create a pull request

---

## 👨‍💻 Authors

- Diganta Chakraborty  
- Anusree Das  
- Sameer Raj Singh  
- Sourav Debnath  
- Souradeep Banerjee  
- Feroja Khatun  

---

## 📬 Contact

📧 Email: [digantachakraborty688@gmail.com](mailto:digantachakraborty688@gmail.com)  
🔗 GitHub: [@diganta688](https://github.com/diganta688)