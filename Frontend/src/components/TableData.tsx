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
    if (!subjects) return [];
    return subjects.filter(
      (subject) => subject.study_day === study_day && subject.period === period
    );
  }, [subjects, study_day, period]);

  const isLoading = subjectLoading || !subjects;
  const hasSubjects = filteredSubjects.length > 0;

  if (isLoading) {
    return (
      <div
        className="h-[162px] px-5 flex items-center"
        aria-busy="true"
        aria-label="Loading subjects"
      >
        <div className="w-full h-[100px] p-2 rounded border border-gray-100/5 shadow animate-pulse flex flex-col justify-center space-y-2">
          <div className="h-4 w-1/2 rounded bg-gray-300/30" />
          <div className="h-3 w-1/3 rounded bg-gray-300/20" />
          <div className="h-3 w-2/3 rounded bg-gray-300/20" />
          <div className="h-3 w-1/4 rounded bg-gray-300/20" />
        </div>
      </div>
    );
  }

  if (!hasSubjects) {
    return <div className="min-h-[162px]" aria-live="polite" />;
  }

  return (
    <div className="my-8 px-5 text-xs space-y-4">
      {filteredSubjects.map((subject) => (
        <Link key={subject.id} to={`/subject/${subject.subject_id}`}>
          <article
            className="group relative flex flex-col justify-between w-full p-2 min-h-[100px] rounded-lg border-l-4 border-r-4
              border-l-blue-500/80 border-r-purple-500/70
              duration-300 transition-transform hover:translate-x-1 hover:-translate-y-1
              hover:border-l-blue-500/90 hover:border-r-purple-500/90 hover:cursor-pointer"
            aria-label={`${subject.subject_id} ${subject.subject_name}`}
          >
            <header className="z-10 flex items-center gap-2 text-white">
              <div className="flex items-center gap-3 px-2 bg-blue-500/80 rounded-2xl">
                <GraduationCap />
                {isLoading ? (
                  <div className="h-4 w-2/3 bg-gray-300/30 rounded animate-pulse" />
                ) : (
                  <span>
                    {subject.subject_id} — {subject.subject_name}
                  </span>
                )}
              </div>
            </header>

            <section className="z-10 flex justify-between mt-2 text-white">
              <div className="px-2 py-1 bg-emerald-500/70 rounded-2xl">
                👨‍🏫 อ. {subject.teacher_name}
              </div>
              <div className="px-2 py-1 bg-orange-500/70 rounded-2xl">
                ⏰ {subject.time_start}น. - {subject.time_end}น.
              </div>
              <div className="px-2 py-1 bg-purple-500/70 rounded-2xl">
                🏫 ห้องเรียน {subject.room}
              </div>
            </section>
          </article>
        </Link>
      ))}
    </div>
  );
}

export default TableData;
