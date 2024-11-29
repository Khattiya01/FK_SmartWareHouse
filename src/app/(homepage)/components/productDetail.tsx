"use client";

import { Box } from "@radix-ui/themes";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import { Autoplay } from "swiper/modules";
import { FreeMode, Pagination } from "swiper/modules";
import CardProductItem from "@/components/cards/cardProductItem";
import { SelectProductIncludeCategoryAndTypeProduct } from "@/db/schemas";

const ProductDetail = (props: {
  products: SelectProductIncludeCategoryAndTypeProduct[];
}) => {
  const { products } = props;

  return (
    <Box width={"100%"} minHeight={"346px"}>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 30,
          },

          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
        modules={[FreeMode, Pagination, Autoplay]}
        className="mySwiper "
      >
        {products.map((item) => (
          <SwiperSlide key={item.id} className=" mb-2">
            <CardProductItem product={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default ProductDetail;
