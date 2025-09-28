# Grazac CNN Backend

This is the backend for CNN new platform, built with Node.js Express and MongoDB

1. Create .env and set MONGO_URI and JWT_SECRET.
2. Run `npm install` then `npm run dev`.
3. Endpoints:
- POST /api/auth/signup { firstName, lastName, email, password }
- POST /api/auth/login { email, password } -> returns token
- POST /api/news (Bearer token) { title, body }
- PUT /api/news/:id (Bearer token)
- DELETE /api/news/:id (Bearer token)
- GET /api/news
- GET /api/news/:id


Note: Use the `Authorization: Bearer <token>` header for protected routes.

## Live API URL
Available at your primary URL https://ccn-backend.onrender.com

## API Documentation
click here for full API documentation:
https://documenter.getpostman.com/view/47623253/2sB3QDvYbz