import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import 'dotenv/config';

import healthRouter from './routes/health.js';
import productsRouter from './routes/products.js';
import { connectMongo } from './lib/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Security & middleware
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Assets served from repo's designassets/ as /assets
const assetsDir = path.resolve(__dirname, '../../designassets');
app.use('/assets', express.static(assetsDir));

// API routes
app.use('/api/health', healthRouter);
app.use('/api/products', productsRouter);

// In production, serve built client
const clientDist = path.resolve(__dirname, '../../client/dist');
app.use(express.static(clientDist));

app.get('*', (req, res, next) => {
  // If the request starts with /api or /assets, let it fall through
  if (req.path.startsWith('/api') || req.path.startsWith('/assets')) return next();
  // Try to serve the SPA if available
  res.sendFile(path.join(clientDist, 'index.html'), (err) => {
    if (err) next();
  });
});

// 404 handler for API
app.use((req, res, next) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ error: 'Not found' });
  }
  return next();
});

// Error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error('[error]', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Connect to Mongo if configured (non-blocking for startup)
if (process.env.MONGODB_URI) {
  connectMongo(process.env.MONGODB_URI).then((ok) => {
    if (ok) console.log('[db] Connected to MongoDB');
  });
}

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});

