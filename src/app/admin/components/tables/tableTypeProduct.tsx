"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SelectTypeProduct } from "@/db/schemas";
import { MdModeEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";

export function TableTypeProduct({
  rows,
  handleClickEdit,
  handleOpenDialogDelete,
}: {
  rows: SelectTypeProduct[] | undefined;
  handleClickEdit: (item: SelectTypeProduct) => void;
  handleOpenDialogDelete: (item: SelectTypeProduct) => void;
}) {
  return (
    <div className="w-full overflow-x-auto">
      <Table className=" min-w-[900px]">
        <TableHeader>
          <TableRow className=" bg-main hover:bg-main ">
            <TableHead className="text-white font-bold text-base">
              ชื่อชนิดผลิตภัณฑ์
            </TableHead>
            <TableHead className="text-right w-20 sticky right-0 z-10  bg-main"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows &&
            rows?.length > 0 &&
            rows.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell
                  className="text-right flex gap-4 sticky right-0 z-10 bg-white h-[76.5px]"
                  style={{
                    boxShadow: "rgba(33, 35, 38, 0.1) -10px 0px 10px -5px",
                  }}
                >
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
