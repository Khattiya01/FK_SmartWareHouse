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
import { SelectprivacyAndPolicy } from "@/db/schemas";
import { MdModeEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";

export function TablePrivacyAndPolicy({
  rows,
  handleClickEdit,
  handleOpenDialogDelete,
  handleClickIsActive,
}: {
  rows: SelectprivacyAndPolicy[] | undefined;
  handleClickEdit: (item: SelectprivacyAndPolicy) => void;
  handleOpenDialogDelete: (item: SelectprivacyAndPolicy) => void;
  handleClickIsActive: (item: boolean, id: string) => void;
}) {
  return (
    <Table className=" min-w-[400px]">
      <TableHeader>
        <TableRow className=" bg-main hover:bg-main ">
          <TableHead className="text-white font-bold text-base">
            นโยบายและความเป็นส่วนตัว
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
              <TableCell className="font-medium">
                <div className="font-medium text-overflow-line-clamp-3 overflow-hidden h-[58px]">
                  {item.privacy_policy}
                </div>
              </TableCell>
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
