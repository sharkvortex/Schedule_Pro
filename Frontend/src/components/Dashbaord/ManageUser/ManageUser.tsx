import { useState } from "react";
import { Pencil, Trash2  } from "lucide-react";

type UserProp = {
  id: number;
  studentId: string;
  name: string;
  role: string;
}

function ManageUser() {
  const [users, setUsers] = useState<UserProp[]>([
    { id: 1, studentId: "650001", name: "สมชาย ใจดี", role: "แอดมิน" },
    { id: 2, studentId: "650002", name: "นฤมล รักดี", role: "ผู้ใช้งานทั่วไป" },
    { id: 3, studentId: "650003", name: "อรทัย สวยงาม", role: "ผู้ใช้งานทั่วไป" },
    { id: 4, studentId: "650004", name: "สมศักดิ์ เก่งกล้า", role: "แอดมิน" },
    { id: 5, studentId: "650005", name: "นพดล ฉลาดดี", role: "ผู้ใช้งานทั่วไป" },
    { id: 6, studentId: "650006", name: "สุชาติ สุขใจ", role: "ผู้ใช้งานทั่วไป" },
    { id: 7, studentId: "650007", name: "อัมพร สวยใส", role: "แอดมิน" },
    { id: 8, studentId: "650008", name: "จิราภรณ์ น่ารัก", role: "ผู้ใช้งานทั่วไป" },
    { id: 9, studentId: "650009", name: "กิตติพงษ์ ฉลาดหลักแหลม", role: "ผู้ใช้งานทั่วไป" },
    { id: 10, studentId: "650010", name: "วรรณา สวยสง่า", role: "แอดมิน" },
  ]);

  return (
    <div className="w-full h-full p-2">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl max-sm:text-lg font-bold ">จัดการผู้ใช้</h1>
        <div className="relative">
    <input
      type="text"
      placeholder="ค้นหาผู้ใช้..."
      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm"
    />
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z"
      />
    </svg>
  </div>
      </div>

      <div className="overflow-x-auto   shadow-md rounded">
        <table className="min-w-[600px] w-full text-sm ">
          <thead className=" text-left">
            <tr>
              <th className="px-4 py-3 font-semibold">No.</th>
              <th className="px-4 py-3 font-semibold">Student ID</th>
              <th className="px-4 py-3 font-semibold">Name</th>
              <th className="px-4 py-3 font-semibold">Role</th>
              <th className="px-4 py-3 font-semibold text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user.id}
                className=""
              >
                <td className="px-4 py-4">{index + 1}</td>
                <td className="px-4 py-4">{user.studentId}</td>
                <td className="px-4 py-4">{user.name}</td>
                <td className="px-4 py-4">{user.role}</td>
                <td className="px-4 py-4 text-center">
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
