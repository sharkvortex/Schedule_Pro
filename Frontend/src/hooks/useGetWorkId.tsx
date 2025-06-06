import axios from "axios";
import { useState } from "react";


export interface WorkImageType {
  id: number;
  url: string;
  fileId: string;
  workId: number;
  createdAt: string;
  updateAt: string;
}

export interface WorkDataType {
  id: number;
  title: string;
  description: string;
  subject_id: string;
  link: string;
  linkCode: string;
  images: WorkImageType[];
  assignedDate: string;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
}
export const useGetWorkId = () => {
  const [workData, setWorkData] = useState<WorkDataType| null>(null);
    const [loading , setLoading] = useState<boolean>(false);
  const getWorkId = async (subjectId: string | undefined, id: string | undefined) => {
    if (!subjectId || !id) {
      return null;
    }
    setLoading(true);
    try {
      const response = await axios.get(
        `/api/work/${subjectId}/${id}`,
        {
          withCredentials: true,
        }
      );

      setWorkData(response.data.data);
      return response.data;
    } catch (error: any) {
      console.error("Error fetching work ID:", error);
     
    }finally {
      setLoading(false);
    }
  };

  return { getWorkId, workData , loading };
};
