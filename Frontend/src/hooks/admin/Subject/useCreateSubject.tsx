import axios from "axios";
import { useState } from "react";
import { SubjectFormValues } from "../../../components/Dashbaord/ManageSubject/EditSubjectForm";

export const useCreateSubject = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const createSubject = async (formData: SubjectFormValues) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `/api/create/subject`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      return response.data; 
    } catch (error: any) {
      // console.error("❌ Error creating subject:", error.response?.data || error.message);
      throw error; 
    } finally {
      setIsLoading(false);
    }
  };

  return { createSubject, isLoading };
};
