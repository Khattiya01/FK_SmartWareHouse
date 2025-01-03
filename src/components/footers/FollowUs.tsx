import { SelectContact } from "@/db/schemas";
import { getLogosIsActived } from "@/services/logo";
import { Box, Flex, Text } from "@radix-ui/themes";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaFacebookF, FaLine, FaTiktok } from "react-icons/fa";

const FollowUs = async ({
  contact,
}: {
  contact: SelectContact | undefined;
}) => {
  const responseLogos = await getLogosIsActived();
  const logoURL =
    responseLogos && responseLogos?.length > 0
      ? responseLogos[0].image_url ?? "logo_sr_estate2.webp"
      : "logo_sr_estate2.webp";

  return (
    <Flex gap={"4"} direction={"column"} align={"center"}>
      <Flex direction={"column"} gap={"4"} align={"center"}>
        <Text className=" font-bold">ติดตาม </Text>
        <Flex gap={"2"}>
          <Link
            href={contact?.facebook_url ?? "https://facebook.com"}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebookF size={"26px"} color="blue" />
          </Link>
          <Link
            href={contact?.line_url ?? "https://facebook.com"}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLine size={"28px"} color="green" />
          </Link>
          <Link
            href={contact?.tiktok_url ?? "https://facebook.com"}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTiktok size={"28px"} color="black" />
          </Link>
        </Flex>
      </Flex>
      <Link href={"/"}>
        <Flex className="h-full" align={"center"}>
          <Box className="relative w-[240px] h-[48px] ">
            <Image
              src={`/api/serve-file?filename=${logoURL}`}
              alt="logo-main-website"
              layout="fill"
              objectFit="cover"
              className="hover:cursor-pointer hover:opacity-60 opacity-100 transition ease-in-out duration-300 "
            />
          </Box>
        </Flex>
      </Link>
    </Flex>
  );
};

export default FollowUs;
