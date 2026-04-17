# Frontend Integration with JWT APIs (Session-Based UI)

**Based on Experiment 8** - Frontend Role-Based Access Control with JWT Authentication

This project demonstrates a **secure React frontend** that consumes JWT APIs from a Spring Boot backend, implementing session-based authentication with role-based access control (RBAC). The application features a premium Tailwind-based design system (Material Design 3 aesthetic) with role-based dashboards for users and administrators.

---

## 🎯 Objectives

- ✅ Build a secure frontend UI that consumes JWT APIs
- ✅ Implement session-based authentication (JWT token stored per session)
- ✅ Restrict access to pages based on login state
- ✅ Implement role-based access control (USER and ADMIN roles)
- ✅ Display authenticated user information and role-based dashboards
- ✅ Demonstrate API calls with Bearer token authorization

---

## 🧩 Features Implemented

### 1. **Login Portal** (`interfaces/LoginPortal.js`)
- User enters **Username & Password**
- Calls: `POST /auth/signin`
- On success:
  - Stores JWT token in `sessionStorage` with key `"token"`
  - Stores username in `sessionStorage` with key `"user"`
  - Stores user role in `sessionStorage` with key `"role"`
  - Redirects based on role:
    - **ADMIN** → `/admin` (AdminNexus dashboard)
    - **USER** → `/user` (UserInterface dashboard)
- Error handling with user feedback
- Enhanced UI with password visibility toggle

### 2. **Protected User Dashboard** (`interfaces/UserInterface.js`)
- ✅ Only accessible if JWT token exists in sessionStorage
- ✅ Displays authenticated user's profile
- ✅ Calls: `GET /api/user/profile`
- ✅ Authorization header: `Authorization: Bearer <token>`
- Features:
  - Synchronize Profile (calls protected API)
  - Session display with username
  - Sign Out functionality

### 3. **Protected Admin Dashboard** (`interfaces/AdminNexus.js`)
- ✅ Only accessible if user has **ADMIN** role
- ✅ Access control validation on component mount
- ✅ Calls: `GET /api/admin/dashboard`
- ✅ Authorization header: `Authorization: Bearer <token>`
- Features:
  - Admin Nexus Controls
  - Access admin-specific APIs
  - Full system operations access
  - Terminate Session functionality

### 4. **Logout Functionality**
- Clears sessionStorage: `sessionStorage.clear()`
- Removes all user data (token, user, role)
- Redirects to login page: `window.location.href = "/"`

### 5. **Session-Based Restriction Logic**
- **Token exists** → Allow access to respective dashboard
- **No token** → Redirect to login page (`LoginPortal`)
- **Wrong role** → Restrict access to role-specific pages
- **ADMIN access USER page** → Allowed (downgrade navigation)
- **USER access ADMIN page** → Redirected to USER dashboard

---

## 💻 Tech Stack

| Technology | Purpose |
|-----------|---------|
| **React** | Frontend framework (v19.2.5) |
| **Axios** | HTTP client for API calls (v1.15.0) |
| **Bootstrap** | CSS framework for responsive layout (v5.3.8) |
| **Material UI** | Component library (v9.0.0) |
| **Tailwind CSS** | Premium styling with custom design tokens |
| **@emotion/react** | CSS-in-JS for styled components (v11.14.0) |
| **@emotion/styled** | Styled component library (v11.14.1) |

---

## ⚙️ Installation & Setup

### Prerequisites
- Node.js 14+
- npm or yarn

### Step 1: Create React App (if not already created)
```bash
npx create-react-app frontend
cd frontend
```

### Step 2: Install Dependencies
```bash
npm install axios bootstrap @mui/material @emotion/react @emotion/styled
```

### Step 3: Add Bootstrap CSS
Bootstrap CSS is already imported in `src/index.js`:
```javascript
import 'bootstrap/dist/css/bootstrap.min.css';
```

### Step 4: Run the Application
```bash
npm start
```

Frontend runs at: `http://localhost:3000`

---

## 🧱 React Implementation Details

### **App.js** - Main Routing Logic
- Handles client-side routing based on `window.location.pathname`
- Checks for token existence in `sessionStorage`
- Checks user role from `sessionStorage`
- Routes:
  - `/` → **LoginPortal** (if not authenticated) or **Dashboard** (if authenticated)
  - `/admin` → **AdminNexus** (ADMIN only)
  - `/user` → **UserInterface** (USER or ADMIN)
- Auto-redirects based on authentication state and role

### **LoginPortal.js** - Authentication Component
```javascript
// Login flow:
1. User submits email and password
2. Axios POST to http://localhost:8080/auth/signin
3. Receive { token, username, role } response
4. Store in sessionStorage
5. Redirect to /admin or /user based on role
```

Key features:
- Form validation
- Error state management
- Password visibility toggle
- "Remember Me" option (UI only)
- Premium Material Design 3 aesthetic

### **UserInterface.js** - User Dashboard
```javascript
// Protected flow:
1. Check if token exists in sessionStorage
2. If no token, redirect to /
3. Display user profile and username
4. Call GET /api/user/profile with Bearer token
5. Display response data
6. Allow logout (clear sessionStorage)
```

### **AdminNexus.js** - Admin Dashboard
```javascript
// Admin-only flow:
1. Check if role === "ADMIN"
2. If not ADMIN, redirect to /
3. Display admin controls
4. Call GET /api/admin/dashboard with Bearer token
5. Call GET /api/user/profile endpoint
6. Full system access
7. Terminate session capability
```

---

## 🔐 Authentication & Authorization Flow

```
┌─────────────────┐
│   LoginPortal   │
│  (Unauthenticated)
└────────┬────────┘
         │ POST /auth/signin
         │ (username, password)
         │
         ├─────────────────────────────────────┐
         │                                     │
    ✅ SUCCESS                            ❌ FAILURE
         │                                     │
    Store in                            Show Error
    sessionStorage:                      Message
    - token
    - user
    - role
         │
         ├─ role === "ADMIN"
         │  ↓
         └─ /admin (AdminNexus)
         │
         ├─ role === "USER"
         │  ↓
         └─ /user (UserInterface)
         │
    ✅ Protected API Calls
         │ Authorization: Bearer {token}
         │
         ├─ GET /api/admin/dashboard (ADMIN)
         └─ GET /api/user/profile (USER/ADMIN)
```

---

## 📊 API Endpoints Used

| Method | Endpoint | Purpose | Auth Required | Role |
|--------|----------|---------|---------------|------|
| POST | `/auth/signin` | User login | ❌ | All |
| GET | `/api/user/profile` | Fetch user profile | ✅ | USER, ADMIN |
| GET | `/api/admin/dashboard` | Admin dashboard data | ✅ | ADMIN only |

### Example API Call with JWT
```javascript
const token = sessionStorage.getItem("token");

const response = await axios.get("http://localhost:8080/api/user/profile", {
  headers: {
    Authorization: `Bearer ${token}`
  }
});
```

---

## 📁 Project Structure

```
frontend/
├── src/
│   ├── interfaces/
│   │   ├── LoginPortal.js          (Login form component)
│   │   ├── UserInterface.js        (User dashboard)
│   │   ├── AdminNexus.js           (Admin dashboard)
│   │   └── Authentication.js       (Alternative auth component)
│   ├── App.js                       (Main routing logic)
│   ├── App.css                      (App styles)
│   ├── index.js                     (React entry point)
│   ├── index.css                    (Global styles)
│   └── platform-icon.svg            (Brand icon)
├── public/
│   ├── index.html                   (HTML template)
│   ├── favicon.ico
│   └── manifest.json
├── package.json                     (Dependencies)
├── README.md                        (This file)
└── build/                           (Production build output)
```

---

## 📸 Required Screenshots & Testing

To validate the implementation, capture screenshots for:

1. **✅ Login from Frontend (React UI)**
   - Shows LoginPortal with email and password fields
   - Displays "ATELIER" branding

2. **✅ Token Stored in sessionStorage**
   - DevTools → Application → Session Storage
   - Shows keys: `token`, `user`, `role`

3. **✅ User Accessing /api/user/profile**
   - USER dashboard loads
   - "Synchronize Profile" button shows response
   - Data visible on UI

4. **✅ User Accessing Admin API (Denied)**
   - USER attempting `/admin` route
   - Auto-redirect to `/user` dashboard
   - Shows access restriction

5. **✅ Admin Accessing /api/admin/dashboard**
   - ADMIN dashboard loads (AdminNexus)
   - Admin controls visible
   - Response from admin endpoint displayed

6. **✅ Logout Functionality**
   - "Sign Out" or "Terminate" button clears sessionStorage
   - Redirect to LoginPortal
   - Token removed from session

7. **✅ Unauthorized Access Handling**
   - Directly visiting `/admin` without token
   - Redirect to login page
   - Visiting `/user` without token
   - Redirect to login page

---

## 🔧 Default Test Credentials

Username: `dev`
Password: `pass123`

---

## 🚀 Running the Full Stack

### Terminal 1 - Backend (Spring Boot)
```bash
cd <project-root>
mvn spring-boot:run
# Backend runs at http://localhost:8080
```

### Terminal 2 - Frontend (React)
```bash
cd frontend
npm start
# Frontend runs at http://localhost:3000
```

---

## 📘 Key Implementation Details

### Session Storage Keys
```javascript
sessionStorage.getItem("token");  // JWT token
sessionStorage.getItem("user");   // Username
sessionStorage.getItem("role");   // ADMIN or USER
```

### Protected Route Check
```javascript
const token = sessionStorage.getItem("token");
if (!token) {
  window.location.href = "/";  // Redirect to login
}
```

### API Call Pattern
```javascript
const token = sessionStorage.getItem("token");
const response = await axios.get(url, {
  headers: {
    Authorization: `Bearer ${token}`
  }
});
```

### Logout Pattern
```javascript
const logout = () => {
  sessionStorage.clear();
  window.location.href = "/";
};
```

---

## 🎨 Design System

The application uses a **premium Material Design 3 aesthetic** with:
- Custom design tokens (surface colors, semantic tokens)
- Tailwind CSS for responsive layout
- Smooth transitions and hover states
- Dark mode support
- Mobile-responsive design

---

## ✨ Features Highlights

- 🔐 **JWT-based Authentication** - Secure token-based auth
- 👥 **Role-Based Access Control** - Different dashboards for USER and ADMIN
- 📱 **Responsive Design** - Works on desktop, tablet, mobile
- 🎨 **Premium UI** - Material Design 3 aesthetic
- ⚡ **Fast API Calls** - Axios for efficient HTTP requests
- 🔄 **Session Management** - SessionStorage for temporary token storage
- 🚀 **Production Ready** - Error handling, validation, redirects
- 🎯 **User Feedback** - Error messages and loading states

---

## 📝 Summary

This React frontend application provides a complete, production-ready implementation of JWT-based authentication with role-based access control. It consumes Spring Boot backend APIs, stores authentication tokens securely in sessionStorage, enforces access restrictions based on user roles, and provides a premium user experience with Material Design 3 aesthetics.

The application demonstrates:
- ✅ Secure API communication with Bearer tokens
- ✅ Session-based authentication flow
- ✅ Role-based routing and access control
- ✅ Error handling and user feedback
- ✅ Professional UI/UX with responsive design

---

## 🔗 Related Documentation

- **Backend Repository**: EXP-6 JWT Authentication Spring Boot
- **API Documentation**: See backend `/auth/signin`, `/api/user/profile`, `/api/admin/dashboard`
- **React Documentation**: https://reactjs.org/
- **Axios Documentation**: https://axios-http.com/
