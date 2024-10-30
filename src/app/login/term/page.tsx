import { Flex } from "@radix-ui/themes";
import TermContent from "./components/termContent";
import { getPrivacyAndPolicyIsActive } from "@/services/privacyAndPolicy";
import { SecurePage } from "@/utils/secure-page";

export default async function TermPage() {
  await SecurePage({});
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
      <TermContent privacyAndPolicy={privacyAndPolicy} />
    </Flex>
  );
}
