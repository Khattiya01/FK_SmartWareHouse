import { SelectCategory } from "@/db/schemas";
import { APIResponse } from "@/types/response";
import AxiosInstance from "@/utils/interceptors";

export const fetchCategory = async () => {
  const response = await AxiosInstance.get<APIResponse<SelectCategory[]>>(
    `/api/manage/category`
  );
  return response.data;
};
