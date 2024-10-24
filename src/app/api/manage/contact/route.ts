import { SelectContact } from "@/db/schemas";
import { getContact } from "@/services/contact";
import { APIResponse } from "@/types/response";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const responseJson: APIResponse<SelectContact[]> = {
    status: 200,
    message: "OK",
    result: [],
  };

  try {
    const res = await getContact();
    responseJson.result = res;
  } catch {
    responseJson.status = 500;
    responseJson.message = "Error fetching contact";
  }

  return new Response(JSON.stringify(responseJson), {
    status: responseJson.status,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
