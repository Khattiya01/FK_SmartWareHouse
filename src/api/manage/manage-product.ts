import { SelectProductIncludeCategory } from "@/db/schemas";
import { APIResponse } from "@/types/response";
import AxiosInstance from "@/utils/interceptors";

export const fetchProduct = async ({
  page,
  pageSize,
}: {
  page: string;
  pageSize: string;
}) => {
  const response = await AxiosInstance.get<
    APIResponse<SelectProductIncludeCategory[]>
  >(`/api/manage/product?page=${page}&pageSize=${pageSize}`);
  return response.data;
};
