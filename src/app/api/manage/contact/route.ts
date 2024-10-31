import { SelectContact } from "@/db/schemas";
import { getContact } from "@/services/contact";
import { APIResponse } from "@/types/response";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const page = url.searchParams.get("page") || "1";
  const pageSize = url.searchParams.get("pageSize") || "25";

  const responseJson: APIResponse<SelectContact[]> = {
    status: 200,
    message: "OK",
    result: {
      data: [],
      total: 0,
    },
  };

  try {
    const res = await getContact({ page, pageSize });
    responseJson.result.data = res.data;
    responseJson.result.total = res.total;
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
