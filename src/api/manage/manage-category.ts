import { SelectCategory } from "@/db/schemas";
import { APIResponse } from "@/types/response";
import AxiosInstance from "@/utils/interceptors";

export const fetchCategory = async ({
  page,
  pageSize,
}: {
  page: string;
  pageSize: string;
}) => {
  const response = await AxiosInstance.get<APIResponse<SelectCategory[]>>(
    `/api/manage/category?page=${page}&pageSize=${pageSize}`
  );
  return response.data;
};
