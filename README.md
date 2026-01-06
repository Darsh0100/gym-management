🏋️‍♂️ Gym Management Platform (Full Stack)

A full-stack gym management platform where users can explore gyms, view membership plans, enroll using secure authentication, and manage their subscriptions.
Built with Node.js, Express, MongoDB, and React, following real-world backend and frontend practices.

🚀 Features
🔐 Authentication

Google OAuth 2.0 login

JWT-based authentication

Role-based access control (User / Owner)

🏢 Gyms

List all gyms with pagination, filtering & search

View gym details and facilities

Owner can create, update, and delete gyms

📋 Membership Plans

View plans for each gym

Owner can create and manage plans

Each plan includes price, duration, and benefits

🧾 Enrollments

Users can enroll in a gym plan

Prevents duplicate enrollments

View active and expired enrollments

Automatic enrollment expiry using cron jobs

💳 Payments (Mock)

Mock payment creation flow

Ready for future real payment gateway integration

📄 API Documentation

Swagger / OpenAPI documentation

Interactive API testing via /api-docs

🛠 Tech Stack
Backend

Node.js

Express.js

MongoDB + Mongoose

Passport.js (Google OAuth)

JWT Authentication

Joi Validation

Node-Cron

Swagger (OpenAPI)

Frontend (Work in Progress)

React (Vite)

React Router

Axios

Context API

🧠 System Design Overview

RESTful API architecture

Modular folder structure

Middleware-based authentication & validation

Separation of concerns (routes, controllers, services)

Secure OAuth flow with backend-only Google authentication

Production-ready deployment practices

📂 Backend Folder Structure
backend/
├── config/
│   ├── db.js
│   ├── passport.js
│   └── swagger.js
├── controllers/
├── routes/
├── models/
├── middleware/
├── validations/
├── cron/
├── server.js
└── .env

🔑 Environment Variables

Create a .env file in the backend root:

PORT=5001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

▶️ Running the Backend Locally
git clone https://github.com/your-username/gym-management-platform.git
cd gym-management-platform/backend
npm install
npm run dev


Server runs on:

http://localhost:5001

📘 API Documentation (Swagger)

Once backend is running, open:

http://localhost:5001/api-docs


You can:

Explore all APIs

Test endpoints

View request/response schemas

🔐 Authentication Flow (Google OAuth)

Frontend redirects user to /auth/google

Google authenticates the user

Backend creates/fetches user

JWT token is generated

Token is sent back to frontend

Frontend stores token and controls access

🌍 Deployment

Backend deployed on Render

MongoDB hosted on MongoDB Atlas

Environment variables managed securely

OAuth configured for production HTTPS

🎯 Future Enhancements

Real payment gateway integration

Admin dashboard

Reviews & ratings

Gym images upload

Notifications & reminders

Mobile-responsive frontend

Unit & integration tests

👨‍💻 Author

Darsh Tiwari
Aspiring Full-Stack Developer
Focused on building scalable, real-world applications

⭐ Why This Project Matters

This project demonstrates:

Real authentication flows

Clean backend architecture

Production deployment experience

API documentation skills

Full-stack system thinking

📌 Note

Frontend UI/UX is currently under active development.
Backend is fully functional and production-ready.
