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

// {
//     "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvYXBpLmNvZGluZ3RoYWlsYW5kLmNvbVwvYXBpXC9sb2dpbiIsImlhdCI6MTY4NDE4MTYxMCwiZXhwIjoxNjg0NjEzNjEwLCJuYmYiOjE2ODQxODE2MTAsImp0aSI6Ik5oTXdHU2dSY1hoS1c5engiLCJzdWIiOjQwNDQsInBydiI6Ijg3ZTBhZjFlZjlmZDE1ODEyZmRlYzk3MTUzYTE0ZTBiMDQ3NTQ2YWEiLCJ1c2VyIjp7ImlkIjo0MDQ0LCJyb2xlIjoibWVtYmVyIn19.JGUcfwJlhI2szPoYVGHhZA6_XM47VlkExsvDzEelMYs",
//     "token_type": "bearer",
//     "expires_in": 7200
// }

// {
//     "id": 3,
//     "name": "kongrith",
//     "email": "kongrith@gmail.com",
//     "password": "123456"
// }