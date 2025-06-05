import { useRef, useState } from "react";
import TableData from "./TableData";
import { useSubject } from "../hooks/admin/useSubject";
function TableSchedule() {
  const {subjects, loading} = useSubject();
  const timeSlots: string[] = [
    "DAY",
    "8:00 AM - 9:00 AM",
    "9:00 AM - 10:00 AM",
    "10:00 AM - 11:00 AM",
    "11:00 AM - 12:00 PM",
    "12:00 PM - 1:00 PM",
    "1:00 PM - 2:00 PM",
    "2:00 PM - 3:00 PM",
    "3:00 PM - 4:30 PM",
  ];

  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (scrollRef.current?.offsetLeft || 0));
    setScrollLeft(scrollRef.current?.scrollLeft || 0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (scrollRef.current?.offsetLeft || 0);
    const walk = x - startX;
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  return (
      <div
        ref={scrollRef}
        className={`w-full overflow-x-auto h-full cursor-${
          isDragging ? "grabbing" : "grab"
        } active:cursor-grabbing`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        <table className="min-w-max  w-full">
          <thead>
            <tr className="text-sm max-sm:text-xs">
              {timeSlots.map((slot, index) => (
                <th key={index} className="p-2 text-center font-medium">
                  {slot}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="w-full  text-center text-sm max-sm:text-xs font-medium">
            {/* MONDAY */}
            <tr>
              <td >Monday</td>
              {/* จันทร์เช้า */}
              <td colSpan={4}>
                <TableData study_day="MON" period="MORNING" subjects={subjects} subjectLoading={loading} />
              </td>
              <td > Lunch break</td>
              {/* จันทร์บ่าย */}
              <td colSpan={3}>
                <TableData study_day="MON" period="AFTERNOON" subjects={subjects} subjectLoading={loading}/>
              </td>
            </tr>

            {/* TUESDAY */}
            <tr>
              <td>Tuesday</td>
              {/* อังคารเช้า */}
              <td colSpan={4}>
                <TableData study_day="TUE" period="MORNING" subjects={subjects} subjectLoading={loading}/>
              </td>
              <td >Lunch break</td>
              {/* อังคารบ่าย */}
              <td colSpan={3}>
                <TableData study_day="TUE" period="AFTERNOON" subjects={subjects} subjectLoading={loading}/>
              </td>
            </tr>
            {/* WEDNESDAY */}
            <tr>
              <td>Wednesday</td>
              {/* พุธเช้า */}
              <td colSpan={4}>
                <TableData study_day="WED" period="MORNING" subjects={subjects} subjectLoading={loading}/>
              </td>
              <td >Lunch break</td>
              {/* พุธบ่าย */}
              <td colSpan={3}>
                <TableData study_day="WED" period="AFTERNOON" subjects={subjects} subjectLoading={loading}/>
              </td>
            </tr>
            {/* THURSDAY */}
            <tr>
              <td>Thursday</td>
              {/* พฤหัสเช้า */}
              <td colSpan={4}>
                <TableData study_day="THU" period="MORNING" subjects={subjects} subjectLoading={loading}/>
              </td>
              <td >Lunch break</td>
              {/* พฤหัสบ่าย */}
              <td colSpan={3}>
                <TableData study_day="THU" period="AFTERNOON" subjects={subjects} subjectLoading={loading}/>
              </td>
            </tr>
            {/* FRIDAY */}
            <tr>
              <td>Friday</td>
              {/* ศุกร์เช้า */}
              <td colSpan={4}>
                <TableData study_day="FRI" period="MORNING" subjects={subjects} subjectLoading={loading}/>
              </td>
              <td >Lunch break</td>
              {/* ศุกร์บ่าย */}
              <td colSpan={3}>
                <TableData study_day="FRI" period="AFTERNOON" subjects={subjects} subjectLoading={loading}/>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
  );
}

export default TableSchedule;
