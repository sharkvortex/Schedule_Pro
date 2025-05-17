import { Pencil, Trash2, ExternalLink } from "lucide-react";
import { WorkDataType } from "../../../hooks/admin/Work/useGetWork";
import ThaiDate from "../../formateDate/ThaiDate";
import { useState } from "react";
interface TableType {
  works: WorkDataType[];
  onEdit: (work: WorkDataType) => void;
  onDelete: (id: number) => void;
  isEditWork: boolean
}

function TableWorks({ works, onEdit, onDelete , isEditWork }: TableType) {
  const [tooltipIndex, setTooltipIndex] = useState<number | null>(null);
  const handleMouseEnter = (index: number) => setTooltipIndex(index);
  const handleMouseLeave = () => setTooltipIndex(null);
  const handleClick = (index: number) => {
    setTooltipIndex((prev) => (prev === index ? null : index));
  };


  return (
    <div className="mt-6 w-full overflow-x-auto rounded-t ">
      {!isEditWork && 
      <table className="min-w-max w-full text-sm max-sm:text-xs text-left">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="px-4 py-3">รหัสวิชา</th>
            <th className="px-4 py-3">หัวข้อ</th>
            <th className="px-4 py-3">คำอธิบาย</th>
            <th className="px-4 py-3">วันมอบ</th>
            <th className="px-4 py-3">วันส่ง</th>
            <th className="px-4 py-3">ลิงก์งาน</th>
            <th className="px-4 py-3">ลิงก์โค้ด</th>
            <th className="px-4 py-3">รูปภาพ</th>
            <th className="px-4 py-3 text-center">จัดการ</th>
          </tr>
        </thead>
        <tbody>
          {works?.length > 0 ? (
            works.map((work , index) => (
              <tr key={work.id} className="transition-all duration-300">
                <td
                  className="px-4 py-3 relative group "
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => handleClick(index)}
                >
                  <span>{work.subject_id}</span>

                  {tooltipIndex === index && (
                    <div className="absolute  bottom-12
                      bg-gray-800 text-white text-xs px-2 py-1 rounded
                      whitespace-nowrap z-10 transition duration-200 pointer-events-none">
                      {work.subject.subject_name}
                    </div>
                  )}
                </td>
                <td className="px-4 py-3">{work.title}</td>
                <td className="px-4 py-3">
                  <textarea
                    readOnly
                    value={work.description}
                    className="outline-0 resize-none"
                    name="description"
                  ></textarea>
                </td>
                <td className="px-4 py-3">
                  <ThaiDate date={work.assignedDate} />
                </td>
                <td className="px-4 py-3">
                  <ThaiDate date={work.dueDate} />
                </td>
                <td className="px-4 py-3 max-w-[30px]">
                  {work.link ? (
                    <a
                      href={work.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-blue-600 hover:underline truncate"
                      title={work.link}
                    >
                      <ExternalLink className="w-4 h-4 shrink-0" />
                      <span className="truncate">{work.link}</span>
                    </a>
                  ) : (
                    <span className="text-gray-400">ไม่มีลิ้งค์</span>
                  )}
                </td>

                <td className="px-4 py-3 max-w-[30px]">
                  {work.linkCode ? (
                    <a
                      href={work.linkCode}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-blue-600 hover:underline truncate"
                      title={work.linkCode}
                    >
                      <ExternalLink className="w-4 h-4 shrink-0" />
                      <span className="truncate">{work.linkCode}</span>
                    </a>
                  ) : (
                    <span className="text-gray-400">ไม่มีลิ้งค์</span>
                  )}
                </td>
                <td className="px-4 py-3">{work.images.length} รูป</td>
                <td className="px-4 py-3 text-center">
                  <div className="flex justify-center items-center gap-2">
                    <button
                      onClick={() => onEdit(work)}
                      className="text-blue-600 hover:bg-blue-100 p-2 rounded-full transition hover:cursor-pointer"
                      title="แก้ไข"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => onDelete(work.id)}
                      className="text-red-600 hover:bg-red-100 p-2 rounded-full transition hover:cursor-pointer"
                      title="ลบ"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={9} className="text-center py-6 text-gray-500">
                ไม่มีข้อมูลงาน
              </td>
            </tr>
          )}
        </tbody>
      </table>
      }
      
    </div>
  );
}

export default TableWorks;
