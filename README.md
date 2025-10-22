## D Block MERN Starter

Small MERN starter with a React (Vite) frontend and Node.js/Express backend. Uses an in-memory seed by default and can optionally connect to MongoDB via `MONGODB_URI`.

### Prerequisites
- Node.js 18+
- npm 9+

### Project Layout
- `client/` – React 18 + Vite app (React Router)
- `server/` – Express API (CORS, Helmet, Morgan), optional Mongo via Mongoose
- `designassets/` – Existing repo images/icons used as public assets, mounted at `/assets`

### Install
1) `npm run install:all`

### Development
2) `npm run dev`
   - Client on `http://localhost:5173`
   - Server on `http://localhost:3000`
   - Vite proxies `/api/*` and `/assets/*` to the server.

Open `http://localhost:5173` in your browser.

### Production Build / Start
- Build the client: `npm run build`
- Start the server: `npm run start`
  - The server will serve the built SPA in `client/dist` and the static assets from `designassets/` as `/assets`.

### API
- `GET /api/health` → `{ status: "ok" }`
- `GET /api/products` → `[ { id|_id, slug, name, description, price, image }, ... ]`
- `GET /api/products/:slug` → `{ id|_id, slug, name, description, price, image }`

By default, the API serves data from `server/src/data/products.memory.js`. If `MONGODB_URI` is present, the server connects to MongoDB and uses the `Product` model instead. A seed script is provided to populate the two starter products.

### MongoDB (Optional)
1) Copy `server/.env.example` to `server/.env` and set `MONGODB_URI`.
2) Seed the DB: `npm run seed --prefix server`

### Using Assets
- Existing assets are under `designassets/` in this repo.
- At runtime, the server mounts them at `/assets`, so you can reference images like:
  - `/assets/images/dblock_logo_Final.svg`
  - `/assets/stapler.png` (placeholders expected; add your image or update the path in code)

### Reusing Existing HTML/CSS
- Some markup aesthetics from the existing `index.html` were ported into React and `client/src/styles/global.css`.
- You can drop additional CSS into `designassets/` and reference it via `/assets/...` as needed.

### Scripts
- Root:
  - `npm run install:all` – install client and server
  - `npm run dev` – concurrent dev for server (nodemon) + client (Vite)
  - `npm run build` – build client
  - `npm run start` – start Express (serves built app in prod)
- Server:
  - `npm run seed` – optional Mongo seed (requires `MONGODB_URI`)
- Client:
  - `npm run dev` / `npm run build` / `npm run preview`
  - `npm run lint` / `npm run format`

### Verification Checklist
1) `npm run install:all`
2) `npm run dev`
3) Open `http://localhost:5173` and see the logo + two product tiles.
4) Click a tile; it navigates to the detail page (data from API).
5) `curl http://localhost:3000/api/products` → returns the 2 items.

