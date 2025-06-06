import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export interface UserProfile  {
  id: number;
  studentId: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  role: string;
}

export const useProfile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const response = await axios.get(
        `/api/user/profile`,
        { withCredentials: true }
      );
      setProfile(response.data);
    } catch (error) {
      console.error("Error fetching profile:", error);
      toast.error("ไม่สามารถโหลดข้อมูลผู้ใช้ได้");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return { profile, loading, refetch: fetchProfile };
};
