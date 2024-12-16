"use client";

import { Box, Flex } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { ReactNode, useState } from "react";

export const NavbarListMenuItems = (props: {
  name: ReactNode;
  iconRight?: ReactNode;
  otherListMenuItems?: ReactNode;
  href?: string | undefined;
}) => {
  const { name, iconRight, otherListMenuItems, href } = props;

  const [showDetail, setShowDetail] = useState<boolean>(false);

  const router = useRouter();

  return (
    <Flex
      direction={"column"}
      // onMouseEnter={() => setShowDetail(true)}
      // onMouseLeave={() => setShowDetail(false)}
      onClick={() => {
        if (href) {
          router.push(href);
        }
      }}
    >
      <Flex className=" cursor-pointer" justify={"between"} align={"center"}>
        <Box className=" py-2 text-black hover:text-blue-500 w-full ">
          {name}
        </Box>
        <Box onClick={() => setShowDetail(!showDetail)}>{iconRight}</Box>
      </Flex>

      {showDetail && <div className=" pl-2">{otherListMenuItems}</div>}
    </Flex>
  );
};
