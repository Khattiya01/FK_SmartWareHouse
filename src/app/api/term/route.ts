import { editTermUser } from "@/services/users";
import { APIResponse } from "@/types/response";
import { verify } from "jsonwebtoken";

export async function POST(request: Request) {
  const formData = await request.formData();
  const term = formData.get("term")?.toString();

  const responseJson: APIResponse<[]> = {
    status: 200,
    message: "OK",
    result: {
      data: [],
      total: 0,
    },
  };

  try {
    const token = request.headers.get("Authorization")?.split(" ")[1];

    if (term && token) {
      const jwtPayload = verify(token, process.env.JWT_SECRET ?? "") as {
        userId: string;
        iat: number;
      };
      const userId = jwtPayload.userId;
      await editTermUser({ id: userId, term: term === "true" ? true : false });
    } else {
      responseJson.status = 400;
      responseJson.message = "term is not defind";
    }
  } catch {
    responseJson.status = 400;
    responseJson.message = "Error update term";
  }

  return new Response(JSON.stringify(responseJson), {
    status: responseJson.status,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
