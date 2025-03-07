🚗 DRIVEHUB - Car Rental Platform Across India
DRIVEHUB is a modern car rental platform enabling users to browse, book, and manage car rentals across India. Built using the MERN stack (MongoDB, Express.js, React.js, Node.js), it offers seamless user experience for both customers and admin users.

🌟 Features
✅ Car Listings: Browse available cars with images, details, and rental prices.
✅ User Authentication: Secure user signup, login, and session management using JWT and cookies.
✅ Search & Filter: Search cars based on location, price, or type (Sedan, SUV, etc.).
✅ Booking System: Users can book cars directly from the platform.
✅ Dashboard: Users can view and manage their bookings.
✅ Admin Panel: Admins can add, edit, or remove cars, and manage user bookings.
✅ Responsive Design: Fully optimized for mobile, tablet, and desktop devices.
✅ Media Management: Cars images, promo videos, and user-uploaded documents are handled efficiently.

🛠️ Tech Stack
Frontend
React.js (Vite-powered for fast development)
Axios for API communication
React Router DOM for navigation
Tailwind CSS for responsive UI design
Backend
Node.js & Express.js for building REST APIs
Mongoose for MongoDB database interaction
JWT & Cookies for user authentication and session handling
Database
MongoDB (Local or MongoDB Atlas for cloud storage)
🚀 Getting Started
Prerequisites
Node.js (v14.x or higher)
MongoDB (v4.x or higher)
npm or yarn package manager
Installation
1️⃣ Clone the Repository
bash
Copy
Edit
git clone https://github.com/diganta688/DRIVEHUB.git
cd DRIVEHUB
2️⃣ Backend Setup
bash
Copy
Edit
cd backend
npm install
Create a .env file in the backend folder with:

ini
Copy
Edit
PORT=8080
MONGO_URL=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret>
FRONTEND=http://localhost:5173
3️⃣ Frontend Setup
bash
Copy
Edit
cd ../client
npm install
Create a .env file in the client folder with:

ini
Copy
Edit
VITE_BACKEND_URL=http://localhost:8080
🎬 Running the Application
1️⃣ Start Backend Server
bash
Copy
Edit
cd backend
npm start
2️⃣ Start Frontend Server
bash
Copy
Edit
cd ../client
npm run dev
Open http://localhost:5173 in your browser.

🔒 Authentication & Authorization
JWT Authentication: Each user receives a secure token after login.
Cookie-Based Sessions: Tokens are stored in secure HTTP-only cookies.
Protected Routes: Booking management, profile, and dashboard are only accessible to authenticated users.
🚘 Car Listings & Booking Flow
Browse cars with images, descriptions, rental rates, and availability.
Filter cars by location, type (SUV, Sedan), or price range.
Book a car by selecting dates, filling personal details, and confirming payment.
Manage all bookings from User Dashboard.
Admin can manage car inventory and approve/reject bookings.
📂 Media & File Management
Car Images: Stored under public/media/Images.
Video Banners: Promo videos displayed on homepage.
Uploaded Documents: (optional - for user verification, like license upload).
⚠️ Large files (like videos) should ideally be stored on cloud storage (AWS S3, Cloudinary) to improve app performance.

📊 Security & Error Handling
Form Validations: Input fields are validated both on frontend and backend.
Session Management: Active sessions are verified for each protected request.
Error Handling: Proper error messages are sent to frontend for better user experience.
✨ Future Enhancements
✅ Payment Gateway Integration (like Razorpay, Stripe).
✅ Advanced Search Filters (car brands, fuel type, transmission).
✅ Location-Based Recommendations.
✅ Review & Ratings System for cars.
✅ Cloud Storage Migration for better media management.
🤝 Contributing
Contributions are welcome!

To contribute:

Fork the repository.
Create a feature branch (e.g., feature/booking-improvements).
Commit your changes.
Push and submit a pull request.

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
