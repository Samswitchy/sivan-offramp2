# Sivan — Crypto On/Off-Ramp (React)

A professional React + Vite implementation of the Sivan crypto on-ramp/off-ramp website, built to match the design and UX of industry leaders (Ramp, MoonPay, Transak) without emojis or playful gimmicks.

## Stack
- **React 18 + Vite**
- **React Router 6** — client-side routing with protected routes
- **Lucide React** — clean line icons (no emojis anywhere in the product)
- **Inter** font (Google Fonts)
- Plain CSS design system (no Tailwind/MUI dependency)

## Pages included

### Public / marketing
- `/` — **Landing page**
  - Capital-at-risk warning bar (required for crypto marketing)
  - Sticky nav (Features / How it works / Fees / FAQ / Business + Sign in / Get started)
  - Hero with two-way headline + interactive Sell/Buy quote widget (visual)
  - Supported chips strip (Visa, Mastercard, Apple Pay, ACH, SEPA, FPS, NIP, USDC, USDT, chains)
  - Animated stat counters
  - Two-direction feature cards (Sell · Crypto→Fiat / Buy · Fiat→Crypto)
  - 3-step "How it works"
  - 9-feature grid
  - Business/API section with syntax-highlighted code sample
  - 8-question FAQ accordion
  - Final CTA
  - 5-column footer with legal links and disclaimer
- `/login` — **Sign in** (split-screen: marketing left, form right; email + password, remember me, forgot, social sign-in buttons)
- `/signup` — **Create account** (first/last name, email, password, country, terms checkbox)

### Logged-in app (protected routes, under `/app`)
- `/app` — **Dashboard**
  - Welcome/status strip (context-aware: "Finish setup" or "Welcome back, name")
  - Two quick-action cards (Sell / Buy)
  - 4 KPI cards (volume, transactions, avg payout, verification)
  - Recent transactions list
  - Account-setup progress checklist + security reminder card
- `/app/sell` — **Sell crypto** (4-step wizard)
  - Quote (amount, asset picker, fiat picker, network selector, rate/fee/arrival quote, rate-lock note)
  - Review + refund wallet address + risk acknowledgment
  - Deposit address with QR placeholder, copy, expiry, warning
  - Transaction tracking timeline
- `/app/buy` — **Buy crypto** (same 4-step wizard re-used with buy labels)
- `/app/transactions` — **Transactions** table with filters (All/Sells/Buys/Processing), search, CSV export
- `/app/payment-methods` — **Payment methods** (bank accounts + cards, add modal)
- `/app/verification` — **Verification** center (progress %, 3 tier levels, 5 verification steps)
- `/app/settings` — **Settings** with tabs (Profile / Security / Notifications / Preferences), 2FA toggle, active sessions, delete account
- `/app/support` — **Support** (4 contact cards + mini FAQ)

## Design system (in `src/index.css`)
- Dark professional theme (dark navy `#05080c` base)
- Brand gradient: teal `#4cd8c8` → blue `#4b8bf4` (matches Sivan S-logo)
- Professional status palette (green/gold/red/blue/purple)
- Tight Inter typography scale
- No emojis anywhere in the product (Lucide line icons are used instead)
- Fully responsive (sidebar collapses to mobile drawer at <900px, grids reflow)

## Run it

```bash
cd sivan-app
npm install
npm run dev
```

Then open http://localhost:5173/

To build for production:

```bash
npm run build
```

Output goes to `dist/`.

## Project structure

```
sivan-app/
├── index.html
├── public/
│   └── sivan-logo.png         (your actual Sivan logo)
├── src/
│   ├── main.jsx
│   ├── App.jsx                (routing + protected routes)
│   ├── App.css
│   ├── index.css              (design tokens / global styles)
│   ├── context/
│   │   └── AuthContext.jsx    (signin/signup/signout + persisted session)
│   ├── components/
│   │   ├── Nav.jsx            (public marketing nav)
│   │   └── AppLayout.jsx      (logged-in sidebar + topbar shell)
│   └── pages/
│       ├── Landing.jsx
│       ├── Auth.jsx           (Login + Signup)
│       ├── Dashboard.jsx
│       ├── Trade.jsx          (Buy + Sell wizard)
│       └── AppPages.jsx       (Transactions / Payment methods / Verification / Settings / Support)
```

## Notes
- The auth/session is mocked via localStorage (it persists between page reloads but is not connected to a backend). Connect it to your real API by replacing the `signin/signup/updateUser` functions in `src/context/AuthContext.jsx`.
- The 4 "transactions" and stats are seeded demo data so the dashboard looks populated.
- Live rate quote and crypto deposit addresses are UI placeholders ready to be wired to your API.
