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
    <div className="w-full overflow-x-auto">
      <Table className=" min-w-[900px]">
        <TableHeader>
          <TableRow className=" bg-main hover:bg-main ">
            <TableHead className="text-white font-bold text-base w-72">
              รหัสผลิตภัณฑ์
            </TableHead>
            <TableHead className="text-white font-bold text-base w-52 ">
              ชื่อผลิตภัณฑ์
            </TableHead>
            <TableHead className="text-white font-bold text-base w-44">
              หมวดหมู่
            </TableHead>
            <TableHead className="text-white font-bold text-base">
              รายละเอียด
            </TableHead>
            <TableHead className="text-white font-bold text-base w-40">
              หมายเหตุ
            </TableHead>
            <TableHead className="text-right w-20 sticky right-0 z-10  bg-main"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows &&
            rows?.length > 0 &&
            rows.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.product_id}</TableCell>
                <TableCell className="font-medium">
                  <div className=" text-overflow-line-clamp-3">{item.name}</div>
                </TableCell>
                <TableCell className="font-medium">
                  {item?.category?.name}
                </TableCell>
                <TableCell className="font-medium">
                  <div className=" text-overflow-line-clamp-3">
                    {item.description}
                  </div>
                </TableCell>
                <TableCell className="font-medium">{item.remark}</TableCell>
                <TableCell
                  className="text-right flex gap-4 sticky right-0 z-10 bg-white h-[76.5px]"
                  style={{
                    boxShadow: "rgba(33, 35, 38, 0.1) -10px 0px 10px -5px",
                  }}
                >
                  <ToggleAdmin
                    checked={item.is_active ? true : false}
                    onCheckedChange={(c) => handleClickIsActive(c, item.id)}
                  />
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
    </div>
  );
}
