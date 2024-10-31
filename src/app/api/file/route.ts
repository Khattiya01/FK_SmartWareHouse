import { SelectFile } from "@/db/schemas";
import { getFilesByUrl } from "@/services/files";
import { APIResponse } from "@/types/response";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const urlParam = request.nextUrl.searchParams.get("url");

  const responseJson: APIResponse<SelectFile[]> = {
    status: 200,
    message: "OK",
    result: {
      data: [],
      total: 0,
    },
  };

  if (urlParam) {
    try {
      const res = await getFilesByUrl(urlParam);
      responseJson.result.data = res;
    } catch {
      responseJson.status = 500;
      responseJson.message = "Error fetching files";
    }
  } else {
    responseJson.status = 400;
    responseJson.message = "URL parameter is missing";
  }

  return new Response(JSON.stringify(responseJson), {
    status: responseJson.status,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
