import { SelectProductIncludeCategoryAndTypeProduct } from "@/db/schemas";
import { APIResponse } from "@/types/response";
import AxiosInstance from "@/utils/interceptors";

export const fetchProduct = async ({
  page,
  pageSize,
  searchText,
  category,
}: {
  page: string;
  pageSize: string;
  searchText: string;
  category: string;
}) => {
  const response = await AxiosInstance.get<
    APIResponse<SelectProductIncludeCategoryAndTypeProduct[]>
  >(
    `/api/manage/product?page=${page}&pageSize=${pageSize}&searchText=${searchText}&category=${category}`
  );
  return response.data;
};
