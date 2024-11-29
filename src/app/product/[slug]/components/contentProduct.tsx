import ProductDetail from "@/app/(homepage)/components/productDetail";
import { ContactItem } from "@/components/footers/ContactInfo";
import {
  SelectProductIncludeCategory,
  SelectProductIncludeCategoryAndTypeProduct,
} from "@/db/schemas";
import { Box, Flex, Text } from "@radix-ui/themes";
import Image from "next/image";
import React from "react";
import { CiMobile3 } from "react-icons/ci";
import { FiPhone } from "react-icons/fi";

const ContentProduct = (props: {
  product: SelectProductIncludeCategory;
  otherProducts: SelectProductIncludeCategoryAndTypeProduct[];
}) => {
  const { product, otherProducts } = props;
  return (
    <Flex width={"100%"} direction={"column"} gap={"4"}>
      <Text className=" text-[22px] font-bold">รายละเอียดประกาศ</Text>
      <div className=" grid grid-cols-3 gap-3">
        <Text className=" custom-pre col-span-3 sm:col-span-2">
          {product.description && product?.description != null
            ? product?.description
            : "-"}
        </Text>
        <Box className="col-span-3 sm:col-span-1">
          <Flex
            direction={"column"}
            gap={"2"}
            className=" sm:px-4 sm:pb-4 p-0"
            style={{
              boxShadow: "rgba(33, 35, 38, 0.1) 0px 10px 10px -10px",
            }}
          >
            <Text className=" text-[18px] font-bold ">ติดต่อผู้ขาย</Text>
            <ContactItem
              icon={<FiPhone size={"16px"} />}
              desc={product?.tel && product?.tel != null ? product?.tel : "-"}
            />
            <ContactItem
              icon={<CiMobile3 size={"16px"} />}
              desc={
                product?.phone && product?.phone != null ? product?.phone : "-"
              }
            />
          </Flex>
        </Box>
      </div>
      <Text className=" text-[22px] font-bold">รูปแผนที่</Text>
      <Box className="relative w-full h-[300px]">
        <Image
          src={
            product.map_image
              ? `/api/serve-file?filename=${product.map_image}`
              : "/images/map_company.png"
          }
          alt="map_company"
          layout="fill"
          objectFit="cover"
        />
      </Box>
      {otherProducts && otherProducts?.length > 0 && (
        <>
          <Text className=" text-[22px] font-bold">
            {product.category?.name}เพิ่มเติม
          </Text>
          <Box p="3">
            <ProductDetail products={otherProducts} />
          </Box>{" "}
        </>
      )}
    </Flex>
  );
};

export default ContentProduct;
