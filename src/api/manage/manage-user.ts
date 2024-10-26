import { SelectUser } from "@/db/schemas";
import { APIResponse } from "@/types/response";
import AxiosInstance from "@/utils/interceptors";

export const fetchUser = async () => {
  const response = await AxiosInstance.get<APIResponse<SelectUser[]>>(
    `/api/manage/user`
  );
  return response.data;
};
