import { useSubject } from "../../../hooks/admin/useSubject";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

function SubjectList() {
  const { subjects } = useSubject();

  const formatThaiTime = (isoTime: string) => {
    return dayjs(isoTime).tz("Asia/Bangkok").format("HH:mm");
  };

  return (
    <div className="w-full overflow-x-auto px-2">
      <div className="inline-block w-full min-w-[1000px] rounded-t overflow-hidden">
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
            {subjects && subjects.length > 0 ? (
              subjects.map((subject) => (
                <tr key={subject.id}>
                  <td className="px-4 py-3">{subject.subject_id}</td>
                  <td className="px-4 py-3">{subject.subject_name}</td>
                  <td className="px-4 py-3">{subject.teacher_name}</td>
                  <td className="px-4 py-3">{subject.study_day}</td>
                  <td className="px-4 py-3">{subject.period}</td>
                  <td className="px-4 py-3">
                    {formatThaiTime(subject.time_start)} - {formatThaiTime(subject.time_end)}
                  </td>
                  <td className="px-4 py-3">{subject.room}</td>
                  <td className="px-4 py-3 text-center space-x-2">
                    <button className="px-3 py-1 rounded text-white bg-blue-500 hover:bg-blue-600">
                      แก้ไข
                    </button>
                    <button className="px-3 py-1 rounded text-white bg-red-500 hover:bg-red-600">
                      ลบ
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="text-center py-4 text-gray-500">
                  ไม่มีข้อมูลวิชา
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SubjectList;
