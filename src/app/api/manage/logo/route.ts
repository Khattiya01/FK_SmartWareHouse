import { Selectlogo } from "@/db/schemas";
import { getLogos } from "@/services/logo";
import { APIResponse } from "@/types/response";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const responseJson: APIResponse<Selectlogo[]> = {
    status: 200,
    message: "OK",
    result: [],
  };

  try {
    const res = await getLogos();
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
