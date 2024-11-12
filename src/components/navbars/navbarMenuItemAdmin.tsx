"use client";

import { ROLE } from "@/types/role";
import { Flex, Text } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const NavbarMenuItemAdmin = () => {
  const { data: session } = useSession();
  if (
    session &&
    (session.user.role === ROLE[0] || session.user.role === ROLE[1])
  ) {
    const pathName = session.user.role === ROLE[0] ? "/admin/manage-home-detail" : "/admin/manage-product";
    return (
      <Link href={pathName} className=" h-full">
        <Flex
          className=" cursor-pointer hover:text-blue-500 h-full px-2"
          align={"center"}
        >
          <Text>ADMIN</Text>
        </Flex>
      </Link>
    );
  } else return null;
};

export default NavbarMenuItemAdmin;
