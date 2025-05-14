import { useState } from "react";
import UserList from "./UserList";

function ManageUser() {
  const [search, setSearch] = useState<string>("");
  
  return (
    <div className="w-full h-full p-2">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl max-sm:text-lg font-bold px-3">จัดการผู้ใช้</h1>
        <div className="relative">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="ค้นหาผู้ใช้..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring focus:ring-blue-500 focus:border-transparent transition duration-300 text-sm"
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

      <div className="overflow-x-auto shadow-md rounded">
        <UserList search={search}/>
      </div>
    </div>
  );
}

export default ManageUser;
