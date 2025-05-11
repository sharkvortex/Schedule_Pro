import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

export const useLogout = () =>{
    const [loading, setLoading] = useState<boolean>(false);
    const logout = async ()=>{
        try{
            setLoading(true)
            const response = await toast.promise(
                axios.post(`${import.meta.env.VITE_API_URL}/api/logout`, null ,{
                  headers: {
                    "Content-Type": "application/json",
                  },
                  withCredentials: true,
                }),
                {
                  loading: "Logging out...",
                  success: "Logout successful!",
                  error: (error) =>
                    error?.response?.data?.message || "An error occurred during login",
                }
              );
              return response;
        }catch(error){
            console.error("Login error:", error);
        }
    }

    return {loading , logout}
}