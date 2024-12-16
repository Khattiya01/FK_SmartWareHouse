"use client";

import { SelectCategory, SelectTypeProductIncludeProduct } from "@/db/schemas";
import { Box, Flex, Link } from "@radix-ui/themes";
import { ReactNode, useState } from "react";
import { FaAngleDown } from "react-icons/fa";

const MenuItem = (props: {
  name: ReactNode;
  iconRight?: ReactNode;
  otherListMenuItems?: ReactNode;
}) => {
  const { name, iconRight, otherListMenuItems } = props;

  const [showDetail, setShowDetail] = useState<boolean>(false);

  return (
    <Flex
      direction={"column"}
      // onMouseEnter={() => setShowDetail(true)}
      // onMouseLeave={() => setShowDetail(false)}
      // onClick={() => setShowDetail(!showDetail)}
    >
      <Flex className=" text-white hover:text-blue-500" justify={"between"} align={"center"}>
        <Box className="w-full py-2  ">
          {name}
        </Box>
        <Box onClick={() => setShowDetail(!showDetail)} className=" cursor-pointer">{iconRight}</Box>
      </Flex>

      {showDetail && <div className=" pl-2">{otherListMenuItems}</div>}
    </Flex>
  );
};

const LinkItem = ({ name, href }: { name: string; href: string }) => {
  return (
    <Link style={{ textDecoration: "none" }} href={href}>
      <Box className="w-full text-white hover:text-blue-500">{name}</Box>
    </Link>
  );
};

export const ListMenu = (props: {
  category: SelectCategory[];
  typeProduct: SelectTypeProductIncludeProduct[];
  isAdmin?: boolean | null;
}) => {
  const { category, isAdmin, typeProduct } = props;

  return (
    <Flex direction={"column"}>
      <MenuItem name={<LinkItem name={"หน้าแรก"} href={"/"} />} />
      <hr />
      {/* {typeProduct &&
        typeProduct?.length > 0 &&
        typeProduct.map((typeProduct) => (
          <>
            <MenuItem
              key={typeProduct.id}
              name={typeProduct.name}
              iconRight={<FaAngleDown className=" text-white" />}
              otherListMenuItems={
                category &&
                category?.length > 0 &&
                category?.map((item) => (
                  <MenuItem
                    key={item.id}
                    name={
                      <LinkItem
                        name={item.name}
                        href={`/type-product/${typeProduct.name}?category=${item.name}`}
                      />
                    }
                  />
                ))
              }
            />
            <hr />
          </>
        ))} */}
      <MenuItem
        name={"อสังหาริมทรัพย์"}
        iconRight={<FaAngleDown className=" text-white" />}
        otherListMenuItems={
          category &&
          category?.length > 0 &&
          category?.map((c) => (
            // <MenuItem
            //   key={item.id}
            //   name={
            //     <LinkItem name={item.name} href={`/category/${item.name}`} />
            //   }
            // />
            <MenuItem
              key={c.id}
              name={c.name}
              iconRight={<FaAngleDown className=" text-white" />}
              otherListMenuItems={
                typeProduct &&
                typeProduct?.length > 0 &&
                typeProduct?.map((t) => (
                  <MenuItem
                    key={t.id}
                    name={
                      <LinkItem
                        name={t.name}
                        href={`/type-product/${t.name}?category=${c.name}`}
                      />
                    }
                  />
                ))
              }
            />
          ))
        }
      />

      <hr />
      <MenuItem name={<LinkItem name={"ติดต่อเรา"} href={"/contact"} />} />
      {isAdmin && (
        <>
          <hr />
          <MenuItem name={<LinkItem name={"ADMIN"} href={"/admin"} />} />
        </>
      )}
    </Flex>
  );
};
