import { fetchContact } from "@/api/manage/manage-contact";
import { queryOptions, useQuery } from "@tanstack/react-query";

function fetchContactOptions() {
  return queryOptions({
    queryKey: ["fetchContact"],
    queryFn: () => fetchContact(),
    staleTime: 10 * 1000,
    refetchInterval: 0,
    retry: false,
    // refetchOnWindowFocus: false,
    // enabled: false,
  });
}
export const useContact = () => {
  return useQuery(fetchContactOptions());
};
