"use client";

import React, { useState } from "react";
import { Box, Text } from "@radix-ui/themes";
import { IoMdAdd } from "react-icons/io";
import ButtonDefault from "@/components/buttons/buttonDefault";
import DialogHomeDetail from "./dialogs/dialogAddHomeDetail";

const FieldCreate = () => {
  // const changeButtonName = () => {
  //   switch (manageName) {
  //     case "manage-home-detail":
  //       return "รายละเอียดหน้าแรก";
  //     case "manage-logo":
  //       return "โลโก้";
  //     case "manage-category":
  //       return "หมวดหมู่";
  //     case "manage-product":
  //       return "ผลิตภัณฑ์";
  //     case "manage-contact":
  //       return "การติดต่อ";
  //     case "manage-contact-form":
  //       return "แบบฟอร์มการติดต่อ";
  //     case "manage-users":
  //       return "ผู้ใช้";
  //     case "manage-privacy-policy":
  //       return "นโยบายและความเป็นส่วนตัว";
  //     default:
  //       return "รายละเอียดหน้าแรก";
  //   }
  // };

  const [openDailogCreateHomeDetail, setOpenDailogCreateHomeDetail] =
    useState<boolean>(false);

  const handleSuccessDailogCreate = () => {
    setOpenDailogCreateHomeDetail(false);
  };
  const handleCloseDailogCreate = () => {
    setOpenDailogCreateHomeDetail(false);
  };

  const handleOpenDailogCreate = () => {
    // switch (manageName) {
    // case "manage-home-detail":
    setOpenDailogCreateHomeDetail(true);
    //     break;
    //   case "manage-logo":
    //     break;
    //   case "manage-category":
    //     break;
    //   case "manage-product":
    //     break;
    //   case "manage-contact":
    //     break;
    //   case "manage-contact-form":
    //     break;
    //   case "manage-users":
    //     break;
    //   case "manage-privacy-policy":
    //     break;
    //   default:
    //     break;
    // }
  };

  return (
    <div>
      <Box style={{ width: "100%", display: "flex", justifyContent: "end" }}>
        <ButtonDefault onClick={handleOpenDailogCreate}>
          <IoMdAdd size={"20px"} />
          <Text>เพิ่ม รายละเอียดหน้าแรก</Text>
        </ButtonDefault>
      </Box>

      <DialogHomeDetail
        data={undefined}
        onSuccess={handleSuccessDailogCreate}
        onCancel={handleCloseDailogCreate}
        isOpen={openDailogCreateHomeDetail}
      />
    </div>
  );
};

export default FieldCreate;
