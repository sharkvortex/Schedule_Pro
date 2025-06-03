import { useEffect, useState } from "react";
import axios from "axios";

export interface SubjectType {
  id: number;
  subject_id: string;
  subject_name: string;
  teacher_name: string;
  study_day: string;
  time_start: string;
  time_end: string;
  period: string;
  room: string;
}

export const useSubject = () => {
  const [subjects, setSubjects] = useState<SubjectType[] | null>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSubjects = async () => {
    setLoading(true);
    setError(null);

    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/subjects`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (data?.data) {
        setSubjects(data.data);
      } else {
        throw new Error("No subjects found.");
      }

    } catch (err: any) {
      // console.error("Failed to fetch subjects:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  return {
    subjects,
    loading,
    error,
    refetch: fetchSubjects,
    setSubjects
  };
};
