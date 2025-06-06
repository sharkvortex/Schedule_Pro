import { useEffect, useState } from "react";
import axios from "axios";

export interface WorkDataType {
  id: number;
  subject_id: string;
  title: string;
  description: string;
  assignedDate: string;
  dueDate: string;
  link: string | null;
  linkCode: string | null;
  createdAt: string;
  updatedAt: string;
  images: {
    id: number;
    workId: number;
    url: string;
    fileId: string;
    createdAt: string;
    updateAt: string;
  }[];
  subject: {
    subject_name: string;
  };
}

export const useGetWork = () => {
  const [workLoading, setWorkLoading] = useState<boolean>(false);
  const [workData, setWorkData] = useState<WorkDataType>();

  const getWork = async (select?: string) => {
    try {
      setWorkLoading(true);
      const response = await axios.get(
        `/api/works`,
        {
          params: {
            subject_id: select,
          },
          withCredentials: true,
        },
      );
      setWorkData(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }finally {
      setWorkLoading(false);
    }
};
useEffect(() => {
    getWork();
}, []);
  return { workLoading, getWork, workData };
};
