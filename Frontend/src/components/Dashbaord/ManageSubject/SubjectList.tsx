import { useState } from "react";
import { useSubject } from "../../../hooks/admin/useSubject";
import { Pencil, Trash, BookPlus } from "lucide-react";
import EditSubjectForm from "./EditSubjectForm";
import CreateSubject from "./CreateSubject";
import Loading from "../../UI/Loading";
import DeleteSubject from "./DeleteSubject";
import { useDeleteSubject } from "../../../hooks/admin/Subject/useDeleteSubject";
import toast from "react-hot-toast";
function SubjectList() {
  const { subjects, refetch, loading , setSubjects } = useSubject();
  const [editOpen, setEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(true);
  const [deleteID, setDeleteID] = useState<number>();
  const [createOpen, setCreateOpen] = useState(false);
  const [dataEdit, setDataEdit] = useState<
    | {
        subject_id: string;
        subject_name: string;
        teacher_name: string;
        study_day: string;
        period: string;
        time_start: string;
        time_end: string;
        room: string;
      }
    | undefined
  >(undefined);
  const DayEngtoThai = (day: string): string => {
    switch (day) {
      case "MON":
        return "จันทร์";
      case "TUE":
        return "อังคาร";
      case "WED":
        return "พุธ";
      case "THU":
        return "พฤหัสบดี";
      case "FRI":
        return "ศุกร์";
      case "SAT":
        return "เสาร์";
      case "SUN":
        return "อาทิตย์";
      default:
        return "ไม่ทราบวัน";
    }
  };

  const PeriodEngtoThai = (period: string): string => {
    switch (period) {
      case "MORNING":
        return "เช้า";
      case "AFTERNOON":
        return "บ่าย";
      case "EVENING":
        return "เย็น";
      default:
        return "ไม่ทราบช่วงเวลา";
    }
  };

  const onEditSubject = (subject: any) => {
    setEditOpen(!editOpen);
    setDataEdit(subject);
  };

  const { deleteSubject } = useDeleteSubject();
  const onDeleteSubject = async (id: number) => {
    try {
      const response = await toast.promise(deleteSubject(id), {
        loading: "กำลังลบรายวิชา...",
        success: "ลบรายวิชาสำเร็จ",
        error: "ไม่สามารถลบรายวิชาได้",
      });

      if (response?.status === 200) {
        await refetch();
        setIsDeleteOpen(false);
      } else {
        toast.error("ไม่สามารถลบรายวิชาได้");
      }
    } catch (error) {
      console.error("Edit error", error);
      setSubjects([])
    }
  };

  return (
    <>
      {createOpen && (
        <CreateSubject setIsOpen={setCreateOpen} refetch={refetch} />
      )}

      {editOpen && dataEdit && (
        <EditSubjectForm
          setIsOpen={setEditOpen}
          data={dataEdit}
          refetch={refetch}
        />
      )}

      {deleteID !== undefined && (
        <DeleteSubject
          isOpen={isDeleteOpen}
          onClose={() => setIsDeleteOpen(false)}
          onConfirm={onDeleteSubject}
          subjectId={deleteID}
        />
      )}

      <div className="w-full overflow-x-auto px-2">
        <div className="w-full flex ">
          <button
            onClick={() => setCreateOpen(!createOpen)}
            className="text-sm rounded px-6 py-2 bg-blue-600 text-white flex items-center gap-2 my-3 hover:bg-blue-700 transition-colors duration-200 shadow-md hover:cursor-pointer"
          >
            เพิ่มวิชา
            <BookPlus className="w-5 h-5" />
          </button>
        </div>
        <div className="inline-block w-full min-w-[1000px] rounded-t overflow-hidden">
          {loading ? (
            <div className="w-full min-h-screen flex items-center justify-center">
              <Loading />
            </div>
          ) : (
            <table className="w-full min-w-max text-sm max-sm:text-xs text-left">
              <thead className="thead">
                <tr>
                  <th className="px-4 py-3">รหัสวิชา</th>
                  <th className="px-4 py-3">ชื่อวิชา</th>
                  <th className="px-4 py-3">อาจารย์</th>
                  <th className="px-4 py-3">วันเรียน</th>
                  <th className="px-4 py-3">ช่วง</th>
                  <th className="px-4 py-3">เวลา</th>
                  <th className="px-4 py-3">ห้องเรียน</th>
                  <th className="px-4 py-3 text-center">จัดการ</th>
                </tr>
              </thead>
              <tbody>
                {subjects && subjects.length === 0 ? (
                  <tr className="w-full">
                    <td className="text-center py-4 text-gray-500">
                      ยังไม่มีรายวิชา
                    </td>
                  </tr>
                ) : (
                  <>
                    {subjects?.map((subject) => (
                      <tr key={subject.id}>
                        <td className="px-4 py-3">{subject.subject_id}</td>
                        <td className="px-4 py-3">{subject.subject_name}</td>
                        <td className="px-4 py-3">{subject.teacher_name}</td>
                        <td className="px-4 py-3">
                          {DayEngtoThai(subject.study_day)}
                        </td>
                        <td className="px-4 py-3">
                          {PeriodEngtoThai(subject.period)}
                        </td>
                        <td className="px-4 py-3">
                          {subject.time_start + "-" + subject.time_end}
                        </td>
                        <td className="px-4 py-3">{subject.room}</td>
                        <td className="px-4 py-3 text-center space-x-2 flex justify-center items-center">
                          <div>
                            <button
                              onClick={() => onEditSubject(subject)}
                              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm transition hover:cursor-pointer hover:text-blue-500"
                            >
                              <Pencil className="w-4 h-4" />
                            </button>
                          </div>
                          <div>
                            <button
                              onClick={() => {
                                setIsDeleteOpen(true);
                                setDeleteID(subject.id);
                              }}
                              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm transition hover:cursor-pointer hover:text-red-500"
                            >
                              <Trash className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}

export default SubjectList;
