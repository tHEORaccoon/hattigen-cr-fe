import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../slice/authSlice'
import cvFormReducer from '../slice/cvFormSlice'
import personalInfoReducer from '../slice/personalInfoSlice'

const rootReducer = {
    auth:authReducer,
    cvForm:cvFormReducer,
    personalInfo:personalInfoReducer,
}

export const store = configureStore({
  reducer:rootReducer
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch