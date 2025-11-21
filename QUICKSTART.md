# Quick Start Guide

## 🚀 Get Started in 3 Steps

### Step 1: Install Dependencies

Open PowerShell and navigate to the project folder:

```powershell
cd c:\Users\asus\Desktop\projectonline

# Install backend dependencies
cd backend
npm install

# Install admin dependencies
cd ..\admin
npm install
```

### Step 2: Setup Backend

Create the `.env` file:

```powershell
cd ..\backend
Copy-Item .env.example .env
```

Edit `backend\.env` and update if needed:
- `MONGODB_URI` - Your MongoDB connection string
- `JWT_SECRET` - A secure random string for JWT tokens

### Step 3: Start Everything

**Terminal 1 - Start Backend:**
```powershell
cd backend
npm start
```

**Terminal 2 - Start Admin Panel:**
```powershell
cd admin
npm start
```

**Terminal 3 - Open Frontend:**
```powershell
cd frontend
# Open index.html in your browser
start index.html
```

## 📝 Create Admin User

In PowerShell:

```powershell
$body = @{
    username = "admin"
    email = "admin@example.com"
    password = "admin123"
    role = "admin"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/auth/register" -Method Post -Body $body -ContentType "application/json"
```

## 🎉 Access the Application

- **Frontend**: Open `frontend\index.html` in browser
- **Backend API**: http://localhost:5000
- **Admin Panel**: http://localhost:3000

Login to admin with:
- Email: `admin@example.com`
- Password: `admin123`

## ⚠️ Troubleshooting

**MongoDB Connection Error:**
- Make sure MongoDB is running: `mongod`
- Or use MongoDB Atlas and update the connection string

**Port Already in Use:**
- Backend: Change `PORT` in `.env`
- Admin: It will prompt you to use another port

**Admin Panel Errors:**
- Make sure backend is running first
- Check that API_URL in `admin\src\api.js` matches your backend URL

---

**Need more help? Check the full README.md**
