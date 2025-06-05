import { Plus } from "lucide-react";
import CreateWork from "./CreateWork";
import ListWorks from "./ListWorks";
import { useEffect, useState } from "react";
import { useSubject } from "../../../hooks/admin/useSubject";
import { useGetWork } from "../../../hooks/admin/Work/useGetWork";
import Loading from "../../UI/Loading";
function ManageWorks() {
  const [isCreate, setIsCreate] = useState<boolean>(false);
  const [isEditWork, setIsEditWork] = useState<boolean>(false);
  const { subjects } = useSubject();
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const { getWork, workData, workLoading } = useGetWork();

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

  useEffect(() => {
    getWork(selectedSubject);
  }, [selectedSubject]);

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
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  value={selectedSubject}
                >
                  <option className="p-2" value="">
                    ทั้งหมด
                  </option>
                  {subjects?.map((subject) => (
                    <option
                      key={subject.id}
                      value={subject.subject_id}
                    >{`${subject.subject_id} || ${subject.subject_name}`}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          <CreateWork
            isCreate={isCreate}
            setIsCreate={setIsCreate}
            refetch={() => {
              setSelectedSubject("");
              getWork("");
            }}
          />

          {/* แสดง Loading ถ้า workLoading เป็น true */}
          {workLoading ? (
            <div className="flex justify-center items-center min-h-[200px]">
              <Loading />
            </div>
          ) : (
            !isCreate && (
              <ListWorks
                isEditWork={isEditWork}
                setIsEditWork={setIsEditWork}
                isCreate={isCreate}
                setIsCreate={setIsCreate}
                workData={workData}
                refetch={() => {
                  setSelectedSubject("");
                  getWork("");
                }}
              />
            )
          )}
        </div>
      </div>
    </>
  );
}

export default ManageWorks;
