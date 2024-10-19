import { Box, Flex, Text } from "@radix-ui/themes";
import Image from "next/image";
import React from "react";

const ContentDetail2 = (props: {
  imageURL: string | undefined;
  detail: string | undefined;
}) => {
  const { detail, imageURL } = props;
  return (
    <Flex className=" bg-slate-100 " p={"4"} justify={"center"}>
      <Flex
        className="max-w-desktop w-full"
        direction={{ initial: "column", sm: "row" }}
      >
        <Box className=" sm:w-1/2 w-full h-full max-h-[427px]">
          <Image
            src={imageURL ?? "/images/d7.jpg"}
            alt="d5"
            width={350}
            height={350}
            sizes="100vw"
            className="w-full h-full "
          />
        </Box>
        <Text className="  sm:w-1/2 w-full pl-2 max-sm:pt-2">
          {detail ??
            "FIRSTKAS SMARTWAREHOUSE ขาย-ให้เช่าที่ดิน อสังหาริมทรัย์ ทำเลดี ใกล้ย่านธุรกิจสำคัญ หลากหลายทำเล ในพื้นที่จังหวัดสงขลา- นนทบุรี ทั้ง ที่ดินสำหรับการลงทุน ที่ดินเพื่อสร้างที่อยู่อาศัย อพาร์ทเม้นท์ โกดัง อสังหาริมทรัพย์ที่ต่อยอดธุรกิจได้ทันที"}
        </Text>
      </Flex>
    </Flex>
  );
};

export default ContentDetail2;
