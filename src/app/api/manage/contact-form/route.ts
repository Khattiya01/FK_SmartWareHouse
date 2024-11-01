import { SelectContactForm } from "@/db/schemas";
import { getContactForm } from "@/services/contactForm";
import { APIResponse } from "@/types/response";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const page = url.searchParams.get("page") || "1";
  const pageSize = url.searchParams.get("pageSize") || "25";
  const searchText = url.searchParams.get("searchText") || "";
  const startDate = url.searchParams.get("startDate") || undefined;
  const endDate = url.searchParams.get("endDate") || undefined;

  const responseJson: APIResponse<SelectContactForm[]> = {
    status: 200,
    message: "OK",
    result: {
      data: [],
      total: 0,
    },
  };

  try {
    const res = await getContactForm({
      page,
      pageSize,
      searchText,
      startDate,
      endDate,
    });
    responseJson.result.data = res.data;
    responseJson.result.total = res.total;
  } catch {
    responseJson.status = 500;
    responseJson.message = "Error fetching contact form";
  }

  return new Response(JSON.stringify(responseJson), {
    status: responseJson.status,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
