# 🐂 $JOEL — The African Bull

The official meme site for **$JOEL — The African Bull**, the community's gift to Prophet Joel.
Built on Solana. Built for the trenches. **Bullish Forever.**

> "We don't follow the market. We lead the movement." — Prophet Joel

## What's inside

A fast, single-page static site — no build step, no dependencies.

- `index.html` — page structure & content
- `styles.css` — black / gold / green brand system, fully responsive
- `script.js` — Dexscreener chart embed, live contract fetch + copy, animations
- `assets/img/` — banner & hero artwork

## Features

- ⚡ Hero with animated glow, floating coins, and brand marquees
- 📈 Live **Dexscreener** chart embed
- 📋 Contract address auto-fetched from the Dexscreener API with one-click copy
- 🪂 Tokenomics, How-to-Buy, Roadmap, and Community sections
- 📱 Mobile-first responsive layout + reduced-motion support

## Run it locally

Just open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8080
# then visit http://localhost:8080
```

## Configure the token

Edit the constants at the top of `script.js`:

```js
const PAIR_ADDRESS = 'F4RpL9YWn66LEqQAqR69okWtA36To1qKCpe7kdZUyT9J';
const CHAIN = 'solana';
```

Add your Twitter/X and Telegram links in `index.html` (the `.social` anchors).

## Deploy

Drop the folder on any static host — **GitHub Pages**, Netlify, Vercel, or Cloudflare Pages.

---

*One Community. One Mission. One Bull.* 🟢
