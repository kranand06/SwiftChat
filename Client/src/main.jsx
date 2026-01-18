import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Error404 from './Components/Error404.jsx'
import Home from './Components/Home.jsx'
import LoginPage from './Components/Login/LoginPage.jsx'
import ForgotPassword from './Components/Login/ForgotPassword.jsx'
import ChatPage from './Components/ChatPage/ChatPage.jsx'
import Signup from './Components/Login/Signup.jsx'
import Profilepage from './Components/Login/Profilepage.jsx'


const route = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: < Home/>,
      },
      {
        path: 'chat',
        element: < ChatPage/>,
      },
      {
        path: 'login',
        element: < LoginPage/>,
      },
      {
        path: 'signup',
        element: < Signup/>,
      },
      {
        path: 'forgot-password',
        element: < ForgotPassword/>,
      },
      {
        path: 'profile',
        element: < Profilepage/>,
      },
      {
        path: '*',
        element: <Error404 />,
      },
    ]
  }
])



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={route} />
  </StrictMode>,
)
