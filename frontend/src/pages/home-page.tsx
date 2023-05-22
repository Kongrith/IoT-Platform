import '../styles/home.css'

import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppHeader from '../components/AppHeader';
import AppFooter from '../components/AppFooter';
import { useLocation } from 'react-router-dom';
import { useAppSelector } from '../redux-toolkit/hooks';
import { selectAuthState } from '../redux-toolkit/authSlice';

export default function HomePage() {
  const {userInfo} = useAppSelector(selectAuthState)

  const [needLogin, setNeedLogin] = useState<boolean>(false);
  const location = useLocation()

  const updateNeedLogin = (needLogin: boolean):void => {
    if ((location.pathname === '/')){
      setNeedLogin(true)
    } else {
      setNeedLogin(!needLogin)
    }
  }
  // console.log('aaa', JSON.stringify(profile['profile']))
  return (
    <div className='container'>
      <AppHeader status={needLogin} updateStatus = {updateNeedLogin}/>
      {/* <p>Helllo {profile}</p> */}
      <div> 
      <br/>
      <br/>
      <h2>Welcome {JSON.stringify(userInfo['profile'])} to CJ Express IoT Platform</h2>
      <p><strong>CJ Express IoT Platform</strong> is commercial IoT platform for data collection, processing, visualization, and device management
      It enables device connectivity via industry standard IoT protocols - MQTT, CoAP and HTTP and supports both cloud and on-premises deployments. <br/>
      <img src="/iot.png" alt="iot" width="512" height="512" className='img'></img> 
      <strong>CJ Express IoT Platform</strong> combines scalability, fault-tolerance and performance so you will never lose your data.</p>
      </div>
        <AppFooter/>
    </div>
  )
}
