import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Product = {
  _id: string;
  name: string;
  category: string;
  quantity: number;
  price: number;
  image: string;
  description?: string;
  upsc?: string;
  sku?: string;
  color?: string;
  size?: string;
};

type CartState = {
  items: Product[];
};

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Product>) {
      const existing = state.items.find((p) => p._id === action.payload._id);
      if (existing) {
        existing.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    removeFromCart(state, action: PayloadAction<string>) {
      state.items = state.items.filter((p) => p._id !== action.payload);
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
