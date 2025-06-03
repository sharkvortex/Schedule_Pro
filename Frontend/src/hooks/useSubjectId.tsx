import axios from "axios";
import { useState } from "react";
import { SubjectType } from "./admin/useSubject";
export const useSubjectId = () => {
    const [detailSubject, setDetailSubject] = useState<SubjectType | null>(null);
    const fetchsubjectId = async(subjectId: string) => {
        if(!subjectId){
            throw new Error("Subject ID is required");
        }
        try{
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/subject/${subjectId}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            );
             setDetailSubject(response.data.subject);
        }catch(error){
            console.error("Error fetching subject ID:", error);
        }
    }

    return { fetchsubjectId , detailSubject};
}