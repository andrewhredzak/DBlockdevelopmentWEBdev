import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    description: { type: String, default: '' },
    price: { type: Number, required: true },
    image: { type: String, default: '' },
  },
  { timestamps: true }
);

// Prevent model overwrite in dev watch mode
export const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

