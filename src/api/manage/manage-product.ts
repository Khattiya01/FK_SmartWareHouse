import { SelectProductIncludeCategory } from "@/db/schemas";
import { APIResponse } from "@/types/response";
import AxiosInstance from "@/utils/interceptors";

export const fetchProduct = async () => {
  const response = await AxiosInstance.get<
    APIResponse<SelectProductIncludeCategory[]>
  >(`/api/manage/product`);
  return response.data;
};
