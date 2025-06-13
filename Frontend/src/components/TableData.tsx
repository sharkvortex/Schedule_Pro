import { Link } from "react-router-dom";
import { GraduationCap } from "lucide-react";
import { useMemo } from "react";
import { SubjectType } from "../hooks/admin/useSubject";
export interface TableDataProps {
  study_day: string;
  period: string;
  subjects: SubjectType[] | null | undefined;
  subjectLoading: boolean;
}

function TableData({
  study_day,
  period,
  subjects,
  subjectLoading,
}: TableDataProps) {
  const filteredSubjects = useMemo(() => {
    return subjects?.filter(
      (subject) => subject.study_day === study_day && subject.period === period
    );
  }, [subjects, study_day, period]);

  const isStillLoading = subjectLoading || !subjects;
  const hasSubjects = filteredSubjects && filteredSubjects.length > 0;

  if (isStillLoading) {
    return (
      <div className="h-[162px] px-5 flex items-center">
        {[...Array(1)].map((_, index) => (
          <div
            key={index}
            className="w-full h-[100px] p-2 rounded border border-gray-100/5 shadow animate-pulse flex flex-col justify-center space-y-2 overflow-hidden"
          >
            <div className="h-4 w-1/2 rounded bg-gray-300/30" />
            <div className="h-3 w-1/3 rounded bg-gray-300/20" />
            <div className="h-3 w-2/3 rounded bg-gray-300/20" />
            <div className="h-3 w-1/4 rounded bg-gray-300/20" />
          </div>
        ))}
      </div>
    );
  }

  if (hasSubjects) {
    return (
      <div className="my-8 px-5 text-xs transition-all space-y-4">
        {filteredSubjects.map((subject) => (
          <Link key={subject.id} to={`/subject/${subject.subject_id}`}>
            <div
              className="group relative flex flex-col justify-between w-full p-2 min-h-[100px] rounded-l-lg rounded-r-lg border-l-4 border-r-4
                            border-l-blue-500/80 border-r-purple-500/70
                            duration-300 hover:translate-x-1 hover:-translate-y-1
                            hover:border-l-blue-500/90 hover:border-r-purple-500/90
                            hover:cursor-pointer"
            >
              <div className="z-10 flex items-center gap-2 text-white">
                <div className="flex items-center gap-3 px-2 bg-blue-500/80 rounded-2xl">
                  <GraduationCap />
                  {subject.subject_id} — {subject.subject_name}
                </div>
              </div>

              <div className="z-10 flex justify-between mt-2">
                <div className="px-2 py-1 text-white bg-emerald-500/70 rounded-2xl">
                  👨‍🏫 อ. {subject.teacher_name}
                </div>
                <div className="px-2 py-1 text-white bg-orange-500/70 rounded-2xl">
                  ⏰ {subject.time_start}น. - {subject.time_end}น.
                </div>
                <div className="px-2 py-1 text-white bg-purple-500/70 rounded-2xl">
                  🏫 ห้องเรียน {subject.room}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    );
  }

  return <div className="min-h-[162px]" />;
}

export default TableData;
