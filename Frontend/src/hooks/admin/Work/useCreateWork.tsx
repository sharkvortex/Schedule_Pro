import { useState } from "react";
import { CreateWorkDataType } from "../../../components/Dashbaord/ManageWork/CreateWork";
import axios from "axios";
import toast from "react-hot-toast";

export const useCreateWork = () => {
  const [creating, setCreating] = useState<boolean>(false);

  const createWork = async (formData: CreateWorkDataType) => {
    const data = new FormData();
    data.append("subject_id", formData.subject_id);
    data.append("title", formData.title);
    data.append("description", formData.description || "");
    data.append("assignedDate", formData.assignedDate);
    data.append("dueDate", formData.dueDate);
    data.append("link", formData.link || "");
    data.append("linkCode", formData.linkCode || "");

    if (formData.image && formData.image.length > 0) {
      formData.image.forEach((file) => {
        data.append("image[]", file);
      });
    }

    setCreating(true);

    const uploadPromise = axios
      .post(`/api/create/work`, data, {
        withCredentials: true,
      })
      .then((res) => {
        const msg = res.data.message || "Work created successfully";
        toast.success(msg);
        return res;
      })
      .catch((err) => {
        const msg =
          err.response?.data?.error ||
          err.response?.data?.message ||
          "Failed to create work";
        toast.error(msg);
        throw err;
      })
      .finally(() => {
        setCreating(false);
      });

    toast.promise(uploadPromise, {
      loading: "Creating work...",
    });

    return uploadPromise;
  };

  return { createWork, creating };
};
