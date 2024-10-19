import { SelectHomePageDetail } from "@/db/schemas";
import { getHomeDetail } from "@/services/homeDetail";
import { APIResponse } from "@/types/response";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const responseJson: APIResponse<SelectHomePageDetail[]> = {
    status: 200,
    message: "OK",
    result: [],
  };

  try {
    const res = await getHomeDetail();
    responseJson.result = res;
  } catch {
    responseJson.status = 500;
    responseJson.message = "Error fetching home detail";
  }

  return new Response(JSON.stringify(responseJson), {
    status: responseJson.status,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
