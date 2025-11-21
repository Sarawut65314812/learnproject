# Project Online - Full Stack Application

A complete full-stack web application with visitor tracking, user authentication, and admin panel.

## 🚀 Features

- **Backend API** (Node.js + Express + MongoDB)
  - RESTful API endpoints
  - JWT authentication
  - User registration and login
  - Item CRUD operations
  - Visitor tracking system
  
- **Frontend** (HTML/CSS/JavaScript)
  - Display items from API
  - Automatic visitor tracking
  - Responsive design
  
- **Admin Panel** (React + TailwindCSS)
  - Secure login with JWT
  - Dashboard with statistics
  - Visitor analytics
  - Item management (CRUD)
  - Beautiful charts and UI

## 📁 Project Structure

```
projectonline/
├── backend/
│   ├── server.js
│   ├── config.js
│   ├── package.json
│   ├── .env.example
│   ├── routes/
│   │   ├── auth.js
│   │   ├── items.js
│   │   └── visitors.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Item.js
│   │   └── Visitor.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── itemController.js
│   │   └── visitorController.js
│   └── middleware/
│       └── authMiddleware.js
├── frontend/
│   ├── index.html
│   └── app.js
└── admin/
    ├── package.json
    ├── tailwind.config.js
    ├── postcss.config.js
    ├── public/
    │   └── index.html
    └── src/
        ├── index.js
        ├── index.css
        ├── App.js
        ├── api.js
        └── pages/
            ├── Login.js
            ├── Dashboard.js
            └── Items.js
```

## 🛠️ การติดตั้งและตั้งค่า

### สิ่งที่ต้องเตรียม

- Node.js (เวอร์ชัน 14 ขึ้นไป)
- MongoDB (แบบ local หรือ Atlas)
- npm หรือ yarn

### ขั้นตอนที่ 1: ตั้งค่า Backend

```bash
# เข้าไปในโฟลเดอร์ backend
cd backend

# ติดตั้ง dependencies
npm install

# สร้างไฟล์ .env จาก example
copy .env.example .env

# แก้ไขไฟล์ .env ด้วย MongoDB URI และ JWT secret ของคุณ
# ตัวอย่าง:
# PORT=5000
# MONGODB_URI=mongodb://localhost:27017/projectonline
# JWT_SECRET=your-super-secret-key-change-this

# เริ่มเซิร์ฟเวอร์ backend
npm start

# หรือใช้ nodemon สำหรับการพัฒนา
npm run dev
```

Backend จะรันที่ `http://localhost:5000`

### ขั้นตอนที่ 2: ตั้งค่า Frontend

Frontend เป็นหน้าเว็บ HTML ธรรมดาที่สามารถเปิดได้โดยตรง:

```bash
# เข้าไปในโฟลเดอร์ frontend
cd frontend

# เปิดไฟล์ index.html ในเบราว์เซอร์
# หรือใช้ local server:
# ใช้ Python:
python -m http.server 8000

# ใช้ Node.js http-server:
npx http-server -p 8000
```

Frontend จะเปิดที่ `http://localhost:8000`

### ขั้นตอนที่ 3: ตั้งค่า Admin Panel

```bash
# เข้าไปในโฟลเดอร์ admin
cd admin

# ติดตั้ง dependencies
npm install

# เริ่ม React development server
npm start
```

Admin panel จะรันที่ `http://localhost:3000`

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Items
- `GET /api/items` - Get all items (public)
- `GET /api/items/:id` - Get single item (public)
- `POST /api/items` - Create item (admin only)
- `PUT /api/items/:id` - Update item (admin only)
- `DELETE /api/items/:id` - Delete item (admin only)

### Visitors
- `POST /api/track` - Track visitor (public)
- `GET /api/visitors` - Get all visitors (admin only)
- `GET /api/visitors/stats` - Get visitor statistics (admin only)

## 🔐 สร้างผู้ใช้ Admin

ใช้เครื่องมืออย่าง Postman หรือ curl เพื่อสร้างผู้ใช้ admin:

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "email": "admin@example.com",
    "password": "admin123",
    "role": "admin"
  }'
```

หรือใช้ PowerShell:

```powershell
$body = @{
    username = "admin"
    email = "admin@example.com"
    password = "admin123"
    role = "admin"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/auth/register" -Method Post -Body $body -ContentType "application/json"
```

## 🎯 คู่มือการใช้งาน

### ขั้นตอนที่ 1: เริ่ม MongoDB
ตรวจสอบให้แน่ใจว่า MongoDB กำลังทำงานในระบบของคุณ หรืออัพเดท `MONGODB_URI` ในไฟล์ `.env` เพื่อเชื่อมต่อกับ MongoDB Atlas

### ขั้นตอนที่ 2: เริ่ม Backend
```bash
cd backend
npm start
```

### ขั้นตอนที่ 3: เริ่ม Frontend
เปิดไฟล์ `frontend/index.html` ในเบราว์เซอร์ หรือรัน local server

### ขั้นตอนที่ 4: เริ่ม Admin Panel
```bash
cd admin
npm start
```

### ขั้นตอนที่ 5: เข้าสู่ระบบ Admin Panel
1. สร้างผู้ใช้ admin โดยใช้ API (ดูด้านบน)
2. ไปที่ `http://localhost:3000`
3. เข้าสู่ระบบด้วยข้อมูลผู้ดูแลระบบของคุณ
4. เข้าถึง dashboard และจัดการรายการสินค้า

## 🧪 Testing the Application

### Test Visitor Tracking
1. Open the frontend in a browser
2. Check the browser console - you should see "✅ Visitor tracked successfully"
3. Go to the admin panel dashboard to see visitor stats

### Test Item Management
1. Login to the admin panel
2. Click "Manage Items" or go to the Items page
3. Add, edit, or delete items
4. View the changes on the frontend

## 📦 Dependencies

### Backend
- express - Web framework
- mongoose - MongoDB ODM
- bcryptjs - Password hashing
- jsonwebtoken - JWT authentication
- cors - CORS middleware
- dotenv - Environment variables

### Admin Panel
- react - UI library
- react-router-dom - Routing
- axios - HTTP client
- recharts - Charts
- tailwindcss - CSS framework

## 🔒 Security Notes

- Change the `JWT_SECRET` in production
- Use HTTPS in production
- Implement rate limiting for API endpoints
- Add input validation and sanitization
- Use environment variables for sensitive data

## 🚀 Production Deployment

### Backend
- Deploy to services like Heroku, DigitalOcean, or AWS
- Use MongoDB Atlas for database
- Set environment variables on the hosting platform

### Frontend
- Deploy to Netlify, Vercel, or GitHub Pages
- Update API_URL to your backend URL

### Admin Panel
- Build for production: `npm run build`
- Deploy build folder to hosting service
- Update API_URL to your backend URL

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Developer

Created as a template for full-stack applications with authentication and admin panel.

## 🤝 Contributing

Feel free to fork this project and make improvements!

---

**Happy Coding! 🎉**
#   l e a r n p r o j e c t  
 