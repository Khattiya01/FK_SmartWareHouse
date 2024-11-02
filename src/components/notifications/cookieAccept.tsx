"use client";

import useToastStore, { typeStatusTaost } from "@/hooks/useToastStore";
import React, { useEffect } from "react";
import ButtonDefault from "../buttons/buttonDefault";
import { Box, Text } from "@radix-ui/themes";
import Link from "next/link";

const CookieAccept = () => {
  const showToast = useToastStore((state) => state.show);
  const hideToast = useToastStore((state) => state.hide);

  useEffect(() => {
    const term = localStorage.getItem("term");
    if (term !== "true") {
      showToast(
        "",
        <Box className=" text-sm w-[240px] my-1">
          เราได้ปรับปรุงนโยบายการคุ้มครองข้อมูลส่วนบุคคลเพื่อปกป้องข้อมูลที่สำคัญของคุณ
          โปรดอ่านและทำความเข้าใจ
          <span>
            <Link href={"/privacy-policy"} className="text-sm text-[#C20000]">
              นโยบายความเป็นส่วนตัว
            </Link>
          </span>
          ของเราเพิ่มเติม หากท่านใช้งานเว็บไซต์ของเราต่อไป
          นั่นเป็นการแสดงว่าท่านยอมรับนโยบายการคุ้มครองข้อมูลส่วนบุคคลของเรา
          <ButtonDefault
            type="submit"
            width="208px"
            className=" mt-2 text-sm"
            onClick={() => {
              localStorage.setItem("term", "true");
              hideToast();
            }}
            isLoading={false}
          >
            <Text className=" text-base ">ยอมรับ</Text>
          </ButtonDefault>
        </Box>,
        new Date(),
        typeStatusTaost["notification-cookies"],
        100 * 1000
      );
    }
  }, []);
  return <></>;
};

export default CookieAccept;
