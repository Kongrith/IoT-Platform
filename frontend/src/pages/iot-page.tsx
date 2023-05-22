import { useState } from 'react';
import '../styles/loginpage.css'
import 'bootstrap/dist/css/bootstrap.min.css';
// import AppHeader from '../components/AppHeader';
import AppIotDevice from '../components/AppIotDevice';


function IoTPage() {
  const [needLogin, setNeedLogin] = useState<boolean>(true);
  const updateNeedLogin = (needLogin: boolean):void => {
    console.log(!needLogin)
    setNeedLogin(!needLogin)
  }
  console.log(needLogin)
  return (
    <div>
      {/* <AppHeader status={needLogin} updateStatus = {updateNeedLogin}/> */}
      <AppIotDevice/>
    </div>
  )
}

export default IoTPage;