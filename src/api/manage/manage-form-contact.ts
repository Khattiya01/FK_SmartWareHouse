import { SelectContactForm } from "@/db/schemas";
import { APIResponse } from "@/types/response";
import AxiosInstance from "@/utils/interceptors";

export const fetchFormContact = async ({
  page,
  pageSize,
}: {
  page: string;
  pageSize: string;
}) => {
  const response = await AxiosInstance.get<APIResponse<SelectContactForm[]>>(
    `/api/manage/contact-form?page=${page}&pageSize=${pageSize}`
  );
  return response.data;
};
