"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SelectContactForm } from "@/db/schemas";
import { RiDeleteBin6Line } from "react-icons/ri";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export function TableFormContact({
  rows,
  handleOpenDialogDelete,
}: {
  rows: SelectContactForm[] | undefined;
  handleOpenDialogDelete: (item: SelectContactForm) => void;
}) {
  return (
    <div className="w-full overflow-x-auto">
      <Table className=" min-w-[900px]">
        <TableHeader>
          <TableRow className=" bg-main hover:bg-main ">
            <TableHead className="text-white font-bold text-base">
              วันที่
            </TableHead>
            <TableHead className="text-white font-bold text-base">
              ชื่อ
            </TableHead>
            <TableHead className="text-white font-bold text-base">
              อีเมล
            </TableHead>
            <TableHead className="text-white font-bold text-base">
              ไลน์ไอดี
            </TableHead>
            <TableHead className="text-white font-bold text-base">
              เบอร์โทรศัพท์
            </TableHead>
            <TableHead className="text-white font-bold text-base">
              หัวข้อ
            </TableHead>
            <TableHead className="text-white font-bold text-base">
              ข้อความ
            </TableHead>
            <TableHead className="text-right w-20 sticky right-0 z-10  bg-main"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows &&
            rows?.length > 0 &&
            rows.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">
                  {dayjs.utc(item.created_at).format("DD/MM/YYYY HH:mm:ss")}
                </TableCell>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell className="font-medium">{item.email}</TableCell>
                <TableCell className="font-medium">{item.lineId}</TableCell>
                <TableCell className="font-medium">{item.phone}</TableCell>
                <TableCell className="font-medium">{item.title}</TableCell>
                <TableCell className="font-medium">{item.message}</TableCell>
                <TableCell
                  className="text-right flex gap-4 justify-end sticky right-0 z-10 bg-white h-[76.5px]"
                  style={{
                    boxShadow: "rgba(33, 35, 38, 0.1) -10px 0px 10px -5px",
                  }}
                >
                  <RiDeleteBin6Line
                    onClick={() => handleOpenDialogDelete(item)}
                    style={{
                      cursor: "pointer",
                      color: "#838b9b",
                      width: "20px",
                      height: "20px",
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
