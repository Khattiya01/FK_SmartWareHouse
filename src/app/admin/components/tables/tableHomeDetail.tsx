"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SelectHomePageDetail } from "@/db/schemas";
import { Checkbox } from "@radix-ui/themes";
import { MdModeEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";

export function TableHomeDetail({
  rows,
  handleClickEdit,
  handleOpenDialogDelete,
  handleClickIsActive,
}: {
  rows: SelectHomePageDetail[] | undefined;
  handleClickEdit: (item: SelectHomePageDetail) => void;
  handleOpenDialogDelete: (item: SelectHomePageDetail) => void;
  handleClickIsActive: (item: string | boolean, id: string) => void;
}) {
  return (
    <Table className=" min-w-[900px]">
      <TableHeader >
        <TableRow className=" bg-main hover:bg-main ">
          <TableHead className="text-white font-bold text-base w-10"></TableHead>
          <TableHead className="text-white font-bold text-base">
            หัวข้อเนื้อหาที่ 1
          </TableHead>
          <TableHead className="text-white font-bold text-base">
            รายละเอียดเนื้อหาที่ 1
          </TableHead>
          <TableHead className="text-white font-bold text-base">
            รายละเอียดเนื้อหาที่ 2
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
                <Checkbox
                  checked={item.is_active ? true : false}
                  onCheckedChange={(c) => handleClickIsActive(c, item.id)}
                />
              </TableCell>
              <TableCell className="font-medium">
                {item.content_01_title}
              </TableCell>
              <TableCell className="font-medium">
                {item.content_01_detail}
              </TableCell>
              <TableCell className="font-medium">
                {item.content_02_detail}
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
