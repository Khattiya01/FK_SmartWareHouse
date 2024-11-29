import { SelectProductIncludeCategoryAndTypeProduct } from "@/db/schemas";
import { Box, Flex, Text } from "@radix-ui/themes";
import Image from "next/image";
import Link from "next/link";

const CardProductItem = (props: {
  product: SelectProductIncludeCategoryAndTypeProduct;
}) => {
  const { product } = props;
  return (
    <Link href={`/product/${product?.product_id}`}>
      <Flex
        width={"100%"}
        height={"100%"}
        minHeight={"280px"}
        maxHeight={"420px"}
        maxWidth={"341.33px"}
        minWidth={"330px"}
        direction={"column"}
        className="  rounded-md overflow-hidden"
        style={{ boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}
      >
        <Box className="relative w-full h-[200px] ">
          <Image
            src={
              product.main_image
                ? `/api/serve-file?filename=${product.main_image}`
                : "/images/d7.jpg"
            }
            alt="d7.jpg"
            layout="fill"
            objectFit="cover"
            priority
            className="cursor-pointer hover:scale-105 transform duration-300"
          />
        </Box>
        {/* <Box className="relative w-full h-[60%]">
          <Image
            src={product.main_image ?? "/images/d7.jpg"}
            alt="d7.jpg"
            layout="fill"
            objectFit="cover"
            className="cursor-pointer hover:scale-105 transform duration-300"
          />
        </Box> */}

        <Flex direction={"column"} gap={"2"} p={"4"}>
          <Text className=" text-blue-600 font-medium cursor-pointer">
            {product.typeProduct?.name}
          </Text>
          <Text className=" font-medium cursor-pointer h-12 text-overflow-line-clamp-2">
            {product.name ?? "-"}
          </Text>
          {/* <Box>
            <Badge color="green">
              <Text className="  font-bold cursor-pointer">
                {product.product_id}
              </Text>
            </Badge>
          </Box> */}
          <Text className=" sm:text-sm text-xs text-overflow-line-clamp-1 ">
            {product.address ?? "-"}
          </Text>
        </Flex>
      </Flex>
    </Link>
  );
};
export default CardProductItem;
