import { Text, Flex, Box, Badge } from "@radix-ui/themes";
import Image from "next/image";
import React from "react";

const HeaderProduct = (props: {
  name: string;
  address: string | null;
  image_url: string | null;
  product_id: string | null;
  categoryName: string | undefined;
  typeProductName: string | undefined;
}) => {
  const {
    name,
    address,
    image_url,
    product_id,
    categoryName,
    typeProductName,
  } = props;
  return (
    <Flex direction={"column"} width={"100%"} gap={"4"}>
      <Flex direction={"column"} gap={"2"}>
        <Text className=" text-[30px] font-bold text-wrap">{name ?? "-"}</Text>
        <Box>
          <Badge color="green" size={"3"}>
            <Text className="  font-bold ">{product_id}</Text>
          </Badge>
        </Box>
        <Box>
          <Text>{address ?? "-"}</Text>
        </Box>
        <Flex gap={"4"}>
          <Box className=" bg-blue-100 px-2 py-1 rounded-md">
            <Text className=" text-blue-600 font-medium">
              {typeProductName}
            </Text>
          </Box>
          <Box className=" bg-blue-100 px-2 py-1 rounded-md">
            <Text className=" text-blue-600 font-medium ">{categoryName}</Text>
          </Box>
        </Flex>
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
          src={
            image_url
              ? `/api/serve-file?filename=${image_url}`
              : "/images/d11.jpeg"
          }
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
