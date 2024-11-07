import { SelectHomePageDetail } from "@/db/schemas";
import { APIResponse } from "@/types/response";
import AxiosInstance from "@/utils/interceptors";

export const fetchHomeDetail = async ({
  page,
  pageSize,
}: {
  page: string;
  pageSize: string;
}) => {
  const response = await AxiosInstance.get<APIResponse<SelectHomePageDetail[]>>(
    `/api/manage/home-detail?page=${page}&pageSize=${pageSize}`
  );
  return response.data;
};