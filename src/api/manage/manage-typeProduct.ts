import { SelectTypeProduct } from "@/db/schemas";
import { APIResponse } from "@/types/response";
import AxiosInstance from "@/utils/interceptors";

export const fetchTypeProduct = async ({
  page,
  pageSize,
}: {
  page: string;
  pageSize: string;
}) => {
  const response = await AxiosInstance.get<APIResponse<SelectTypeProduct[]>>(
    `/api/manage/type-product?page=${page}&pageSize=${pageSize}`
  );
  return response.data;
};
