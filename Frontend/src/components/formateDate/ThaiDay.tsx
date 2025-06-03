export const ThaiDay = (day: string | undefined): string => {
  const dayMap: Record<string, string> = {
    MON: "จันทร์",
    TUE: "อังคาร",
    WED: "พุธ",
    THU: "พฤหัสบดี",
    FRI: "ศุกร์",
    SAT: "เสาร์",
    SUN: "อาทิตย์",
  };

  if (!day) return "ไม่ทราบวัน";

  return dayMap[day.toUpperCase()] || "ไม่ทราบวัน";
};
