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
        <Box className="  relative  w-full h-[379.33px] max-h-full sm:max-h-[379.33px]">
          <Image
            src={`/api/serve-file?filename=${src}`}
            alt="d5"
            layout="fill"
            objectFit="cover"
            priority
            className="filter brightness-50 hover:brightness-75 cursor-pointer transition-all duration-300"
          />
        </Box>
        <Flex
          className="  absolute  cursor-pointer"
          direction={"column"}
          align={"center"}
        >
          <Text className=" text-lg font-bold  text-white">{name}</Text>
          <Box className=" p-1 px-4 border-2">
            <Text className="sm:text-sm text-[12px] font-bold  text-white">
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
