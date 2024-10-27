import { SelectprivacyAndPolicy } from "@/db/schemas";
import { APIResponse } from "@/types/response";
import AxiosInstance from "@/utils/interceptors";

export const fetchPrivacyAndPolicy = async () => {
  const response = await AxiosInstance.get<
    APIResponse<SelectprivacyAndPolicy[]>
  >(`/api/manage/privacy-policy`);
  return response.data;
};
