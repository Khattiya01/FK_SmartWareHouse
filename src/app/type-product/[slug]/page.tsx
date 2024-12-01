import { Flex } from "@radix-ui/themes";
import ContentCategory from "./components/contentCategory";
import CardBanner from "@/components/cards/CardBanner";
import { getCategoryByName, getCategoryIsActive } from "@/services/category";
import { getProductsByCategoryIdAndTypeProductIsActive } from "@/services/product";
import { redirect } from "next/navigation";
import {
  getTypeProductByName,
  getTypeProductIsActive,
} from "@/services/typeProduct";

export const revalidate = 3600;

export async function generateStaticParams() {
  const category = await getCategoryIsActive();
  const typeProduct = await getTypeProductIsActive();

  const response = category.flatMap((itemC) =>
    typeProduct.map((itemT) => ({
      slug: itemT.name + "?category=" + itemC.name,
    }))
  );

  return response;
}
// export async function generateStaticParams() {
//   const categories = await getCategoryIsActive();
//   const typeProducts = await getTypeProductIsActive();

//   // Create combinations of type product slugs and categories for paths
//   const paths = [];
//   for (const category of categories) {
//     for (const typeProduct of typeProducts) {
//       paths.push({
//         params: { slug: typeProduct.name },
//         searchParams: { category: category.name },
//       });
//     }
//   }

//   return paths;
// }

export async function generateMetadata({
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

  return {
    title: typeProductByName?.name + "/" + categoryByName?.name,
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
