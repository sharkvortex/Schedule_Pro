import axios from "axios"
import { useState , useEffect } from "react"

interface DashboardProps  {
  totalUsers: number,
  totalSubjects: number
}

const useDashboard = () => {
    const [data, setData] = useState<DashboardProps>(); 
    const [loading, setLoading] = useState<boolean>(true);
  
    const getData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/dashboard`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        setData(response.data.data); 
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      getData();
    }, []);
  
    return { data, loading};
  };
  
  export default useDashboard;