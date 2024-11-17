"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/scrollbar";

import { Scrollbar } from "swiper/modules";
import { Autoplay } from "swiper/modules";

import Image from "next/image";
import { Box, Flex, Text } from "@radix-ui/themes";

const Banner = ({ imagesURL, bannerTitle }: { imagesURL: string[] | undefined, bannerTitle: string | undefined }) => {
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
                <Box className=" relative w-full h-[270px] sm:h-[600px] max-h-[600px]">
                  <Image
                    src={`/api/serve-file?filename=${url}`}
                    alt="banner"
                    // width={1000}
                    // height={1000}
                    // sizes="100vw"
                    layout="fill"
                    objectFit="cover"
                    className="  brightness-75 "
                  // className=" w-full h-full brightness-75 "
                  />
                </Box>
              </SwiperSlide>
            ))}
        </Swiper>
      </Box>
      <Flex className=" absolute z-50" direction={"column"} align={"center"}>
        {/* <Text className=" text-white text-[58px] sm:text-[115px] font-bold ">
          FIRSTKAS
        </Text>
        <Text className=" text-white text-[21px] sm:text-[42px] font-bold ">
          SMART WAREHOUSE
        </Text> */}
        <Text className=" text-white text-[48px] sm:text-[115px] font-bold text-center">
          {bannerTitle}
        </Text>
        {/* <Text className=" text-white text-[21px] sm:text-[42px] font-bold ">
          SMART WAREHOUSE
        </Text> */}
      </Flex>
    </Flex>
  );
};

export default Banner;
