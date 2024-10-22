import { Box, Flex, HoverCard, Text } from "@radix-ui/themes";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaAngleDown } from "react-icons/fa";
import { NavbarMenuMobile } from "./navbarMenuMobile";
import { getLogosIsActived } from "@/services/logo";
import { getCategory } from "@/services/category";

const NavbarMenuItem = (props: { title: string; href: string }) => {
  const { title, href } = props;
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
};

const NavbarMenuItemList = async () => {
  const responseGetCategory = await getCategory();

  const ListMenuNavbar = ({ title, href }: { title: string; href: string }) => {
    return (
      <Link href={href} className=" py-2 hover:text-blue-500 cursor-pointer">
        {title}
      </Link>
    );
  };
  return (
    <HoverCard.Root>
      <HoverCard.Trigger>
        <Flex
          className=" cursor-pointer hover:text-blue-500 w-[172px]"
          justify={"center"}
          align={"center"}
          gap={"2"}
        >
          <Text>อสังหาริมทรัพย์</Text>
          <FaAngleDown />
        </Flex>
      </HoverCard.Trigger>
      <HoverCard.Content maxWidth="300px">
        <Flex gap={"2"} direction={"column"} width={"140px"}>
          {responseGetCategory &&
            responseGetCategory?.length > 0 &&
            responseGetCategory?.map((item) => (
              <ListMenuNavbar
                key={item.id}
                title={item.name}
                href={`/category/${item.name}`}
              />
            ))}
        </Flex>
      </HoverCard.Content>
    </HoverCard.Root>
  );
};

const NavbarMenu = () => {
  return (
    <div className="sm:flex hidden items-center mr-8 text-white">
      <NavbarMenuItem title={"หน้าแรก"} href={"/"} />
      <NavbarMenuItemList />
      <NavbarMenuItem title={"ติดต่อเรา"} href={"/contact"} />
    </div>
  );
};

const MainNavbar = async () => {
  const responseLogos = await getLogosIsActived();
  const responseGetCategory = await getCategory();
  const logoURL =
    responseLogos && responseLogos?.length > 0
      ? responseLogos[0].image_url ?? "/images/logo_sr_estate2.jpg"
      : "/images/logo_sr_estate2.jpg";

  return (
    <Flex className=" h-[80px]  relative bg-main" justify={"center"}>
      <Flex
        className="w-full max-w-desktop "
        justify={"between"}
        style={{
          boxShadow:
            "rgba(27, 31, 35, 0.04) 0px 1px 0px, rgba(255, 255, 255, 0.25) 0px 1px 0px inset",
        }}
      >
        <Link href={"/"}>
          <Box className="relative w-[320px] h-[80px] ">
            <Image
              src={logoURL}
              alt="logo-main-website"
              layout="fill"
              objectFit="cover"
              className="hover:cursor-pointer hover:opacity-60 opacity-100 transition ease-in-out duration-300 "
            />
          </Box>
        </Link>

        {/* desktop menu */}
        <NavbarMenu />
        {/* mobile menu */}
        <NavbarMenuMobile category={responseGetCategory} />
      </Flex>
    </Flex>
  );
};

export default MainNavbar;
