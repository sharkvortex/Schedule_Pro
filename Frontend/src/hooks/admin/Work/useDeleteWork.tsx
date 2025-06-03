import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
export const useDeleteWork = () => {
  const [workDeleting , setWorkDeleting] = useState<boolean>(false)
  const deleteWork = async (id?: number) => {
    const promise = axios.delete(
      `${import.meta.env.VITE_API_URL}/api/delete/work/${id}`,
      {
        withCredentials: true,
      }
    );
    setWorkDeleting(true)
    try {
      await toast.promise(promise, {
        loading: "กำลังลบงาน...",
        success: (res) => res.data.message || "ลบงานสำเร็จ",
        error: (err) =>
          err.response?.data?.message || "เกิดข้อผิดพลาดในการลบงาน",
      });
    } catch (error) {
        console.error(error);
    }finally{
      setWorkDeleting(false)
    }
  };
   return { deleteWork ,workDeleting};
};
