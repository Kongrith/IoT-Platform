import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useAppSelector } from "../redux-toolkit/hooks"
// import { logout, selectAuthState, updateProfileAction } from "../redux-toolkit/authSlice"
import { selectCounterState } from "../redux-toolkit/counterSlice"
import { RootState } from "../redux-toolkit/store"
import { Navigate, useLoaderData, useLocation, useNavigate } from 'react-router-dom'
import AppHeader from '../components/AppHeader'
import AppFooter from '../components/AppFooter'
export default function AboutPage() {

  // const [user, setUser] = useState<User | null>()
  // const counterState = useAppSelector(selectCounterState)
  // const {authState} = useSelector( (state) => ( {...state}  )
  // console.log(authState)
  //

  // const userState = useAppSelector(selectAuthState)
  // const {profile, email} = useAppSelector(selectAuthState)
  // const dispatch = useDispatch()
  
  // type ของ User Profile
  type User = {
    id: number,
    name: string,
    email: string,
    password: string
  }

  // const [user, setUser] = useState<User | null>()

  
  // const updateProfile = () => {
  //   dispatch(updateProfileAction())
  // }

  // ใช้ empty dependency เพื่อเรียกแค่ครั้งเดียว
  // useEffect(()=>{
  //   dispatch(updateProfileAction())
  // }, [])
  const [needLogin, setNeedLogin] = useState<boolean>(true);

  const updateNeedLogin = (needLogin: boolean):void => {
    console.log(!needLogin)
    setNeedLogin(!needLogin)
  }
  console.log(needLogin)
  
  // const {counter} = useSelector((state: RootState) => ({...state}))
  const navigate = useNavigate()
  const counterReducer = useAppSelector(selectCounterState)
  console.log('global state',counterReducer)
  // local data
  const user = useLoaderData() as User
  console.log('user',user)
  const location = useLocation()
  
  console.log('location',location)
  // const dispatch = useAppDispatch()
  //   const {roomBooking} = useAppSelector(selectRoomBookingState)     // global storage
  return (
    <div className='container'>
    <AppHeader status={needLogin} updateStatus = {updateNeedLogin}/>
        {/* <h2>About Page</h2>
        <h3>{counterReducer.value}</h3> */}
        {/* <h1>{counter.value}</h1>
        <h1><b>{profile}</b></h1>
        <h1><b>{email}</b></h1>
      <p> Counter Value : <b>{counterState.value}</b> </p>
      <button onClick={updateProfile}>Update Profile</button> */}
      {/* <button onClick={ () => {
        logout()
        navigate('/')> dd 
        </button> */}
        
        {/* <button onClick={()=>{logout(); navigate("/")}}>Logout</button>
        <button onClick={()=>{navigate("/")}}>Home</button> */}
        <h4>This is just a mocking page.&nbsp; More information please follow the Github Page</h4>
       <a href="https://github.com/Kongrith/IoT-Platform" target="_blank"> <img src="/github.png" alt="github"  width="128" height="128">
          </img></a>
        <AppFooter/>
    </div>
  )
}