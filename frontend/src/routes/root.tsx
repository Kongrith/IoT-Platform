import HomePage from '../pages/home-page'
import LoginPage from '../pages/login-page';
import IoTPage from '../pages/iot-page';
import AboutPage from '../pages/about-page';
import DashboardPage from '../pages/dashboard-page';

import { createBrowserRouter, redirect} from "react-router-dom";
import { getProfile } from '../services/getdata.service';
import DHome from '../pages/Dhome';
import { useAppSelector } from '../redux-toolkit/hooks';
import { selectAuthState } from '../redux-toolkit/authSlice';



const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage/>,
    },
    {
      path: "/login",
      element: <LoginPage/>,
    },
    {
      path: "/about",
      element: <AboutPage/>,
    },
    {
      path: "/dashboard",
      element: <DashboardPage/>,
      loader: async ()=>{
        const response = await getProfile('http://localhost:5500/profile')
   
        // protect route โดยไม่ให้คนที่ไม่ได้ login เข้าใช้งาน
        if (response === false ) {
          throw redirect('/login')
        }
        
        return response
      },
      children: [
        {
          path:'',              // localhost:8081/dashboard
          element: <DHome/>
        },
        {
          path:'iot',           // localhost:8081/dashboard/iot
          element: <IoTPage/>
        }
      ]
    },
]);



export default router