import { Flex } from "@radix-ui/themes";
import ContentCategory from "./components/contentCategory";
import CardBanner from "@/components/cards/CardBanner";
import { getCategoryByName } from "@/services/category";
import { getProductsByCategoryIdIsActive } from "@/services/product";
import { redirect } from "next/navigation";

export default async function CategoryPage({
  params,
}: {
  params: { slug: string };
}) {
  const categoryByName = await getCategoryByName(
    decodeURIComponent(params.slug)
  );

  if (!categoryByName?.id) {
    redirect("/");
  }
  const products = await getProductsByCategoryIdIsActive(categoryByName?.id);
  return (
    <Flex width={"100%"} direction={"column"} align={"center"}>
      <CardBanner
        name={decodeURIComponent(params.slug)}
        image={categoryByName?.image_url}
      />
      <ContentCategory products={products} />
    </Flex>
  );
}
