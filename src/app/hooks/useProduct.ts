import { fetchProduct } from "@/api/manage/manage-product";
import { queryOptions, useQuery } from "@tanstack/react-query";

function fetchProductOptions({
  page,
  pageSize,
}: {
  page: string;
  pageSize: string;
}) {
  return queryOptions({
    queryKey: ["fetchProduct",page, pageSize],
    queryFn: () => fetchProduct({ page: page, pageSize: pageSize }),
    staleTime: 10 * 1000,
    refetchInterval: 10 * 1000,
    retry: false,
    // refetchOnWindowFocus: false,
    // enabled: false,
  });
}
export const useProduct = ({
  page,
  pageSize,
}: {
  page: string;
  pageSize: string;
}) => {
  return useQuery(
    fetchProductOptions({
      page,
      pageSize,
    })
  );
};
