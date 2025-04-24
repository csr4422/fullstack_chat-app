import {create} from "zustand"
import { axiosInstance} from "../lib/Axios";
import toast from "react-hot-toast";
export const useAuthStore = create((set) => ({
    authUser:null,
    isSigningUp:false,
    isLoggingIn:false,
    isUpdatingProfile:false,
    isCheckingAuth:true,

    checkAuth: async () => {
        try {
          const res = await axiosInstance.get("/auth/check");
    
          set({ authUser: res.data });
        } catch (error) {
          console.log("Error in checkAuth:", error);
          set({ authUser: null });
        } finally {
          set({ isCheckingAuth: false });
        }
      },
    signup: async(data)=>{
        set({ isSigningUp: true });
        try {
            const res = await axiosInstance.post("auth/signup",data);
            set({ authUser: res.data });
            toast.success("Account created successfully");
        } catch (error) {
            toast.error(error?.response?.data?.message || "Problem in creating account");
        } finally {
            set({ isSigningUp: false });
        }
    },
    
    logout:async()=>{
        try {
            await axiosInstance.get("/auth/logout");
            set({authUser:null});
            toast.success("Logged Out Successfully");
        } catch (error) {
            toast.error(error?.response?.data?.message || "Logout failed");
        }
    }
    
   
}));