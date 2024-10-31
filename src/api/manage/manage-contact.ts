import { SelectContact } from "@/db/schemas";
import { APIResponse } from "@/types/response";
import AxiosInstance from "@/utils/interceptors";

export const fetchContact = async ({
  page,
  pageSize,
}: {
  page: string;
  pageSize: string;
}) => {
  const response = await AxiosInstance.get<APIResponse<SelectContact[]>>(
    `/api/manage/contact?page=${page}&pageSize=${pageSize}`
  );
  return response.data;
};
