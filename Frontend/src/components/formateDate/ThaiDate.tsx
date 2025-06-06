interface ThaiDateProps {
  date: string | Date | number;
  fullMonth?: boolean;
  buddhistYear?: boolean;
  shortYear?: boolean;
}

export const ThaiDate = ({
  date,
  fullMonth = false,
  buddhistYear = true,
  shortYear = true,
}: ThaiDateProps): string => {
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

  const monthName = fullMonth ? monthNamesFull[month] : monthNamesShort[month];

  return `${day} ${monthName} ${displayYear}`;
};
