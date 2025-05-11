import { FaTrashAlt, FaTimes } from "react-icons/fa";

interface DeleteUserProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  username: string;
  onDelete: () => void;
}

function DeleteUser({ setIsOpen, username, onDelete }: DeleteUserProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
      <div
        className={`w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl transform transition-all duration-500`}
      >
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
            <FaTrashAlt className="text-red-500" />
            Confirm Deletion
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-500 hover:text-gray-800 dark:hover:text-gray-300 transition hover:cursor-pointer"
            title="Close"
          >
            <FaTimes className="text-2xl" />
          </button>
        </div>

        <div className="p-6">
          <p className="text-lg text-gray-800 dark:text-white">
            Are you sure you want to delete the user{" "}
            <span className="font-bold text-red-500">{username}</span>?
          </p>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            This action cannot be undone.
          </p>
        </div>

        <div className="flex justify-end gap-4 p-6">
          <button
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded-full shadow-sm transition-all dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white hover:cursor-pointer"
          >
            <FaTimes />
            Cancel
          </button>
          <button
            onClick={() => {
              onDelete();
              setIsOpen(false);
            }}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full shadow-lg transition-all hover:scale-105 hover:cursor-pointer"
          >
            <FaTrashAlt />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteUser;
