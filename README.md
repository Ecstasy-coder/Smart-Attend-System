# SmartAttend Pro - Module 1

This repository contains the Module 1 implementation for SmartAttend Pro: the Authentication Module.

## Tech stack

- Frontend: React.js, Vite, React Router
- Backend: Node.js, Express, MongoDB, JWT, bcrypt
- Database: MongoDB

## Structure

- `backend/` - Express API for registration, login, and JWT-protected profile access
- `frontend/` - React UI for Login, Register, and Profile pages

## Backend setup

1. Copy `backend/.env.example` to `backend/.env`
2. Update `MONGO_URI` if needed
3. Run:
   ```bash
   cd backend
   npm install
   npm run dev
   ```

## Frontend setup

1. Run:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## Notes

- The backend accepts face image uploads at registration and creates a deterministic placeholder `faceEncoding` from the uploaded file.
- JWT tokens are stored in the browser `localStorage` and used for profile access.
- The `profile` endpoint is protected using JWT authorization.
