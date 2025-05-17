import { useUsers } from "../../../hooks/admin/useUsers";
import { FaEdit, FaTrash } from "react-icons/fa";
import EditUserForm from "./EditUserForm";
import DeleteUser from "./DeleteUser";
import { useEffect, useState } from "react";
import { useDeleteUser } from "../../../hooks/admin/useDeleteUser";
import Loading from "../../UI/Loading";
interface PropsType {
  search: string;
}
export type UsersProps = {
  id: number;
  studentId: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  role: string;
};

function UserList({ search }: PropsType) {
  const { data, getUsers, loading, totalCount } = useUsers();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { DeleteuserID } = useDeleteUser();
  const [dataEdit, setDataEdit] = useState<
    | {
        id: number;
        studentId: string;
        firstName: string;
        lastName: string;
        username: string;
        email: string;
        role: string;
      }
    | undefined
  >(undefined);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize] = useState<number>(10);

  function getRoleColor(role: string): string {
    switch (role) {
      case "admin":
        return "text-red-500";
      case "member":
        return "text-blue-500";
      default:
        return "";
    }
  }

  const EditUser = (user: UsersProps) => {
  setIsOpen(true);
  setDataEdit(user);
};

  const [userIdToDelete, setUserIdToDelete] = useState<number | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string>("");
  const DeleteUserHandler = (id: number, username: string) => {
    setUserToDelete(username);
    setUserIdToDelete(id);
    setIsDeleteOpen(true);
  };

  const handleDelete = async () => {
    if (userIdToDelete === null) return;
    try {
      await DeleteuserID(userIdToDelete);
      await getUsers(currentPage, pageSize, search);
    } catch (error) {
      console.error("Error deleting user:", error);
    }

    setIsDeleteOpen(false);
    setUserIdToDelete(null);
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      getUsers(currentPage, pageSize, search);
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [search, currentPage, pageSize]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  return (
    <>
      {isOpen && dataEdit && (
        <EditUserForm
          setIsOpen={setIsOpen}
          data={dataEdit}
          getUsers={getUsers}
          onSuccess={() => setCurrentPage(1)}
        />
      )}

      {isDeleteOpen && (
        <DeleteUser
          setIsOpen={setIsDeleteOpen}
          username={userToDelete}
          onDelete={handleDelete}
        />
      )}
      <div className="w-full overflow-x-auto mx-auto  shadow-md rounded-lg p-4">
        {loading ? (
          <div className="w-full min-h-[600px] flex items-center justify-center">
            <Loading />
          </div>
        ) : (
          <>
            <div className="w-full min-h-[80vh] relative">
              <table className="min-w-[800px] h-full  w-full text-sm rounded-t overflow-hidden rounded-lg">
                <thead className="bg-blue-500 text-white text-xs">
                  <tr>
                    <th className="px-4 py-3 text-left">รหัสนักศึกษา</th>
                    <th className="px-4 py-3 text-left">ยูสเซอร์</th>
                    <th className="px-4 py-3 text-left">ชื่อจริง</th>
                    <th className="px-4 py-3 text-left">นามสกุล</th>
                    <th className="px-4 py-3 text-left">อีเมล</th>
                    <th className="px-4 py-3 text-left">บทบาท</th>
                    <th className="px-4 py-3 text-center">จัดการ</th>
                  </tr>
                </thead>
                <tbody className="w-full">
                  {data.length === 0 ? (
                    <>
                      <tr className="w-full flex justify-center p-2">
                        <td className="w-full">ไม่พบข้อมูลผู้ใช้</td>
                      </tr>
                    </>
                  ) : (
                    <>
                      {data?.map((user) => (
                        <tr key={user.id}>
                          <td className="px-4 py-5">
                            {user.studentId}
                          </td>
                          <td className="px-4 py-3">{user.username}</td>
                          <td className="px-4 py-3">{user.firstName}</td>
                          <td className="px-4 py-3">{user.lastName}</td>
                          <td className="px-4 py-3">{user.email}</td>
                          <td
                            className={`px-4 py-3 capitalize ${getRoleColor(
                              user.role
                            )}`}
                          >
                            {user.role}
                          </td>
                          <td className="px-4 py-3 text-center flex items-center justify-center space-x-4">
                            <button
                              className="text-gray-500 py-3  hover:text-blue-500 transition"
                              title="Edit"
                            >
                              <FaEdit
                                onClick={() => EditUser(user)}
                                className="text-base cursor-pointer"
                              />
                            </button>
                            <button
                              className="text-gray-500 hover:text-red-500 transition"
                              title="Delete"
                            >
                              <FaTrash
                                onClick={() =>
                                  DeleteUserHandler(user.id, user.username)
                                }
                                className="text-base cursor-pointer"
                              />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </>
                  )}
                </tbody>
              </table>
              <div className="sticky bottom-0  py-4 z-10 w-full mt-20 flex justify-center space-x-2 items-center">
                <button
                  className={`px-6 py-2 rounded-md transition
    ${
      currentPage === 1
        ? "bg-blue-300 text-white cursor-not-allowed"
        : "bg-gray-500 text-white hover:bg-gray-300 cursor-pointer"
    }`}
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  &laquo; Prev
                </button>

                <div className="flex items-center space-x-2">
                  {Array.from(
                    { length: Math.ceil(totalCount / pageSize) },
                    (_, index) => index + 1
                  ).map((page) => (
                    <button
                      key={page}
                      className={`px-3 py-1 rounded-md text-sm ${
                        page === currentPage
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 text-white hover:bg-gray-300"
                      } transition`}
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                <button
                  className={`px-6 py-2 rounded-md transition 
    ${
      currentPage * pageSize >= totalCount
        ? "bg-blue-300 text-white cursor-not-allowed"
        : "bg-blue-500 text-white hover:bg-gray-300 cursor-pointer"
    }`}
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage * pageSize >= totalCount}
                >
                  Next &raquo;
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default UserList;
