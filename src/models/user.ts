import { Schema, model, models } from 'mongoose';

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    dob: { type: Date, default: Date.now },
    age: Number,
    password: { type: String, required: true },
    status: { type: String, enum: ['Active', 'InActive'], default: 'Active' },
    type: { type: String, enum: ['admin', 'support', 'manager'], default: 'support' },
  },
  { timestamps: true },
);

// ✅ Global fix for Next.js hot reload (App Router compatible)
const Ecomuser = models?.Ecomuser || model('Ecomuser', userSchema);

export default Ecomuser;
