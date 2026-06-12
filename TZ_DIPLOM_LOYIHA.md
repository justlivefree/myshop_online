# TEXNIK TOPSHIRIQ (TZ) — DIPLOM LOYIHA

## «JPG Perfumes» Onlayn Do'kon Tizimi

---

## 1. LOYIHA NOMI VA MAQSADI

**Loyiha nomi:** JPG Perfumes — Jean Paul Gaultier parfümeriya mahsulotlari uchun onlayn do'kon tizimi

**Maqsad:** Zamonaviy veb-texnologiyalar yordamida tamaddun parfümeriya brendi mahsulotlarini onlayn sotish platformasini yaratish. Foydalanuvchilar mahsulotlarni ko'rish, qidirish, savatga qo'shish va buyurtma berish imkoniyatiga ega bo'lishadi. Admin panel orqali mahsulotlarni boshqarish va buyurtmalarni kuzatish mumkin.

---

## 2. TEXNIK TOPSHIRIQ

### 2.1 Loyiha Arxitekturasi

```
┌─────────────────────────────────────────────────────────────┐
│                    MEZON (Client)                           │
│              React 18 + Vite 5 + React Router 6             │
│              Framer Motion 10 + Axios                       │
│              Port: 5173                                     │
└──────────────────────┬──────────────────────────────────────┘
                       │ HTTP (REST API)
                       │ JSON format
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                  SERVER (Backend)                            │
│              Node.js + Express 4.18                         │
│              Multer (rasm yuklash)                          │
│              Port: 5000                                     │
└──────────────────────┬──────────────────────────────────────┘
                       │ Knex.js (SQL Query Builder)
                       │ Migrations + Seeds
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                  BAZA MA'LUMOTLARI                           │
│              PostgreSQL 16                                  │
│              Port: 5432                                     │
│              Database: tezusta                              │
└─────────────────────────────────────────────────────────────┘
```

### 2.2 Texnologik Stack

| Qatlam | Texnologiya | Versiya | Vazifasi |
|--------|------------|---------|----------|
| Frontend | React | 18.2.0 | UI komponentlar kutubxonasi |
| Frontend | Vite | 5.0.8 | Build tools va dev server |
| Frontend | React Router | 6.20.0 | Client-side routing |
| Frontend | Framer Motion | 10.16.16 | Animatsiyalar va o'tishlar |
| Frontend | Axios | 1.6.2 | HTTP so'rovlar |
| Backend | Node.js | v25+ | JavaScript runtime |
| Backend | Express | 4.18.2 | Web framework |
| Backend | Multer | 1.4.5 | Fayl yuklash middleware |
| Backend | dotenv | 16.0.3 | ENV o'zgaruvchilari |
| Database | PostgreSQL | 16 | Relatsion baza ma'lumotlari |
| ORM/QB | Knex.js | 3.2.10 | SQL query builder va migratsiya |

### 2.3loyiha Tuzilishi (Directory Structure)

```
onlayn do'kon_new/
├── backend/
│   ├── src/
│   │   ├── index.js                    — Server kirish nuqtasi
│   │   ├── db.js                       — Knex ulanish instance
│   │   ├── controllers/
│   │   │   ├── productController.js    — Mahsulot CRUD logikasi
│   │   │   └── orderController.js      — Buyurtma boshqarish
│   │   ├── routes/
│   │   │   ├── productRoutes.js        — Mahsulot API yo'nalishlari
│   │   │   └── orderRoutes.js          — Buyurtma API yo'nalishlari
│   │   ├── middleware/
│   │   │   ├── upload.js               — Multer rasm yuklash
│   │   │   └── errorHandler.js         — Xatolik middleware
│   │   ├── utils/
│   │   │   └── productUtils.js         — Narx hisoblash, rasm formatlash
│   │   └── data/
│   │       └── products.js             — Eski mahsulot ma'lumotlari
│   ├── migrations/
│   │   ├── 20260601000001_create_products.js
│   │   ├── 20260601000002_create_orders.js
│   │   └── 20260601000003_create_order_items.js
│   ├── seeds/
│   │   └── 01_products.js             — 15 ta namuna mahsulot
│   ├── uploads/                        — Yuklangan rasmlar
│   ├── knexfile.js                     — Knex konfiguratsiyasi
│   ├── package.json
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── main.jsx                    — React kirish nuqtasi
│   │   ├── App.jsx                     — Router va layout
│   │   ├── context/
│   │   │   └── CartContext.jsx         — Savat holati boshqaruvi
│   │   ├── components/
│   │   │   ├── Navbar.jsx / .css       — Navigatsiya paneli
│   │   │   ├── Footer.jsx / .css       — Pastki qism
│   │   │   └── ProductCard.jsx / .css  — Mahsulot kartochkasi
│   │   ├── pages/
│   │   │   ├── Home.jsx / .css         — Bosh sahifa
│   │   │   ├── Products.jsx / .css     — Mahsulotlar ro'yxati
│   │   │   ├── ProductDetails.jsx / .css — Mahsulot tafsilotlari
│   │   │   ├── Cart.jsx / .css         — Savat va buyurtma
│   │   │   ├── Orders.jsx / .css       — Buyurtmalar tarixi
│   │   │   ├── About.jsx / .css        — Biz haqimizda
│   │   │   ├── Contact.jsx / .css      — Aloqa
│   │   │   └── admin/
│   │   │       ├── Admin.jsx           — Admin layout + kirish
│   │   │       ├── Dashboard.jsx       — Boshqaruv paneli
│   │   │       ├── AdminProducts.jsx   — Mahsulotlar ro'yxati
│   │   │       ├── ProductForm.jsx     — Mahsulot qo'shish/tahrirlash
│   │   │       ├── AdminOrders.jsx     — Buyurtmalar boshqaruvi
│   │   │       └── Admin.css           — Admin uslublari
│   │   ├── utils/
│   │   │   ├── api.js                  — Axios API client (15 ta funksiya)
│   │   │   └── format.js              — Narx formatlash
│   │   └── styles/
│   │       └── global.css              — Global dizayn tizimi
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
└── docs/                               — Hujjatlar
```

---

## 3. BAZA MA'LUMOTLAR TUZILISHI

### 3.1 Jadvak: `products` (Mahsulotlar)

| Maydon | Turi | Cheklovlar | Tavsif |
|--------|------|-----------|--------|
| id | INTEGER (SERIAL) | PRIMARY KEY, AUTO_INCREMENT | Unikal ID |
| name | VARCHAR(255) | NOT NULL | Mahsulot nomi |
| category | VARCHAR(50) | NOT NULL | Kategoriya: 'men' yoki 'women' |
| price | DECIMAL(10,2) | NOT NULL | Asl narx (USD) |
| discount | INTEGER | DEFAULT 0 | Chegirma foizi (0-100) |
| stock | INTEGER | DEFAULT 0 | Ombordagi soni |
| image | VARCHAR(500) | NULLABLE | Rasm manzili |
| description | TEXT | NULLABLE | Tavsif (o'zbek tilida) |
| created_at | TIMESTAMP | DEFAULT now() | Yaratilgan sana |

### 3.2 Jadvak: `orders` (Buyurtmalar)

| Maydon | Turi | Cheklovlar | Tavsif |
|--------|------|-----------|--------|
| id | INTEGER (SERIAL) | PRIMARY KEY, AUTO_INCREMENT | Buyurtma ID |
| customer_name | VARCHAR(255) | NOT NULL | Mijoz ismi |
| customer_phone | VARCHAR(50) | NOT NULL | Telefon raqami |
| location_user | VARCHAR(500) | NOT NULL | Yetkazish manzili |
| subtotal | DECIMAL(10,2) | NOT NULL | Chegirmasiz jami |
| discount | DECIMAL(10,2) | DEFAULT 0 | Jami chegirma miqdori |
| total | DECIMAL(10,2) | NOT NULL | To'lov summasi |
| status | VARCHAR(50) | DEFAULT 'topshirilmagan' | Holat: 'topshirilmagan' / 'topshirildi' |
| created_at | TIMESTAMP | DEFAULT now() | Buyurtma sanasi |

### 3.3 Jadvak: `order_items` (Buyurtma elementlari)

| Maydon | Turi | Cheklovlar | Tavsif |
|--------|------|-----------|--------|
| id | INTEGER (SERIAL) | PRIMARY KEY, AUTO_INCREMENT | Element ID |
| order_id | INTEGER | NOT NULL, FK → orders.id ON DELETE CASCADE | Buyurtma ID |
| product_id | INTEGER | FK → products.id ON DELETE SET NULL | Mahsulot ID |
| name | VARCHAR(255) | NOT NULL | Mahsulot nomi |
| price | DECIMAL(10,2) | NOT NULL | Asl narx |
| discount | INTEGER | DEFAULT 0 | Chegirma foizi |
| discounted_price | DECIMAL(10,2) | NULLABLE | Chegirmali narx |
| quantity | INTEGER | NOT NULL | Miqdori |
| image | VARCHAR(500) | NULLABLE | Rasm manzili |

### 3.4 Bog'lanish sxemasi

```
products (1) ──── (N) order_items (N) ──── (1) orders

- orders.order_items → order_items.order_id (CASCADE DELETE)
- products.order_items → order_items.product_id (SET NULL)
```

---

## 4. API ENDPOINT'LAR

### 4.1 Mahsulotlar API (`/api/products`)

| Metod | Yo'l | Vazifa | Middleware |
|-------|------|--------|-----------|
| GET | `/api/products` | Barcha mahsulotlar (pagination, filter) | — |
| GET | `/api/products/featured` | Top 8 ta tavsiya etilgan | — |
| GET | `/api/products/discounted` | Chegirmali mahsulotlar | — |
| GET | `/api/products/search?q=` | Qidirish (nom va tavsif bo'yicha) | — |
| GET | `/api/products/sort?price=asc` | Narx bo'yicha saralash | — |
| GET | `/api/products/category/:category` | Kategoriya bo'yicha | — |
| GET | `/api/products/:id` | Bitta mahsulot | — |
| POST | `/api/products` | Yangi mahsulot qo'shish | `upload.single('image')` |
| PUT | `/api/products/:id` | Mahsulotni tahrirlash | `upload.single('image')` |
| DELETE | `/api/products/:id` | Mahsulotni o'chirish | — |

### 4.2 Buyurtmalar API (`/api/orders`)

| Metod | Yo'l | Vazifa |
|-------|------|--------|
| GET | `/api/orders/stats` | Dashboard statistikasi |
| POST | `/api/orders` | Yangi buyurtma yaratish |
| GET | `/api/orders` | Barcha buyurtmalar |
| PATCH | `/api/orders/:id/status` | Holatni yangilash |

### 4.3 Server Endpoint'lari

| Metod | Yo'l | Vazifa |
|-------|------|--------|
| GET | `/health` | Server holati tekshirish |
| GET | `/images/*` | Seed rasmlari (static) |
| GET | `/uploads/*` | Yuklangan rasmlar (static) |

### 4.4 API Javob Formati

**Muvaffaqiyatli:**
```json
{
  "success": true,
  "data": { ... },
  "pagination": {
    "page": 1,
    "limit": 12,
    "total": 15,
    "totalPages": 2
  }
}
```

**Xatolik:**
```json
{
  "success": false,
  "error": {
    "message": "Mahsulot topilmadi"
  }
}
```

---

## 5. FRONTEND SAHIFALAR VA FUNKSIYALAR

### 5.1 Bosh Sahifa (`/`)

**Tarkibiy qismlar:**

1. **Hero Section:**
   - Sarlavha: "Yorqin hidlar, nafis taqdimot, oson xarid"
   - Ikki ta CTA tugmasi: "Hoziroq xarid qiling" va "Ko'proq ma'lumot"
   - Statistika: "30+ Mahsus taqdimot", "Tez", "Premium"
   - Showcase kartochka: "Muharrir tanlovi" (Le Male Elixir, -25%)
   - Trend kartochka: "Bu hafta trendda"

2. **Tavsiya etilgan mahsulotlar:**
   - API'dan top 8 ta mahsulot yuklanadi
   - ProductCard komponentlari grid shaklida

3. **Promo Banner:**
   - "Limited Offer" — "Get up to 30% off"

4. **Maxsus takliflar:**
   - Chegirmali mahsulotlar (6 ta)

5. **Biz haqimizda preview:**
   - Ikki ustunli: matn + dekorativ SVG

### 5.2 Mahsulotlar Sahifasi (`/products`, `/mens`, `/womens`)

**Funksiyalar:**
- Qidirish: debounce 300ms, URL parametriga sync
- Saralash: Tavsiya etilgan / Yangi / Narx pastdan yuqoriga / Narx yuqoridan pastga
- Filter: "Sotuvda" (chegirmali mahsulotlar)
- Kategoriya: `/mens` → men, `/womens` → women
- Natija soni ko'rsatiladi

### 5.3 Mahsulot Tafsilotlari (`/product/:id`)

**Funksiyalar:**
- Katta rasm (sticky, 1:1 nisbat)
- Chegirma badge'i
- Kategoriya, nom, reyting (5 yulduz, 48 sharh)
- Narx: asl (chizilgan) + chegirmali + tejamkorlik miqdori
- Ombor holati: "Omborda: X dona" yoki "Mahsulot tugagan"
- Tavsif
- Xususiyatlar ro'yxati (5 ta hardcoded)
- Miqdor tanlash (1 dan ombor sonigacha)
- "Savatga qo'shish" tugmasi
- "Xohlanuvchilarga qo'shish" tugmasi (demo)
- Yetkazish ma'lumotlari: bepul 1M+ so'm, 30 kun qaytarish, xavfsiz to'lov

### 5.4 Savat (`/cart`)

**4 ta holat:**

1. **Bo'sh savat:** "Sizning savatingiz bo'sh" + xarid qilish tugmasi

2. **Savat ko'rinishi:**
   - Savat elementlari: rasm, nom, kategoriya, chegirma badge, ombor ogohlantirishi
   - Miqdor boshqaruvi: +/- tugmalar, kiritish maydoni
   - Narx: chegirmali * miqdor, asl narx chizilgan
   - O'chirish tugmasi (X)
   - Buyurtma xulosasi (sticky): jami, chegirma, yetkazish (bepul), umumiy summa
   - Ombor xatoligi banneri
   - "Buyurtma qilish" tugmasi

3. **Buyurtma shakli:**
   - Ikki ustunli: forma + xulosa
   - Maydonlar: Ism, Telefon, Manzil
   - "buyurtmani tasdiqlash" tugmasi
   - "Savat bo'limiga qaytish" tugmasi

4. **Muvaffaqiyat holati:**
   - "Buyurtma muvaffaqiyatli joylashtirildi!"

### 5.5 Buyurtmalar (`/orders`)

- Barcha buyurtmalar ro'yxati
- Buyurtma ID, sana, umumiy summa
- Holat badge'i: "Topshirildi" (yashil) / "Topshirilmagan" (sariq)
- Mijoz ma'lumotlari: ism, telefon, manzil
- Buyurtma elementlari: rasm, nom, miqdor, narx

### 5.6 Biz Haqimizda (`/about`)

1. Hero: "About JPG Perfumes"
2. Hikoya: 3 ta paragraf + statistika (30+ yil, 50M+ mijoz, 100+ hid, 150+ mamlakat)
3. Qadriyatlar: 4 ta karta (Excellence, Artistry, Luxury, Sustainability)
4. Jarayon: 4 ta qadam (Tanlash, Yaratish, Sinash, Qadoqlash)
5. CTA: "Discover Your Signature Fragrance"

### 5.7 Aloqa (`/contact`)

1. Hero: "Get in Touch"
2. Aloqa shakli: Ism, Email, Mavzu, Xabar
3. Aloqa ma'lumotlari: Email, Telefon, Manzil, Ish vaqti
4. FAQ: 3 ta savol (qaytarish, yetkazish, haqiqiylilik)
5. Showroom: "Visit Our Showroom"

---

## 6. ADMIN PANEL

### 6.1 Kirish (`/admin`)

- hardcoded foydalanuvchi nomi: `Admin2003`
- hardcoded parol: `Toxir203.`
- Faqat client-side autentifikatsiya (JWT emas)
- Sahifani yangilagsanda kirish bekor bo'ladi

### 6.2 Boshqaruv Paneli (`/admin` — Dashboard)

**Statistika kartochkalari:**
- Mahsulotlar soni
- Buyurtmalar soni
- Jami daromad
- Kutilayotgan buyurtmalar

**So'nggi buyurtmalar jadvali:**
- ID, mijoz, telefon, summa, holat, sana

### 6.3 Mahsulotlar Boshqaruvi (`/admin/products`)

- Qidirish paneli
- Jadval: rasm, nom, kategoriya, narx, chegirma, ombor, harakatlar
- "Yangi mahsulot" tugmasi → `/admin/products/new`
- Tahrirlash → `/admin/products/:id/edit`
- O'chirish (confirm dialog bilan)

### 6.4 Mahsulot Formasi (`/admin/products/new` va `/admin/products/:id/edit`)

- Maydonlar: nom (majburiy), kategoriya (men/women), narx (majburiy), chegirma (0-100), ombor, rasm (jpg/png/webp, max 5MB), tavsif
- Rasm oldindan ko'rish
- FormData (multipart) formatida yuborish
- Muvaffaqiyatli → `/admin/products` ga qaytish

### 6.5 Buyurtmalar Boshqaruvi (`/admin/orders`)

- Filtr tablari: Hammasi / Kutilmoqda / Topshirildi (soni bilan)
- Buyurtma kartochkalari: ID, sana, summa, holat, mijoz, elementlar
- "Topshirildi deb belgilash" tugmasi (pending order'larda)

---

## 7. SAVAT TIZIMI (CartContext)

### 7.1 Holat (State)

```javascript
cart = [
  {
    id: number,
    name: string,
    price: number,
    discount: number,
    discountedPrice: number,
    image: string,
    category: string,
    stock: number,
    quantity: number
  }
]
```

### 7.2 Funksiyalar

| Funksiya | Vazifa |
|----------|--------|
| `addToCart(product)` | Mahsulot qo'shish (ombor tekshiriladi) |
| `removeFromCart(productId)` | Mahsulot o'chirish |
| `updateQuantity(productId, qty, max)` | Miqdor yangilash |
| `clearCart()` | Savatni tozalash |
| `getTotalPrice()` | Jami narx |
| `getTotalDiscount()` | Jami chegirma |
| `getCartCount()` | Umumiy son |
| `cartCount` | Tezkor kirish uchun son |

### 7.3 Doimiylik

- `localStorage` ga saqlanadi
- `useState` lazy initializer orqali yuklanadi
- `useEffect` orqali har o'zgarishda yangilanadi

---

## 8. ANIMATSIYALAR (Framer Motion)

| Joylashuv | Animatsiya Turi |
|-----------|----------------|
| Navbar container | Fade-in + slide down |
| Mobil menyu | Slide in/out (o'ngdan) |
| Savat badge | Spring scale (son o'zgarganda) |
| Hero section | Staggered fade-in + slide-up |
| Hero SVG bezak | 360° aylanish |
| ProductCard | Staggered viewport reveal, hover lift (y: -8) |
| ProductCard tugma | Scale hover/tap |
| Promo banner | Scroll-triggered slide-up |
| Sahifa sarlavhasi | Slide-down on mount |
| Mahsulot grid | Fade-in on load |
| Tafsilotlari bo'limlari | Staggered delay (0.2s) |
| Orqaga tugma | Hover slide left |
| Savat elementlari | Staggered slide-in (chapdan) |
| Savat xulosa | Slide-in (o'ngdan) |
| Admin statistika | Staggered slide-up |
| About bo'limlari | Scroll-triggered stagger |
| Footer | Scroll-triggered fade-in |

---

## 9. DIZAYN TIZIMI

### 9.1 Ranglar

| Nom | Kod | Qo'llanilishi |
|-----|-----|--------------|
| Primary Black | `#111111` | Asl matn, fon |
| Primary White | `#fffdf8` | Fon, yorug' elementlar |
| Luxury Gold | `#caa24d` | Ajratuvchi rang, tugmalar, badge'lar |
| Light Gray | `#f4efe6` | Qo'shimcha fon |
| Surface | `#fffaf1` | Kartochka fonlari |
| Success | `#2f8f59` | Muvaffaqiyat, yetkazildi |
| Error | `#cf4a3f` | Xatolik, tugagan |

### 9.2 Shriftlar

| Tur | Shriftlar | Qo'llanilishi |
|-----|-----------|--------------|
| Asl | Aptos, Trebuchet MS, Segoe UI, sans-serif | Umumiy matn |
| Luxury | Iowan Old Style, Palatino Linotype, Book Antiqua, serif | Sarlavhalar, brend nomlari |

### 9.3 Bo'shliqlar

| Token | Qiymat |
|-------|--------|
| xs | 4px |
| sm | 8px |
| md | 16px |
| lg | 24px |
| xl | 32px |
| 2xl | 56px |

### 9.4 O'tishlar

| Token | Qiymat |
|-------|--------|
| fast | 0.2s |
| base | 0.3s |
| slow | 0.5s |

### 9.5 Soya

| Token | Qiymat |
|-------|--------|
| shadow | `0 18px 45px rgba(28,20,10,0.09)` |
| shadow-lg | `0 30px 80px rgba(23,15,8,0.16)` |

---

## 10. FUNKSIONAL IMKONIYATLAR

### 10.1 Foydalanuvchi Imkoniyatlari

1. ✅ Bosh sahifani ko'rish (hero, tavsiya, takliflar)
2. ✅ Mahsulotlarni kategoriya bo'yicha ko'rish (erkaklar/ayollar)
3. ✅ Mahsulotlarni qidirish (nom va tavsif bo'yicha)
4. ✅ Mahsulotlarni narx bo'yicha saralash
5. ✅ Chegirmali mahsulotlarni filtrlash
6. ✅ Mahsulot tafsilotlarini ko'rish
7. ✅ Savatga mahsulot qo'shish
8. ✅ Savatdagi miqdorni o'zgartirish
9. ✅ Savatdan mahsulot o'chirish
10. ✅ Buyurtma berish (ism, telefon, manzil)
11. ✅ Buyurtmalar tarixini ko'rish
12. ✅ Animatsiyalangan interfeys

### 10.2 Admin Imkoniyatlari

1. ✅ Boshqaruv paneliga kirish
2. ✅ Statistikanini ko'rish (mahsulotlar, buyurtmalar, daromad)
3. ✅ Mahsulotlarni ro'yxatini ko'rish
4. ✅ Yangi mahsulot qo'shish (rasm bilan)
5. ✅ Mahsulotni tahrirlash
6. ✅ Mahsulotni o'chirish
7. ✅ Buyurtmalarni ko'rish
8. ✅ Buyurtma holatini yangilash (topshirildi)

### 10.3 Cheklovlar

1. ❌ Foydalanuvchi autentifikatsiyasi (login/register)
2. ❌ Maxfiy buyurtmalar (barcha buyurtmalar ochiq)
3. ❌ Aloqa formasi backend'ga ulanmagan
4. ❌ Wishlist funksiyasi ishlamaydi
5. ❌ Sahifalash (pagination) frontend'da yo'q
6. ❌ Star reytinglari hardcoded (haqiqiy emas)
7. ❌ Admin endpoint'lari himoyalanmagan

---

## 11. MAHSULOTLAR KATALOGI

### 11.1 Erkaklar Kollektsiyasi (10 ta)

| # | Nomi | Narx | Chegirma | Ombor |
|---|------|------|---------|-------|
| 1 | Le Male | $100.00 | 15% | 10 |
| 2 | Le Male in Blue | $129.99 | 10% | 5 |
| 3 | Le Male Elixir Absolu | $110.00 | 20% | 0 |
| 4 | Le Male Elixir | $159.99 | 0% | 8 |
| 5 | Le Male Le Parfum | $109.99 | 25% | 12 |
| 6 | LE BEAU NARCISSE | $119.99 | 12% | 3 |
| 7 | Le Beau Flower Edition | $99.99 | 18% | 15 |
| 8 | Le Beau Paradise Garden | $109.99 | 22% | 0 |
| 9 | Le Beau Le Parfum | $89.99 | 30% | 7 |
| 10 | Le Beau | $89.99 | 30% | 20 |

### 11.2 Ayollar Kollektsiyasi (5 ta)

| # | Nomi | Narx | Chegirma | Ombor |
|---|------|------|---------|-------|
| 11 | Gaultier Divine Couture | $120.00 | 15% | 6 |
| 12 | Gaultier Divine Elixir | $130.00 | 0% | 0 |
| 13 | GAULTIER DIVINE LE PARFUM | $100.00 | 20% | 9 |
| 14 | Scandal Elixir | $99.99 | 20% | 4 |
| 15 | Scandal Intense | $99.99 | 20% | 11 |

---

## 12. BUYURTMA YARATISH JARAYONI

```
1. Foydalanuvchi mahsulotni tanlaydi
         │
2. "Savatga qo'shish" tugmasini bosadi
         │
3. CartContext.addToCart() → localStorage'ga saqlanadi
         │
4. Navbar'da savat soni yangilanadi
         │
5. Foydalanuvchi "/cart" sahifasiga o'tadi
         │
6. Miqdorni o'zgartiradi / mahsulotlarni o'chiradi
         │
7. "Buyurtma qilish" tugmasini bosadi
         │
8. Checkout formasi ko'rinadi (Ism, Telefon, Manzil)
         │
9. "buyurtmani tasdiqlash" tugmasini bosadi
         │
10. Frontend: POST /api/orders
    { customerName, customerPhone, locationUser, items[] }
         │
11. Backend: Tranzaksiya boshlanadi
    a) Ombor yetarliligi tekshiriladi
    b) Agar xatolik → tranzaksiya bekor qilinadi (400)
    c) Ombor kamaytiriladi
    d) Jami summa hisoblanadi
    e) orders jadvaliga yoziladi (status: 'topshirilmagan')
    f) order_items jadvaliga yoziladi
    g) Tranzaksiya tasdiqlanadi
         │
12. Frontend: Savat tozalanadi
         │
13. "Buyurtma muvaffaqiyatli joylashtirildi!" ko'rsatiladi
         │
14. Admin panel'da buyurtma ko'rinadi
```

---

## 13. RASM YUKLASH JARAYONI

```
1. Admin "/admin/products/new" sahifasiga o'tadi
         │
2. Formani to'ldiradi + rasm tanlaydi
   (jpg/jpeg/png/webp, max 5MB)
         │
3. "Saqlash" tugmasini bosadi
         │
4. Frontend: FormData yaratiladi
   - name, category, price, discount, stock, description
   - image: File object
         │
5. Frontend: POST /api/products (multipart/form-data)
         │
6. Backend: Multer middleware rasmni tekshiradi
   - MIME type tekshiriladi
   - Hajm tekshiriladi (5MB)
   - Fayl "backend/uploads/" ga saqlanadi
   - Nomi: "product-<timestamp>-<random>.<ext>"
         │
7. Backend: products jadvaliga yoziladi
   - image: "/uploads/product-xxx.jpg"
         │
8. Backend: Express static middleware
   - "/uploads/*" → "backend/uploads/" papkasi
         │
9. Frontend: resolveImage() funksiyasi
   - "/uploads/xxx.jpg" → "http://localhost:5000/uploads/xxx.jpg"
```

---

## 14. XAVFSIZLIK VA XATOLIKLAR

### 14.1 Mavjud Xavfsizlik Choralari

1. CORS konfiguratsiyasi (faqat localhost:5173)
2. Fayl hajmi cheklovi (5MB)
3. MIME type tekshiruvi (rasm formatlari)
4. Ombor yetarliligi tranzaksiyada tekshiriladi
5. Xatolik middleware (errorHandler)

### 14.2 Mavjud Xavfsizlik Kamchiliklari

1. Admin endpoint'lari himoyalanmagan (JWT yo'q)
2. Parol frontend'da hardcoded
3. Barcha buyurtmalar ochiq (foydalanuvchi filtri yo'q)
4. SQL injection himoyasi: Knex.js parametrlashgan so'rovlar ishlatadi ✅
5. XSS himoyasi: React avtomatik escape qiladi ✅

---

## 15. PASTKI QATLAM: SERVER SOZLASH

### 15.1 Express Middleware Zanjiri

```
1. requestLogger (hozircha no-op)
2. CORS (CORS_ORIGIN: http://localhost:5173)
3. express.json() (body parser)
4. express.urlencoded({ extended: true })
5. Static: /images → backend/src/data/images/
6. Static: /uploads → backend/uploads/
7. Routes: /api/products → productRoutes
8. Routes: /api/orders → orderRoutes
9. 404 handler (notFoundHandler)
10. Error handler (errorHandler)
```

### 15.2 Portlar

| Xizmat | Port |
|--------|------|
| Frontend (Vite dev) | 5173 |
| Backend (Express) | 5000 |
| PostgreSQL | 5432 |

---

## 16. LOYIHA HAJMI

| Qatlam | Fayllar | Taxminiy qatorlar |
|--------|---------|-------------------|
| Backend (source) | 18 fayl | ~1,200 qator |
| Frontend (source) | 25+ fayl | ~5,500 qator |
| CSS | 14 fayl | ~3,800 qator |
| Migrations/Seeds | 4 fayl | ~250 qator |
| JAMI | ~60 fayl | ~7,500+ qator |

---

## 17. ISHLATILGAN KUTUBXONALAR

### Backend
| Kutubxona | Versiya | Maqsad |
|-----------|---------|--------|
| express | ^4.18.2 | Web framework |
| cors | ^2.8.5 | CORS boshqaruvi |
| dotenv | ^16.0.3 | ENV o'zgaruvchilari |
| knex | ^3.2.10 | SQL query builder |
| pg | ^8.21.0 | PostgreSQL driver |
| multer | ^1.4.5-lts.1 | Fayl yuklash |

### Frontend
| Kutubxona | Versiya | Maqsad |
|-----------|---------|--------|
| react | ^18.2.0 | UI kutubxonasi |
| react-dom | ^18.2.0 | React DOM renderer |
| react-router-dom | ^6.20.0 | Client-side routing |
| framer-motion | ^10.16.16 | Animatsiyalar |
| axios | ^1.6.2 | HTTP client |

### Dev Tools
| Kutubxona | Versiya | Maqsad |
|-----------|---------|--------|
| vite | ^5.0.8 | Build tools |
| @vitejs/plugin-react | ^4.2.1 | React support for Vite |
| eslint | (config present) | Code linting |

---

## 18. GEOGRAFIYA VA TARGET AUDITORIYA

- **Til:** Asosan o'zbek tili (UI), ingliz tili (teknik)
- **Valyuta:** AQSh dollari (USD) — narxlar USD ko'rinishida
- **Maqsadli bozor:** O'zbekiston (onlayn parfümeriya xaridi)
- **Foydalanuvchilar:** Oddiy xaridorlar (mijozlar) + admin

---

## 19. LOYIHA YURITISH

| Fayl | Maqsad |
|------|--------|
| `AGENTS.md` | AI agent uchun ko'rsatmalar |
| `README.md` | Asosiy hujjat |
| `QUICKSTART.md` | Tezkor boshlash |
| `PROJECT_OVERVIEW.md` | Loyiha umumiy ko'rinishi |
| `INSTALLATION.md` | O'rnatish bo'yicha ko'rsatma |
| `FEATURES` | Funksiyalar ro'yxati |
| `COMPLETION_SUMMARY` | Yakunlash xulosasi |

---

## 20. XULOSA

Ushbu loyiha **React + Express + PostgreSQL** texnologiyalari asosida to'liq ishlaydigan onlayn do'kon tizimini ifodalaydi. Loyiha quyidagi asosiy komponentlarni o'z ichiga oladi:

1. **Frontend:** 7 ta sahifa + 3 ta komponent + admin panel (5 ta sahifa)
2. **Backend:** 14 ta API endpoint + middleware + utils
3. **Baza:** 3 ta jadval (products, orders, order_items) + 15 ta namuna mahsulot
4. **Dizayn:** Luxury uslubidagi dizayn tizimi (gold/black/cream)
5. **Animatsiyalar:** Framer Motion asosida 15+ turdagi animatsiya

Loyiha **diplom ishi** uchun mos keladi, chunki u zamonaviy veb-texnologiyalarni, database management'ni, API design'ni, frontend-backend integratsiyasini va UI/UX dizaynni o'z ichiga oladi.
