import axios from "axios";
import toast from "react-hot-toast";

export const useDeleteUser = () => {
    const DeleteuserID = async (id: number) => {
        return toast.promise(
            axios.delete(
              `${import.meta.env.VITE_API_URL}/api/delete/user/${id}`,
              {
                headers: {
                  "Content-Type": "application/json",
                },
                withCredentials: true,
              }
            ),
            {
              loading: "Processing...",
              success: "User delete successfully",
              error: "Failed to delete user",
            }
          );
        };
        return {DeleteuserID}
}