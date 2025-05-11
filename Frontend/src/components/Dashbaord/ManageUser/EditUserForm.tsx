import { useEffect, useState } from "react";
import { FaSave, FaTimes, FaUser, FaEnvelope, FaUserTag, FaIdBadge } from "react-icons/fa";
import { EditUser } from "../../../hooks/admin/useEditUser";

interface EditUserFormProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data: {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    role: string;
  };
  getUsers: () => void;
  onSuccess: () => void;
}

function EditUserForm({ setIsOpen, data, getUsers, onSuccess  }: EditUserFormProps) {
  const [formData, setFormData] = useState({ ...data });
  const [show, setShow] = useState(false);
  const { Edituser } = EditUser();  
  useEffect(() => {
    setTimeout(() => setShow(true), 10);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await Edituser(formData); 

      if (res?.status === 200) {
        await getUsers();
        onSuccess();
        setIsOpen(false);
      } else {
        console.error("Failed to update user");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div
        className={`w-full max-w-2xl bg-white dark:bg-gray-900 rounded-3xl shadow-2xl transition-all duration-300 transform ${show ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
      >
        
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 p-6">
          <p className="text-2xl text-white font-bold flex items-center gap-2">
            <FaUserTag className="text-blue-500" />
            Edit User
          </p>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-500 hover:text-gray-800 dark:hover:text-gray-300 transition hover:cursor-pointer"
            title="Close"
          >
            <FaTimes className="text-2xl" />
          </button>
        </div>

        
        <form onSubmit={handleSubmit} className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          {[
            { label: "First Name", name: "firstName", icon: <FaUser /> },
            { label: "Last Name", name: "lastName", icon: <FaUser /> },
            { label: "Username", name: "username", icon: <FaIdBadge /> },
            { label: "Email", name: "email", icon: <FaEnvelope /> },
          ].map(({ label, name, icon }) => (
            <div key={name}>
              <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
                {label}
              </label>
              <div className="flex items-center border rounded-xl px-3 py-2 bg-gray-50 dark:bg-gray-800 dark:border-gray-700 focus-within:ring-2 focus-within:ring-blue-500 transition-all">
                <span className="text-gray-400 dark:text-gray-500">{icon}</span>
                <input
                  type={name === "email" ? "email" : "text"}
                  name={name}
                  value={formData[name as keyof typeof formData]}
                  onChange={handleChange}
                  placeholder={`Enter ${label.toLowerCase()}`}
                  className="ml-3 w-full bg-transparent focus:outline-none text-gray-800 dark:text-white"
                />
              </div>
            </div>
          ))}

          <div className="md:col-span-2">
            <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
              Role
            </label>
            <div className="relative">
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full appearance-none border rounded-xl px-4 py-2 bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500"
              >
                <option value="admin">Admin</option>
                <option value="member">Member</option>
                <option value="user">User</option>
              </select>
              <div className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500">
                ▼
              </div>
            </div>
          </div>

          
          <div className="md:col-span-2 flex justify-end gap-4 pt-6">
            <button
              type="submit"
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-6 py-2 rounded-full shadow-lg transition-all hover:scale-105 hover:cursor-pointer"
            >
              <FaSave />
              Save
            </button>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2 rounded-full shadow-sm transition-all dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white hover:cursor-pointer"
            >
              <FaTimes />
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditUserForm;
