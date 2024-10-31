import { SelectprivacyAndPolicy } from "@/db/schemas";
import { APIResponse } from "@/types/response";
import AxiosInstance from "@/utils/interceptors";

export const fetchPrivacyAndPolicy = async ({
  page,
  pageSize,
}: {
  page: string;
  pageSize: string;
}) => {
  const response = await AxiosInstance.get<
    APIResponse<SelectprivacyAndPolicy[]>
  >(`/api/manage/privacy-policy?page=${page}&pageSize=${pageSize}`);
  return response.data;
};
