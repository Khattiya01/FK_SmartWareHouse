import { getLogosIsActived } from "@/services/logo";
import { Box, Flex, Link } from "@radix-ui/themes";
import Image from "next/image";
import React from "react";
import NavbarProfileInfo from "./navbarProfileInfo";

const AdminNavbar = async () => {
  const responseLogos = await getLogosIsActived();
  const logoURL =
    responseLogos && responseLogos?.length > 0
      ? responseLogos[0].image_url ?? "logo_sr_estate2.webp"
      : "logo_sr_estate2.webp";

  return (
    <Flex
      className="absolute w-screen top-0 h-[48px] shadow-navbar bg-main"
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
          <Flex className="h-full" align={"center"}>
            <Box>
              <Box className="relative w-[200px] h-[48px] ">
                <Image
                  src={`/api/serve-file?filename=${logoURL}`}
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
        <NavbarProfileInfo />
      </Flex>
    </Flex>
  );
};

export default AdminNavbar;
