// import { useState } from 'react'
// import './App.css'

import AppFooter from "./components/AppFooter"
import AppHeader from "./components/AppHeader"
import AppLogIn from "./components/AppLogIn"
import AppNavBar from "./components/AppNavBar"

function App() {
  const userName = 'Kongrith Komasatid'

  return (
    <>
      <AppNavBar/>
      <AppHeader User = {userName}/>
      <AppLogIn/>
      <AppFooter/>
    </>
  )
}

export default App
