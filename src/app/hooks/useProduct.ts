import { fetchProduct } from "@/api/manage/manage-product";
import { queryOptions, useQuery } from "@tanstack/react-query";

function fetchProductOptions() {
  return queryOptions({
    queryKey: ["fetchProduct"],
    queryFn: () => fetchProduct(),
    staleTime: 10 * 1000,
    refetchInterval: 0,
    retry: false,
    // refetchOnWindowFocus: false,
    // enabled: false,
  });
}
export const useProduct = () => {
  return useQuery(fetchProductOptions());
};
