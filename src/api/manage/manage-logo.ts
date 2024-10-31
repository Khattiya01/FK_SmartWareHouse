import { Selectlogo } from "@/db/schemas";
import { APIResponse } from "@/types/response";
import AxiosInstance from "@/utils/interceptors";

export const fetchLogo = async ({
  page,
  pageSize,
}: {
  page: string;
  pageSize: string;
}) => {
  const response = await AxiosInstance.get<APIResponse<Selectlogo[]>>(
    `/api/manage/logo?page=${page}&pageSize=${pageSize}`
  );
  return response.data;
};
