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
import { SelectUser } from "@/db/schemas";
import { ROLE } from "@/types/role";
import { Badge } from "@radix-ui/themes";
import { MdModeEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";

export function TableUser({
  rows,
  handleClickEdit,
  handleOpenDialogDelete,
  handleClickIsActive,
}: {
  rows: SelectUser[] | undefined;
  handleClickEdit: (item: SelectUser) => void;
  handleOpenDialogDelete: (item: SelectUser) => void;
  handleClickIsActive: (item: boolean, id: string) => void;
}) {
  return (
    <Table className=" min-w-[400px]">
      <TableHeader>
        <TableRow className=" bg-main hover:bg-main ">
          <TableHead className="text-white font-bold text-base">
            ชื่อผู้ใช้งาน
          </TableHead>
          <TableHead className="text-white font-bold text-base">
            อีเมล
          </TableHead>
          <TableHead className="text-white font-bold text-base w-20 ">
            บทบาท
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
              <TableCell className="font-medium">{item.username}</TableCell>
              <TableCell className="font-medium">{item.email}</TableCell>
              <TableCell className="font-medium">
                <Badge
                  variant="soft"
                  color={item.role === ROLE[0] ? "crimson" : "indigo"}
                >
                  {item.role}
                </Badge>
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
