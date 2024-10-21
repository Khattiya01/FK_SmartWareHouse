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
import { SelectProductIncludeCategory } from "@/db/schemas";
import { MdModeEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";

export function TableProduct({
  rows,
  handleClickEdit,
  handleOpenDialogDelete,
  handleClickIsActive,
}: {
  rows: SelectProductIncludeCategory[] | undefined;
  handleClickEdit: (item: SelectProductIncludeCategory) => void;
  handleOpenDialogDelete: (item: SelectProductIncludeCategory) => void;
  handleClickIsActive: (item: boolean, id: string) => void;
}) {
  return (
    <Table className=" min-w-[900px]">
      <TableHeader>
        <TableRow className=" bg-main hover:bg-main ">
          <TableHead className="text-white font-bold text-base w-36">
            รหัสผลิตภัณฑ์
          </TableHead>
          <TableHead className="text-white font-bold text-base w-52 ">
            ชื่อผลิตภัณฑ์
          </TableHead>
          <TableHead className="text-white font-bold text-base w-28">
            หมวดหมู่
          </TableHead>
          <TableHead className="text-white font-bold text-base">
            รายละเอียด
          </TableHead>
          <TableHead className="text-white font-bold text-base w-40">
            หมายเหตุ
          </TableHead>
          <TableHead className="text-white font-bold text-base"></TableHead>
          <TableHead className="text-right w-20"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows &&
          rows?.length > 0 &&
          rows.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.product_id}</TableCell>
              <TableCell className="font-medium">{item.name}</TableCell>
              <TableCell className="font-medium">
                {item?.category?.name}
              </TableCell>
              <TableCell className="font-medium">{item.description}</TableCell>
              <TableCell className="font-medium">{item.remark}</TableCell>
              <TableCell className="font-medium">
                <ToggleAdmin
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
