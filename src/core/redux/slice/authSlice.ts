import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface User {
  first_name: string;
  last_name: string;
  email: string;
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
    clearUser: function (state) {
      state = initialState;
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
