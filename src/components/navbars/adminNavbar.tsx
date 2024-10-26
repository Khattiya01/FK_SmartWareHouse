import { getLogosIsActived } from "@/services/logo";
import { Avatar, Box, Flex, HoverCard, Link, Text } from "@radix-ui/themes";
import Image from "next/image";
import React from "react";
import { FaCaretDown } from "react-icons/fa";
import ListMenuNavbarProfile from "./listMenuNavbarProfile";

const NavbarProfileInfo = async () => {
  return (
    <HoverCard.Root>
      <HoverCard.Trigger>
        <Flex className=" text-white mr-8" align={"center"} gap={"4"}>
          <Box className=" relative">
            <Box className=" w-3 h-3 rounded-full bg-green-600 absolute border-white border-2 bottom-0 right-0"></Box>
            <Avatar
              src="/images/avatar2.png"
              fallback={"/images/avatar2.png"}
              size={"2"}
            />
          </Box>
          <Text>Admin</Text>
          <FaCaretDown />
        </Flex>
      </HoverCard.Trigger>
      <HoverCard.Content maxWidth="300px">
        <Flex gap={"2"} direction={"column"} width={"140px"}>
          <ListMenuNavbarProfile title={"ออกจากระบบ"} />
        </Flex>
      </HoverCard.Content>
    </HoverCard.Root>
  );
};

const AdminNavbar = async () => {
  const responseLogos = await getLogosIsActived();
  const logoURL =
    responseLogos && responseLogos?.length > 0
      ? responseLogos[0].image_url ?? "/images/logo_sr_estate2.jpg"
      : "/images/logo_sr_estate2.jpg";

  return (
    <Flex
      className="absolute w-screen top-0 h-[80px] shadow-navbar bg-main"
      justify={"center"}
    >
      <Flex
        className="w-full"
        justify={"between"}
        style={{
          boxShadow:
            "rgba(27, 31, 35, 0.04) 0px 1px 0px, rgba(255, 255, 255, 0.25) 0px 1px 0px inset",
        }}
      >
        <Link href={"/"}>
          <Box className=" overflow-hidden sm:w-[320px] w-[88px]">
            <Box className="relative w-[320px] h-[80px] ">
              <Image
                src={logoURL}
                alt="logo-main-website"
                layout="fill"
                objectFit="cover"
                className="hover:cursor-pointer hover:opacity-60 opacity-100 transition ease-in-out duration-300 "
              />
            </Box>
          </Box>
        </Link>
        <NavbarProfileInfo />
      </Flex>
    </Flex>
  );
};

export default AdminNavbar;
