import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../slice/authSlice'

const rootReducer = {
    auth:authReducer
}

export const store = configureStore({
  reducer:rootReducer
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch