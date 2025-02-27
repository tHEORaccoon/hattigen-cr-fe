import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../slice/authSlice'
import cvFormReducer from '../slice/cvFormSlice'
import personalInfoReducer from '../slice/personalInfoSlice'
import categoriesReducer from '../../redux/slice/categorySlice'

const rootReducer = {
    auth:authReducer,
    cvForm:cvFormReducer,
    personalInfo:personalInfoReducer,
    category:categoriesReducer

}

export const store = configureStore({
  reducer:rootReducer
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch