// useRegister.ts
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

interface FormData {
  studentId: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}


export const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const register = async (formData: FormData) => {
    
    try {
      setLoading(true);
      const response = await toast.promise(
        axios.post(`${import.meta.env.VITE_API_URL}/api/register`, formData, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }),
        {
          loading: "Registering...",
          success: "Registration successful!",
          error: (error) =>
            error?.response?.data?.message ||
            "An error occurred during registration",
        }

       
      );
      setData(response);
      return response;
    } catch (error) {
      console.error("Register error:", error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, data, register };
};
