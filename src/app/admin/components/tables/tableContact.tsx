"use client";

import ToggleAdmin from "@/components/toggle/toggleAdmin";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SelectContact } from "@/db/schemas";
import { MdModeEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);


export function TableContact({
  rows,
  handleClickEdit,
  handleOpenDialogDelete,
  handleClickIsActive,
}: {
  rows: SelectContact[] | undefined;
  handleClickEdit: (item: SelectContact) => void;
  handleOpenDialogDelete: (item: SelectContact) => void;
  handleClickIsActive: (item: boolean, id: string) => void;
}) {
  return (
    <Table className=" min-w-[900px]">
      <TableHeader>
        <TableRow className=" bg-main hover:bg-main ">
          <TableHead className="text-white font-bold text-base">
            ที่อยู่
          </TableHead>
          <TableHead className="text-white font-bold text-base w-40 ">
            หมายเลขโทรศัพท์
          </TableHead>
          <TableHead className="text-white font-bold text-base w-36">
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
                {dayjs(item.start_day_bs_hour).format("HH:mm")} - {dayjs(item.end_day_bs_hour).format("HH:mm")}
              </TableCell>
              <TableCell className="font-medium">
                <ToggleAdmin
                  disabled={item.is_active ? true : false}
                  checked={item.is_active ? true : false}
                  onCheckedChange={(c) => handleClickIsActive(c, item.id)}
                />
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
