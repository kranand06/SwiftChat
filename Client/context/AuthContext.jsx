import { createContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const backendUrl = import.meta.env.VITE_BACKEND_URL;
axios.defaults.baseURL = backendUrl;


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [token, setToken] = useState(localStorage.getItem("token") || "");
    const [authUser, setAuthUser] = useState(null);
    const [onlineUser, setOnlineUser] = useState(null);
    const [socket, setSocket] = useState(null);

    //Check if user is authenticated
    const CheckAuth= async ()=>{
        try {
            const {data}=await axios.get("/api/auth/check");
            if(data?.success){
                setAuthUser(data?.user);
                connectSocket(data?.user);
            }
        } catch (error) {
            toast.error("Session expired. Please login again.");
            console.log("Auth check error:", error);
            
        }
    }

    //login user
    const login = async (state,credentials) => {

        try {
            const {data}=await axios.get(`/api/auth/${state}`,credentials);
            if(data?.success){
                setAuthUser(data?.user);
                connectSocket(data?.user);
                axios.defaults.headers.common["token"] = data.token;
                setToken(data.token);
                localStorage.setItem("token",data.token);
                toast.success("Login successful");
            }else{
                toast.error(data?.message || "Login failed");
            }
            
        } catch (error) {
            toast.error("Login failed. Please try again.");
            console.log("Login error:", error);
        }
    }

    //logout user
    const logout = ()=>{
        setAuthUser(null);
        setToken("");
        localStorage.removeItem("token");
        setOnlineUser(null);
        axios.defaults.headers.common["token"] = "";
        if(socket){
            socket.disconnect();
            setSocket(null);
        }
        toast.success("Logged out successfully");
    }

    //update profile
    const updateProfile = async (profileData)=>{
        try {
            const {data}=await axios.put("/api/auth/profile",profileData);
            if(data?.success){
                setAuthUser(data?.user);
                toast.success("Profile updated successfully");
            }else{
                toast.error(data?.message || "Profile update failed");
            }
        } catch (error) {
            toast.error("Profile update failed. Please try again.");
            console.log("Profile update error:", error);
        }
    }

    //Connect socket function
    const connectSocket = (userData)=>{
        if(!userData || socket?.connected) return;
        const newSocket = io(backendUrl, {
            query: {
                userId: userData._id,
            },
        });
        newSocket.connect();
        setSocket(newSocket);
        newSocket.on("getOnlineUsers", (users)=>{
            setOnlineUser(users);
        });
    }

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common["token"] = token;
            CheckAuth();
        }
    }, []);


    const value = {
        axios, 
        authUser, 
        setAuthUser,
        token, 
        setToken, 
        onlineUser, 
        setOnlineUser, 
        socket, 
        setSocket,
        login,
        logout,
        updateProfile
    }


    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};