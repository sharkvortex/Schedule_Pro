import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

interface LoginFormData {
  username: string;
  password: string;
}


export const useLogin = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>(null);

  const login = async (formData: LoginFormData) => {
    try {
      setLoading(true);
      const response = await toast.promise(
        axios.post(`${import.meta.env.VITE_API_URL}/api/login`, formData, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }),
        {
          loading: "Logging in...",
          success: "Login successful!",
          error: (error) =>
            error?.response?.data?.message || "An error occurred during login",
        }
      );

      setData(response);
      return response;
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, data };
};
