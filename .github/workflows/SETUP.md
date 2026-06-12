# GitHub CI/CD Setup

## Kerakli GitHub Secrets

GitHub repository → **Settings → Secrets and variables → Actions → New repository secret**

### SSH orqali deploy uchun

| Secret nomi       | Qiymati                                          |
|-------------------|--------------------------------------------------|
| `SSH_PRIVATE_KEY` | Server SSH private key (`~/.ssh/id_rsa` mazmuni) |
| `SSH_HOST`        | Server IP yoki domen (`123.45.67.89`)            |
| `SSH_USER`        | SSH username (`ubuntu`, `root`, va h.k.)         |
| `DEPLOY_PATH`     | Serverda loyiha joylashuvi (`/var/www/shop`)     |
| `VITE_API_URL`    | Backend API URL (`https://api.yoursite.com`)     |

---

## SSH kalitini yaratish

Serverda hali SSH kaliti bo'lmasa:

```bash
# Local mashinada yangi kalit yaratish
ssh-keygen -t ed25519 -C "github-deploy" -f ~/.ssh/deploy_key -N ""

# Ochiq kalitni serverga qo'shish
ssh-copy-id -i ~/.ssh/deploy_key.pub user@your-server

# Private kalitni GitHub Secret'ga qo'shish
cat ~/.ssh/deploy_key
# Ko'chirilgan matnni SSH_PRIVATE_KEY secretiga joylashtiring
```

---

## Serverda PM2 o'rnatish

Backend jarayonini boshqarish uchun:

```bash
npm install -g pm2
pm2 startup          # tizim ishga tushganda avtomatik start
pm2 save
```

---

## Serverda .env fayli

Backend papkasida `.env` fayli bo'lishi kerak (deploy script uni o'zgartirmaydi):

```env
PORT=3001
DB_HOST=localhost
DB_PORT=5432
DB_NAME=tezusta
DB_USER=postgres
DB_PASSWORD=your_password
```

---

## Workflow qanday ishlaydi

1. **Har qanday push/PR** → `build` job:
   - Frontend npm install
   - ESLint tekshirish
   - `vite build` — build muvaffaqiyatli bo'lishi shart

2. **`main` branchga push** → `deploy` job (`build` o'tgandan keyin):
   - Frontend build yaratiladi
   - `rsync` orqali server frontend papkasiga yuboriladi
   - `rsync` orqali backend serverga yuboriladi (node_modules va .env saqlanadi)
   - Serverda `npm ci` + `npm run migrate` ishga tushadi
   - PM2 orqali backend restart bo'ladi
