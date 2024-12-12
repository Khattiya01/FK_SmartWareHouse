"use client";

import { Box, Flex } from "@radix-ui/themes";
import { ReactNode, useState } from "react";

export const NavbarListMenuItems = (props: {
  name: ReactNode;
  iconRight?: ReactNode;
  otherListMenuItems?: ReactNode;
}) => {
  const { name, iconRight, otherListMenuItems } = props;

  const [showDetail, setShowDetail] = useState<boolean>(false);

  return (
    <Flex
      direction={"column"}
      onMouseEnter={() => setShowDetail(true)}
      onMouseLeave={() => setShowDetail(false)}
      onClick={() => setShowDetail(!showDetail)}
    >
      <Flex className=" cursor-pointer" justify={"between"} align={"center"}>
        <Box className=" py-2 text-black hover:text-blue-500 w-full ">{name}</Box>
        {iconRight}
      </Flex>

      {showDetail && <div className=" pl-2">{otherListMenuItems}</div>}
    </Flex>
  );
};
