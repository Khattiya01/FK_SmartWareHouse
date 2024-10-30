import { APIResponse } from "@/types/response";
import AxiosInstance from "@/utils/interceptors";

export const postForgotPassword = async (data: { email: string }) => {
  const fd = new FormData();
  fd.append("email", data.email);

  const response = await AxiosInstance.post<APIResponse<any>>(
    `/api/forgot-password`,
    fd
  );
  return response.data;
};
