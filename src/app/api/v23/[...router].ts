import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { getCookie } from "cookies-next";

type ResponseData = Record<string, unknown>;
// type ResponseData = {
//     [Key: string]: any
// }
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    const myCookie = getCookie("access_token", { req });

    const appId = process.env.NEXT_PUBLIC_APP_ID;
    const appKey = process.env.NEXT_PUBLIC_APP_KEY;
    const newUrl: string = req.url?.replace("/api/v1/", "/eai/") ?? "/eai/";
    const response = await axios.request({
      method: req.method,
      url: newUrl,
      baseURL: process.env.NEXT_PUBLIC_FRONTEND_URL,
      headers: {
        "app-id": appId,
        "app-key": appKey,
        Authorization: `Bearer ${myCookie}`,
      },
      data: req.body,
    });
    res.status(200).json(response.data);
  } catch (e) {
    res.status(404).json({ message: "request not fond" });
  }
}
