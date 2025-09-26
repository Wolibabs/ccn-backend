# Grazac CNN Backend


1. Copy files into folder structure.
2. Create .env and set MONGO_URI and JWT_SECRET.
3. Run `npm install` then `npm run dev`.
4. Endpoints:
- POST /api/auth/signup { firstName, lastName, email, password }
- POST /api/auth/login { email, password } -> returns token
- POST /api/news (Bearer token) { title, body }
- PUT /api/news/:id (Bearer token)
- DELETE /api/news/:id (Bearer token)
- GET /api/news
- GET /api/news/:id


Note: Use the `Authorization: Bearer <token>` header for protected routes.