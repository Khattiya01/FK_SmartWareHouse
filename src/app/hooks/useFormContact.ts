import { fetchFormContact } from "@/api/manage/manage-form-contact";
import { queryOptions, useQuery } from "@tanstack/react-query";

function fetchFormContactOptions() {
  return queryOptions({
    queryKey: ["fetchFormContact"],
    queryFn: () => fetchFormContact(),
    staleTime: 10 * 1000,
    refetchInterval: 0,
    retry: false,
    // refetchOnWindowFocus: false,
    // enabled: false,
  });
}
export const useFormContact = () => {
  return useQuery(fetchFormContactOptions());
};
