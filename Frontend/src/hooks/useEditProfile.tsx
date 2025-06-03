import axios from "axios";
import { useState } from "react";
import { EditProfileProps } from "../components/EditProfile";
import toast from "react-hot-toast";

export const useEditProfile = () => {
  const [loading, setLoading] = useState(false);

  const editProfile = async (formData: EditProfileProps) => {
    setLoading(true);
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/user/profile`,
        formData,
        { withCredentials: true }
      );

      const message = response.data?.message || "แก้ไขข้อมูลสำเร็จ!";
      toast.success(message);
      return response.data;
    } catch (error: any) {
      const message =
        error?.response?.data?.message || "ไม่สามารถแก้ไขข้อมูลผู้ใช้ได้";
      toast.error(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  return { editProfile, loading };
};
