import { useParams } from "react-router-dom";
import {
  Book,
  Clock,
  User,
  FileText,
} from "lucide-react";
import { useWorkSubject } from "../hooks/useWorkSubject";
import { useEffect, useState } from "react";
import { useSubjectId } from "../hooks/useSubjectId";
import { ThaiDay } from "./formateDate/ThaiDay";
import Works from "./Works/Works";
import Loading from "./UI/Loading";

function Subject() {
  const { subjectId } = useParams<{ subjectId: string }>();
  const { fetchWork, workData} = useWorkSubject();
  const { fetchsubjectId, detailSubject } = useSubjectId();
  const [selectedSubjectId, setSelectedSubjectId] = useState("desc");

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      if (subjectId) {
        setIsLoading(true);
        await Promise.all([
          fetchWork(subjectId, selectedSubjectId),
          fetchsubjectId(subjectId),
        ]);
        setIsLoading(false);
      }
    };

    loadData();
  }, [subjectId, selectedSubjectId]);

  if (isLoading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen min-w-[340px]">
      {/* Header Section */}
      <div className="w-full">
        <div className="p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Subject Info */}
            <div className="flex items-start space-x-4 p-4 rounded-xl border-l-4 border-blue-500">
              <div className="bg-blue-500 p-3 rounded-full shadow-lg">
                <Book className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-800 mb-1">วิชา</h3>
                <div className="text-sm">
                  <p className="font-semibold text-blue-700">
                    {detailSubject?.subject_id}
                  </p>
                  <p className="mt-1">{detailSubject?.subject_name}</p>
                </div>
              </div>
            </div>

            {/* เวลาเรียน */}
            <div className="flex items-start space-x-4 p-4 rounded-xl border-l-4 border-amber-500">
              <div className="bg-amber-500 p-3 rounded-full shadow-lg">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-800 mb-1">เวลาเรียน</h3>
                <div className="text-sm">
                  <p className="font-semibold text-amber-700">
                    {ThaiDay(detailSubject?.study_day)}
                  </p>
                  <p className="mt-1">
                    {detailSubject?.time_start}น. - {detailSubject?.time_end}น.
                  </p>
                </div>
              </div>
            </div>

            {/* อาจารย์ */}
            <div className="flex items-start space-x-4 p-4 rounded-xl border-l-4 border-emerald-500">
              <div className="bg-emerald-500 p-3 rounded-full shadow-lg">
                <User className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-800 mb-1">อาจารย์</h3>
                <p className="text-sm font-semibold text-emerald-700">
                  {detailSubject?.teacher_name}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* งานทั้งหมด */}
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <div className="flex text-sm items-center space-x-3 bg-indigo-500 p-3 rounded-full shadow-lg">
                <FileText className="h-6 w-6 text-white" />
                <h5 className="text-xs sm:text-sm font-bold text-white">งานทั้งหมด</h5>
              </div>
            </div>
            <div>
              <select
                value={selectedSubjectId}
                onChange={(e) => setSelectedSubjectId(e.target.value)}
                className="bg-white text-gray-500 outline-none border border-gray-300/50 text-sm rounded-lg cursor-pointer block w-full p-2.5"
              >
                <option value="desc">ล่าสุด</option>
                <option value="asc">เก่าสุด</option>
              </select>
            </div>
          </div>

          <Works workData={workData ?? []} />
        </div>
      </div>
    </div>
  );
}

export default Subject;
