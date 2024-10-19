import { Flex } from "@radix-ui/themes";
import {
  getOtherProductsByCategoryId,
  getProductsById,
} from "@/services/product";
import { redirect } from "next/navigation";
import HeaderProduct from "./components/headerProduct";
import OtherImage from "./components/otherImage";
import ContentProduct from "./components/contentProduct";

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await getProductsById(params.slug);

  if (!product) {
    redirect("/");
  }

  const otherProducts = await getOtherProductsByCategoryId(
    product.category_id,
    params.slug
  );
  return (
    <Flex width={"100%"} justify={"center"}>
      <Flex
        width={"100%"}
        direction={"column"}
        align={"center"}
        p={"4"}
        gap={"4"}
        className=" max-w-desktop"
      >
        <HeaderProduct
          name={product.name}
          address={product.address}
          image_url={product.main_image}
        />
        <OtherImage otherImage={product.others_image?.split(",")} />
        <ContentProduct product={product} otherProducts={otherProducts} />
      </Flex>
    </Flex>
  );
}
