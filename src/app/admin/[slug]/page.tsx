import { ROLE } from "@/types/role";
import { SecurePage } from "@/utils/secure-page";
import { Flex } from "@radix-ui/themes";
import { ManageHomeDetail } from "../components/manages/homeDetail";

export default async function AdminManagePage({
  params,
}: {
  params: { slug: string };
}) {
  await SecurePage({ role: ROLE.admin });
  const manageName = params.slug;

  return (
    <Flex width={"100%"} direction={"column"} gap={"4"} p={"4"}>
      {manageName === "manage-home-detail" && <ManageHomeDetail />}
      {manageName === "manage-logo" && <ManageHomeDetail />}
    </Flex>
  );
}
