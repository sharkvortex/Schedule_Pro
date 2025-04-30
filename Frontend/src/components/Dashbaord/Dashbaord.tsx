import { UserPlus, FilePlus, Edit,  Activity} from 'lucide-react';
function Dashboard() {
  
  
  return (
    <div className="flex w-full min-w-[340px] min-h-screen">
      {/* Main Content */}
      <div className="flex-1">
        {/* Dashboard Content */}
        <div className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">แดชบอร์ดการจัดการ</h1>
            <p className="text-gray-600">ยินดีต้อนรับกลับมา! นี่คือภาพรวมของระบบในวันนี้</p>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-4  max-[1130px]:grid-cols-3 max-[940px]:grid-cols-2 max-[740px]:grid-cols-1  gap-6 mb-8">
            <div className="p-3 flex items-center  rounded-lg shadow-sm">
              <div className="w-full  p-3 flex  sm:flex-row justify-between items-center">
                <div>
                  <p className="text-sm ">ผู้ใช้ทั้งหมด</p>
                  <h3 className="text-2xl font-bold text-gray-800">1,275</h3>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <UserPlus className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>
            
            <div className="p-3 flex items-center  rounded-lg shadow-sm">
              <div className="w-full p-3 flex  sm:flex-row justify-between items-center">
                <div>
                  <p className="text-sm">งานทั้งหมด</p>
                  <h3 className="text-2xl font-bold text-gray-800">832</h3>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <FilePlus className="w-6 h-6 text-green-600" />
                </div>
              </div>
              
              
            </div>
            
            <div className="p-3 flex items-center  rounded-lg shadow-sm">
              <div className="w-full p-3 flex  sm:flex-row justify-between items-center">
                <div>
                  <p className="text-sm ">งานที่เสร็จสิ้น</p>
                  <h3 className="text-2xl font-bold text-gray-800">621</h3>
                </div>
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <Activity className="w-6 h-6 text-indigo-600" />
                </div>
              </div>
            </div>
            
            <div className="p-3 flex items-center  rounded-lg shadow-sm">
              <div className="w-full p-3 flex  sm:flex-row justify-between items-center">
                <div>
                  <p className="text-sm ">กำลังดำเนินการ</p>
                  <h3 className="text-2xl font-bold text-gray-800">211</h3>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Edit className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Action Cards */}
          <div className="grid max-[740px]:grid-cols-1 grid-cols-3 max-[940px]:grid-cols-2 gap-6 mb-8">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-xl shadow-md text-white">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xl font-bold">จัดการผู้ใช้</span>
                <UserPlus className="h-8 w-8" />
              </div>
              <p className="mb-4">เพิ่ม, แก้ไข, หรือลบผู้ใช้ในระบบ</p>
              <button className="mt-2 bg-white text-blue-600 py-2 px-4 rounded-lg font-medium hover:bg-blue-50">
                จัดการตอนนี้
              </button>
            </div>
            
            <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-xl shadow-md text-white">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xl font-bold">เพิ่มงานใหม่</span>
                <FilePlus className="h-8 w-8" />
              </div>
              <p className="mb-4">สร้างงานใหม่ บันทึกลงฐานข้อมูล</p>
              <button className="mt-2 bg-white text-green-600 py-2 px-4 rounded-lg font-medium hover:bg-green-50">
                เพิ่มงาน
              </button>
            </div>
            
            <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 p-6 rounded-xl shadow-md text-white">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xl font-bold">รายงานระบบ</span>
                <Activity className="h-8 w-8" />
              </div>
              <p className="mb-4">ดูบันทึกกิจกรรมและสถิติของระบบ</p>
              <button className="mt-2 bg-white text-indigo-600 py-2 px-4 rounded-lg font-medium hover:bg-indigo-50">
                ดูรายงาน
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;