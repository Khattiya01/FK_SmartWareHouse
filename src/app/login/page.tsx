import { Flex } from "@radix-ui/themes";
import dynamic from "next/dynamic";

const LoginForm = dynamic(() => import("./components/loginForm"), {
  ssr: false,
});

export default async function LoginPage() {
  return (
    <Flex
      width={"100%"}
      height={"100%"}
      direction={"column"}
      align={"center"}
      justify={"between"}
      className="rounded-lg "
    >
      <LoginForm />
    </Flex>
  );
}
