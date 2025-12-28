# ShoppyGlobe Backend — API Run & Test Guide

This document explains how to run the backend API locally and how to perform basic API testing. The project has been configured to start an in-memory MongoDB automatically when no `MONGODB_URI` environment variable is provided, so the API can run without requiring a local MongoDB installation.

## Run the server

Open a terminal in `backend/` and run:

```powershell
cd backend
npm install
npm run dev
```

- `npm run dev` uses `nodemon` and will start the server on port `5000` by default.
- If no `MONGODB_URI` is set, the server uses `mongodb-memory-server` (an in-memory MongoDB) so endpoints that require the database will work for testing.

## Health check

Request:

```bash
curl -sS http://localhost:5000/
```

Example response:

```json
{ "message": "ShoppyGlobe API is running" }
```

## Example API checks

- GET all products:

```bash
curl -sS http://localhost:5000/api/products
```

- GET a product by id:

```bash
curl -sS http://localhost:5000/api/products/<PRODUCT_ID>
```

- Register a user (to test auth):

```bash
curl -sS -X POST http://localhost:5000/api/auth/register -H "Content-Type: application/json" -d '{"name":"Test","email":"test@example.com","password":"password"}'
```

- Login (returns JWT):

```bash
curl -sS -X POST http://localhost:5000/api/auth/login -H "Content-Type: application/json" -d '{"email":"test@example.com","password":"password"}'
```

- Use the JWT to test protected cart endpoints (example):

```bash
curl -sS -H "Authorization: Bearer <JWT_TOKEN>" http://localhost:5000/api/cart
```

## Notes for submission

- I pushed these changes to your repository: https://github.com/ALLAGEETHA/E-Commerce-Website
- The repository now includes `mongodb-memory-server` so the API can be started without a separate MongoDB installation.
- For assignment submission, please capture screenshots of the terminal showing:
  - `npm run dev` output with "MongoDB connected successfully" and "ShoppyGlobe API server running on port 5000".
  - Successful responses from the sample `curl` requests above.

If you want, I can run the curl checks now and capture the outputs into a file in the repo for you to screenshot. Would you like me to do that now?
