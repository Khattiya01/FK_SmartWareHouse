import { Selectlogo } from "@/db/schemas";
import { APIResponse } from "@/types/response";
import AxiosInstance from "@/utils/interceptors";

export const fetchLogo = async () => {
  const response = await AxiosInstance.get<APIResponse<Selectlogo[]>>(
    `/api/manage/logo`
  );
  return response.data;
};
