# 🚀 วิธีอัพโหลดโปรเจกต์ขึ้น Web Server

คู่มือสำหรับนำโปรเจกต์ขึ้นเว็บให้คนอื่นเข้าถึงได้ผ่านอินเทอร์เน็ต

---

## 📋 ภาพรวม

โปรเจกต์นี้แบ่งเป็น 3 ส่วน ต้อง Deploy แยกกัน:

1. **Backend API** → Deploy บน Server (Heroku, Railway, Render, DigitalOcean)
2. **Admin Panel** → Deploy บน Static Hosting (Vercel, Netlify, GitHub Pages)
3. **Frontend** → Deploy บน Static Hosting (Vercel, Netlify, GitHub Pages)

---

## 🎯 แนะนำ: Deploy ฟรีด้วย Railway + Vercel

### ข้อดี:
- ✅ ฟรี 100%
- ✅ ตั้งค่าง่าย
- ✅ Deploy อัตโนมัติจาก GitHub
- ✅ รองรับ Node.js และ MongoDB Atlas

---

## 📦 เตรียมความพร้อมก่อน Deploy

### 1. สร้าง GitHub Repository

```powershell
# ติดตั้ง Git (ถ้ายังไม่มี)
# ดาวน์โหลดจาก: https://git-scm.com/

# ไปที่โฟลเดอร์โปรเจกต์
cd C:\Users\asus\Desktop\projectonline

# สร้าง Git Repository
git init

# เพิ่มไฟล์ทั้งหมด
git add .

# Commit
git commit -m "Initial commit"

# สร้าง Repository บน GitHub.com แล้วเชื่อมต่อ
git remote add origin https://github.com/YOUR_USERNAME/projectonline.git
git branch -M main
git push -u origin main
```

### 2. ตรวจสอบไฟล์ .gitignore

ตรวจสอบว่ามีไฟล์ `.gitignore` แล้วมีเนื้อหานี้:
```
node_modules/
.env
*.log
build/
dist/
.DS_Store
```

---

## 🔧 STEP 1: Deploy Backend API

### วิธีที่ 1: Deploy ด้วย Railway (แนะนำ)

#### 1.1 สมัครบัญชี Railway
- ไปที่: https://railway.app/
- กด "Start a New Project"
- Login ด้วย GitHub

#### 1.2 Deploy Backend
1. คลิก "Deploy from GitHub repo"
2. เลือก Repository `projectonline`
3. เลือกโฟลเดอร์ `backend` (หรือ root directory)
4. Railway จะ detect ว่าเป็น Node.js project อัตโนมัติ

#### 1.3 ตั้งค่า Environment Variables
ใน Railway Dashboard:
- ไปที่ "Variables"
- เพิ่มตัวแปรเหล่านี้:
  ```
  PORT=5000
  MONGODB_URI=mongodb+srv://sarawutp65:admin123@cluster0.f7rnt98.mongodb.net/projectonline?retryWrites=true&w=majority
  JWT_SECRET=mysecretkey12345
  NODE_ENV=production
  ```

#### 1.4 Deploy!
- กด "Deploy"
- รอสักครู่จะได้ URL เช่น: `https://projectonline-backend.railway.app`

#### 1.5 ทดสอบ Backend
เปิดเบราว์เซอร์ไปที่:
```
https://projectonline-backend.railway.app/api/health
```
ต้องเห็น: `{"status":"OK","message":"Server is running"}`

---

### วิธีที่ 2: Deploy ด้วย Render (ทางเลือก)

#### 2.1 สมัครบัญชี Render
- ไปที่: https://render.com/
- Login ด้วย GitHub

#### 2.2 สร้าง Web Service
1. คลิก "New +" → "Web Service"
2. เลือก Repository `projectonline`
3. ตั้งค่า:
   - **Name**: `projectonline-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

#### 2.3 ตั้งค่า Environment Variables
เหมือนกับ Railway ด้านบน

#### 2.4 Deploy!
- กด "Create Web Service"
- รอประมาณ 5-10 นาที

---

### วิธีที่ 3: Deploy ด้วย Heroku (ต้องผูกบัตร)

```powershell
# ติดตั้ง Heroku CLI
# ดาวน์โหลด: https://devcenter.heroku.com/articles/heroku-cli

# Login
heroku login

# สร้าง App
heroku create projectonline-backend

# เพิ่ม Environment Variables
heroku config:set MONGODB_URI="mongodb+srv://sarawutp65:admin123@cluster0.f7rnt98.mongodb.net/projectonline"
heroku config:set JWT_SECRET="mysecretkey12345"
heroku config:set NODE_ENV="production"

# Deploy
cd backend
git subtree push --prefix backend heroku main

# เปิดดู
heroku open
```

---

## 🎨 STEP 2: Deploy Admin Panel

### วิธีที่ 1: Deploy ด้วย Vercel (แนะนำ)

#### 2.1 แก้ไข API URL
แก้ไขไฟล์ `admin/src/api.js`:

```javascript
const API_URL = process.env.REACT_APP_API_URL || 'https://projectonline-backend.railway.app/api';
```

#### 2.2 Build Admin Panel
```powershell
cd admin
npm run build
```

#### 2.3 Deploy ด้วย Vercel
```powershell
# ติดตั้ง Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
cd admin
vercel

# ตั้งค่า:
# - Set up and deploy? Yes
# - Which scope? เลือก account ของคุณ
# - Link to existing project? No
# - Project name? projectonline-admin
# - Directory? ./ 
# - Override settings? No

# Deploy Production
vercel --prod
```

ได้ URL เช่น: `https://projectonline-admin.vercel.app`

#### 2.4 ตั้งค่า Environment Variable
ใน Vercel Dashboard:
- ไปที่ Project → Settings → Environment Variables
- เพิ่ม:
  ```
  REACT_APP_API_URL=https://projectonline-backend.railway.app/api
  ```
- Redeploy

---

### วิธีที่ 2: Deploy ด้วย Netlify

#### 2.1 Build Admin Panel
```powershell
cd admin
npm run build
```

#### 2.2 Deploy
```powershell
# ติดตั้ง Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy

# Directory to deploy? build
# Deploy as production? Yes
```

หรือใช้วิธี Drag & Drop:
1. ไปที่ https://app.netlify.com/drop
2. ลากโฟลเดอร์ `admin/build` ไปวาง
3. เสร็จ!

---

## 🌐 STEP 3: Deploy Frontend

### วิธีที่ 1: Deploy ด้วย Vercel

#### 3.1 แก้ไข API URL
แก้ไขไฟล์ `frontend/app.js`:

```javascript
const API_URL = 'https://projectonline-backend.railway.app/api';
```

#### 3.2 Deploy
```powershell
cd frontend
vercel

# ตอบคำถาม:
# - Project name? projectonline-frontend
# - Directory? ./
```

ได้ URL เช่น: `https://projectonline-frontend.vercel.app`

---

### วิธีที่ 2: Deploy ด้วย GitHub Pages (ฟรี)

#### 3.1 แก้ไข API URL
แก้ไขไฟล์ `frontend/app.js` (เหมือนด้านบน)

#### 3.2 Push ขึ้น GitHub
```powershell
git add .
git commit -m "Update API URL for production"
git push
```

#### 3.3 Enable GitHub Pages
1. ไปที่ Repository บน GitHub
2. Settings → Pages
3. Source: เลือก `main` branch → `/frontend` folder
4. Save

ได้ URL เช่น: `https://YOUR_USERNAME.github.io/projectonline/`

---

## 🔒 STEP 4: ตั้งค่า CORS

แก้ไขไฟล์ `backend/server.js`:

```javascript
const cors = require('cors');

// ตั้งค่า CORS
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://projectonline-admin.vercel.app',
    'https://projectonline-frontend.vercel.app'
  ],
  credentials: true
}));
```

จากนั้น push และ redeploy Backend

---

## ✅ STEP 5: ทดสอบระบบ

### 5.1 ทดสอบ Backend
```
https://projectonline-backend.railway.app/api/health
```
ต้องเห็น: `{"status":"OK"}`

### 5.2 ทดสอบ Admin Panel
```
https://projectonline-admin.vercel.app
```
- ลอง Login
- เพิ่มสินค้า
- ดู Dashboard

### 5.3 ทดสอบ Frontend
```
https://projectonline-frontend.vercel.app
```
- ต้องเห็นสินค้าที่เพิ่มใน Admin
- Visitor tracking ทำงาน

---

## 📊 สรุป URLs หลัง Deploy

จดไว้ให้เรียบร้อย:

```
Backend API:     https://projectonline-backend.railway.app
Admin Panel:     https://projectonline-admin.vercel.app
Frontend:        https://projectonline-frontend.vercel.app

MongoDB:         MongoDB Atlas (อยู่บน Cloud อยู่แล้ว)
```

---

## 🔄 อัพเดทโค้ดหลัง Deploy

เมื่อแก้ไขโค้ด:

```powershell
# Commit และ Push
git add .
git commit -m "Update: คำอธิบายการเปลี่ยนแปลง"
git push

# Railway และ Vercel จะ Deploy อัตโนมัติ!
```

---

## 💰 ค่าใช้จ่าย

### ฟรี 100%:
- ✅ MongoDB Atlas (512MB)
- ✅ Railway (500 ชั่วโมง/เดือน หรือ $5 credit)
- ✅ Vercel (Unlimited deployments)
- ✅ Netlify (100GB bandwidth)
- ✅ GitHub Pages (1GB storage)

### ถ้าต้องการ Custom Domain:
- ซื้อ Domain: ~300-500 บาท/ปี (GoDaddy, Namecheap)
- ตั้งค่าใน Vercel/Netlify ฟรี!

---

## 🛠️ การบำรุงรักษา

### Monitor แอพ:
- Railway Dashboard: ดู Logs และ CPU usage
- MongoDB Atlas: ดู Database size
- Vercel Analytics: ดูจำนวนผู้เข้าชม

### Backup Database:
ใน MongoDB Atlas:
- Clusters → Backup → Enable
- จะมี Snapshot ทุกวันอัตโนมัติ

---

## ❌ แก้ปัญหาที่พบบ่อย

### Backend ไม่ทำงาน:
1. เช็ค Environment Variables ใน Railway
2. เช็ค Logs ใน Railway Dashboard
3. ตรวจสอบ MongoDB URI ถูกต้องไหม

### Admin Panel แสดง Error:
1. เช็คว่า API_URL ชี้ไปที่ Backend ที่ถูกต้อง
2. เช็ค CORS settings ใน Backend
3. Redeploy ทั้ง Backend และ Admin

### Frontend ไม่เห็นข้อมูล:
1. F12 → Console เพื่อดู Error
2. ตรวจสอบว่า Backend ทำงานอยู่
3. เช็คว่า API_URL ถูกต้อง

---

## 🎓 แหล่งเรียนรู้เพิ่มเติม

- Railway Docs: https://docs.railway.app/
- Vercel Docs: https://vercel.com/docs
- MongoDB Atlas Docs: https://www.mongodb.com/docs/atlas/
- Express Deployment: https://expressjs.com/en/advanced/best-practice-performance.html

---

## 🎯 Checklist การ Deploy

- [ ] Backend deploy บน Railway/Render
- [ ] Environment Variables ตั้งค่าครบ
- [ ] MongoDB Atlas เชื่อมต่อได้
- [ ] Admin Panel build และ deploy
- [ ] API URL ใน Admin Panel ถูกต้อง
- [ ] Frontend deploy บน Vercel/Netlify
- [ ] API URL ใน Frontend ถูกต้อง
- [ ] CORS ตั้งค่าครบทุก domain
- [ ] ทดสอบ Login ใน Admin Panel
- [ ] ทดสอบ CRUD สินค้า
- [ ] ทดสอบ Frontend แสดงข้อมูล
- [ ] ทดสอบ Visitor tracking
- [ ] จดบันทึก URLs ทั้งหมด

---

**สำเร็จแล้ว! โปรเจกต์ของคุณอยู่บนอินเทอร์เน็ตแล้ว! 🎉🌐**
