import { NextRequest } from "next/server";

export function isAuthenticatedSession(request: NextRequest) {
  const sessionToken = request.cookies.get("next-auth.session-token")?.value;
  if (!sessionToken) return false;

  return true;
}
