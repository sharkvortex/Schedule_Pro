import axios from "axios";
import toast from "react-hot-toast";
import { EditWorkFormData } from "../../../components/Dashbaord/ManageWork/EditWork";
import { useState } from "react";

export const useEditWork = () => {
  const [workEditing, setWorkEditing] = useState<boolean>(false);

  const EditWork = async (formData: EditWorkFormData) => {
    setWorkEditing(true);
    try {
      const data = new FormData();

      data.append("id", `${formData.id}`);
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("assignedDate", formData.assignedDate);
      data.append("dueDate", formData.dueDate);
      data.append("link", formData.link);
      data.append("linkCode", formData.linkCode);

      formData.files.forEach((file) => {
        data.append("files", file);
      });

      const response = axios.put(
        `${import.meta.env.VITE_API_URL}/api/edit/work`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      await toast.promise(response, {
        loading: "กำลังอัปเดตงาน...",
        success: "อัปเดตสำเร็จ!",
        error: "อัปเดตล้มเหลว!",
      });
    } catch (error) {
      console.error("Error updating work:", error);
    } finally {
      setWorkEditing(false);
    }
  };

  return { EditWork, workEditing };
};
