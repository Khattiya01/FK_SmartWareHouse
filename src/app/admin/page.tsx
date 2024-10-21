import { SecurePage } from "@/utils/secure-page";
import { ROLE } from "@/types/role";
import { redirect } from "next/navigation";

export default async function Adminpage() {
  await SecurePage({ role: ROLE.admin });
  await redirect("/admin//manage-home-detail");
  return <></>;
}
