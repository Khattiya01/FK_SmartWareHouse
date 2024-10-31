// export async function GET() {
//   const responseJson: APIResponse<SelectUser[]> = {
//     status: 200,
//     message: "OK",
//     result: [],
//   };

import { APIResponse } from "@/types/response";
import { SendMail } from "@/utils/sendMail";

//   try {
//     const res = await getUsers();
//     responseJson.result = res;
//   } catch {
//     responseJson.status = 500;
//     responseJson.message = "Error fetching logo";
//   }

//   return new Response(JSON.stringify(responseJson), {
//     status: responseJson.status,
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
// }

export async function POST(request: Request) {
  const formData = await request.formData();
  const email = formData.get("email")?.toString();

  const responseJson: APIResponse<[]> = {
    status: 200,
    message: "OK",
    result: {
      data: [],
      total: 0,
    },
  };

  try {
    if (email) {
      await SendMail({ email: email });
    } else {
      responseJson.status = 500;
      responseJson.message = "email is not defind";
    }
  } catch {
    responseJson.status = 500;
    responseJson.message = "Error post email";
  }

  return new Response(JSON.stringify(responseJson), {
    status: responseJson.status,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
