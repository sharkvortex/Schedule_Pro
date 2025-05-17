import { useEffect, useState } from "react";
import {
  FaSave,
  FaTimes,
  FaUser,
  FaEnvelope,
  FaUserTag,
  FaIdBadge,
} from "react-icons/fa";
import { EditUser } from "../../../hooks/admin/useEditUser";
import { IdCard } from "lucide-react";

interface EditUserFormProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data: {
    id: number;
    studentId: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    role: string;
  };
  getUsers: () => void;
  onSuccess: () => void;
}

function EditUserForm({
  setIsOpen,
  data,
  getUsers,
  onSuccess,
}: EditUserFormProps) {
  const [formData, setFormData] = useState({ ...data });
  const [show, setShow] = useState(false);
  const { Edituser } = EditUser();

  useEffect(() => {
    setTimeout(() => setShow(true), 10);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await Edituser(formData);
      await getUsers();
      onSuccess();
      setIsOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div
        className={`w-full max-w-2xl rounded-3xl shadow-2xl transition-all duration-300 transform bg-white dark:bg-gray-900 ${
          show ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700 rounded-t-3xl">
          <h5 className="text-2xl font-semibold text-white flex items-center gap-2">
            <FaUserTag className="text-indigo-500" />
            Edit User
          </h5>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-500 hover:text-red-500 transition hover:cursor-pointer"
            title="Close"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-sm"
        >
          {[
            { label: "Student ID", name: "studentId", icon: <IdCard /> },
            { label: "First Name", name: "firstName", icon: <FaUser /> },
            { label: "Last Name", name: "lastName", icon: <FaUser /> },
            { label: "Username", name: "username", icon: <FaIdBadge /> },
            { label: "Email", name: "email", icon: <FaEnvelope /> },
          ].map(({ label, name, icon }) => (
            <div key={name}>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                {label}
              </label>
              <div className="flex items-center gap-2 border-2 rounded-xl px-3 py-2 bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus-within:ring-2 focus-within:ring-indigo-400 transition">
                <span className="text-indigo-400 dark:text-indigo-300">
                  {icon}
                </span>
                <input
                  type={name === "email" ? "email" : "text"}
                  name={name}
                  value={formData[name as keyof typeof formData]}
                  onChange={handleChange}
                  placeholder={`Enter ${label.toLowerCase()}`}
                  className="w-full bg-transparent focus:outline-none text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
                />
              </div>
            </div>
          ))}

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Role
            </label>
            <div className="relative">
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full border-2 rounded-xl px-4 py-2 bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 appearance-none"
              >
                <option value="admin">Admin</option>
                <option value="member">Member</option>
                <option value="user">User</option>
              </select>
              <div className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 text-indigo-400 dark:text-indigo-300">
                ▼
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="md:col-span-2 flex justify-end gap-3 pt-4">
            <button
              type="submit"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-6 py-2 rounded-full shadow-lg transition-transform transform hover:scale-105 hover:cursor-pointer"
            >
              <FaSave />
              Save
            </button>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="inline-flex items-center gap-2 bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white px-6 py-2 rounded-full transition hover:cursor-pointer"
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
