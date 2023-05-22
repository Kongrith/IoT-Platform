import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
// import { login } from '../../services/auth.service'
import { LoginFormInput } from '../../app-types/login-form-input.type'
import { LoginErrorResponse, LoginResponse } from '../../app-types/log-in.type'
import { AxiosError } from 'axios'

// Define a type for the slice state
export interface AuthState {
  profile: string
  email: string
  loginResponse: LoginResponse | null
}

// Define the initial state using that type
const initialState: AuthState = {
    profile: 'kongrith',
    email: 'kongrith@hotmail.com',
    loginResponse: null                   // global state
}

// สำหรับเขียน asynchronous จาก redux toolkit
export const loginThunk =
createAsyncThunk<LoginResponse, LoginFormInput, {rejectValue: LoginErrorResponse}>('auth/loginThunkStatus', async (user: LoginFormInput, {rejectWithValue})=>{
  // code สำหรับเรียก backend
  try {
    // parameters (email/password)
    const response = await login(user.email, user.password)
    //console.log(response.data)

    // เก็บข้อมูล
    localStorage.setItem('token', JSON.stringify(response.data))

    // ข้อมูลที่ได้จาก backend
    return response.data
  } catch (error: any) {
    const err:AxiosError<LoginErrorResponse> = error
    if (!err.response){
      throw error;
    }
    return rejectWithValue(err.response.data)
  }
})


export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    updateProfileAction: (state) =>{
    state.profile = 'Kwan';
    state.email = 'kimshawon@gmail.com'
  }},
  extraReducers(builder) {
      builder.addCase(loginThunk.fulfilled, (state, action: PayloadAction<LoginResponse | null>)=>{
        state.loginResponse = action.payload
      })           // fullfill ก็คือ success
  },
})

export const { updateProfileAction } = authSlice.actions

// Insert Update Delete
// export const selectCount = (state: RootState) => state.counter.value
export const selectAuthState = (state: RootState)=> state.authState   // ได้ profile ไปใช้ที่ ui ไหนก้ได้
export default authSlice.reducer