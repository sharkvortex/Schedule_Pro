import { useEffect, useState } from "react"
import axios from "axios"

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
    fileId: string
    createdAt: string;
    updateAt: string;
  }[]
  subject: {
    subject_name: string
  };
}


export const useGetWork = () =>{
    const [workLoading , setWorkLoading] = useState<boolean>(false)
    const [workData , setWorkData] = useState<WorkDataType>()
    const getWork = async() =>{
        try{
            setWorkLoading(true)
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/works`,
                {
                    withCredentials: true
                }
            )
            setWorkData(response.data)
            return response.data
        }catch(error){
            throw error
        }
    }

    useEffect(()=> {
        getWork();
    },[])
    return {workLoading , getWork ,workData}
}