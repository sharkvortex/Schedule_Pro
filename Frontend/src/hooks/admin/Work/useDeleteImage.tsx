import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export const useDeleteImage = () => {
  const [imagedeleting, setImagedeleTing] = useState<boolean>(false);

  const deleteImage = async (fileId: string) => {
    setImagedeleTing(true);
    try {
      const response = await toast.promise(
        axios.delete(`${import.meta.env.VITE_API_URL}/api/delete/image/${fileId}`, {
          withCredentials: true,
        }),
        {
          loading: "กำลังลบรูป...",
          success: "ลบรูปภาพสำเร็จ!",
          error: (err) => {
           
            const message =
              err.response?.data?.message || "ลบรูปภาพไม่สำเร็จ";
            return message;
          },
        }
      );

     
      return response.data;
    } catch (error: any) {
      console.error("Error deleting image:", error);
     
      throw error;
    } finally {
      setImagedeleTing(false);
    }
  };

  return {
    deleteImage,
    imagedeleting,
  };
};
