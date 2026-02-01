import { StrictMode, useContext } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";

import "./index.css";
import App from "./App";

import Home from "./Components/Home";
import LoginPage from "./Components/Login/LoginPage";
import Signup from "./Components/Login/Signup";
import ForgotPassword from "./Components/Login/ForgotPassword";
import ChatPage from "./Components/ChatPage/ChatPage";
import Profilepage from "./Components/Login/Profilepage";
import Error404 from "./Components/Error404";

import { AuthContext, AuthProvider } from '../context/AuthContext.jsx'

// 🔒 Simple inline guards
const Protected = ({ children }) => {
  const { authUser } = useContext(AuthContext);
  return authUser ? children : <Navigate to="/login" replace />;
};

const GuestOnly = ({ children }) => {
  const { authUser } = useContext(AuthContext);
  return authUser ? <Navigate to="/chat" replace /> : children;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Home /> },

      {
        path: "login",
        element: (
          <GuestOnly>
            <LoginPage />
          </GuestOnly>
        ),
      },
      {
        path: "signup",
        element: (
          <GuestOnly>
            <Signup />
          </GuestOnly>
        ),
      },
      {
        path: "forgot-password",
        element: (
          <GuestOnly>
            <ForgotPassword />
          </GuestOnly>
        ),
      },

      {
        path: "chat",
        element: (
          <Protected>
            <ChatPage />
          </Protected>
        ),
      },
      {
        path: "profile",
        element: (
          <Protected>
            <Profilepage />
          </Protected>
        ),
      },

      { path: "*", element: <Error404 /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);