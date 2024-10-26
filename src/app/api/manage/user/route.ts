import { SelectUser } from "@/db/schemas";
import { getUsers } from "@/services/users";
import { APIResponse } from "@/types/response";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const responseJson: APIResponse<SelectUser[]> = {
    status: 200,
    message: "OK",
    result: [],
  };

  try {
    const res = await getUsers();
    responseJson.result = res;
  } catch {
    responseJson.status = 500;
    responseJson.message = "Error fetching logo";
  }

  return new Response(JSON.stringify(responseJson), {
    status: responseJson.status,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
