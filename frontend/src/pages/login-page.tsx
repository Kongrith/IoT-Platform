import '../styles/loginpage.css'

import AppHeader from "../components/AppHeader"
import AppLogIn from "../components/AppLogIn"
import AppRegister from '../components/AppRegister'
import AppLogOut from '../components/AppLogOut'

import { useState } from 'react'
import AppFooter from '../components/AppFooter'
import { useAppSelector } from '../redux-toolkit/hooks'
import { selectAuthState } from '../redux-toolkit/authSlice'

export default function LoginPage() {
  // react hooks
  const [needLogin, setNeedLogin] = useState<boolean>(true);
  const {isLogin} = useAppSelector(selectAuthState)

  const updateNeedLogin = (needLogin: boolean):void => {
    console.log(!needLogin)
    setNeedLogin(!needLogin)
  }

  return (
    <div>
      <AppHeader status={needLogin} updateStatus = {updateNeedLogin}/>
      {isLogin && <AppLogOut/>}
      { !isLogin && needLogin && <AppLogIn status={needLogin} updateStatus = {updateNeedLogin}/>}
      { !isLogin && !needLogin && <AppRegister status={needLogin} updateStatus = {updateNeedLogin}/>}
      <AppFooter/> 
    </div>
  )
}
