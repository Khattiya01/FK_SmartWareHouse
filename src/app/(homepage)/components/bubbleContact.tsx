"use client";

import { SelectContact } from "@/db/schemas";
import { Box, Flex, Text } from "@radix-ui/themes";
import Image from "next/image";
import Link from "next/link";
import React, { ReactNode, useState } from "react";
import { BsChatText } from "react-icons/bs";
import { IoClose } from "react-icons/io5";

const BubbleChat = ({
  open,
  contact,
}: {
  open: boolean;
  contact: SelectContact | undefined;
}) => {
  return (
    <Flex
      className={` z-50 absolute  top-[-140px] right-0 transition-transform duration-500  ${
        open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`}
      wrap={"wrap"}
      direction={"row-reverse"}
      gap={"2"}
    >
      <BubbleChatItems
        name={"Tiktok"}
        icon={
          <Image
            src={"/images/tiktok-logo.png"}
            alt="icon-messenger.png"
            width={28}
            height={28}
          />
        }
        href={contact?.tiktok_url ?? "https://www.tiktok.com/th-TH/"}
      />
      <BubbleChatItems
        name={"Line"}
        icon={
          <Image
            src={"/images/Line-Icon-Circle.png"}
            alt="Line-Icon-Circle.png"
            width={28}
            height={28}
          />
        }
        href={contact?.line_url ?? "https://facebook.com"}
      />
      <BubbleChatItems
        name={"Facebook"}
        icon={
          <Image
            src={"/images/facebook-icon.webp"}
            alt="facebook-icon.webp"
            width={28}
            height={28}
          />
        }
        href={contact?.facebook_url ?? "https://facebook.com"}
      />
    </Flex>
  );
};

const BubbleChatItems = ({
  name,
  icon,
  href,
}: {
  name: string;
  icon: ReactNode;
  href: string;
}) => {
  return (
    <Link
      href={href ?? "https://facebook.com"}
      target="_blank"
      rel="noopener noreferrer"
      className={`h-[36px] bg-white p-1 rounded-full cursor-pointer flex justify-end items-center`}
      style={{ boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}
    >
      <Text className=" px-2 mt-1">{name}</Text>
      <Box width={"28px"} height={"28px"}>
        {icon}
      </Box>
    </Link>
  );
};

const BubbleContact = ({ contact }: { contact: SelectContact | undefined }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [scale, setScale] = useState(100);

  const handleClick = () => {
    setScale(95);
    setTimeout(() => setScale(100), 100);
    setOpen(!open);
  };

  return (
    <div
      className={` z-50 w-[44px] h-[44px] rounded-full fixed bg-blue-600 bottom-5 right-5 flex justify-center items-center  duration-300`}
      style={{ transform: `scale(${scale / 100})` }}
    >
      <div className="w-full h-full relative">
        <BubbleChat open={open} contact={contact} />
        <div
          onClick={handleClick}
          className="w-full h-full relative flex justify-center items-center cursor-pointer"
        >
          <IoClose
            color="white"
            className={`absolute w-7 h-7 transition-all duration-300 ${
              open ? "scale-100 opacity-100" : "scale-0 opacity-0"
            }`}
          />
          <BsChatText
            color="white"
            className={`absolute w-7 h-7 transition-all duration-300 ${
              open ? "scale-0 opacity-0" : "scale-100 opacity-100"
            }`}
          />
        </div>
      </div>
    </div>
  );
};

export default BubbleContact;
