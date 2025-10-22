import { Router } from 'express';
import { isConnected } from '../lib/db.js';
import { Product } from '../models/Product.js';
import { memoryProducts } from '../data/products.memory.js';

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    if (isConnected()) {
      const docs = await Product.find({}, { __v: 0 }).lean();
      return res.json(docs);
    }
    return res.json(memoryProducts);
  } catch (err) {
    next(err);
  }
});

router.get('/:slug', async (req, res, next) => {
  const { slug } = req.params;
  try {
    if (isConnected()) {
      const doc = await Product.findOne({ slug }, { __v: 0 }).lean();
      if (!doc) return res.status(404).json({ error: 'Product not found' });
      return res.json(doc);
    }
    const item = memoryProducts.find((p) => p.slug === slug);
    if (!item) return res.status(404).json({ error: 'Product not found' });
    return res.json(item);
  } catch (err) {
    next(err);
  }
});

export default router;

