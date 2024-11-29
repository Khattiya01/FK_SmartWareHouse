import CardProductItem from "@/components/cards/cardProductItem";
import { SelectProductIncludeCategoryAndTypeProduct } from "@/db/schemas";
import { Flex, Grid } from "@radix-ui/themes";
import React from "react";

const ContentCategory = ({
  products,
}: {
  products: SelectProductIncludeCategoryAndTypeProduct[];
}) => {
  return (
    <Flex justify={"center"} p={"4"}>
      <Grid
        columns={{ initial: "1", sm: "2", md: "3" }}
        width="100%"
        className="max-w-desktop"
        gap={"4"}
      >
        {products.map((item) => (
          <CardProductItem key={item.id} product={item} />
        ))}
      </Grid>
    </Flex>
  );
};

export default ContentCategory;
