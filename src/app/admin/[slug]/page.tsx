import { ROLE } from "@/types/role";
import { SecurePage } from "@/utils/secure-page";
import { Flex } from "@radix-ui/themes";
import { ManageHomeDetail } from "../components/manages/homeDetail";
import { ManageFormContact } from "../components/manages/formContact";
import { ManageCategory } from "../components/manages/category";
import { ManageProduct } from "../components/manages/product";
import { ManageLogo } from "../components/manages/logo";
import { ManageContact } from "../components/manages/contact";
import { ManageUser } from "../components/manages/user";
import { ManagePrivacyAndPolicy } from "../components/manages/privacyAndPolicy";

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
      {manageName === "manage-logo" && <ManageLogo />}
      {manageName === "manage-category" && <ManageCategory />}
      {manageName === "manage-product" && <ManageProduct />}
      {manageName === "manage-contact" && <ManageContact />}
      {manageName === "manage-form-contact" && <ManageFormContact />}
      {manageName === "manage-users" && <ManageUser />}
      {manageName === "manage-privacy-policy" && <ManagePrivacyAndPolicy />}
    </Flex>
  );
}
