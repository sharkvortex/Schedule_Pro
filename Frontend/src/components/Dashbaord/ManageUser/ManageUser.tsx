import { useState } from "react";
import { Pencil, Trash2, PlusCircle } from "lucide-react";

function ManageUser() {
  const [users, setUsers] = useState([
    { id: 1, name: "สมชาย ใจดี", email: "somchai@example.com", role: "แอดมิน" },
    { id: 2, name: "นฤมล รักดี", email: "narumon@example.com", role: "ผู้ใช้งานทั่วไป" },
  ]);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">จัดการผู้ใช้</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          <PlusCircle className="w-5 h-5" />
          เพิ่มผู้ใช้
        </button>
      </div>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full text-sm text-gray-800">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="px-6 py-3 font-semibold">ชื่อ</th>
              <th className="px-6 py-3 font-semibold">อีเมล</th>
              <th className="px-6 py-3 font-semibold">สิทธิ์การใช้งาน</th>
              <th className="px-6 py-3 font-semibold text-center">จัดการ</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user.id}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="px-6 py-4">{user.name}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">{user.role}</td>
                <td className="px-6 py-4 text-center">
                  <div className="flex items-center justify-center gap-3">
                    <button className="text-blue-500 hover:text-blue-700 transition">
                      <Pencil className="w-5 h-5" />
                    </button>
                    <button className="text-red-500 hover:text-red-700 transition">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManageUser;
