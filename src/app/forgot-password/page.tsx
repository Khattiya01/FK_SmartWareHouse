import { Flex } from "@radix-ui/themes";
import dynamic from "next/dynamic";

const ForgotPasswordForm = dynamic(() => import("./components/forgotPasswordForm"), {
  ssr: false,
});

export default async function ForgotPasswordPage() {
  return (
    <Flex
      width={"100%"}
      height={"100%"}
      direction={"column"}
      align={"center"}
      justify={"between"}
      className="rounded-lg "
    >
      <ForgotPasswordForm />
    </Flex>
  );
}
