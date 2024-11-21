import { Flex } from "@radix-ui/themes";
import ContentCategory from "./components/contentCategory";
import CardBanner from "@/components/cards/CardBanner";
import { getCategoryByName, getCategoryIsActive } from "@/services/category";
import { getProductsByCategoryIdIsActive } from "@/services/product";
import { redirect } from "next/navigation";

export const revalidate = 3600;

export async function generateStaticParams() {
  const category = await getCategoryIsActive();

  return category.map((item) => ({
    id: item.name,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const categoryByName = await getCategoryByName(
    decodeURIComponent(params.slug)
  );

  return {
    title: categoryByName?.name,
    openGraph: {
      images: `/api/serve-file?filename=${categoryByName?.image_url}`,
    },
  };
}

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
