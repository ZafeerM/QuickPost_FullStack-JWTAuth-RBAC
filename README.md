# 🔐 QUICKPOST - JWT Authentication System (PERN Stack)

A secure, production-style authentication system built with the **PERN stack (PostgreSQL, Express, React-ready backend, Node.js)** implementing **JWT access & refresh token authentication**, **token rotation**, and **secure session handling**.

This project focuses on real-world backend security practices rather than tutorial-level authentication.

---

## ✨ Features

- User Signup & Login
- JWT Access & Refresh Token Authentication
- Refresh Token Rotation
- HTTP-only Cookie Storage for Refresh Tokens
- Access Token Renewal after Expiration
- Hashed Passwords & Refresh Tokens using bcrypt
- PostgreSQL Integration
- CORS Whitelist Configuration
- Text-based Logger Middleware
  - Separate logs for normal requests and errors
- Centralized Custom Error Handling
- Clean and scalable folder structure
- Fully tested using Postman

---

## 🛡️ Security Highlights

- Short-lived access tokens
- Refresh tokens are:
  - Stored in HTTP-only cookies
  - Hashed before saving in the database
  - Rotated on every refresh request
- Old refresh tokens are invalidated to prevent replay attacks
- JWTs are cryptographically verified before use
- Sensitive authentication logic remains server-side only

---

## 🔄 Authentication Flow

### 1. User Signup

- Password is hashed using bcrypt
- User data is stored in PostgreSQL

### 2. User Login

- On successful login:
  - Access Token is returned in the response
  - Refresh Token is stored in an HTTP-only cookie

### 3. Access Protected Routes

- Access token is sent via the `Authorization` header

### 4. Access Token Expired

- Client calls the refresh endpoint
- Refresh token is:
  - Verified and decoded
  - Compared against the hashed value in the database
  - Rotated and replaced
- A new access token is issued

---

## 🧪 Testing

- All authentication flows were tested using Postman
- Tested scenarios include:
  - Token expiration
  - Refresh token rotation
  - Invalid or tampered tokens
  - Unauthorized access attempts

---

## 🚧 Upcoming Features

- Role-Based Access Control (RBAC)
- Post CRUD functionality
- Role-restricted actions (Admin / User)
- Multi-session refresh token support (device-based sessions)

---

## 🎯 Project Purpose

This project was built to:

- Implement production-grade JWT authentication
- Practice secure session and token handling
- Avoid common security pitfalls
- Strengthen backend development skills for real-world applications

---

## 👤 Author

**Zafeer Mahmood**  
Backend Developer (Node.js / PostgreSQL)  
Focused on secure, scalable API design
