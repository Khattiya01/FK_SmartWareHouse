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

export function TableFormContact({
  rows,
  handleOpenDialogDelete,
}: {
  rows: SelectContactForm[] | undefined;
  handleOpenDialogDelete: (item: SelectContactForm) => void;
  handleClickIsActive: (item: string | boolean, id: string) => void;
}) {
  return (
    <Table className=" min-w-[900px]">
      <TableHeader>
        <TableRow className=" bg-main hover:bg-main ">
          <TableHead className="text-white font-bold text-base">วันที่</TableHead>
          <TableHead className="text-white font-bold text-base">ชื่อ</TableHead>
          <TableHead className="text-white font-bold text-base">
            อีเมล
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
          <TableHead className="text-right"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows &&
          rows?.length > 0 &&
          rows.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">
                {dayjs(item.created_at).format("DD/MM/YYYY HH:mm:ss")}
              </TableCell>
              <TableCell className="font-medium">{item.name}</TableCell>
              <TableCell className="font-medium">{item.email}</TableCell>
              <TableCell className="font-medium">{item.phone}</TableCell>
              <TableCell className="font-medium">{item.title}</TableCell>
              <TableCell className="font-medium">{item.message}</TableCell>
              <TableCell className="text-right flex gap-4">
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
