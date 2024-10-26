import { fetchHomeDetail } from "@/api/manage/manage-home-detail";
import { queryOptions,  useQuery } from "@tanstack/react-query";

function fetchHomeDetailOptions() {
  return queryOptions({
    queryKey: ["fetchHomeDetail"],
    queryFn: () => fetchHomeDetail(),
    staleTime: 10 * 1000,
    refetchInterval: 0,
    retry: false,
    // refetchOnWindowFocus: false,
    // enabled: false,
  });
}
export const useHomeDetail = () => {
  return useQuery(fetchHomeDetailOptions());
};
