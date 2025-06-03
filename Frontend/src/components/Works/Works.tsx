import {
  Calendar,
  AlertCircle,
  FileText,
  ArrowRightCircle,
} from "lucide-react";
import { ThaiDate } from "../formateDate/ThaiDate";
import { WorkSubjectType } from "../../hooks/useWorkSubject";
import { Link } from "react-router-dom";

function Works({ workData }: { workData: WorkSubjectType[] }) {
  return (
    <>
      {workData && workData.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workData.map((work) => (
            <div
              key={work.id}
              className="flex flex-col justify-between border border-gray-50/10 rounded-2xl shadow p-6 transition-all duration-300 hover:-translate-y-1 h-full"
            >
              <div className="flex-1 flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <div className="bg-indigo-800 p-2 rounded-lg">
                    <FileText className="h-5 w-5  text-white" />
                  </div>
                </div>

                <h5 className="text-lg font-semibold mb-2 line-clamp-2">
                  {work.title}
                </h5>

                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3 leading-relaxed">
                  {work.description}
                </p>

                <div className="space-y-2 text-sm mt-auto">
                  <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                    <Calendar className="h-4 w-4 text-green-500" />
                    <span className="font-medium">สั่งเมื่อ:</span>
                    <span>{ThaiDate({ date: work.assignedDate })}</span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                    <AlertCircle className="h-4 w-4 text-red-500" />
                    <span className="font-medium">กำหนดส่ง:</span>
                    <span className="text-red-600 dark:text-red-400">
                      {ThaiDate({ date: work.dueDate })}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <Link
                  to={`/subject/${work.subject_id}/${work.id}`}
                  className="inline-flex items-center gap-1 text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-200 text-sm font-medium transition-colors group"
                >
                  ดูงาน
                  <ArrowRightCircle className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
            <FileText className="h-12 w-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">
            ไม่พบงานที่มอบหมาย
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            ยังไม่มีงานสำหรับวิชานี้ในขณะนี้
          </p>
        </div>
      )}
    </>
  );
}

export default Works;
