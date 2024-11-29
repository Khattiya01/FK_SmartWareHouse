import { Flex } from "@radix-ui/themes";
import ContentCategory from "./components/contentCategory";
import CardBanner from "@/components/cards/CardBanner";
import { getCategoryByName, getCategoryIsActive } from "@/services/category";
import { getProductsByCategoryIdAndTypeProductIsActive } from "@/services/product";
import { redirect } from "next/navigation";
import { getTypeProductByName } from "@/services/typeProduct";

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

export default async function TypeProductPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string };
}) {
  const categoryByName = await getCategoryByName(
    decodeURIComponent(searchParams.category)
  );

  const typeProductByName = await getTypeProductByName(
    decodeURIComponent(params.slug)
  );

  console.log("typeProductByName", typeProductByName)
  if (!categoryByName?.id || !typeProductByName?.id) {
    redirect("/");
  }

  const products = await getProductsByCategoryIdAndTypeProductIsActive(
    categoryByName?.id,
    decodeURIComponent(typeProductByName.id)
  );

  return (
    <Flex width={"100%"} direction={"column"} align={"center"}>
      <CardBanner
        name={`${decodeURIComponent(params.slug)} ${decodeURIComponent(
          searchParams.category
        )}`}
        image={categoryByName?.image_url}
      />
      <ContentCategory products={products} />
    </Flex>
  );
}
