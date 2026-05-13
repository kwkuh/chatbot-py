# domain-sell

> Open-source, single-file HTML landing page to sell individual domains via Stripe. Self-hosted, zero dependencies, drop it on the domain you're selling and you're live.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Made with HTML](https://img.shields.io/badge/made%20with-HTML-orange)](https://developer.mozilla.org/docs/Web/HTML)
[![Stripe](https://img.shields.io/badge/payments-Stripe-635bff)](https://stripe.com)
[![No build step](https://img.shields.io/badge/build-none-brightgreen)](#quick-start)
[![PRs welcome](https://img.shields.io/badge/PRs-welcome-blue)](https://github.com/kwkuh/domain-sell/pulls)

A free, open-source alternative to Sedo / Dan / Afternic / GoDaddy domain landers. Keep 97% of the sale price instead of paying 10–20% commission to a marketplace. One HTML file. One Stripe payment link. Done.

---

## Features

- **Single file** — `index.html`, no build, no framework, no backend
- **Stripe checkout** — accept cards, wallets, BNPL, multi-currency out of the box
- **Self-hosted** — deploy to Cloudflare Pages, GitHub Pages, Vercel, Netlify, or any static host (free tiers work)
- **Zero dependencies** — no npm, no Python, no Docker, no analytics trackers
- **Configurable** — edit one `CFG` block at the bottom of the HTML to set domain, price, Stripe link
- **Low fees** — Stripe takes 2.9% + $0.30 vs. 10–20% marketplace commission
- **Privacy-friendly** — no third-party scripts, no cookies, no telemetry
- **WHOIS-style aesthetic** — terminal-themed lander that domainers and devs actually want to land on

## Why

| | domain-sell | Sedo / Dan / Afternic |
|---|---|---|
| Commission | 0% | 10–20% |
| Payment fee | 2.9% + $0.30 (Stripe) | included |
| Hosting | self-hosted (free) | their lander |
| Customization | full HTML/CSS control | template only |
| Escrow | DIY via Stripe | included |
| Open source | yes (MIT) | no |

On a $10,000 sale: Sedo keeps ~$1,500. domain-sell + Stripe keeps ~$290. You pocket the difference.

## Quick start

```bash
git clone https://github.com/kwkuh/domain-sell.git
cd domain-sell
```

1. Open `index.html`, scroll to the `CFG` block at the bottom.
2. Set your domain name, asking price, contact email, and Stripe payment link.
3. Create a [Stripe payment link](https://dashboard.stripe.com/payment-links) for the asking price.
4. Deploy `index.html` to the domain you're selling:
   - **Cloudflare Pages** — drag-and-drop or `wrangler pages deploy`
   - **GitHub Pages** — push to a `gh-pages` branch
   - **Netlify / Vercel** — drag-and-drop deploy
   - **Any web host** — upload the file via SFTP

That's it. The domain is now for sale.

## Configuration

Inside `index.html`:

```js
const CFG = {
  domain:    "example.com",
  price:     "$2,500 USD",
  stripeUrl: "https://buy.stripe.com/your-payment-link",
  email:     "you@example.com",
};
```

## Deploy examples

**Cloudflare Pages (recommended)**

```bash
npx wrangler pages deploy . --project-name=domain-sell
```

**Static via any web server**

```bash
python3 -m http.server 8000   # local preview
# then rsync/scp index.html to your server
```

## Roadmap

- [ ] Multi-domain portfolio template
- [ ] Offer / counter-offer flow (instead of just buy-now)
- [ ] Optional analytics adapter (Plausible / Cloudflare Web Analytics)
- [ ] i18n (English / Bahasa Indonesia / ES / etc.)
- [ ] Theme variants (terminal, minimal, premium)

## Contributing

PRs welcome. Keep it single-file. No build step. No frameworks.

## License

MIT © [Kukuh Laksana](https://kukuh.la)

---

```
$ whois domain-sell

███████╗███████╗██╗     ██╗
██╔════╝██╔════╝██║     ██║
███████╗█████╗  ██║     ██║
╚════██║██╔══╝  ██║     ██║
███████║███████╗███████╗███████╗
╚══════╝╚══════╝╚══════╝╚══════╝

domain:       DOMAIN-SELL
status:       ACTIVE / OPEN-SOURCE
license:      MIT
created:      2026-01-15
registrant:   Kukuh Laksana (kukuh.la)
source:       github.com/kwkuh/domain-sell
```
