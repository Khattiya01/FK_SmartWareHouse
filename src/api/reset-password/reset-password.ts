import { APIResponse } from "@/types/response";
import axios from "axios";

export const postResetPassword = async (data: {
  password: string;
  token: string;
}) => {
  const fd = new FormData();
  fd.append("password", data.password);

  const response = await axios.post<APIResponse<[]>>(
    `/api/reset-password`,
    fd,
    {
      headers: {
        Authorization: "Bearer " + data.token,
      },
    }
  );
  return response.data;
};
