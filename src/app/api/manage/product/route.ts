import { SelectProductIncludeCategory } from "@/db/schemas";
import { getProducts } from "@/services/product";
import { APIResponse } from "@/types/response";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const responseJson: APIResponse<SelectProductIncludeCategory[]> = {
    status: 200,
    message: "OK",
    result: [],
  };

  try {
    const res = await getProducts();
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