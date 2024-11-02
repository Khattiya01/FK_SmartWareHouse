import { Flex, Grid, Text } from "@radix-ui/themes";
import React from "react";

import { ListMenu } from "./ListMenu";
import FollowUs from "./FollowUs";
import ContactInfo from "./ContactInfo";
import { getCategory } from "@/services/category";
import { getContactIsActive } from "@/services/contact";

const MainFooter = async () => {
  const responseGetCategory = await getCategory({page: "1", pageSize: "100000"});
  const contact = await getContactIsActive();

  return (
    <Flex direction={"column"}>
      <Flex justify={"center"} className=" bg-main  text-white text-[12px]">
        <Grid
          px={"8"}
          columns={{ sm: "2", md: "3" }}
          width="auto"
          className=" max-w-desktop"
          p={"3"}
          gap={"6"}
        >
          <Flex gap={"4"} direction={"column"} justify={"between"}>
            <ListMenu category={responseGetCategory.data}/>
          </Flex>
          <ContactInfo contact={contact}/>
          <FollowUs contact={contact}/>
        </Grid>
      </Flex>
      <Flex
        justify={"center"}
        pt={"2"}
        pb={"2"}
        className=" bg-[#f5f5f7] text-black"
      >
        <Text className=" sm:text-sm text-[12px]">© Copyright 2024 by FK-SWH.com</Text>
      </Flex>
    </Flex>
  );
};

export default MainFooter;
