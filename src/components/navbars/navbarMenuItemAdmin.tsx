"use client";

import { ROLE } from "@/types/role";
import { Flex, Text } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const NavbarMenuItemAdmin = (props: { title: string; href: string }) => {
  const { title, href } = props;
  const { data: session } = useSession();

  if (session && session.user.role === ROLE[0]) {
    return (
      <Link href={href} className=" h-full">
        <Flex
          className=" cursor-pointer hover:text-blue-500 h-full px-2"
          align={"center"}
        >
          <Text>{title}</Text>
        </Flex>
      </Link>
    );
  } else return null;
};

export default NavbarMenuItemAdmin;
