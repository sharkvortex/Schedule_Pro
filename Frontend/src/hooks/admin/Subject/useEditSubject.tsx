import { useState } from "react"
import { SubjectFormValues } from "../../../components/Dashbaord/ManageSubject/EditSubjectForm"
import axios from "axios"
export const useEditSubject = () => {
    const [loading , setIsLoading] = useState<boolean>(false)
    
    const editSubject = async(FormData: SubjectFormValues) => {
        if(!FormData) return null
        try{
            setIsLoading(true)
            const response = await axios.put(`/api/edit/subject`,FormData ,
                {
                    headers:{
                        "Content-Type": "application/json",
                    },
                    withCredentials: true
                }
            )
            return response
        }catch(error){
            throw error
        }finally{
            setIsLoading(false)
        }
    }
    
    
    return{editSubject , loading }
}