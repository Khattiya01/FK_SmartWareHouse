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
      className=" relative h-[270px] sm:h-[314px] max-h-[314px] overflow-hidden"
    >
      <Image
        src={image ? `/api/serve-file?filename=${image}` : "/images/d11.jpeg"}
        alt="d5"
        layout="fill"
        objectFit="cover"
        priority
        className=" brightness-75"
      />
      <Flex
        className="  absolute  cursor-pointer"
        direction={"column"}
        align={"center"}
      >
        <Text className=" text-4xl sm:text-6xl font-bold  text-white">
          {name}
        </Text>
      </Flex>
    </Flex>
  );
};

export default CardBanner;
