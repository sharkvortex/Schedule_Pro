import axios from "axios";
import { useState } from "react";

interface UsersProps {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

export const useUsers = () => {
  const [data, setData] = useState<UsersProps[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [loading , setLoading] = useState<boolean>(true)
  const getUsers = async (
    page: number = 1,
    limit: number = 10,
    search: string = ""
  ) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/users`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
          params: {
            search,
            page,
            limit,
          },
        }
      );
      if (response.status === 200) {
        setData(response.data.users);
        setTotalCount(response.data.totalCount);
        setLoading(false)
        return response.data
      }

    } catch (error) {
      console.error("Error fetching users:", error);
    }finally{
      setLoading((false))
    }
  };

  return { getUsers, data, totalCount , loading };
};
