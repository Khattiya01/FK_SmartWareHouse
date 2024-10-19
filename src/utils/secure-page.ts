import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/auth";
import { ROLE } from "@/types/role";

export async function SecurePage({ role }: { role?: ROLE | undefined }) {
  const session = await getServerSession(authOptions);
  console.log("SecurePage", session?.user);
  console.log("session.user.role !== ROLE[0]", session?.user.role !== ROLE[0]);
  if (!session || !session?.user) {
    redirect("/login?error=session-timeout");
  }
  if (role === ROLE.admin && session.user.role !== ROLE[0]) {
    redirect("/login?error=permission-denied");
  }
}
