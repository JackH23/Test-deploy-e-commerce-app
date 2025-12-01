### backend/.env/
MONGODB_URL = mongodb+srv://CHEKKY:CHEKKY_1234@e-commerce.zojpv.mongodb.net/MERN_Ecommerce?retryWrites=true&w=majority&appName=E-Commerce
TOKEN_SECRETE_KEY = "QWEWRWETWQEIUTIOEKALDJGAADSKGLJASDKLGJOETU"
FRONTEND_URL = http://localhost:3000

#  first look for https://stripe.com/in 
#  Developer > copy Secret key/backend and Publishable key/frontend
#  place them at .env STRIPE_SECRET_KEY
STRIPE_SECRET_KEY = sk_test_51Q557fP7FPCeKHZwq4OFArDQWYHxHMSK9w9Sujaw5GeoRFABTqkfGXMTbhFLl0oeLjXy35WuE95nBOm2luiDpP7C00nYK1Y4DQ
STRIPE_ENDPOINT_WEBHOOK_SECRET_KEY = "whsec_v4WNBF2vuDmdHjZEAFWdsGBrnH6zQUcW"

### frontend/.env
REACT_APP_CLOUDIARY_CLOUD_NAME = dwr12pbbp
REACT_APP_STRIPE_PUBLIC_KEY = pk_test_51Q557fP7FPCeKHZwHz2oMoVRxVrZjHJ0t5deS1NpbWN681W7qAoRIDnNrvrfOe9LJ2S3Hr0k5mqDCmNVxAUKVuca00tP9St6Vv
REACT_APP_BACKEND_URL = http://localhost:8080

#   first look for https://stripe.com/in 
#   Developer > copy Publishable key/frontend

# Developer > webhooks > Download the CLI/Webhook builder >  Download the CLI > Windows 
# Download the latest windows zip file from GitHub. > stripe_1.21.8_windows_x86_64.zip


Below is your entire deployment guide **fully corrected, clean, consistent, production-ready, and safe**.

# ✅ **🟦 1. Server Preparation (Ubuntu on Hostinger VPS)**

```bash
sudo apt update && sudo apt install -y git curl build-essential nginx
```

**Install Node 18**

```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs
```

**Install PM2**

```bash
sudo npm install -g pm2
```

---

# ✅ **🟦 2. Backend Setup**

```bash
cd /var/www/Test-deploy-e-commerce-app/backend
npm install
```

---

# ✅ **🟦 3. Create backend `.env`**

```bash
nano /var/www/Test-deploy-e-commerce-app/backend/.env
```

Inside:

```
MONGODB_URL=mongodb+srv://...
TOKEN_SECRETE_KEY="YOUR_SECRET_HERE"

# Backend config
FRONTEND_URL=https://ecommerceshop.site

# Stripe
STRIPE_SECRET_KEY=your_secret
STRIPE_ENDPOINT_WEBHOOK_SECRET_KEY=your_webhook_secret
```

---

# ✅ **Backend `index.js` (Corrected & Final Version)**

```js
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const router = require("./routes");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();

// MUST COME FIRST
app.use(express.json());
app.use(cookieParser());

// CORRECT CORS CONFIG
app.use(cors({
    origin: [
        "https://ecommerceshop.site",
        "https://www.ecommerceshop.site"
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true
}));

// Allow preflight requests
app.options("*", cors());

// API ROUTES
app.use("/api", router);

// IMPORTANT: Correct order
const PORT = process.env.PORT || 8080;

connectDB().then(() => {
    app.listen(PORT, "0.0.0.0", () => {
        console.log("connect to DB");
        console.log("Server is running on port " + PORT);
    });
});
```

---

# ✅ **Start backend with PM2**

```bash
pm2 start index.js --name backend
pm2 save
pm2 startup
```

---

# 🟦 **4. Frontend Setup (React)**

Create `.env`:

```bash
nano /var/www/Test-deploy-e-commerce-app/frontend/.env
```

Inside:

```
REACT_APP_BACKEND_URL=https://api.ecommerceshop.site
REACT_APP_STRIPE_PUBLIC_KEY=pk_test_...
REACT_APP_CLOUDIARY_CLOUD_NAME=dwr12pbbp
```

Build:

```bash
cd /var/www/Test-deploy-e-commerce-app/frontend
npm install
npm run build
```

Results go to:

```
frontend/build/
```

---

# 🟦 **5. Configure Nginx**

```bash
sudo nano /etc/nginx/sites-available/ecommerceshop.site
```

Paste this EXACT configuration:

```nginx
# Frontend
server {
    listen 80;
    server_name ecommerceshop.site www.ecommerceshop.site;

    root /var/www/Test-deploy-e-commerce-app/frontend/build;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}

# Backend API
server {
    listen 80;
    server_name api.ecommerceshop.site;

    location / {
        proxy_pass http://127.0.0.1:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Enable and reload:

```bash
sudo ln -s /etc/nginx/sites-available/ecommerceshop.site /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

---

# 🟦 **6. Install SSL for HTTPS**

```bash
sudo apt install -y certbot python3-certbot-nginx
```

Issue certificates:

```bash
sudo certbot --nginx -d ecommerceshop.site -d www.ecommerceshop.site
sudo certbot --nginx -d api.ecommerceshop.site
```

Check auto-renew:

```bash
systemctl status certbot.timer
```

---

# 🟦 **7. Validation Checklist**

### Backend

✔ `pm2 status` shows backend online
✔ `curl -I https://api.ecommerceshop.site/api/user-details` shows 200/401

### Frontend

✔ `https://ecommerceshop.site` loads React
✔ API calls no longer give CORS errors

### DNS

| Type | Name | Value         |
| ---- | ---- | ------------- |
| A    | @    | 31.97.109.187 |
| A    | www  | 31.97.109.187 |
| A    | api  | 31.97.109.187 |

---

# 🛠️ After DNS is correct

Re-run SSL if necessary:

```bash
sudo certbot --nginx -d ecommerceshop.site -d www.ecommerceshop.site
sudo certbot --nginx -d api.ecommerceshop.site
