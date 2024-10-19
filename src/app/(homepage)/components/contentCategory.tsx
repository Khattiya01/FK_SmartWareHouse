import { SelectCategoryIncludeProduct } from "@/db/schemas";
import { Box, Flex, Grid, Link, Text } from "@radix-ui/themes";
import Image from "next/image";
import React from "react";

const CategoryItem = (props: { name: string; src: string; href: string }) => {
  const { name, src, href } = props;
  return (
    <Link href={href}>
      <Flex
        direction={"column"}
        align={"center"}
        justify={"center"}
        gap={"4"}
        className=" relative  w-full h-full"
      >
        <Image
          src={src}
          alt="d5"
          width={100}
          height={100}
          sizes="100%"
          className=" w-full h-full max-h-full sm:max-h-[379.33px] filter brightness-50 hover:brightness-75 cursor-pointer transition-all duration-300"
        />
        <Flex
          className="  absolute  cursor-pointer"
          direction={"column"}
          align={"center"}
        >
          <Text className=" text-lg font-bold  text-white">{name}</Text>
          <Box className=" p-1 px-4 border-2">
            <Text className=" text-[12px] font-bold  text-white">
              ดูทั้งหมด
            </Text>
          </Box>
        </Flex>
      </Flex>
    </Link>
  );
};
const ContentCategory = (props: {
  category: SelectCategoryIncludeProduct[];
}) => {
  const { category } = props;
  return (
    <Flex justify={"center"}>
      <Grid
        columns={{ initial: "1", sm: "2" }}
        width="100%"
        className="max-w-desktop"
      >
        {category &&
          category?.length > 0 &&
          category?.map((item) => (
            <CategoryItem
              key={item.id}
              name={item.name}
              src={item.image_url}
              href={`/category/${item.name}`}
            />
          ))}
      </Grid>
    </Flex>
  );
};

export default ContentCategory;
