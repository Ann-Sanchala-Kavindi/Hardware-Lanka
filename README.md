# Apex Tools & Hardware Store 🛠️

A modern, high-performance web application and admin portal designed for a Hardware & Building Supplies store. Built with **Next.js 14 (App Router)**, **Tailwind CSS**, and **Supabase (PostgreSQL + Auth + Storage)**.

---

## ⚡ Zero-Cost Architecture (\$0/month Hosting)

| Layer | Provider | Free Tier Limits | Cost |
| :--- | :--- | :--- | :--- |
| **Frontend & API Routes** | **Vercel** | Unlimited static requests, 100GB bandwidth | **\$0 / mo** |
| **Database (PostgreSQL)** | **Supabase** | 500 MB database, 50,000 monthly active users | **\$0 / mo** |
| **Image Storage** | **Supabase Storage** | 1 GB storage bucket | **\$0 / mo** |
| **WhatsApp Direct Orders** | **WhatsApp API / wa.me** | Direct chat link generation | **\$0 / mo** |

---

## 🚀 Quick Start (Local Setup)

### 1. Install Dependencies & Run
Open your terminal (PowerShell / Command Prompt) and run:
```bash
cd "C:\Users\R E V O\.gemini\antigravity\scratch\hardware-shop"
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

> [!NOTE]
> The app comes with built-in **demo hardware items** (Power Drills, Mechanics Sets, PVC pipes, Panels, Screws, Paints, Safety gear) and works immediately out of the box even before configuring Supabase!

---

## 🗄️ Setting Up Supabase Cloud Database (Free in 2 Minutes)

1. Go to [supabase.com](https://supabase.com) and create a free account.
2. Click **New Project** and name it (e.g. `apex-hardware`).
3. In your Supabase Dashboard:
   * Go to **SQL Editor** on the left menu.
   * Click **New Query**.
   * Open the file `supabase/schema.sql` from this project, copy its entire contents, paste it into the editor, and click **RUN**.
4. In your Supabase Dashboard:
   * Go to **Project Settings** > **API**.
   * Copy the **Project URL** and **anon public Key**.
5. Open `.env.local` in your project folder and paste the keys:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   NEXT_PUBLIC_SHOP_WHATSAPP_NUMBER=15551234567
   ```

---

## 🔐 Shop Owner Admin Portal

* **Admin URL:** [http://localhost:3000/admin](http://localhost:3000/admin)
* **Demo Passcode:** `admin123` *(configurable in `.env.local`)*

### What the Client Can Do in the Admin Portal:
1. **Manage Products & Pricing:**
   * Add new tools and building materials with images, descriptions, and technical specifications.
   * Adjust retail and discount prices.
   * Set unit types (per piece, per kg, per box, per meter, per kit).
   * 1-Click stock availability toggles (`In Stock`, `Low Stock Alert`, `Out of Stock`).
2. **Track Trade Quotes & Orders:**
   * View customer quote requests with items, quantities, and site delivery addresses.
   * 1-Click button to message the contractor back on WhatsApp.
   * Update status from `Pending` → `Contacted` → `Completed`.
3. **Configure Store Information:**
   * Change WhatsApp ordering phone number.
   * Change operating hours and store location address.
   * Update the top notification banner announcement.

---

## 🌐 Deploying to Vercel (For Client Delivery)

1. Push your project folder to **GitHub** or **GitLab**.
2. Go to [vercel.com](https://vercel.com) and log in.
3. Click **Add New Project** and select your hardware shop repository.
4. In the **Environment Variables** section, add:
   * `NEXT_PUBLIC_SUPABASE_URL`
   * `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   * `NEXT_PUBLIC_SHOP_WHATSAPP_NUMBER`
   * `ADMIN_PASSCODE`
5. Click **Deploy**. Your website will be live worldwide in under 60 seconds with free SSL and \$0 hosting cost!

---

## 🏷️ Adding a Custom Domain (e.g. `clienthardware.com`)

1. In Vercel Project Settings > **Domains**, enter the client's custom domain.
2. In the domain registrar (Namecheap, GoDaddy, Cloudflare), set the DNS records provided by Vercel:
   * `A` record pointing to `76.76.21.21`
   * `CNAME` record `www` pointing to `cname.vercel-dns.com`
