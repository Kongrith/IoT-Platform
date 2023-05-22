import { redirect, useLocation } from "react-router-dom"
import { logout } from "../redux-toolkit/authSlice"
import { useAppDispatch } from "../redux-toolkit/hooks"

export function GetOut():void {
    // ล้างค่า user status (global variable)
    const dispatch = useAppDispatch()
    dispatch(logout())

    // การลบ token ออกจาก browser (local storage)
    sessionStorage.removeItem('token')
}


