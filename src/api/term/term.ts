import { APIResponse } from "@/types/response";
import AxiosInstance from "@/utils/interceptors";

export const postTerm = async (data: { accept: boolean; token: string }) => {
  const fd = new FormData();
  fd.append("term", data.accept ? "true" : "false");

  const response = await AxiosInstance.post<APIResponse<[]>>(`/api/term`, fd, {
    headers: {
      Authorization: "Bearer " + data.token,
    },
  });
  return response.data;
};
