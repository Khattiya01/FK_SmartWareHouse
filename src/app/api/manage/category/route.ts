import { SelectCategory } from "@/db/schemas";
import { getCategory } from "@/services/category";
import { APIResponse } from "@/types/response";

export async function GET() {
  const responseJson: APIResponse<SelectCategory[]> = {
    status: 200,
    message: "OK",
    result: [],
  };

  try {
    const res = await getCategory();
    responseJson.result = res;
  } catch {
    responseJson.status = 500;
    responseJson.message = "Error fetching category";
  }

  return new Response(JSON.stringify(responseJson), {
    status: responseJson.status,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
