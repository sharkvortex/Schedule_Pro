import axios from "axios";
import toast from "react-hot-toast";

interface FormDataProps {
    id: number,
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    role: string

}

export const EditUser = () => {
    const Edituser = async (FormData: FormDataProps) => {
      return toast.promise(
          axios.put(
            `${import.meta.env.VITE_API_URL}/api/edit/user/${FormData.id}`,
            FormData,
            {
              headers: {
                "Content-Type": "application/json",
              },
              withCredentials: true,
            }
          ),
          {
            loading: "Processing...",
            success: "User updated successfully",
            error: "Failed to update user",
          }
        );
      };
      return {Edituser}
  };

