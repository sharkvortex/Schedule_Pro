import { useState } from "react";
import axios from "axios"
export const useResetPassword = () => {
    const [sending, setSending] = useState<boolean>(false);
    const resetPassword = async (email: string) => {
        setSending(true);
        try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/reset-password`, { email });
        return response.data;
        } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data.message || 'Failed to reset password');
        } else {
            throw new Error('An unexpected error occurred');
        }
        }finally{
            setSending(false);
        }
    };
    
    return { resetPassword , sending};
}