import { useRef, useState } from "react";

function TableSchedule() {
  const days: string[] = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
  ];
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
    <div className="w-full h-full">
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
        <table className="min-w-[1400px] w-full h-full">
          <thead>
            <tr className="text-sm">
              {timeSlots.map((slot, index) => (
                <th key={index} className="p-2 text-center font-normal">
                  {slot}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-center text-sm">
            {days.map((day, i) => (
              <tr key={i}>
                <td>{day}</td>
                <td colSpan={4} className=""></td>
                <td>Lunch Break</td>
                <td colSpan={3} className=""></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TableSchedule;
