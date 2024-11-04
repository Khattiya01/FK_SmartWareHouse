"use client";

import { SelectCategory } from "@/db/schemas";
import { Box, Flex, Link, Text } from "@radix-ui/themes";
import { ReactNode, useState } from "react";
import { FaAngleDown } from "react-icons/fa";

const MenuItem = (props: {
  name: ReactNode;
  iconRight?: ReactNode;
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
  otherListMenuItems?: ReactNode;
  onClick: () => void;
}) => {
  const {
    name,
    iconRight,
    onMouseEnter,
    onMouseLeave,
    otherListMenuItems,
    onClick,
  } = props;

  return (
    <Flex
      direction={"column"}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      <Flex className=" cursor-pointer" justify={"between"} align={"center"}>
        <Box className=" py-2 text-white hover:text-blue-500 ">{name}</Box>
        {iconRight}
      </Flex>
      {otherListMenuItems}
    </Flex>
  );
};

const LinkItem = ({ name, href }: { name: string; href: string }) => {
  return (
    <Link style={{ textDecoration: "none" }} href={href}>
      <Text className="  text-white hover:text-blue-500">{name} </Text>
    </Link>
  );
};

export const ListMenu = (props: { category: SelectCategory[] }) => {
  const { category } = props;
  const [showDetail, setShowDetail] = useState<boolean>(false);

  return (
    <Flex direction={"column"}>
      <MenuItem
        name={<LinkItem name={"หน้าแรก"} href={"/"} />}
        onClick={() => {}}
      />
      <hr />
      <MenuItem
        name={"อสังหาริมทรัพย์"}
        iconRight={<FaAngleDown className=" text-white" />}
        onMouseEnter={() => setShowDetail(true)}
        onMouseLeave={() => setShowDetail(false)}
        otherListMenuItems={
          showDetail && (
            <>
              {category &&
                category?.length > 0 &&
                category?.map((item) => (
                  <MenuItem
                    key={item.id}
                    name={
                      <LinkItem
                        name={item.name}
                        href={`/category/${item.name}`}
                      />
                    }
                    onClick={() => {}}
                  />
                ))}
            </>
          )
        }
        onClick={() => setShowDetail(!showDetail)}
      />

      <hr />
      <MenuItem
        name={<LinkItem name={"ติดต่อเรา"} href={"/contact"} />}
        onClick={() => {}}
      />
    </Flex>
  );
};
