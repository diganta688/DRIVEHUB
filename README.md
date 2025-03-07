# 🚗 DRIVEHUB - Car Rental Platform Across India

**DRIVEHUB** is a modern car rental platform enabling users to browse, book, and manage car rentals across India. Built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js), it offers seamless user experience for both customers and admin users.

---

## 🌟 Features

- ✅ **Car Listings:** Browse available cars with images, details, and rental prices.
- 🔐 **User Authentication:** Secure signup, login, and session management using **JWT** and **HTTP-only cookies**.
- 🔍 **Search & Filter:** Search cars based on **location, price, or type** (Sedan, SUV, etc.).
- 📅 **Booking System:** Direct car booking with date selection and confirmation.
- 📂 **Dashboard:** Users can view and manage their bookings easily.
- 🛠️ **Admin Panel:** Admins can add, edit, or remove cars, and manage all user bookings.
- 📱 **Responsive Design:** Fully optimized for **mobile, tablet, and desktop devices**.
- 🎥 **Media Management:** Handles **car images, promo videos**, and optional **user document uploads**.

---

## 🛠️ Tech Stack

### Frontend
- ⚛️ React.js (Vite-powered for fast development)
- 📡 Axios for API communication
- 🚏 React Router DOM for navigation
- 🎨 Tailwind CSS for responsive UI design

### Backend
- 🟢 Node.js & Express.js for building REST APIs
- 🗄️ Mongoose for MongoDB database interaction
- 🔑 JWT & Cookies for authentication and session handling

### Database
- 📊 MongoDB (Local or MongoDB Atlas for cloud storage)

---

## 🚀 Getting Started

### Prerequisites
- ✅ Node.js (v14.x or higher)
- ✅ MongoDB (v4.x or higher)
- ✅ npm or yarn package manager

---

### 🛠️ Installation

#### 1️⃣ Clone the Repository
```bash
git clone https://github.com/diganta688/DRIVEHUB.git
cd DRIVEHUB

2️⃣ Backend Setup
cd backend
npm install

Create a .env file in the backend folder with:
PORT=8080
MONGO_URL=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret>
FRONTEND=http://localhost:5173

3️⃣ Frontend Setup
cd ../client
npm install

Create a .env file in the client folder with:
VITE_BACKEND_URL=http://localhost:8080

🎬 Running the Application
Start Backend Server
cd backend
npm start

Start Frontend Server
cd ../client
npm run dev
Open http://localhost:5173 in your browser.

🔒 Authentication & Authorization
🔑 JWT Authentication: Users receive a secure token after login.
🍪 Cookie-Based Sessions: Tokens are stored in secure HTTP-only cookies.
🛡️ Protected Routes: Dashboard, booking history, and profile pages are restricted to authenticated users only.
🚘 Car Listings & Booking Flow
🛻 Browse cars with images, descriptions, rental rates, and availability.
📍 Filter cars by location, type (SUV, Sedan), or price range.
📅 Book a car by selecting dates, providing details, and confirming the booking.
📊 Manage all bookings from the User Dashboard.
🛠️ Admins can add, edit, or remove cars and approve/reject bookings.
📂 Media & File Management
🖼️ Car Images: Stored under public/media/Images.
🎥 Video Banners: Promo videos shown on the homepage.
📑 Uploaded Documents (optional): For user verification (like driving licenses).
⚠️ Note: Large files (like videos) should ideally be stored on cloud storage platforms like AWS S3 or Cloudinary for better performance.

📊 Security & Error Handling
✅ Form Validations: Input fields are validated on both frontend and backend.
✅ Session Management: Active sessions are verified for each protected request.
✅ Error Handling: Meaningful error messages are returned to the frontend to improve user experience.
✨ Future Enhancements
✅ Payment Gateway Integration (Razorpay, Stripe)
✅ Advanced Search Filters (Car brand, fuel type, transmission)
✅ Location-Based Recommendations
✅ Car Reviews & Ratings System
✅ Cloud Storage Migration (for efficient media management)
🤝 Contributing
Contributions are welcome! To contribute:

Fork the repository.
Create a feature branch (e.g., feature/booking-improvements).
Commit your changes.
Push the branch and submit a pull request.
👨‍💻 Authors
Diganta Chakraborty
Anusree Das
Sameer Raj Singh
Sourav Debnath
Souradeep Banerjee
Feroja Khatun
📧 Contact
📧 Email: digantachakraborty688@gmail.com
🔗 GitHub: @diganta688