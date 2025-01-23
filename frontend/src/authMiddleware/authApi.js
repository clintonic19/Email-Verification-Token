import {create} from "zustand";
import api from "./api"

// const Api_url = "http://localhost:5001/api/auth";

export const useStore = create((set)=>({
    user: null,
    isAuthenticated: false,
    error: null,
    isLoading: false,
    checkAuth: true,
    message: null,

    // FUNCTION TO HANDLE SIGN UP USER 
    /**
     * Create New User 
     */
    signup: async( name, email, password)=>{
        set({ isLoading: true, error: null });
        try {
            const res = await api.post("/auth/signup", {name, email, password}, {withCredentials: true});
            set({ user: res?.data?.user, isAuthenticated: true, isLoading: false });
        } catch (error) {
            set({ error: error?.response?.data?.message || "Error Sign In User", isLoading: false });
            throw error;
            
        }
    },

    // FUNCTION TO HANDLE LOGIN
    login: async(email, password) => {
        set({ isLoading: true, error: null });
        try {
            const res = await api.post("/auth/login", {email, password}, {withCredentials: true});
            set({ user: res?.data?.user, isAuthenticated: true, isLoading: false });
        } catch (error) {
            set({ error: error?.response?.data?.message || "Login User Error ", isLoading: false });
            throw error;          
        }        
    },

    logout: async() => {
        set({ isLoading: true, error: null });
        try {
             await api.post("/auth/logout", {}, {withCredentials: true});
            set({ user: null, isAuthenticated: false, error: null, isLoading: false });
        } catch (error) {
            set({ error: "Error Logging out User", isLoading: false });
            throw error;          
        }        
    },

    // FUNCTION TO HANDLE VERIFY EMAIL
    verifyEmail: async(code)=>{
        set({ isLoading: true, error: null });
        try {
            const res = await api.post("/auth/verify", {code}, {withCredentials: true});
            set({ user: res?.data?.user, isAuthenticated: true, isLoading: false });
            // return res.data;
        } catch (error) {
            set({ error: error?.response?.data?.message || "Error Verifying User", isLoading: false });
            throw error;
        }
    },

    //FUNCTION TO CHECK AUTH USER
    checkStatus: async()=>{
        // await new Promise(resolve => setTimeout(resolve, 1000)),
        set({ checkAuth: true, error: null })
        try {
            const res = await api.get("/auth/check", {withCredentials: true });
            set({ user: res?.data?.user, isAuthenticated: true, checkAuth: false});
            return res.data
        } catch (error) {
            set({ error: null, checkAuth: false });
            console.log(error);
            // throw error;            
        }
    },

    //FORGOT PASSWORD
    forgotPassword: async(email)=>{
        set({ isLoading: true, error: null, message: null });
        try {
            const res = await api.post("/auth/forgot-password", {email}, {withCredentials: true});
            set({ message: res?.data?.message, isLoading: false });
            return res.data;
        } catch (error) {
            set({ error: error?.res?.data?.message || "Error Sending Email", isLoading: false });
            // throw error;
        }
    },

    // RESET PASSWORD
     resetPassword: async(token, password) =>{
        set({isLoading: true, error: null })
        try {
            const res = await api.post(`/auth/reset-password/${token}`, {password}, {withCredentials: true});
            set({ user: res?.data?.user, message: res?.data?.message, isLoading: false });
            return res;
        } catch (error) {
            set({ error: error?.res?.data?.error || "Error Resetting Password", isLoading: false });
            
        }
    }
    
}));