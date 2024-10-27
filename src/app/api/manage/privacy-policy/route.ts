import { SelectprivacyAndPolicy } from "@/db/schemas";
import { getPrivacyAndPolicy } from "@/services/privacyAndPolicy";
import { APIResponse } from "@/types/response";

export async function GET() {
  const responseJson: APIResponse<SelectprivacyAndPolicy[]> = {
    status: 200,
    message: "OK",
    result: [],
  };

  try {
    const res = await getPrivacyAndPolicy();
    responseJson.result = res;
  } catch {
    responseJson.status = 500;
    responseJson.message = "Error fetching privacy and policy";
  }

  return new Response(JSON.stringify(responseJson), {
    status: responseJson.status,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
