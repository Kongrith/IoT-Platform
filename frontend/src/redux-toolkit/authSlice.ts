import { PayloadAction, createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import { RootState } from "./store";
import { getData, getProfile } from "../services/getdata.service";
import { createScopedAnimate } from "framer-motion";
import { AxiosError } from "axios";

// กรณี Login สำเร็จ
export interface LoginResponse {
    access_token: string;
    token_type:   string;
    expires_in:   number;
}

// Define a type for the slice state
export interface authState {
    userInfo: string[],
    isLogin: boolean
    // email: string
    // loginResponse: LoginResponse | null
}

// Define the initial state using that type
const initialState: authState = {
    userInfo: [''],
    isLogin: false
    // email: 'kongrith@hotmail.com',
    // loginResponse: null                   // global state
}

//

// กรณี Error
export interface LoginErrorResponse {
    message:     string;
    status_code: number;
}

export interface LoginFormInput {
    email: string;
    password: string;
}

// กรณี Login สำเร็จ
export interface LoginResponse {
    access_token: string;
    token_type:   string;
    expires_in:   number;
}

// กรณี Error
export interface LoginErrorResponse {
    message:     string;
    status_code: number;
}


// export const loginThunk =
// createAsyncThunk('userProfile/loginThunk', async (username: string)=>{
//   // code สำหรับเรียก backend
//   try {
//     const response = await getProfile('http://localhost:5500/profile')
//         return username
//   } catch (error) {
//         console.log(error)
//   }
// })

export const authSlice = createSlice({
    name: "userProfile",
    initialState: initialState,
    reducers: {
        login: (state: authState, action ) => { state.userInfo = action.payload, state.isLogin = true},
        logout: (state: authState ) => { state.userInfo = [] , state.isLogin = false}
    },
    // extraReducers(builder) {
    //     builder.addCase(loginThunk.fulfilled, (state, action: PayloadAction)=>{
    //         state.profile = action.payload
    //     })           // fullfill ก็คือ success
    // },
})

// export const {updateProfile} = authSlice.actions
// export const selectCounterState = (state: RootState)=> state.counter   // ได้ profile ไปใช้ที่ ui ไหนก้ได้
// export default authSlice.reducer

export const { login, logout } = authSlice.actions
export const selectAuthState = (state: RootState)=> state.authState         // ได้ profile ไปใช้ที่ ui ไหนก้ได้
export default authSlice.reducer

// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
// import type { PayloadAction } from '@reduxjs/toolkit'
// import type { RootState } from "./store";
// import axios, {AxiosResponse, AxiosError} from "axios";
// import { getData } from '../services/getdata.service';

// export interface ProfileResponse {
//     message:     string;
//     status_code: number;
//     data:        Data;
// }

// export interface Data {
//     user: User;
// }

// // export interface User {
// //     id:                number;
// //     name:              string;
// //     email:             string;
// //     email_verified_at: null;
// //     dob:               null;
// //     role:              string;
// //     created_at:        Date;
// //     updated_at:        Date;
// // }

// export interface ProfileErrorResponse {
//     message:     string;
//     status_code: number;
// }

// // type ของ User Profile
// type User = {
//     id: number,
//     name: string,
//     email: string,
//     password: string
// }

// export interface LoginFormInput {
//     email: string;
//     password: string;
// }

// // กรณี Login สำเร็จ
// export interface LoginResponse {
//     access_token: string;
//     token_type:   string;
//     expires_in:   number;
// }

// // กรณี Error
// export interface LoginErrorResponse {
//     message:     string;
//     status_code: number;
// }

// // Define a type for the slice state
// export interface AuthState {
//     profile: string
//     email: string
//     loginResponse: LoginResponse | null
// }

// // Define the initial state using that type
// const initialState: AuthState = {
//     profile: 'kongrith',
//     email: 'kongrith@hotmail.com',
//     loginResponse: null                   // global state
// }

// // 


// // สร้าง instance client
// const http = axios.create({
//     headers: {
//         'Content-Type': 'application/json'
//     }
// })


// export {http}                                   // export เป็น object ได้ (ไม่ต้องใส่ default เพราะในอนาคต)
// export type {AxiosResponse, AxiosError}         // แยก type ออกมา


// //
// export async function login(username: string, password: string): Promise<AxiosResponse<LoginResponse>>{
//     return await http.post<LoginResponse>('http://localhost:5500/login', {
//         username: username,               // backend1: param1
//         password: password,         // backend2: param2
//     })
// }

// export function logout(): void {
//     // การลบ token ออกจาก browser (local storage)
//     localStorage.removeItem('token')
// }

// // export async function getProfile(): Promise<AxiosResponse<ProfileResponse> | null >{
// //     const token = JSON.parse(localStorage.getItem('token')!) as LoginResponse     // type assertion คือ แปลงให้เป็น type ของ log in response

// //     if (!token) {
// //         return null
// //     } return await http.get<ProfileResponse>('http://localhost:8000/profile', {
// //         headers: { Authorization: 'Bearer ' +  token.access_token}
// //     })
// // }

// // สำหรับเขียน asynchronous จาก redux toolkit
// export const loginThunk =
// createAsyncThunk<LoginResponse, LoginFormInput, {rejectValue: LoginErrorResponse}>('auth/loginThunkStatus', async (user: LoginFormInput, {rejectWithValue})=>{
//   // code สำหรับเรียก backend
//   try {
    
//     // parameters (email/password)
//     // const response: User = await getData(loginPath, email, password)
//     const response = await login(user.email, user.password)

//     //const response = await login(user.email, user.password)

//     // เก็บข้อมูล
//     localStorage.setItem('token', JSON.stringify(response.data))

//     // ข้อมูลที่ได้จาก backend
//     return response.data
//   } catch (error: any) {
//     const err:AxiosError<LoginErrorResponse> = error
//     if (!err.response){
//       throw error;
//     }
//     return rejectWithValue(err.response.data)
//   }
// })

// //
// export const authSlice = createSlice({
//   name: 'auth',
//   initialState: initialState,
//   reducers: {
//     updateProfileAction: (state) =>{
//     state.profile = 'Kwan';
//     state.email = 'kimshawon@gmail.com'
//   }},
//   extraReducers(builder) {
//       builder.addCase(loginThunk.fulfilled, (state, action: PayloadAction<LoginResponse | null>)=>{
//         state.loginResponse = action.payload
//       })           // fullfill ก็คือ success
//   },
// })

// export const { updateProfileAction } = authSlice.actions
// export const selectAuthState = (state: RootState)=> state.authState            // ได้ profile ไปใช้ที่ ui ไหนก้ได้
// export default authSlice.reducer