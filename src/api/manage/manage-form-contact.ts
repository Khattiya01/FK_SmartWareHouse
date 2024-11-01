import { SelectContactForm } from "@/db/schemas";
import { APIResponse } from "@/types/response";
import AxiosInstance from "@/utils/interceptors";

export const fetchFormContact = async ({
  page,
  pageSize,
  searchText,
  startDate,
  endDate,
}: {
  page: string;
  pageSize: string;
  searchText: string;
  startDate?: string | undefined;
  endDate?: string | undefined;
}) => {
  let url = `/api/manage/contact-form?page=${page}&pageSize=${pageSize}&searchText=${searchText}`;

  if (startDate) {
    url += `&startDate=${startDate}`;
  }

  if (endDate) {
    url += `&endDate=${endDate}`;
  }

  const response = await AxiosInstance.get<APIResponse<SelectContactForm[]>>(
    url
  );
  return response.data;
};
