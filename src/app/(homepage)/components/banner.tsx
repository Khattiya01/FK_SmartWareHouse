"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/scrollbar";

import { Scrollbar } from "swiper/modules";
import { Autoplay } from "swiper/modules";

import Image from "next/image";
import { Box, Flex, Text } from "@radix-ui/themes";

const Banner = ({ imagesURL }: { imagesURL: string[] | undefined }) => {
  return (
    <Flex justify={"center"} align={"center"} className=" relative">
      <Box className=" w-full h-full max-h-[500px] overflow-hidden">
        <Swiper
          scrollbar={{
            hide: true,
          }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay, Scrollbar]}
          className="mySwiper max-h-[600px] h-full w-full relative"
        >
          {imagesURL &&
            imagesURL?.length > 0 &&
            imagesURL?.map((url) => (
              <SwiperSlide key={url}>
                <Image
                  src={url}
                  alt="d5"
                  width={1000}
                  height={1000}
                  sizes="100vw"
                  className=" w-full h-full brightness-75 "
                />
              </SwiperSlide>
            ))}
        </Swiper>
      </Box>
      <Flex className=" absolute z-50" direction={"column"} align={"center"}>
        <Text className=" text-white text-[10vw] sm:text-[7vw] font-bold ">
          FIRSTKAS{" "}
        </Text>
        <Text className=" text-white text-[5vw] sm:text-[3vw] font-bold ">
          SMART WAREHOUSE{" "}
        </Text>
      </Flex>
    </Flex>
  );
};

export default Banner;
