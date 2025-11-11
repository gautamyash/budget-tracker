# Budget Tracker (MERN)

A full-stack personal finance tracker built with MongoDB, Express, React, and Node.js. Users can manage transactions, set monthly budgets, and view interactive D3.js charts summarising their finances.

## ✨ Features

- JWT-secured login and registration.
- Transactions CRUD with filters (type, category, amount, date range) and pagination.
- Monthly budget management with balance calculation.
- Interactive D3 visualisations (bar, donut, line charts).
- Responsive UI optimised for desktop and mobile.

## 🧱 Tech Stack

| Layer     | Tools |
|-----------|-------|
| Frontend  | React 19, React Router, Axios, D3.js |
| Backend   | Node.js 20+, Express 5, Mongoose 8 |
| Database  | MongoDB Atlas or local MongoDB |
| Auth      | JSON Web Tokens (JWT), bcrypt |

## 📦 Prerequisites

- Node.js v18 or newer (recommended v20).
- npm or yarn.
- MongoDB (Atlas cluster or local instance).
- Git (for cloning or pulling updates).

## 🔐 Environment Variables

Create a `.env` file in `budget-tracker-backend/`:

```
MONGO_URI=<your_mongodb_connection_string>
JWT_SECRET=<32+ character secret>
NODE_ENV=development
PORT=5000
```

Optional `.env` for the frontend (`budget-tracker-frontend/.env`):

```
REACT_APP_API_URL=http://localhost:5000/api
```

> ⚠️ Never commit `.env` files or secrets. These keys must be set in the hosting provider’s dashboard when deploying.

## 🛠 Local Development

1. Clone the repository and install dependencies:
   ```bash
   git clone <repo-url>
   cd dotproduct
   cd budget-tracker-backend && npm install
   cd ../budget-tracker-frontend && npm install
   ```
2. Start MongoDB (or ensure your Atlas cluster is reachable).
3. Launch the backend (from `budget-tracker-backend/`):
   ```bash
   npm run dev
   ```
4. Launch the frontend (from `budget-tracker-frontend/`):
   ```bash
   npm start
   ```
5. Visit `http://localhost:3000` in the browser. The React app proxies API requests to the backend at `http://localhost:5000/api`.

## 📡 API Overview

All endpoints are prefixed with `/api`.

- `POST /api/auth/register` – create user.
- `POST /api/auth/login` – authenticate and receive JWT.
- `GET /api/transactions` – list with optional query filters.
- `POST /api/transactions` – create transaction.
- `PUT /api/transactions/:id` – update transaction.
- `DELETE /api/transactions/:id` – remove transaction.
- `GET /api/budget/summary` – monthly budget summary.
- `POST /api/budget` – set or update monthly budget.

Include header `Authorization: Bearer <token>` for protected routes.

## 🚀 Deploying on Vercel

This repository is configured to deploy both frontend and backend on Vercel using `vercel.json` and a serverless Express function.

1. Push all changes to GitHub.
2. On Vercel, import the repository.
3. In project **Environment Variables**, add:
   - `MONGO_URI`
   - `JWT_SECRET`
   - `NODE_ENV=production`
   - `REACT_APP_API_URL=https://<your-vercel-domain>/api`
4. Deploy. Vercel builds the React app from `budget-tracker-frontend` and serves the Express app via serverless functions under `/api/*`.
5. After deployment, test the live site end-to-end (auth, charts, transactions, budget).

### Local development after Vercel refactor

- The backend now exports an Express app (`src/server.js`).
- `index.js` runs the app locally (`npm run dev`).
- The frontend defaults to `/api` when `REACT_APP_API_URL` is absent, so the production build works on Vercel without additional configuration.

## ✅ Verification Checklist

- [ ] Environment variables configured (local + Vercel).
- [ ] MongoDB Atlas IP access allows production deployment.
- [ ] Frontend connects to `/api` and charts render with real data.
- [ ] JWT tokens stored in localStorage clear on logout.
- [ ] README reviewed by reviewer for setup instructions (this file).

## 🧪 Testing Suggestions

- Register, login, and verify JWT auth in DevTools (network tab).
- Add multiple transactions, apply filters and ensure pagination updates.
- Set a budget and confirm chart updates.
- Inspect console/logs for errors during API calls or D3 rendering.

## 📞 Support

For deployment or setup issues, provide:
- Vercel deployment URL.
- Backend logs (Vercel Function logs panel).
- MongoDB Atlas connection status.

Enjoy tracking your finances!
