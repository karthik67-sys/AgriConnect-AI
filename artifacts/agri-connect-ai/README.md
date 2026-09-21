# AgriConnect AI

AgriConnect AI is a frontend-only React/Vite prototype for a practical farm-to-market network. It gives farmers, individual shoppers, bulk buyers, delivery partners, and volunteers a shared but role-aware view of produce, demand, payments, trust, and support.

## Run locally

```bash
cd artifacts/agri-connect-ai
npm install
npm run dev
```

Other useful commands:

```bash
npm run typecheck
npm run build
npm run serve
```

## Demo roles

No credentials or account creation are required. Open `/login` and choose a demo role:

- **Farmer / Lakshya** — Guntur, Andhra Pradesh; crops, demand signals, price history, selling, orders, quality, delivery, payments, rewards, help.
- **Individual consumer / Priya** — shop, basket, simulated full-payment checkout, order history, savings, delivery, ratings, rewards, customer care.
- **Bulk buyer / Aruna Foods** — procurement requirements, verified farmers, bulk orders, delivery, and a payment flow with 40% advance or full payment.
- **Delivery person / Ravi Kumar** — route board, active delivery timeline, map-style tracking, status advancement, and delivery history.
- **Volunteer / Meera** — farmer requests, call actions, acceptance, completion, and impact history.

## Features

- Responsive role-aware shell with sidebar, mobile menu, search affordance, notifications, profile/settings affordances, and floating AgriBot.
- Farmer dashboard with requested demo values: 8 active orders, 42 delivered, 3 pending, ₹1,84,500 earnings, ₹32,000 pending payments, and 4 available crops.
- Local market selector for Guntur, Vijayawada, Visakhapatnam, Kurnool, Tirupati, Hyderabad, and Warangal.
- Recharts crop price history for Tomato, Rice, and Chilli.
- Explicit demo labels for AI predictions, market values, simulated payments, route data, and trust scores.
- Individual consumer checkout always pays the full basket total and shows `Payment Successful • Order Confirmed`.
- Bulk payment arithmetic uses the exact ₹1,20,000 tomato example: ₹48,000 now and ₹72,000 remaining, or ₹1,20,000 in full.
- Delivery timeline: Assigned → Picked Up → In Transit → Near Destination → Delivered.
- Map-style logistics visualization with distance, ETA, last updated time, and cold-chain temperature.
- Ratings with five stars and Product Quality, Communication, Price, Delivery, and Overall Experience categories.
- Toast feedback and working local interactions for prominent actions.
- AgriBot quick actions: Track Order, Payment Help, Crop Price, Find Buyer, Request Volunteer, and Delivery Support.
- Browser Speech Recognition is used when available; browsers without it receive a graceful microphone simulation.

## Structure

```text
src/
  App.tsx
  index.css
  data/mockData.ts              # all in-memory mock data
  components/agri-components.tsx # shell, charts, dashboards, shared primitives
  pages/Entry.tsx               # welcome and demo role selection
  pages/RolePage.tsx            # connected role sections and local flows
  main.tsx
```

This prototype intentionally has no backend, external API calls, auth provider, API key, paid service, or real payment processing. Data resets on refresh.

## Production build

```bash
npm run build
```

The Vite output is written to `dist/`. For a production integration, replace the in-memory module with authenticated API hooks, persist checkout and delivery mutations server-side, and keep the explicit UI distinction between predictions and verified market data.