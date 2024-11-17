import { getLogosIsActived } from "@/services/logo";
import { Flex } from "@radix-ui/themes";
import dynamic from "next/dynamic";

const LoginForm = dynamic(() => import("./components/loginForm"), {
  ssr: false,
});

export default async function LoginPage() {
  const responseLogos = await getLogosIsActived();
  const logoURL =
    responseLogos && responseLogos?.length > 0
      ? `/api/serve-file?filename=${responseLogos[0].image_url}`
      : "/images/logo_sr_estate2.jpg"; // fallback to default logo
  console.log("res", responseLogos);


  return (
    <Flex
      width={"100%"}
      height={"100%"}
      direction={"column"}
      align={"center"}
      justify={"between"}
      gap={"4"}
      className="rounded-lg "
    >
      <LoginForm logoURL={logoURL}/>
    </Flex>
  );
}
