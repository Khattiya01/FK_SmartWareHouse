import { Box, Flex, Text } from "@radix-ui/themes";
import React from "react";

const ContentDetail1 = (props: {
  title: string | undefined;
  detail01: string | undefined;
}) => {
  const { title, detail01 } = props;
  return (
    <Flex justify={"center"} mt={"4"} p={"4"}>
      <Flex direction={"column"} className="w-full max-w-desktop">
        <Text className=" text-[32px] sm:text-[40px] font-bold">
          {title ?? " ขาย-ให้เช่า ที่ดินและอสังหาริมทรัพย์"}
        </Text>
        {/* <Text className=" text-[24px] sm:text-[32px] font-bold">
          ที่ดินและอสังหาริมทรัพย์
        </Text> */}
        <Box mt={"4"}>
          {detail01 ??
            "ที่ดิน-อสังหาริมทรัพย์ แปลงสวย ทำเลดี ในพื้นที่จังหวัดสงขลา-นนทบุรี ขาย และให้เช่าโดยเจ้าของ ไม่ผ่านนายหน้า"}
        </Box>
      </Flex>
    </Flex>
  );
};

export default ContentDetail1;
