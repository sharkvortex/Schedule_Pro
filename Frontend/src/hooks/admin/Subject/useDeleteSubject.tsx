import axios from "axios";
import { useState } from "react";

export const useDeleteSubject = () => {
  const [deleting, setDeleting] = useState<boolean>(false);
  const deleteSubject = async(id: number) => {
    setDeleting(true);
    try {
      const response = await axios.delete(`${import.meta.env.VITE_API_URL}/api/delete/subject/${id}` ,
        {
            headers:{
                "Content-Type": "application/json",
            },
            withCredentials: true
        }
      )
      return response
    } catch (error) {
      throw error;
    }finally{
        setDeleting(false)
    }
  };

  return { deleteSubject , deleting };
};
