# GEMINI AI UCHUN PROMPT — DIPLOM LOYIHA

---

## PROMPT 1: LOYIHA HAQIDA BATAFSIL MA'LUMOT

```
Men talabaman va menga diplom loyihasi uchun yordam kerak. Mening loyiham — "JPG Perfumes" onlayn do'kon tizimi. Quyidagi ma'lumotlarni Gemini'dan so'rayman:

1. LOYIHA TAVSIFI (300-400 so'z):
   - Loyiha nomi va maqsadi
   - Qaysi muammoni hal qiladi
   - Kimlar uchun mo'ljallangan
   - Qanday afzalliklari bor

2. TEXNIK ARXITEKTURA:
   - Frontend: React 18 + Vite 5 + React Router 6 + Framer Motion
   - Backend: Node.js + Express 4.18
   - Database: PostgreSQL 16 (Knex.js)
   - API: REST API, JSON format
   - Portlar: Frontend 5173, Backend 5000, PostgreSQL 5432

3. BAZA TUZILISHI:
   - products jadvagi: id, name, category, price, discount, stock, image, description, created_at
   - orders jadvagi: id, customer_name, customer_phone, location_user, subtotal, discount, total, status, created_at
   - order_items jadvagi: id, order_id, product_id, name, price, discount, discounted_price, quantity, image

4. API ENDPOINT'LAR:
   - GET /api/products — barcha mahsulotlar (pagination, filter, search, sort)
   - GET /api/products/featured — top 8 ta tavsiya
   - GET /api/products/discounted — chegirmali mahsulotlar
   - GET /api/products/search?q= — qidirish
   - GET /api/products/sort?price=asc — saralash
   - GET /api/products/category/:category — kategoriya bo'yicha
   - GET /api/products/:id — bitta mahsulot
   - POST /api/products — yangi mahsulot (rasm bilan)
   - PUT /api/products/:id — tahrirlash
   - DELETE /api/products/:id — o'chirish
   - POST /api/orders — buyurtma yaratish (tranzaksiya bilan)
   - GET /api/orders — barcha buyurtmalar
   - PATCH /api/orders/:id/status — holat yangilash
   - GET /api/orders/stats — dashboard statistikasi

5. FRONTEND SAHIFALARI:
   - Bosh sahifa: hero, tavsiya mahsulotlar, promo banner, maxsus takliflar
   - Mahsulotlar: qidirish, saralash, kategoriya filter
   - Tafsilotlar: rasm, narx, ombor, tavsif, savatga qo'shish
   - Savat: miqdor boshqaruvi, buyurtma shakli, tranzaksiya
   - Buyurtmalar: tarix, holat badge
   - Biz haqimizda: hikoya, statistika, qadriyatlar
   - Aloqa: shakl, ma'lumot, FAQ

6. ADMIN PANEL:
   - Kirish: hardcoded (Admin2003 / Toxir203.)
   - Dashboard: statistika, so'nggi buyurtmalar
   - Mahsulotlar: CRUD (qo'shish, tahrirlash, o'chirish)
   - Buyurtmalar: ko'rish, holat yangilash

7. DIZAYN TIZIMI:
   - Ranglar: Luxury Gold (#caa24d), Primary Black (#111111), Primary White (#fffdf8)
   - Shriftlar: Aptos (asl), Palatino (luxury)
   - Animatsiyalar: Framer Motion (15+ turdagi)

Iltimos, ushbu ma'lumotlarni diplom ishi uchun tizimli ravishda yozib ber. Har bir bo'limni batafsil tushuntir.
```

---

## PROMPT 2: TEXNIK TOPSHIRIQ (TZ) UCHUN

```
Mening diplom loyiham uchun TEXNIK TOPSHIRIQ (TZ) yozib ber. Loyiha: "JPG Perfumes" onlayn do'kon tizimi.

TEXNIK TOPSHIRIQ QUYIDAGILARNI O'Z ICHIGA OLSIN:

I. LOYIHA NOMI VA MAQSADI
- Loyiha nomi: "JPG Perfumes — Jean Paul Gaultier parfümeriya mahsulotlari uchun onlayn do'kon tizimi"
- Maqsad: Zamonaviy veb-texnologiyalar yordamida parfümeriya mahsulotlarini onlayn sotish platformasini yaratish

II. TEXNIK TOPSHIRIQ
- Loyiha arxitekturasi (diyagramma: Frontend → Backend → Database)
- Texnologik stack (React, Vite, Express, PostgreSQL, Knex.js, Framer Motion, Axios)
- Loyiha tuzilishi (directory structure)

III. BAZA MA'LUMOTLAR TUZILISHI
- products jadvagi (9 ta maydon)
- orders jadvagi (9 ta maydon)
- order_items jadvagi (10 ta maydon)
- Bog'lanish sxemasi (1:N:M)

IV. API ENDPOINT'LAR
- Mahsulotlar API (10 ta endpoint)
- Buyurtmalar API (4 ta endpoint)
- Server endpoint'lari (health, static files)
- API javob formati (success/error)

V. FRONTEND SAHIFALAR VA FUNKSIYALAR
- Bosh sahifa (hero, tavsiya, promo, takliflar)
- Mahsulotlar (qidirish, saralash, kategoriya)
- Tafsilotlar (rasm, narx, ombor, savat)
- Savat (miqdor, buyurtma, tranzaksiya)
- Buyurtmalar (tarix, holat)
- Biz haqimizda (hikoya, statistika)
- Aloqa (shakl, FAQ)

VI. ADMIN PANEL
- Kirish (hardcoded auth)
- Dashboard (statistika)
- Mahsulotlar boshqaruvi (CRUD)
- Buyurtmalar boshqaruvi (holat yangilash)

VII. SAVAT TIZIMI
- State tuzilishi
- Funksiyalar (addToCart, removeFromCart, updateQuantity, clearCart, getTotalPrice)
- Doimiylik (localStorage)

VIII. ANIMATSIYALAR
- Framer Motion animatsiyalari (15+ tur)

IX. DIZAYN TIZIMI
- Ranglar (#caa24d, #111111, #fffdf8)
- Shriftlar (Aptos, Palatino)
- Bo'shliqlar, o'tishlar, soyalar

X. FUNKSIONAL IMKONIYATLAR
- Foydalanuvchi (12 ta imkoniyat)
- Admin (8 ta imkoniyat)
- Cheklovlar (7 ta)

XI. MAHSULOTLAR KATALOGI
- Erkaklar (10 ta mahsulot)
- Ayollar (5 ta mahsulot)

XII. BUYURTMA YARATISH JARAYONI
- 14 qadamli jarayon (flowchart)

XIII. RASM YUKLASH JARAYONI
- 9 qadamli jarayon

XIV. XAVFSIZLIK
- Mavjud choralar (5 ta)
- Kamchiliklar (5 ta)

XV. LOYIHA HAJMI
- Backend: 18 fayl, ~1200 qator
- Frontend: 25+ fayl, ~5500 qator
- CSS: 14 fayl, ~3800 qator
- Jami: ~60 fayl, ~7500+ qator

Iltimos, har bir bo'limni batafsil va tizimli yozib ber. Diplom ishi talablariga mos bo'lsin.
```

---

## PROMPT 3: DISSERTATSIYA MATNI UCHUN

```
Mening diplom loyiham: "JPG Perfumes" onlayn do'kon tizimi.

Quyidagi mavzular bo'yicha dissertatsiya matnini yozib ber:

1. KIRISH (3-4 sahifa):
   - Onlayn savdo muammosi va ahamiyati
   - Loyiha maqsadi va vazifalari
   - Loyiha tuzilishi

2. 1-BO'LIM: LITERATURA TAHLILI (5-6 sahifa):
   - Onlayn do'kon tizimlari tarixi
   - Zamonaviy e-commerce texnologiyalari
   - React, Express, PostgreSQL haqida ma'lumot
   - O'zbekistonda onlayn savdo holati

3. 2-BO'LIM: TEXNIK TOPSHIRIQ (5-6 sahifa):
   - Loyiha arxitekturasi
   - Database tuzilishi
   - API endpoint'lari
   - Frontend sahifalari
   - Admin panel

4. 3-BO'LIM: DASTUR TA'MINOTINING ISHLAB CHIQILISHI (6-8 sahifa):
   - Backend qismi (Express, Knex.js, PostgreSQL)
   - Frontend qismi (React, Vite, Framer Motion)
   - Savat tizimi
   - Buyurtma jarayoni
   - Admin panel
   - Dizayn tizimi

5. 4-BO'LIM: SINOV VA NATIJALAR (3-4 sahifa):
   - Test sinovlari
   - Performance tahlili
   - Xavfsizlik tahlili
   - Foydalanuvchi tajribasi

6. XULOSA (2-3 sahifa):
   - Loyiha natijalari
   - Kelajakda rivojlantirish
   - Shaxsiy xulosalar

Iltimos, har bir bo'limni batafsil yozib ber. Texnik terminlardan foydalan. Kod misollarini qo'sh. Diagrammalar tavsiflab ber.
```

---

## PROMPT 4: KOD TahlILI UCHUN

```
Mening loyiham: "JPG Perfumes" onlayn do'kon tizimi.

Quyidagi kodlarni tahlil qilib, har birini tushuntirib ber:

1. BACKEND KODI:
   - backend/src/index.js — Server sozlash
   - backend/src/db.js — Database ulanish
   - backend/src/controllers/productController.js — Mahsulot CRUD
   - backend/src/controllers/orderController.js — Buyurtma boshqarish
   - backend/src/routes/productRoutes.js — API yo'nalishlari
   - backend/src/middleware/upload.js — Rasm yuklash
   - backend/migrations/*.js — Database migratsiyalari

2. FRONTEND KODI:
   - frontend/src/App.jsx — Router va layout
   - frontend/src/context/CartContext.jsx — Savat holati
   - frontend/src/utils/api.js — API client
   - frontend/src/pages/Home.jsx — Bosh sahifa
   - frontend/src/pages/Products.jsx — Mahsulotlar
   - frontend/src/pages/Cart.jsx — Savat
   - frontend/src/pages/admin/Admin.jsx — Admin panel

3. CSS KODI:
   - frontend/src/styles/global.css — Dizayn tizimi
   - frontend/src/components/Navbar.css — Navigatsiya
   - frontend/src/pages/Home.css — Bosh sahifa
   - frontend/src/pages/Cart.css — Savat

Har bir kod uchun:
- Nima qiladi?
- Qanday ishlaydi?
- Nima uchun shunday yozilgan?
- Qanday yaxshilash mumkin?

Kod misollarini keltir va tushuntir.
```

---

## PROMPT 5: DIAGRAMMAVA TABLELKALAR UCHUN

```
Mening diplom loyiham uchun quyidagi diagrammalarni yarat:

1. ARXITEKTURA DIAGRAMMASI:
   Frontend (React + Vite) → Backend (Express + Node.js) → Database (PostgreSQL)
   - Har bir qatlamning vazifasi
   - Port raqamlari
   - Ma'lumot oqimi

2. DATABASE ER DIAGRAMMASI:
   products ← order_items → orders
   - Har bir jadvakning maydonlari
   - Bog'lanish turlari (1:N, N:M)
   - Foreign key'lar

3. API FLOW DIAGRAMMASI:
   Client Request → Express Route → Controller → Database → Response
   - Har bir endpoint uchun
   - HTTP metodlari
   - Javob formatlari

4. BUYURTMA JARAYONI FLOWCHART:
   Mahsulot tanlash → Savatga qo'shish → Buyurtma shakli → Tranzaksiya → Yakunlash

5. ADMIN PANEL FLOWCHART:
   Kirish → Dashboard → Mahsulotlar CRUD → Buyurtmalar boshqarish

6. SAVAT TIZIMI DIAGRAMMASI:
   CartContext → localStorage → UI → API

7. Foydalanuvchi rolls diagramması:
   Oddiy foydalanuvchi: ko'rish, qidirish, savat, buyurtma
   Admin: boshqaruv, CRUD, buyurtma holati

Har bir diagrammani ASCII art yoki tavsifli shaklda yarat. Diplom ishi uchun mos bo'lsin.
```

---

## PROMPT 6: TEST SINOVLARI UCHUN

```
Mening loyiham: "JPG Perfumes" onlayn do'kon tizimi.

Quyidagi test sinovlarini yarat:

1. BACKEND TESTLARI:
   - API endpoint testlari (GET, POST, PUT, DELETE)
   - Database testlari (CRUD operatsiyalari)
   - Xatolik testlari (404, 400, 500)
   - Tranzaksiya testlari (buyurtma yaratish)

2. FRONTEND TESTLARI:
   - Komponent testlari (render, interaction)
   - Sahifa testlari (navigation, data loading)
   - Savat testlari (add, remove, update, clear)
   - API testlari (mock responses)

3. INTEGRATION TESTLARI:
   - Frontend-Backend integratsiya
   - Savat → Buyurtma jarayoni
   - Admin CRUD jarayoni

4. PERFORMANCE TESTLARI:
   - Sahifa yuklash tezligi
   - API response vaqti
   - Database query tezligi

5. XAVFSIZLIK TESTLARI:
   - CORS testlari
   - Input validation
   - SQL injection testlari
   - XSS testlari

Har bir test uchun kod yoz va tushuntir. Jest yoki Mocha kutubxonasini ishlat.
```

---

## PROMPT 7: PREZENTATSIYA UCHUN

```
Mening diplom loyiham: "JPG Perfumes" onlayn do'kon tizimi.

Prezentatsiya uchun quyidagi slaydlarni yarat:

SLAYD 1: MUQOVA
- Loyiha nomi
- Talaba ismi
- Guruh raqami
- O'qituvchi
- Sana

SLAYD 2: REJA
- Loyiha maqsadi
- Texnologiyalar
- Arxitektura
- Funksiyalar
- Natijalar

SLAYD 3: LOYIHA MAQSADI
- Muammo
- Yechim
- Afzalliklar

SLAYD 4: TEXNOLOGIYALAR
- Frontend: React, Vite, Framer Motion
- Backend: Express, Node.js
- Database: PostgreSQL

SLAYD 5: ARXITEKTURA
- 3 qatlamli arxitektura
- Ma'lumot oqimi
- Portlar

SLAYD 6: DATABASE
- 3 ta jadvak
- Bog'lanishlar
- Namuna ma'lumotlar

SLAYD 7: API ENDPOINT'LAR
- 14 ta endpoint
- HTTP metodlari
- Javob formatlari

SLAYD 8: FRONTEND SAHIFALARI
- 7 ta umumiy sahifa
- 5 ta admin sahifa
- Animatsiyalar

SLAYD 9: SAVAT TIZIMI
- CartContext
- localStorage
- Buyurtma jarayoni

SLAYD 10: ADMIN PANEL
- Kirish
- Dashboard
- Mahsulotlar CRUD
- Buyurtmalar

SLAYD 11: DIZAYN
- Luxury uslub
- Ranglar palitrası
- Shriftlar

SLAYD 12: FUNKSIONAL IMKONIYATLAR
- Foydalanuvchi (12 ta)
- Admin (8 ta)

SLAYD 13: XAVFSIZLIK
- Mavjud choralar
- Kamchiliklar

SLAYD 14: NATIJALAR
- Loyiha hajmi
- Funksiyalar soni
- Kod hajmi

SLAYD 15: XULOSA
- Asosiy natijalar
- Kelajak rejalari
- Minnatdorchilik

Har bir slayd uchun kontent yoz va tushuntir. Vizual elementlarni tavsiflab ber.
```

---

## PROMPT 8: YAXSHILASH TAKLIFLARI UCHUN

```
Mening loyiham: "JPG Perfumes" onlayn do'kon tizimi.

Loyihani quyidagi yo'nalishlarda yaxshilash takliflarini ber:

1. TEXNIK YAXSHILASHLAR:
   - JWT autentifikatsiya qo'shish
   - User registration/login tizimi
   - Wishlist funksiyasini ishga tushirish
   - Real-time stock yangilanishi (WebSocket)
   - Redis caching
   - Image optimization (Sharp kutubxonasi)
   - API versioning (v1, v2)
   - Rate limiting

2. FUNKSIONAL YAXSHILASHLAR:
   - Sahifalash (pagination)
   - Kategoriyalar boshqaruvi
   - Sharh va reyting tizimi
   - Email notifications
   - SMS notifications
   - To'lov tizimi (Payme, Click)
   - Kupon tizimi
   - Buyurtma kuzatish

3. UI/UX YAXSHILASHLAR:
   - Dark mode
   - Responsive dizayn yaxshilash
   - Accessibility (WCAG)
   - Multi-til (o'zbek, rus, ingliz)
   - Loading skeleton
   - Error boundary
   - Toast notifications

4. XAVFSIZLIK YAXSHILASHLAR:
   - Helmet.js (HTTP headers)
   - Express rate limit
   - Input sanitization
   - CSRF protection
   - SQL injection prevention
   - XSS prevention

5. DEPLOYMENT:
   - Docker containerization
   - Nginx reverse proxy
   - CI/CD pipeline
   - Cloud deployment (AWS/Vercel/Railway)
   - SSL certificate

Har bir taklifni batafsil tushuntir. Qanday qo'llash mumkinligini ko'rsat. Kod misollarini ber.
```

---

## PROMPT 9: SLIDES PREZENTATSIYA MATNI

```
Quyidagi prezentatsiya matnini yoz. Diplom himoyasi uchun:

GIRISH (2 daqiqa):
"Assalomu alaykum. Men [ism] [guruh]. Mening diplom loyiham — "JPG Perfumes" onlayn do'kon tizimi. Ushbu loyiha zamonaviy veb-texnologiyalar yordamida parfümeriya mahsulotlarini onlayn sotish platformasini yaratishga qaratilgan."

LOYIHA MAQSAIDI (2 daqiqa):
"Loyihamning maqsadi — React, Express va PostgreSQL texnologiyalari asosida to'liq ishlaydigan onlayn do'kon tizimini yaratish. Foydalanuvchilar mahsulotlarni ko'rish, qidirish, savatga qo'shish va buyurtma berish imkoniyatiga ega bo'lishadi."

TEXNOLOGIYALAR (3 daqiqa):
"Frontend qismida React 18, Vite 5 va Framer Motion ishlatilgan. Backend'da Node.js va Express 4, database sifatida PostgreSQL 16 tanlangan. Ma'lumotlar bazasi bilan Knex.js query builder orqali muloqot qilinadi."

ARXITEKTURA (3 daqiqa):
"Loyiha 3 qatlamli arxitekturaga ega: Frontend (localhost:5173), Backend (localhost:5000) va Database (localhost:5432). Frontend REST API orqali backend bilan muloqot qiladi, backend esa SQL so'rovlar orqali database bilan ishlaydi."

DATABASE (3 daqiqa):
"Ma'lumotlar bazasida 3 ta jadvak mavjud: products (mahsulotlar), orders (buyurtmalar) va order_items (buyurtma elementlari). Jadvaklar orasida 1:N va N:M bog'lanishlar mavjud."

API (3 daqiqa):
"Backend'da 14 ta API endpoint mavjud. Mahsulotlar uchun CRUD operatsiyalari, buyurtmalar uchun yaratish va boshqarish endpoint'lari. Barcha endpoint'lar JSON formatida javob beradi."

FRONTEND (4 daqiqa):
"Frontend'da 7 ta umumiy sahifa va 5 ta admin sahifa mavjud. Bosh sahifada hero section, tavsiya mahsulotlar va maxsus takliflar ko'rsatiladi. Savat tizimi localStorage orqali doimiy saqlanadi."

SAVAT TIZIMI (3 daqiqa):
"Savat tizimi React Context API asosida ishlaydi. Foydalanuvchi mahsulotlarni savatga qo'shishi, miqdorini o'zgartirishi va buyurtma berishi mumkin. Buyurtma tranzaksiya orqali amalga oshiriladi."

ADMIN PANEL (3 daqiqa):
"Admin panel orqali mahsulotlarni boshqarish va buyurtmalarni kuzatish mumkin. Dashboard'da statistika ko'rsatiladi. Mahsulotlar uchun to'liq CRUD operatsiyalari mavjud."

DIZAYN (2 daqiqa):
"Loyiha luxury uslubida dizayn qilingan. Asosiy ranglar: gold (#caa24d), black (#111111) va white (#fffdf8). Framer Motion orqali 15+ turdagi animatsiya qo'llanilgan."

XULOSA (2 daqiqa):
"Natijada, to'liq ishlaydigan onlayn do'kon tizimi yaratildi. Loyiha ~7500 qator kod, 60+ fayl va 14 ta API endpoint'dan iborat. Kelajakda JWT autentifikatsiya, to'lov tizimi va multi-til qo'shish rejalashtirilgan."

MINNATDORCHILIK (1 daqiqa):
"Rahmat. Savollaringiz bo'lsa, javob berishga tayyorman."

JAMI: ~25 daqiqa
```

---

## PROMPT 10: YAKUNIY YIG'INDI

```
Mening diplom loyiham: "JPG Perfumes" onlayn do'kon tizimi.

Quyidagi hujjatlarni yarat:

1. REZUME (1 sahifa):
   - Loyiha nomi
   - Texnologiyalar
   - Asosiy funksiyalar
   - Loyiha hajmi

2. FOYDALANISH BO'YICHA QO'LLANMA (2-3 sahifa):
   - O'rnatish
   - Ishga tushirish
   - Foydalanish
   - Admin panel

3. API HUJJATI (3-4 sahifa):
   - Barcha endpoint'lar
   - So'rov formatlari
   - Javob formatlari
   - Xatolik kodlari

4. DATABASE HUJJATI (2 sahifa):
   - Jadvaklar tuzilishi
   - Bog'lanishlar
   - Indekslar

5. DEPLOYMENT QO'LLANMASI (2 sahifa):
   - Docker sozlash
   - Server sozlash
   - Environment variables

Har bir hujjatni professional tarzda formatla. Diplom ishi talablariga mos bo'lsin.
```
