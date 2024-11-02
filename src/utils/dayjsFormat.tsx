import dayjs from "dayjs";
import "dayjs/locale/th";
import buddhistEra from "dayjs/plugin/buddhistEra";

dayjs.extend(buddhistEra); // ใช้งาน buddhistEra plugin เพื่อแปลงเป็น พ.ศ.

/* 07 กุมภาพันธ์ 2566 */
export const DateLongTH = (
  date: string | number | Date | dayjs.Dayjs | null | undefined
) => {
  dayjs.locale("th");
  return dayjs(date).format("DD MMMM BBBB");
};

/* 07 ก.พ. 2566 */
export const DateShortTH = (
  date: string | number | Date | dayjs.Dayjs | null | undefined
) => {
  dayjs.locale("th");
  return dayjs(date).format("DD MMM BB");
};

/* 07 February 2023 */
export const DateLongEN = (
  date: string | number | Date | dayjs.Dayjs | null | undefined
) => {
  dayjs.locale("en");
  return dayjs(date).format("DD MMMM YYYY");
};

/* 07 Feb 23 */
export const DateShortEN = (
  date: string | number | Date | dayjs.Dayjs | null | undefined
) => {
  dayjs.locale("en");
  return dayjs(date).format("DD MMM YY");
};
