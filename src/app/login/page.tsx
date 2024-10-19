import { Box, Flex, Text } from "@radix-ui/themes";
import LoginForm from "./components/loginForm";

export default async function LoginPage({}) {
  return (
    <Flex
      width={"100%"}
      height={"100%"}
      direction={"column"}
      align={"center"}
      justify={"between"}
      // gap={"80px"}
      className="rounded-lg "
    >
      <LoginForm />
      <Box
        style={{
          width: "100%",
          // position: "absolute",
          // bottom: 0,
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
