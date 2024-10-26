import { Box, Flex, Text } from "@radix-ui/themes";
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
      <Box
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        <Text>Version 1.00</Text>
        <Text>© Copyright 2024 by FK-SWH.com</Text>
      </Box>
    </Flex>
  );
}
