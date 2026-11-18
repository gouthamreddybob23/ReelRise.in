# ReelRise.in — Version 1

Premium black & gold website for reels shoot booking. React + Vite, no backend.
Booking requests are prepared in the browser and sent by the customer through WhatsApp or their email app.
Nothing is stored and nothing is auto-sent.

## Run locally

```bash
npm install
npm run dev        # http://localhost:5173
npm test           # validation + WhatsApp/mailto generation tests
npm run build      # outputs to dist/
npm run preview    # serve the production build
```

## Where to edit things

| What | File |
| --- | --- |
| Phone, email, Instagram URL, categories, time slots | `src/config/site.js` |
| Validation + WhatsApp/mailto message format | `src/config/booking.js` |
| Colours and fonts | `:root` in `src/styles/global.css` |
| Images, favicon, share image | `public/images/`, `public/favicon.png` |

To enable the Instagram link, set `instagramUrl` in `src/config/site.js`.

## Deploy: GitHub

1. Create an empty repository on github.com (e.g. `reelrise`). Do not add a README there.
2. In the project folder:

```bash
git init
git add .
git commit -m "ReelRise V1"
git branch -M main
git remote add origin https://github.com/<your-username>/reelrise.git
git push -u origin main
```

## Deploy: Netlify

1. Log in at app.netlify.com → **Add new site → Import an existing project → GitHub**.
2. Pick the `reelrise` repository.
3. Settings (also set in `netlify.toml`): Build command `npm run build`, Publish directory `dist`.
4. Click **Deploy**. Netlify gives you a `*.netlify.app` address once it finishes.

## Connect reelrise.in

1. Netlify → **Domain management → Add a domain** → enter `reelrise.in`.
2. Easiest: choose **Use Netlify DNS**, then at your domain registrar replace the nameservers with the four Netlify shows you.
   Alternative: keep your registrar's DNS and add the records Netlify lists (an A record for the root domain and a CNAME for `www`).
3. Wait for DNS to propagate (minutes to a few hours), then in Netlify click **Verify DNS** and enable **HTTPS (Let's Encrypt)**.

## Notes

- Page metadata and the share image already point to `https://reelrise.in/`.
- No `.env` files or secrets are used.
- V2 ideas (admin dashboard, database, slot management) are not implemented.
