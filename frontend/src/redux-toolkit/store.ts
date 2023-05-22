import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counterSlice'
import authReducer from './authSlice'

// การประกาศ state ของ store
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    authState: authReducer,
  },
  devTools: true       // process.env.NODE_ENV === "development"
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
