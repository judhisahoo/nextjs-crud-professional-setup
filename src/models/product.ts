import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: String,
    category: String,
    quantity: Number,
    price: Number,
    image: String,
    description: String,
    upsc: String,
    sku: String,
    color: String,
    size: String,
  },
  { timestamps: true },
);

export default mongoose.models.Ecomproduct || mongoose.model('Ecomproduct', productSchema);
