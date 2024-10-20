import { fetchCategory } from "@/api/manage/manage-category";
import { queryOptions, useQuery } from "@tanstack/react-query";

function fetchCategoryOptions() {
  return queryOptions({
    queryKey: ["fetchCategory"],
    queryFn: () => fetchCategory(),
    staleTime: 10 * 1000,
    refetchInterval: 0,
    retry: false,
    // refetchOnWindowFocus: false,
    // enabled: false,
  });
}
export const useCategory = () => {
  return useQuery(fetchCategoryOptions());
};
