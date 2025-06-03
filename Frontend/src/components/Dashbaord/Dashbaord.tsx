import { UserPlus, SwatchBook,  Activity} from "lucide-react";
import useDashboard from "../../hooks/useDashboard";
import Loading from "../UI/Loading";
function Dashboard() {
  const {data ,loading} = useDashboard();
  return (
    <div className="flex w-full min-w-[340px] min-h-screen">
      {/* Main Content */}
      <div className="flex-1">
        {/* Dashboard Content */}
        <div className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">
              แดชบอร์ดการจัดการ
            </h1>
            <p className="text-gray-600">
              ยินดีต้อนรับกลับมา! นี่คือภาพรวมของระบบในวันนี้
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-3  max-[1130px]:grid-cols-3 max-[940px]:grid-cols-2 max-[740px]:grid-cols-1  gap-6 mb-8">
            <div className="p-3 flex items-center  rounded-lg shadow-sm">
              <div className="w-full  p-3 flex  sm:flex-row justify-between items-center">
                <div>
                  <p className="text-sm">ผู้ใช้ทั้งหมด</p>
                  {loading ?  <div className="flex justify-center mt-2"><Loading size={12}/></div>: <h3 className="text-2xl font-bold text-gray-800">{data?.totalUsers || 0}</h3>}
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <UserPlus className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="p-3 flex items-center  rounded-lg shadow-sm">
              <div className="w-full p-3 flex  sm:flex-row justify-between items-center">
                <div>
                  <p className="text-sm">วิชาทั้งหมด</p>
                  {loading ?  <div className="flex justify-center mt-2"><Loading size={12}/></div>: <h3 className="text-2xl font-bold text-gray-800">{data?.totalSubjects || 0}</h3>}
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <SwatchBook className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>

            <div className="p-3 flex items-center  rounded-lg shadow-sm">
              <div className="w-full p-3 flex  sm:flex-row justify-between items-center">
                <div>
                  <p className="text-sm ">งานทั้งหมด</p>
                  {loading ?  <div className="flex justify-center mt-2"><Loading size={12}/></div>: <h3 className="text-2xl font-bold text-gray-800">{data?.totalWorks || 0}</h3>}
                  
                </div>
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <Activity className="w-6 h-6 text-indigo-600" />
                </div>
              </div>
            </div>

            

            
          </div>

         
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
