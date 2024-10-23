"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SelectContact } from "@/db/schemas";
import dayjs from "dayjs";
import { MdModeEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";

export function TableContact({
  rows,
  handleClickEdit,
  handleOpenDialogDelete,
}: {
  rows: SelectContact[] | undefined;
  handleClickEdit: (item: SelectContact) => void;
  handleOpenDialogDelete: (item: SelectContact) => void;
}) {
  return (
    <Table className=" min-w-[900px]">
      <TableHeader>
        <TableRow className=" bg-main hover:bg-main ">
          <TableHead className="text-white font-bold text-base">
            ที่อยู่
          </TableHead>
          <TableHead className="text-white font-bold text-base">
            หมายเลขโทรศัพท์
          </TableHead>
          <TableHead className="text-white font-bold text-base">
            วัน - เวลาทำการ
          </TableHead>
          <TableHead className="text-white font-bold text-base w-16"></TableHead>
          <TableHead className="text-right w-20"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows &&
          rows?.length > 0 &&
          rows.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.address}</TableCell>
              <TableCell className="font-medium">{item.phone}</TableCell>
              <TableCell className="font-medium">
                {dayjs.utc(item.start_day_bs_hour).format("HH:mm")} -{" "}
                {dayjs.utc(item.end_day_bs_hour).format("HH:mm")}
              </TableCell>
              <TableCell className="text-right flex gap-4">
                <MdModeEdit
                  onClick={() => {
                    handleClickEdit(item);
                  }}
                  style={{
                    cursor: "pointer",
                    color: "#838b9b",
                    width: "20px",
                    height: "20px",
                  }}
                />
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
  );
}
