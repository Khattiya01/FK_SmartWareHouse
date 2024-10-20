import { ROLE } from "@/types/role";
import { SecurePage } from "@/utils/secure-page";
import { Flex } from "@radix-ui/themes";
import { ManageHomeDetail } from "../components/manages/homeDetail";
import { ManageFormContact } from "../components/manages/formContact";
import { ManageCategory } from "../components/manages/category";

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
      {/* {manageName === "manage-logo" && <ManageHomeDetail />} */}
      {manageName === "manage-category" && <ManageCategory />}
      {manageName === "manage-form-contact" && <ManageFormContact />}
    </Flex>
  );
}
