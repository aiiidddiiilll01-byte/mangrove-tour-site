# Kilim Mangrove Tour — Website

Plain HTML/CSS/JS. No build step, no framework — this deploys to Vercel as-is.

## Before you deploy — 2 things to edit

1. **`index.html`** — near the top of `<body>`, replace the WhatsApp number:
   ```js
   const WHATSAPP_NUMBER = "60128084008"; // <-- your real business number
   ```
   Format: country code + number, no `+`, no spaces, no dashes.

2. **`images/`** — this folder is currently empty. The gallery section uses
   text placeholders (`bat-cave.jpg`, `eagle.jpg`, etc.) — swap those `<div class="gallery-placeholder">`
   blocks in `index.html` for real `<img src="images/your-photo.jpg">` tags once you have photos.

Also worth checking in `index.html`:
- The Google Maps embed URL points at Kilim Geoforest Park Jetty — update it if your actual jetty differs.
- The "4+ private boats" and other stats in the About section — adjust to your real numbers.

## Step 1 — Push to GitHub

If you don't have a GitHub account yet, create one free at github.com.

```bash
cd mangrove-website
git init
git add .
git commit -m "Initial site"
```

Then on github.com: click **New repository**, name it (e.g. `mangrove-tour-site`), leave it empty
(no README/license), and create it. GitHub will show you commands like:

```bash
git remote add origin https://github.com/YOUR_USERNAME/mangrove-tour-site.git
git branch -M main
git push -u origin main
```

Run those in your project folder.

## Step 2 — Deploy on Vercel

1. Go to vercel.com and sign in with your GitHub account.
2. Click **Add New → Project**.
3. Select the `mangrove-tour-site` repo you just pushed.
4. Framework preset: choose **Other** (this is plain HTML, no framework needed).
5. Leave build settings empty — no build command needed.
6. Click **Deploy**.

You'll get a live URL like `mangrove-tour-site.vercel.app` within a minute.

## Step 3 — Every future update

Any time you edit files and want the live site updated:
```bash
git add .
git commit -m "describe what you changed"
git push
```
Vercel auto-redeploys on every push to `main` — no extra steps.

## Later — custom domain

Once you're ready to buy a real domain (e.g. `kilimmangrove.com`), add it under
your Vercel project → **Settings → Domains**. Vercel will give you DNS records
to set at your domain registrar.
