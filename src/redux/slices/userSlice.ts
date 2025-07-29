import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type User = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  dob: string;
  age: number;
  status: 'Active' | 'InActive';
  token?: string;
};

type UserState = {
  user: User | null;
};

const initialState: UserState = {
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    logout(state) {
      state.user = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
