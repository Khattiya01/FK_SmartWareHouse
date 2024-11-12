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
import { Selectlogo } from "@/db/schemas";
import { Box } from "@radix-ui/themes";
import Image from "next/image";
import { MdModeEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";

export function TableLogo({
  rows,
  handleClickEdit,
  handleOpenDialogDelete,
  handleClickIsActive,
}: {
  rows: Selectlogo[] | undefined;
  handleClickEdit: (item: Selectlogo) => void;
  handleOpenDialogDelete: (item: Selectlogo) => void;
  handleClickIsActive: (item: boolean, id: string) => void;
}) {
  return (
    <div className="w-full overflow-x-auto">
      <Table className=" min-w-[400px]">
        <TableHeader>
          <TableRow className=" bg-main hover:bg-main ">
            <TableHead className="text-white font-bold text-base">
              รูปโลโก้
            </TableHead>
            <TableHead className="text-right w-20 sticky right-0 z-10  bg-main"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows &&
            rows?.length > 0 &&
            rows.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">
                  <Box
                    style={{
                      borderRadius: "8px",
                      padding: "0px",
                      overflow: "hidden",
                    }}
                    className=" relative max-w-[200px] w-full h-[48px] "
                  >
                    <Image
                      src={`/api/serve-file?filename=${item.image_url}`}
                      alt="logo"
                      layout="fill"
                      objectFit="cover"
                    />
                  </Box>
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
