import { Box, Flex, Text } from "@radix-ui/themes";
import React from "react";
import FormContact from "./formContact";
import Image from "next/image";
import { ContactItem } from "@/components/footers/ContactInfo";
import { IoLocationOutline } from "react-icons/io5";
import { FiPhone } from "react-icons/fi";
import { CiMobile3, CiTimer } from "react-icons/ci";
import { SelectContact } from "@/db/schemas";
import { formatPhoneNumber } from "@/utils/formatPhoneNumber";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(utc);
dayjs.extend(timezone);

type ContentContactProps = {
  contact: SelectContact | undefined;
};
const ContentContact = (props: ContentContactProps) => {
  const { contact } = props;
  return (
    <Flex
      direction={"column"}
      align={"center"}
      gap={"4"}
      width={"100%"}
      className=" relative overflow-hidden p-4"
    >
      <Image
        src={
          contact?.bg_image
            ? `/api/serve-file?filename=${contact?.bg_image}`
            : "/images/city.png"
        }
        alt="bg-contact"
        layout="fill"
        objectFit="cover"
        className=" absolute z-[-1]"
      />
      <Text className=" text-6xl font-bold  text-white mt-[94px] mb-6">
        ติดต่อเรา
      </Text>
      <Flex width={"100%"} direction={"column"} className=" max-w-[500px]">
        <Text className=" font-bold text-3xl  text-white">
          FIRSTKAS SMART WAREHOUSE
        </Text>
        <Text className="  text-white">
          ขาย-ให้เช่าที่ดินและโกดัง อสังหาริมทรัพย์
          ทำเลดีย่านธุรกิจและอุตสาหกรรม รวมถึงรับสร้างโกดังสินค้าและโรงงาน
        </Text>
      </Flex>
      <Flex
        width={"100%"}
        direction={"column"}
        className=" max-w-[500px] text-white "
        gap={"2"}
      >
        <Text className=" font-bold text-xl  text-white">สถานที่ตั้ง</Text>
        <ContactItem
          icon={<IoLocationOutline size={"16px"} />}
          desc={
            contact?.address ??
            "444/23 หมู่ 2 ถนนลพบุรีราเมศวร์ ตำบลพะวง อำเภอเมืองสงขลา จังหวัดสงขลา 90100"
          }
        />
      </Flex>
      <Flex
        width={"100%"}
        direction={"column"}
        className=" max-w-[500px] text-white"
        gap={"2"}
      >
        <Text className=" font-bold text-xl  text-white">
          ติดต่อสอบถามข้อมูล
        </Text>
        <ContactItem
          icon={<FiPhone size={"16px"} />}
          desc={contact?.tel ? formatPhoneNumber(contact?.tel) : "074-800811"}
        />
        <ContactItem
          icon={<CiMobile3 size={"16px"} />}
          desc={
            contact?.phone ? formatPhoneNumber(contact?.phone) : "089-4665376"
          }
        />
      </Flex>
      <Flex
        width={"100%"}
        direction={"column"}
        className=" max-w-[500px] text-white" gap={"2"}
      >
        <Text className=" font-bold text-xl  text-white">วัน - เวลาทำการ</Text>
        <ContactItem
          icon={<CiTimer size={"16px"} />}
          desc={`${dayjs(contact?.start_day_bs_hour).format(
            "HH:mm"
          )} - ${dayjs(contact?.end_day_bs_hour).format(
            "HH:mm"
          )} น.`}
        />
      </Flex>
      <Flex
        className="w-full max-w-[448px] my-4"
        direction={"column"}
        align={"center"}
      >
        <FormContact />
      </Flex>
      <Box className=" w-full h-[300px] max-w-desktop">
        <Image
          src={
            contact?.map_image
              ? `/api/serve-file?filename=${contact?.map_image}`
              : "/images/map_company.png"
          }
          alt="map_company"
          width={100}
          height={100}
          sizes="100%"
          className=" w-full h-full"
        />
      </Box>
    </Flex>
  );
};

export default ContentContact;
