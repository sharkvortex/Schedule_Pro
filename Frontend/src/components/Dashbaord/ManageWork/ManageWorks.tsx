import { Plus, Search } from "lucide-react";
import CreateWork from "./CreateWork";
import ListWorks from "./ListWorks";
import { useEffect, useState } from "react";
import { useSubject } from "../../../hooks/admin/useSubject";
function ManageWorks() {
  const [isCreate, setIsCreate] = useState<boolean>(false);
  const [isEditWork, setIsEditWork] = useState<boolean>(false);
  const { subjects } = useSubject();
  const [searchInput, setSearchInput] = useState<string>("");

  useEffect(() => {
    if (isCreate) {
      setIsEditWork(false);
    }
  }, [isCreate]);

  useEffect(() => {
    if (isEditWork) {
      setIsCreate(false);
    }
  }, [isEditWork]);
  return (
    <>
      <div className="w-full p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">จัดการงาน</h2>
          <button
            onClick={() => setIsCreate(!isCreate)}
            className="flex items-center px-5 py-1.5 bg-blue-600 hover:bg-blue-700 hover:cursor-pointer text-white text-sm rounded  transition duration-150"
          >
            สร้างงาน{" "}
            <Plus
              className={`w-5 ml-3 transition-all duration-300 ${
                isCreate ? "rotate-45" : "rotate-0"
              }`}
            />
          </button>
        </div>
        <div className="w-full relative min-h-screen">
          {!isCreate && !isEditWork && (
            <div className="w-full text-sm flex max-[950px]:flex-col-reverse max-[950px]:text-xs  items-center  justify-between gap-4">
              <div className="w-full flex max-[950px]:justify-end">
                <select
                  name="studentId"
                  className="w-max rounded-lg border border-gray-400 cursor-pointer p-2 px-4 normal-bg outline-0"
                >
                  <option className="p-2" value="">
                    เลือกวิชา
                  </option>
                  {subjects?.map((subject) => (
                    <option
                      key={subject.id}
                      value={subject.subject_id}
                    >{`${subject.subject_id} || ${subject.subject_name} `}</option>
                  ))}
                </select>
              </div>

              {/* Search */}
              <div className="max-[950px]:w-full  relative ">
                <span className="absolute left-6 top-1/2 -translate-y-1/2 ">
                  <Search className="w-4 h-4" />
                </span>
                <input
                  name="search"
                  type="text"
                  placeholder="ค้นหางานหรือหัวข้อ..."
                  className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-400 placeholder:text-gray-500 outline-0"
                  onChange={(e) => setSearchInput(e.target.value)}
                  value={searchInput}
                />
              </div>
            </div>
          )}

          <CreateWork isCreate={isCreate} setIsCreate={setIsCreate} />
          {!isCreate && (
            <ListWorks
              isEditWork={isEditWork}
              setIsEditWork={setIsEditWork}
              isCreate={isCreate}
              setIsCreate={setIsCreate}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default ManageWorks;
