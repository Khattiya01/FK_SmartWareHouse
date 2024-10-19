import { Box, Flex, Text } from "@radix-ui/themes";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ContentContactUs = (props: {
  imageURL: string | undefined;
  lineID: string | null | undefined;
  line_url: string | null | undefined;
}) => {
  const { lineID, imageURL, line_url } = props;
  return (
    <Flex
      direction={"column"}
      align={"center"}
      justify={"center"}
      gap={"4"}
      className=" relative"
    >
      <Image
        src={imageURL ?? "/images/contact-us-flatlay.jpg"}
        alt="d5"
        width={100}
        height={100}
        sizes="100%"
        className=" w-full h-full max-h-[525px] filter brightness-50"
      />
      <Flex className="  absolute " direction={"column"} align={"center"}>
        <Text className=" text-[3vw] font-bold  text-white">ติดต่อเรา</Text>
        <Link
          href={line_url ?? "https://facebook.com"}
          target="_blank"
          rel="noopener noreferrer"
          className=" p-1 px-4 bg-green-700 rounded-md cursor-pointer"
        >
          <Text className=" text-[12px]   text-white">
            กดเพิ่มเพื่อน Line {lineID ?? "@FK-SWH.land"}
          </Text>
        </Link>
      </Flex>
    </Flex>
  );
};

export default ContentContactUs;
