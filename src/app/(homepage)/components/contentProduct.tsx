import { Box, Flex, Tabs } from "@radix-ui/themes";
import React from "react";
import ProductDetail from "./productDetail";
import { SelectCategoryIncludeProduct } from "@/db/schemas";

const ContentProduct = (props: {
  category: SelectCategoryIncludeProduct[];
}) => {
  const { category } = props;
  let defaultCategory = "";
  if (category && category?.length > 0) {
    defaultCategory = category[0].name;
  }

  return (
    <Flex justify={"center"} mb={"4"}>
      <Tabs.Root
        className="p-4 TabsRoot max-w-desktop w-full"
        defaultValue={defaultCategory}
      >
        <Tabs.List className="TabsList">
          {category &&
            category?.length > 0 &&
            category?.map((item) => (
              <Tabs.Trigger
                key={item.id}
                className="TabsTrigger"
                value={item.name}
              >
                {item.name}
              </Tabs.Trigger>
            ))}
        </Tabs.List>

        <Box p="3">
          {category &&
            category?.length > 0 &&
            category?.map((item) => (
              <Tabs.Content
                key={item.id}
                className="TabsContent"
                value={item.name}
              >
                <ProductDetail products={item.products} />
              </Tabs.Content>
            ))}
        </Box>
      </Tabs.Root>
    </Flex>
  );
};

export default ContentProduct;
