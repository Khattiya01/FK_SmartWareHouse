import { Selectlogo } from "@/db/schemas";
import { getLogos } from "@/services/logo";
import { APIResponse } from "@/types/response";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const page = url.searchParams.get("page") || "1";
  const pageSize = url.searchParams.get("pageSize") || "25";

  const responseJson: APIResponse<Selectlogo[]> = {
    status: 200,
    message: "OK",
    result: {
      data: [],
      total: 0,
    },
  };

  try {
    const res = await getLogos({ page, pageSize });
    responseJson.result.data = res.data;
    responseJson.result.total = res.total;
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
