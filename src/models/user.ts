import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    phone: String,
    dob: String,
    age: Number,
    password: String,
    status: { type: String, enum: ['Active', 'InActive'], default: 'Active' },
  },
  { timestamps: true },
);

export default mongoose.models.Ecomuser || mongoose.model('Ecomuser', userSchema);
