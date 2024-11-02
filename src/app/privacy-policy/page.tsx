import { Flex } from "@radix-ui/themes";
import { getPrivacyAndPolicyIsActive } from "@/services/privacyAndPolicy";
import dayjs from "dayjs";
import "dayjs/locale/th";
import buddhistEra from "dayjs/plugin/buddhistEra";
import { DateLongTH } from "@/utils/dayjsFormat";
dayjs.extend(buddhistEra);

export default async function PrivacyPolicyPage() {
  const privacyAndPolicy = await getPrivacyAndPolicyIsActive();

  return (
    <Flex
      width={"100%"}
      height={"100%"}
      direction={"column"}
      align={"center"}
      justify={"between"}
      className="rounded-lg "
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
        }}
        className=" max-w-[606px] rounded-lgp-4 py-6 px-4"
      >
        <div className=" flex flex-col gap-2 mb-2">
          <div className=" text-[33px] font-bold my-2">
            นโยบายความเป็นส่วนตัว
          </div>
          <div className=" text-sm italic">
            ปรับปรุงแก้ไขล่าสุด: {DateLongTH(privacyAndPolicy?.created_at)}
          </div>
        </div>
        <div className=" custom-pre  w-full py-2 text-sm">
          {privacyAndPolicy?.privacy_policy}
        </div>
      </div>
    </Flex>
  );
}
