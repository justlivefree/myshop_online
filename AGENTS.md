# AGENTS.md — onlayn do'kon (JPG Perfumes)

## Project Overview
Full-stack e-commerce for Jean Paul Gaultier perfumes.
- **Frontend**: React 18 + Vite + React Router 6 + Framer Motion
- **Backend**: Node.js + Express 4 (ES modules)
- **Database**: PostgreSQL 16 (Docker) via Knex.js query builder
- **Image Storage**: Local filesystem (`backend/uploads/`)

## Tech Stack
| Layer | Technology |
|-------|-----------|
| Runtime | Node.js v25+ |
| Backend framework | Express 4.18 |
| Database | PostgreSQL 16 (Docker container `tezusta-postgres`) |
| Query builder / Migrations | Knex.js |
| Frontend | React 18.2 + Vite 5 |
| Animations | Framer Motion 10 |
| HTTP client | Axios |
| State management | Context API + localStorage |

## Architecture
```
Frontend (:5173) ──> Backend (:5000) ──> PostgreSQL (:5432)
                            │
                      uploads/ (images)
```

## Project Conventions

### Code Style
- ES modules throughout (`"type": "module"` in package.json)
- Use `import/export`, never `require()`
- camelCase for variables and functions
- PascalCase for React components
- 2-space indentation
- Semicolons required
- Single quotes for strings

### File Organization
```
backend/src/
  index.js              — Server entry point
  db.js                 — Shared Knex instance
  controllers/          — Route handlers (one per domain)
  routes/               — Express router definitions
  middleware/            — Custom middleware (error, upload, auth)
  utils/                — Helper functions

frontend/src/
  App.jsx               — Router + layout
  context/              — Context providers (CartContext)
  components/           — Reusable UI components
  pages/                — Route-level page components
  pages/admin/          — Admin panel pages
  utils/                — API client + helpers
  styles/               — Global CSS
```

### API Conventions
- Base URL: `/api`
- Response shape: `{ success: boolean, data: ..., pagination?: {...} }`
- Error shape: `{ success: false, error: { message: string } }`
- Use appropriate HTTP status codes (200, 201, 400, 404, 500)

### Database
- Table names: snake_case, plural (`products`, `orders`, `order_items`)
- Primary keys: `id` (serial/integer)
- Timestamps: `created_at` with default `now()`
- Foreign keys: `order_id`, `product_id` with `ON DELETE CASCADE` where appropriate
- Migrations in `backend/migrations/`
- Seeds in `backend/seeds/`

### Git
- Descriptive commit messages
- Never commit `.env`, `node_modules/`, `uploads/`
- `.gitignore` covers: `node_modules/`, `.env`, `uploads/`, `dist/`

### Admin Panel
- Accessed at `/admin` route
- Simple hardcoded login (no JWT)
- Features: product CRUD, order management, dashboard stats

### Images
- Uploaded to `backend/uploads/`
- Served via Express static middleware at `/uploads/`
- Accepted formats: jpg, jpeg, png, webp
- Max file size: 5MB

## Running the Project
```bash
# Start PostgreSQL (Docker)
docker start tezusta-postgres

# Backend
cd backend && npm install && npm run dev

# Frontend
cd frontend && npm install && npm run dev
```

## Database Connection
```
Host: localhost
Port: 5432
Database: tezusta
User: postgres
Password: postgres
```
