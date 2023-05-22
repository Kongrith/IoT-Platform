// import { LoginResponse } from "../app-types/log-in.type";
// import { AxiosResponse, http } from "./http.service";
// import { ProfileResponse } from "../app-types/profile.type";

// export async function login(username: string, password: string): Promise<AxiosResponse<LoginResponse>>{
//     return await http.post<LoginResponse>('http://localhost:8000/login', {
//         username: username,               // backend1: param1
//         password: password,         // backend2: param2
//     })
// }

// export function logout(): void {
//     // การลบ token ออกจาก browser (local storage)
//     localStorage.removeItem('token')
// }

// export async function getProfile(): Promise<AxiosResponse<ProfileResponse> | null >{
//     const token = JSON.parse(localStorage.getItem('token')!) as LoginResponse     // type assertion คือ แปลงให้เป็น type ของ log in response
//     if (!token) {
//         return null
//     } return await http.get<ProfileResponse>('http://localhost:8000/profile', {
//         headers: { Authorization: 'Bearer ' +  token.access_token}
//     })
// }