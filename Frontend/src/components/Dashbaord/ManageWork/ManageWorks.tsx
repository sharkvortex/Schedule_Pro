import ListWorks from "./ListWorks";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
function ManageWorks() {
  return (
    <div className="w-full rounded-xl p-6 shadow-sm space-y-6">
      
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-800">Manage Works</h2>
        <Link to={'/dashboard/newwork'}>
        <button className="flex items-center px-4 py-1.5 bg-green-600 hover:bg-green-700 hover:cursor-pointer text-white text-sm rounded-lg shadow transition duration-150">
          <Plus className="w-5"/> Create Work
        </button>
        </Link>
      </div>

{/* ที่แสดงงานทั้งหมด */}
      <div className="w-full">
        <ListWorks/>
      </div>
    </div>
  );
}

export default ManageWorks;
