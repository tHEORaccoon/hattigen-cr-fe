import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface User{
  email: string,
  password:string
}
interface AuthState {
  user:User | null,
}


const initialState: AuthState = {
  user: null
}

export const authSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    login: (_state, _action: PayloadAction<User>) => {
       
    },

  },
})

export const { login } = authSlice.actions

export default authSlice.reducer