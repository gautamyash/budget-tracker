# Deployment Guide - Personal Budget Tracker

This guide provides step-by-step instructions for deploying the Budget Tracker application to production.

## 📋 Table of Contents
- [Prerequisites](#prerequisites)
- [Backend Deployment](#backend-deployment)
- [Frontend Deployment](#frontend-deployment)
- [Post-Deployment Checklist](#post-deployment-checklist)
- [Troubleshooting](#troubleshooting)

## Prerequisites

Before deploying, ensure you have:

1. ✅ GitHub account with your code repository
2. ✅ MongoDB Atlas account (for cloud database)
3. ✅ Deployment platform accounts:
   - Backend: Render, Railway, or Heroku
   - Frontend: Vercel or Netlify
4. ✅ All code committed and pushed to GitHub

## 🗄️ MongoDB Atlas Setup

### 1. Create MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for a free account
3. Create a new organization (if needed)

### 2. Create a Cluster
1. Click "Build a Database"
2. Choose "M0 Sandbox" (Free tier)
3. Select a cloud provider and region (choose closest to your users)
4. Name your cluster (e.g., "budget-tracker-cluster")
5. Click "Create"

### 3. Configure Database Access
1. Go to "Database Access" in the left sidebar
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Create username and password (save these securely!)
5. Set user privileges to "Read and write to any database"
6. Click "Add User"

### 4. Configure Network Access
1. Go to "Network Access" in the left sidebar
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (for deployment platforms)
4. Click "Confirm"

### 5. Get Connection String
1. Go to "Database" in the left sidebar
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your database user password
6. Replace `<dbname>` with `budget-tracker`

Example:
```
mongodb+srv://<username>:<password>@<cluster>/<database>?retryWrites=true&w=majority
```

## 🚀 Backend Deployment (Using Render)

### 1. Prepare Backend for Deployment

Update `budget-tracker-backend/package.json`:
```json
{
  "scripts": {
    "start": "node src/server.js",
    "dev": "nodemon src/server.js"
  },
  "engines": {
    "node": ">=14.0.0"
  }
}
```

### 2. Create Render Account
1. Go to [Render](https://render.com)
2. Sign up with GitHub

### 3. Deploy Backend
1. Click "New +" → "Web Service"
2. Connect your GitHub repository
3. Configure the service:
   - **Name**: `budget-tracker-backend`
   - **Root Directory**: `budget-tracker-backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free`

4. Add Environment Variables:
   ```
   PORT=5000
   MONGO_URI=<your-mongodb-atlas-connection-string>
   JWT_SECRET=<generate-a-strong-random-secret>
   NODE_ENV=production
   ```

5. Click "Create Web Service"

6. Wait for deployment (5-10 minutes)

7. Copy your backend URL (e.g., `https://budget-tracker-backend.onrender.com`)

### Alternative: Railway Deployment

1. Go to [Railway](https://railway.app)
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Add environment variables (same as above)
6. Set root directory to `budget-tracker-backend`
7. Deploy

## 🎨 Frontend Deployment (Using Vercel)

### 1. Prepare Frontend for Deployment

Update `budget-tracker-frontend/.env.production`:
```env
REACT_APP_API_URL=https://your-backend-url.onrender.com/api
```

### 2. Create Vercel Account
1. Go to [Vercel](https://vercel.com)
2. Sign up with GitHub

### 3. Deploy Frontend
1. Click "Add New..." → "Project"
2. Import your GitHub repository
3. Configure project:
   - **Framework Preset**: Create React App
   - **Root Directory**: `budget-tracker-frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`

4. Add Environment Variable:
   ```
   REACT_APP_API_URL=https://your-backend-url.onrender.com/api
   ```

5. Click "Deploy"

6. Wait for deployment (3-5 minutes)

7. Your app will be live at `https://your-app-name.vercel.app`

### Alternative: Netlify Deployment

1. Go to [Netlify](https://www.netlify.com)
2. Sign up with GitHub
3. Click "Add new site" → "Import an existing project"
4. Connect to GitHub and select your repository
5. Configure build settings:
   - **Base directory**: `budget-tracker-frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `budget-tracker-frontend/build`
6. Add environment variable: `REACT_APP_API_URL`
7. Click "Deploy site"

## 🔧 Post-Deployment Configuration

### 1. Update Backend CORS

Update `budget-tracker-backend/src/server.js`:
```javascript
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'https://your-frontend-url.vercel.app'
  ],
  credentials: true
};

app.use(cors(corsOptions));
```

Redeploy backend after this change.

### 2. Test All Features

Visit your deployed frontend and test:
- [ ] User registration
- [ ] User login
- [ ] Dashboard loads with charts
- [ ] Add transaction
- [ ] Edit transaction
- [ ] Delete transaction
- [ ] Filter transactions
- [ ] Pagination works
- [ ] Set budget
- [ ] View budget comparison

### 3. Create Test Accounts

Create test accounts for submission:
```
Email: test@example.com
Password: test123

Email: demo@example.com
Password: demo123
```

## ✅ Post-Deployment Checklist

- [ ] MongoDB Atlas cluster is running
- [ ] Backend is deployed and accessible
- [ ] Frontend is deployed and accessible
- [ ] Environment variables are set correctly
- [ ] CORS is configured for production domain
- [ ] All API endpoints are working
- [ ] D3.js charts are rendering correctly
- [ ] Authentication flow works end-to-end
- [ ] Test accounts are created
- [ ] Application is responsive on mobile
- [ ] No console errors in browser
- [ ] API responses are fast (<2 seconds)

## 📝 Submission Information

### URLs to Submit

1. **Frontend URL**: `https://your-app.vercel.app`
2. **Backend API URL**: `https://your-backend.onrender.com/api`
3. **GitHub Repository**: `https://github.com/yourusername/budget-tracker`

### Test Credentials

```
Email: test@example.com
Password: test123
```

### Documentation Links

- Main README: `/README.md`
- API Documentation: In README.md under "API Documentation"
- Deployment Guide: `/DEPLOYMENT.md`

## 🐛 Troubleshooting

### Backend Issues

**Issue**: Backend not starting
- Check Render logs for errors
- Verify MongoDB connection string
- Ensure all environment variables are set
- Check Node.js version compatibility

**Issue**: CORS errors
- Add frontend URL to CORS whitelist
- Redeploy backend after changes
- Clear browser cache

**Issue**: Database connection failed
- Verify MongoDB Atlas IP whitelist includes 0.0.0.0/0
- Check database user credentials
- Ensure connection string is correct

### Frontend Issues

**Issue**: API calls failing
- Verify `REACT_APP_API_URL` is set correctly
- Check if backend is running
- Open browser console for error details
- Verify CORS configuration

**Issue**: Charts not rendering
- Check browser console for D3.js errors
- Verify data is being fetched from API
- Clear browser cache and reload

**Issue**: Build fails
- Check for missing dependencies
- Run `npm install` locally
- Verify package.json scripts
- Check Node.js version

### Database Issues

**Issue**: Slow queries
- Add indexes to frequently queried fields
- Optimize aggregation pipelines
- Consider upgrading MongoDB Atlas tier

**Issue**: Connection timeout
- Check network access settings in MongoDB Atlas
- Verify connection string format
- Increase timeout in Mongoose connection

## 🔄 Continuous Deployment

### Automatic Deployments

Both Vercel and Render support automatic deployments:

1. **Push to main branch** → Automatic deployment
2. **Pull request** → Preview deployment
3. **Merge PR** → Production deployment

### Manual Redeployment

**Render:**
1. Go to your service dashboard
2. Click "Manual Deploy" → "Deploy latest commit"

**Vercel:**
1. Go to your project dashboard
2. Click "Deployments"
3. Click "Redeploy" on any deployment

## 📊 Monitoring

### Backend Monitoring (Render)
- View logs in Render dashboard
- Set up email alerts for downtime
- Monitor resource usage

### Frontend Monitoring (Vercel)
- View analytics in Vercel dashboard
- Monitor build times
- Track deployment status

### Database Monitoring (MongoDB Atlas)
- View metrics in Atlas dashboard
- Set up performance alerts
- Monitor connection count

## 🔒 Security Best Practices

1. **Environment Variables**
   - Never commit `.env` files
   - Use strong JWT secrets
   - Rotate secrets periodically

2. **Database Security**
   - Use strong database passwords
   - Limit IP access when possible
   - Enable MongoDB Atlas encryption

3. **API Security**
   - Implement rate limiting
   - Validate all inputs
   - Use HTTPS only

4. **Frontend Security**
   - Sanitize user inputs
   - Implement CSP headers
   - Keep dependencies updated

## 📞 Support

For deployment issues:
1. Check platform documentation (Render, Vercel, MongoDB Atlas)
2. Review error logs carefully
3. Search for similar issues on Stack Overflow
4. Contact platform support if needed

---

**Last Updated**: November 2024
**Deployment Platforms**: Render (Backend), Vercel (Frontend), MongoDB Atlas (Database)
