import { SelectContactForm } from "@/db/schemas";
import { APIResponse } from "@/types/response";
import AxiosInstance from "@/utils/interceptors";

export const fetchFormContact = async () => {
  const response = await AxiosInstance.get<APIResponse<SelectContactForm[]>>(
    `/api/manage/contact-form`
  );
  return response.data;
};
