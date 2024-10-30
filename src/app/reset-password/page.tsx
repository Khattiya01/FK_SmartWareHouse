import { Flex } from "@radix-ui/themes";
import dynamic from "next/dynamic";

const ResetPasswordForm = dynamic(() => import("./components/resetPasswordForm"), {
  ssr: false,
});

export default async function resetPasswordPage() {
  return (
    <Flex
      width={"100%"}
      height={"100%"}
      direction={"column"}
      align={"center"}
      justify={"between"}
      className="rounded-lg "
    >
      <ResetPasswordForm />
    </Flex>
  );
}
