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
import { SelectHomePageDetail } from "@/db/schemas";
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
  handleClickIsActive: (item: boolean, id: string) => void;
}) {
  return (
    <div className="w-full overflow-x-auto">
      <Table className=" min-w-[900px] ">
        <TableHeader className=" ">
          <TableRow className=" bg-main hover:bg-main ">
            <TableHead className="text-white font-bold text-base ">
              หัวข้อเนื้อหาที่ 1
            </TableHead>
            <TableHead className="text-white font-bold text-base">
              รายละเอียดเนื้อหาที่ 1
            </TableHead>
            <TableHead className="text-white font-bold text-base">
              รายละเอียดเนื้อหาที่ 2
            </TableHead>
            <TableHead className="text-right w-20 sticky right-0 z-10  bg-main"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows &&
            rows?.length > 0 &&
            rows.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium ">
                  <div className=" text-overflow-line-clamp-3">
                    {item.content_01_title}
                  </div>
                </TableCell>
                <TableCell className="font-medium">
                  <div className=" text-overflow-line-clamp-3">
                    {item.content_01_detail}
                  </div>
                </TableCell>
                <TableCell className="font-medium">
                  <div className=" text-overflow-line-clamp-3">
                    {item.content_02_detail}
                  </div>
                </TableCell>
                <TableCell
                  className="text-right flex gap-4 sticky right-0 z-10 bg-white h-[76.5px]"
                  style={{
                    boxShadow: "rgba(33, 35, 38, 0.1) -10px 0px 10px -5px",
                  }}
                >
                  <ToggleAdmin
                    disabled={item.is_active ? true : false}
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
