import { SecurePage } from "@/utils/secure-page";
import { ROLE } from "@/types/role";
import { redirect } from "next/navigation";
import { CheckTermPagePage } from "@/utils/check-term-page";

export default async function Adminpage() {
  await SecurePage({ role: ROLE.admin });
  await CheckTermPagePage();
  await redirect("/admin//manage-home-detail");
  return <></>;
}
