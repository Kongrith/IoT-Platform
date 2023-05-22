// import React from 'react'
import ReactDOM from 'react-dom/client'
import {RouterProvider}  from "react-router-dom"
import router from './routes/root'
// import './global.css'


// import { Provider } from 'react-redux';
import { store } from './redux-toolkit/store';
import { ChakraProvider, Container, extendTheme } from '@chakra-ui/react'
import { Provider } from 'react-redux'

const theme = extendTheme({
  styles: {
    global: () => ({
      body: {
        bg: ""
      }
    })
  },
});


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <ChakraProvider theme={theme}>
      <Container minHeight="100vh" maxW='100%' bg='/background.jpg'>
        <RouterProvider router={router}/>
      </Container>     
    </ChakraProvider>
  </Provider>
)