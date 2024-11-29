import { Box, Flex, Text } from "@radix-ui/themes";
import Image from "next/image";
import Link from "next/link";
import React, { ReactNode } from "react";
import { NavbarMenuMobile } from "./navbarMenuMobile";
import { getLogosIsActived } from "@/services/logo";
import { getCategory } from "@/services/category";
import NavbarMenuItemAdmin from "./navbarMenuItemAdmin";

import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { CaretDownIcon } from "@radix-ui/react-icons";
import { getTypeProduct } from "@/services/typeProduct";

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

const ListMenuNavbar = ({ title, href }: { title: string; href: string }) => {
  return (
    <Link
      href={href}
      className=" py-2 hover:text-blue-500 text-black cursor-pointer"
    >
      {title}
    </Link>
  );
};

const NavbarMenuItemList = async ({
  title,
  content,
  width,
}: {
  title: string;
  content: ReactNode;
  width?: string;
}) => {
  return (
    <NavigationMenu.Root className="relative z-10 ">
      <NavigationMenu.List className="center m-0 flex list-none rounded-md">
        <NavigationMenu.Item>
          <NavigationMenu.Trigger className="group flex select-none items-center justify-between gap-0.5 rounded px-3 py-2 text-[15px] font-medium leading-none text-violet11 outline-none hover:bg-violet3 focus:shadow-[0_0_0_2px] focus:shadow-violet7">
            <Flex
              className=" cursor-pointer hover:text-blue-500 "
              style={{ width: width ?? "142px" }}
              justify={"center"}
              align={"center"}
              gap={"2"}
            >
              <Text>{title}</Text>
            </Flex>
            <CaretDownIcon
              className="relative top-px text-violet10 transition-transform duration-[250] ease-in group-data-[state=open]:-rotate-180"
              aria-hidden
            />
          </NavigationMenu.Trigger>
          <NavigationMenu.Content className="absolute left-0 top-10 bg-white rounded-md py-3 px-3 w-[300px] max-w-[300px] data-[motion=from-end]:animate-enterFromRight data-[motion=from-start]:animate-enterFromLeft data-[motion=to-end]:animate-exitToRight data-[motion=to-start]:animate-exitToLeft sm:w-auto">
            <Flex gap={"2"} direction={"column"} width={"160px"}>
              {content}
            </Flex>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
};

const NavbarMenu = async () => {
  const responseGetTypeProduct = await getTypeProduct({
    page: " 1",
    pageSize: "10",
  });
  const responseGetCategory = await getCategory({
    page: "1",
    pageSize: "100000",
  });

  return (
    <div className="sm:flex hidden items-center mr-8 text-white">
      <NavbarMenuItem title={"หน้าแรก"} href={"/"} />
      {responseGetTypeProduct.data?.map((typeProduct) => (
        <NavbarMenuItemList
          key={typeProduct.id}
          title={typeProduct.name}
          content={
            responseGetCategory.data &&
            responseGetCategory.data?.length > 0 &&
            responseGetCategory.data?.map((category) => {
              return (
                <ListMenuNavbar
                  key={category.id}
                  title={category.name}
                  href={`/type-product/${typeProduct.name}?category=${category.name}`}
                />
              );
            })
          }
          width="auto"
        />
      ))}
      <NavbarMenuItemList
        title={"อสังหาริมทรัพย์"}
        content={
          responseGetCategory.data &&
          responseGetCategory.data?.length > 0 &&
          responseGetCategory.data?.map((item) => (
            <ListMenuNavbar
              key={item.id}
              title={item.name}
              href={`/category/${item.name}`}
            />
          ))
        }
        width="auto"
      />
      <NavbarMenuItem title={"ติดต่อเรา"} href={"/contact"} />
      <NavbarMenuItemAdmin />
    </div>
  );
};

const MainNavbar = async () => {
  const responseLogos = await getLogosIsActived();
  const responseGetCategory = await getCategory({
    page: "1",
    pageSize: "100000",
  });
  const logoURL =
    responseLogos && responseLogos?.length > 0
      ? `/api/serve-file?filename=${responseLogos[0].image_url}`
      : "logo_sr_estate2.webp";

  return (
    <Flex className=" h-[48px]  relative bg-main" justify={"center"}>
      <Flex
        className="w-full max-w-desktop "
        justify={"between"}
        style={{
          boxShadow:
            "rgba(27, 31, 35, 0.04) 0px 1px 0px, rgba(255, 255, 255, 0.25) 0px 1px 0px inset",
        }}
      >
        <Link href={"/"}>
          <Flex className="h-full" align={"center"}>
            <Box>
              <Box className="relative w-[200px] h-[48px] ">
                <Image
                  src={logoURL}
                  alt="logo-main-website"
                  layout="fill"
                  objectFit="cover"
                  priority
                  className="hover:cursor-pointer hover:opacity-60 opacity-100 transition ease-in-out duration-300 "
                />
              </Box>
            </Box>
          </Flex>
        </Link>

        {/* desktop menu */}
        <NavbarMenu />
        {/* mobile menu */}
        <NavbarMenuMobile category={responseGetCategory.data} />
      </Flex>
    </Flex>
  );
};

export default MainNavbar;
