"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SelectCategory } from "@/db/schemas";
import { MdModeEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";

export function TableCategory({
  rows,
  handleClickEdit,
  handleOpenDialogDelete,
}: {
  rows: SelectCategory[] | undefined;
  handleClickEdit: (item: SelectCategory) => void;
  handleOpenDialogDelete: (item: SelectCategory) => void;
}) {
  return (
    <Table className=" min-w-[900px]">
      <TableHeader>
        <TableRow className=" bg-main hover:bg-main ">
          <TableHead className="text-white font-bold text-base">
            ชื่อหมวดหมู่ (คำย่อ)
          </TableHead>
          <TableHead className="text-white font-bold text-base">
            ชื่อหมวดหมู่
          </TableHead>
          <TableHead className="text-right w-20"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows &&
          rows?.length > 0 &&
          rows.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.abbreviation}</TableCell>
              <TableCell className="font-medium">{item.name}</TableCell>
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
