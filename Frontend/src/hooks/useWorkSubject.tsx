import axios from "axios";
import { useState } from "react";

export interface WorkSubjectType {
  id: number;
  title: string;
  description: string;
  assignedDate: string; 
  dueDate: string; 
  createdAt: string; 
  link: string | null;
  linkCode: string | null;
  subject_id: string;
}

export const useWorkSubject = () => {
    const [subjectLoading, setSubjectLoading] = useState<boolean>(false);
    const [workData, setWorkData] = useState<WorkSubjectType[]>();
    const fetchWork = async (subjectId: string , orderBy: string ) => {
        setSubjectLoading(true);
        try {
            const response = await axios.get(
                `/api/work/subject/${subjectId}?orderBy=${orderBy}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            );
            setWorkData(response.data.data);
        } catch (error) {
            console.log(error)
        } finally {
            setSubjectLoading(false);
        }
    };

    return { fetchWork, workData, subjectLoading };
};
