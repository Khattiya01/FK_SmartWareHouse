import { Flex, Text } from "@radix-ui/themes";
import Image from "next/image";
import React from "react";

const CardBanner = (props: { name: string; image: string | undefined }) => {
  const { name, image } = props;
  return (
    <Flex
      direction={"column"}
      align={"center"}
      justify={"center"}
      gap={"4"}
      width={"100%"}
      className=" relative h-[314px] overflow-hidden"
    >
      <Image
        src={image ?? "/images/d11.jpeg"}
        alt="d5"
        width={100}
        height={314}
        sizes="100%"
        objectFit="cover"
        className=" w-full h-[100%] sm:h-auto"
      />
      <Flex
        className="  absolute  cursor-pointer"
        direction={"column"}
        align={"center"}
      >
        <Text className=" text-6xl font-bold  text-white">{name}</Text>
      </Flex>
    </Flex>
  );
};

export default CardBanner;
