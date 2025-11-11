# Personal Budget Tracker Application

A full-stack MERN (MongoDB, Express.js, React, Node.js) application for tracking personal finances, managing budgets, and visualizing financial data with interactive D3.js charts.

## 📋 Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Test Credentials](#test-credentials)
- [Deployment](#deployment)
- [Project Structure](#project-structure)
- [Feature Assumptions](#feature-assumptions)
- [LLM Usage Attribution](#llm-usage-attribution)
- [Third-Party Libraries](#third-party-libraries)
- [Screenshots](#screenshots)

## ✨ Features

### Authentication
- ✅ JWT-based authentication system
- ✅ Secure user login and registration
- ✅ Protected routes requiring authentication
- ✅ Token-based session management

### Dashboard
- ✅ Financial summary display (total income, total expenses, balance)
- ✅ **D3.js Bar Chart**: Budget vs. Expenses comparison with animations and tooltips
- ✅ **D3.js Pie Chart**: Category-wise expense distribution with interactive hover effects
- ✅ **D3.js Line Chart**: Transaction trends over time (last 30 days)
- ✅ Real-time data visualization with smooth animations

### Transaction Management
- ✅ Add new transactions (income/expense)
- ✅ Edit existing transactions
- ✅ Delete transactions with confirmation
- ✅ Categorize transactions (salary, groceries, entertainment, etc.)
- ✅ Date selection for transactions
- ✅ Description field for transaction details

### Transaction Overview
- ✅ Paginated transaction list (10 items per page)
- ✅ Filter by transaction type (income/expense)
- ✅ Filter by category
- ✅ Filter by date range (start date and end date)
- ✅ Filter by amount range (min and max amount)
- ✅ Reset filters functionality
- ✅ Responsive table design

### Budget Management
- ✅ Set monthly budget
- ✅ View current month's budget
- ✅ Compare budget against actual expenses
- ✅ Visual budget tracking with D3.js charts
- ✅ Budget balance calculation

## 🛠 Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT (jsonwebtoken)** - Authentication tokens
- **bcryptjs** - Password hashing
- **cors** - Cross-origin resource sharing
- **dotenv** - Environment variable management

### Frontend
- **React** (v19.2.0) - UI library
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client
- **D3.js** (v7.9.0) - Data visualization
- **CSS3** - Styling

## 📦 Prerequisites

Before running this application, ensure you have:

- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas account)
- **Git** (for cloning the repository)

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd dotproduct
```

### 2. Backend Setup

```bash
cd budget-tracker-backend
npm install
```

Create a `.env` file in the `budget-tracker-backend` directory:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/budget-tracker
JWT_SECRET=your_super_secret_jwt_key_here_change_in_production
NODE_ENV=development
```

**For MongoDB Atlas:**
```env
MONGO_URI=<your_mongodb_atlas_connection_string>
```

### 3. Frontend Setup

```bash
cd ../budget-tracker-frontend
npm install
```

Create a `.env` file in the `budget-tracker-frontend` directory:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

## ⚙️ Configuration

### MongoDB Setup

#### Option 1: Local MongoDB
1. Install MongoDB Community Edition
2. Start MongoDB service:
   ```bash
   # Windows
   net start MongoDB
   
   # macOS/Linux
   sudo systemctl start mongod
   ```

#### Option 2: MongoDB Atlas (Cloud)
1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get connection string and update `.env`

### Environment Variables

**Backend (.env)**
- `PORT`: Server port (default: 5000)
- `MONGO_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT tokens
- `NODE_ENV`: Environment mode (development/production)

**Frontend (.env)**
- `REACT_APP_API_URL`: Backend API base URL

## 🏃 Running the Application

### Development Mode

#### Terminal 1 - Backend
```bash
cd budget-tracker-backend
npm run dev
```
Backend will run on `http://localhost:5000`

#### Terminal 2 - Frontend
```bash
cd budget-tracker-frontend
npm start
```
Frontend will run on `http://localhost:3000`

### Production Mode

#### Backend
```bash
cd budget-tracker-backend
npm start
```

#### Frontend
```bash
cd budget-tracker-frontend
npm run build
# Serve the build folder using a static server
```

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response:
{
  "token": "jwt_token_here",
  "user": {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### Transaction Endpoints (Protected)

All transaction endpoints require `Authorization: Bearer <token>` header.

#### Get All Transactions (with pagination and filters)
```http
GET /api/transactions?page=1&limit=10&type=expense&category=groceries&startDate=2024-01-01&endDate=2024-12-31&minAmount=10&maxAmount=1000
Authorization: Bearer <token>

Response:
{
  "data": [...transactions],
  "pagination": {
    "total": 50,
    "page": 1,
    "totalPages": 5,
    "limit": 10
  }
}
```

#### Add Transaction
```http
POST /api/transactions
Authorization: Bearer <token>
Content-Type: application/json

{
  "type": "expense",
  "category": "groceries",
  "amount": 50.00,
  "description": "Weekly shopping",
  "date": "2024-11-09"
}
```

#### Update Transaction
```http
PUT /api/transactions/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "type": "expense",
  "category": "groceries",
  "amount": 60.00,
  "description": "Updated shopping",
  "date": "2024-11-09"
}
```

#### Delete Transaction
```http
DELETE /api/transactions/:id
Authorization: Bearer <token>
```

#### Get Transaction Statistics
```http
GET /api/transactions/stats
Authorization: Bearer <token>

Response:
{
  "income": 5000,
  "expenses": 3000,
  "balance": 2000,
  "categories": [...]
}
```

#### Get Categories
```http
GET /api/transactions/categories
Authorization: Bearer <token>

Response: ["groceries", "salary", "entertainment", ...]
```

### Budget Endpoints (Protected)

#### Get Budget Summary
```http
GET /api/budget/summary
Authorization: Bearer <token>

Response:
{
  "budget": 5000,
  "totalExpenses": 3000,
  "balance": 2000
}
```

#### Set/Update Budget
```http
POST /api/budget
Authorization: Bearer <token>
Content-Type: application/json

{
  "amount": 5000,
  "month": "2024-11"
}
```

## 🔑 Test Credentials

Use these credentials to test the application:

**Test Account 1:**
- Email: `test@example.com`
- Password: `test123`

**Test Account 2:**
- Email: `demo@example.com`
- Password: `demo123`

**Note:** If these accounts don't exist, you can create them using the registration form.

## 🌐 Deployment

### Backend Deployment (Render/Railway/Heroku)

1. Create account on deployment platform
2. Connect GitHub repository
3. Set environment variables:
   - `MONGO_URI`
   - `JWT_SECRET`
   - `NODE_ENV=production`
4. Deploy from `budget-tracker-backend` directory

### Frontend Deployment (Vercel/Netlify)

1. Create account on deployment platform
2. Connect GitHub repository
3. Set build settings:
   - Build command: `npm run build`
   - Publish directory: `build`
   - Root directory: `budget-tracker-frontend`
4. Set environment variable:
   - `REACT_APP_API_URL=<your-backend-url>/api`
5. Deploy

### Deployment Checklist
- [ ] MongoDB Atlas connection string configured
- [ ] Environment variables set on hosting platform
- [ ] CORS configured for production domain
- [ ] Frontend API URL points to production backend
- [ ] Test all features on deployed application
- [ ] Ensure application remains accessible for 20-30 days

## 📁 Project Structure

```
dotproduct/
├── budget-tracker-backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js                 # MongoDB connection
│   │   ├── controllers/
│   │   │   ├── authController.js     # Authentication logic
│   │   │   ├── budgetController.js   # Budget management
│   │   │   └── transactionController.js # Transaction CRUD
│   │   ├── middleware/
│   │   │   └── auth.js               # JWT authentication middleware
│   │   ├── models/
│   │   │   ├── User.js               # User schema
│   │   │   ├── Transaction.js        # Transaction schema
│   │   │   └── Budget.js             # Budget schema
│   │   ├── routes/
│   │   │   ├── authRoutes.js         # Auth endpoints
│   │   │   ├── budgetRoutes.js       # Budget endpoints
│   │   │   └── transactionRoutes.js  # Transaction endpoints
│   │   └── server.js                 # Express app entry point
│   ├── .env                          # Environment variables
│   ├── package.json
│   └── README.md
│
├── budget-tracker-frontend/
│   ├── public/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.js              # Login page
│   │   │   ├── Dashboard.js          # Dashboard with D3 charts
│   │   │   └── Transactions.js       # Transaction management
│   │   ├── services/
│   │   │   └── api.js                # Axios configuration
│   │   ├── styles/
│   │   │   └── transactions.css      # Transaction styles
│   │   ├── App.js                    # Main app component
│   │   └── index.js                  # React entry point
│   ├── .env                          # Environment variables
│   ├── package.json
│   └── README.md
│
└── README.md                         # This file
```

## 💡 Feature Assumptions

1. **User Registration**: While the assessment mentions registration is not required, we've implemented it for testing purposes. Users can create accounts or use test credentials.

2. **Transaction Categories**: Users can enter any category name. The system automatically tracks unique categories and displays them in filter dropdowns.

3. **Budget Period**: Budget is set on a monthly basis. The system compares the current month's expenses against the set budget.

4. **Date Handling**: All dates are stored in ISO format. The frontend uses native HTML date inputs for better browser compatibility.

5. **Pagination**: Default page size is 10 transactions. Users can navigate through pages using pagination controls.

6. **Filters**: Multiple filters can be applied simultaneously. Filters are applied on the backend for better performance.

7. **Data Visualization**: 
   - Bar chart shows budget vs. actual expenses
   - Pie chart shows expense distribution by category
   - Line chart shows income/expense trends over the last 30 days

8. **Authentication**: JWT tokens are stored in localStorage. Tokens expire after 30 days.

9. **Transaction Editing**: Users can edit all fields of a transaction except the user association.

10. **Responsive Design**: The application is designed to work on desktop, tablet, and mobile devices.

## 🤖 LLM Usage Attribution

This project was developed with assistance from AI language models (Claude/ChatGPT) for:

1. **Code Generation**:
   - Initial boilerplate setup for MERN stack
   - D3.js chart implementation and animations
   - API endpoint structure and error handling
   - React component structure

2. **Problem Solving**:
   - Debugging authentication flow
   - Optimizing MongoDB queries for filtering
   - Implementing pagination logic
   - CSS styling and responsive design

3. **Documentation**:
   - README structure and content
   - API documentation format
   - Code comments and explanations

4. **Best Practices**:
   - Security implementations (JWT, password hashing)
   - Error handling patterns
   - Code organization and structure

**Developer Understanding**: All code has been reviewed, understood, and tested by the developer. The developer can explain and defend every implementation decision and code segment.

## 📚 Third-Party Libraries

### Backend Dependencies
- **express** (^4.21.2) - Web framework for Node.js
- **mongoose** (^8.9.3) - MongoDB object modeling
- **jsonwebtoken** (^9.0.2) - JWT implementation
- **bcryptjs** (^2.4.3) - Password hashing
- **cors** (^2.8.5) - Enable CORS
- **dotenv** (^16.4.7) - Environment variables
- **nodemon** (^3.1.9) - Development server auto-restart

### Frontend Dependencies
- **react** (^19.2.0) - UI library
- **react-dom** (^19.2.0) - React DOM rendering
- **react-router-dom** (^7.9.5) - Routing
- **axios** (^1.13.2) - HTTP client
- **d3** (^7.9.0) - Data visualization library
- **@craco/craco** (^7.1.0) - Create React App configuration

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting (if configured)

## 📸 Screenshots

### Login Page
- Clean, modern login interface
- Email and password authentication
- Link to registration (if needed)

### Dashboard
- Financial summary cards
- D3.js Bar Chart (Budget vs. Expenses)
- D3.js Pie Chart (Expense Distribution)
- D3.js Line Chart (Transaction Trends)
- Recent transactions table

### Transactions Page
- Add transaction form
- Filter section (type, category, date range, amount range)
- Paginated transaction list
- Edit and delete actions
- Responsive design

### Budget Management
- Set monthly budget form
- Budget comparison display
- Visual progress indicators

## 🐛 Known Issues & Future Enhancements

### Known Issues
- None at the time of submission

### Future Enhancements
- Export transactions to CSV/PDF
- Recurring transactions
- Multi-currency support
- Budget alerts and notifications
- Advanced analytics and reports
- Mobile app version
- Dark mode theme

## 📝 License

This project is created for assessment purposes.

## 👤 Contact

For any queries regarding this project, please contact through the provided assessment form.

---

**Submission Date**: [To be filled]
**Candidate Name**: [To be filled]
**Assessment Round**: Technical Round 1

**Note**: This application will remain accessible and functional for 30 days from the submission date as required.
