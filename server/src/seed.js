import 'dotenv/config';
import { connectMongo, isConnected } from './lib/db.js';
import { Product } from './models/Product.js';
import { memoryProducts } from './data/products.memory.js';

async function run() {
  const ok = await connectMongo(process.env.MONGODB_URI);
  if (!ok || !isConnected()) {
    console.error('[seed] No Mongo connection. Set MONGODB_URI to seed.');
    process.exit(1);
  }
  for (const p of memoryProducts) {
    const {_id, id, ...rest} = p; // ignore memory id
    await Product.updateOne({ slug: p.slug }, { $set: rest }, { upsert: true });
  }
  console.log(`[seed] Seeded ${memoryProducts.length} products.`);
  process.exit(0);
}

run().catch((e) => {
  console.error('[seed] Error:', e);
  process.exit(1);
});

