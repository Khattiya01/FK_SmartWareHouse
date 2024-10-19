import { Text, Flex, Box } from "@radix-ui/themes";
import Image from "next/image";
import React from "react";

const HeaderProduct = (props: {
  name: string;
  address: string | null;
  image_url: string | null;
}) => {
  const { name, address, image_url } = props;
  return (
    <Flex direction={"column"} width={"100%"} gap={"4"}>
      <Flex direction={"column"} gap={"2"}>
        <Text className=" text-[30px] font-bold text-wrap">{name?? "-"}</Text>
        <Box>
          <Text>{address?? "-"}</Text>
        </Box>
        <Box>
          <Text className=" text-blue-600 font-medium">โกดัง</Text>
        </Box>
        {/* <Box>
          <Badge color="green" size={"3"}>
            <Text className="  font-bold ">เปิดขาย</Text>
          </Badge>
        </Box> */}
      </Flex>
      <Flex
        direction={"column"}
        align={"center"}
        justify={"center"}
        gap={"4"}
        width={"100%"}
        className=" relative h-[280px] sm:h-[380px] overflow-hidden"
      >
        <Image
          src={image_url ?? "/images/d11.jpeg"}
          alt="d5"
          layout="fill"
          objectFit="cover"
          className="sm:h-auto"
        />
      </Flex>
    </Flex>
  );
};

export default HeaderProduct;
