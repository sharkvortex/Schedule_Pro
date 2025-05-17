interface ThaiDateProps {
  date: string | Date | number; 
  fullMonth?: boolean; 
  buddhistYear?: boolean; 
  shortYear?: boolean; 
}

const ThaiDate: React.FC<ThaiDateProps> = ({
  date,
  fullMonth = false,
  buddhistYear = true,
  shortYear = true,
}) => {
  const dateObj = new Date(date);

  const monthNamesShort = [
    "ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.",
    "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค.",
  ];

  const monthNamesFull = [
    "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
    "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม",
  ];

  const day = dateObj.getDate();
  const month = dateObj.getMonth();
  const year = dateObj.getFullYear();

  let displayYear = year;
  if (buddhistYear) displayYear += 543;
  if (shortYear) displayYear = displayYear % 100;

  return (
    <span>
      {day} {fullMonth ? monthNamesFull[month] : monthNamesShort[month]} {displayYear}
    </span>
  );
};

export default ThaiDate;
