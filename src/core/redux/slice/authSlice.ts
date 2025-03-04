import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface User {
  skills: any;
  phone_number: number;
  city: string;
  country: string;
  first_name: string;
  last_name: string;
  email: string;
  profile_picture: string;
  current_step?: number | 0;
  onboarding_completed?: boolean;
}
interface AuthState {
  user: User | null;
}

const initialState: AuthState = {
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AuthState["user"]>) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state = { ...state, user: null };
    },
    loginWithGoogle: () => {
      const authUrl = `${import.meta.env.VITE_API_URL}/auth/google`;
      const redirectUrl = `${window.location.origin}/#/auth/callback`;
      const url = `${authUrl}?redirectUrl=${encodeURIComponent(redirectUrl)}`;

      window.open(url, "_self");
    },
  },
});

export const { setUser, clearUser, loginWithGoogle } = authSlice.actions;
export default authSlice.reducer;
