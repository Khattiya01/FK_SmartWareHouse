import { SelectContactForm } from "@/db/schemas";
import { getContactForm } from "@/services/contactForm";
import { APIResponse } from "@/types/response";

export async function GET() {
  const responseJson: APIResponse<SelectContactForm[]> = {
    status: 200,
    message: "OK",
    result: [],
  };

  try {
    const res = await getContactForm();
    responseJson.result = res;
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
