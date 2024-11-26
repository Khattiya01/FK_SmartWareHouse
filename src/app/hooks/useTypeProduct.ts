import { fetchTypeProduct } from "@/api/manage/manage-typeProduct";
import { queryOptions, useQuery } from "@tanstack/react-query";

function fetchTypeProductOptions({
  page,
  pageSize,
}: {
  page: string;
  pageSize: string;
}) {
  return queryOptions({
    queryKey: ["fetchTypeProduct", page, pageSize],
    queryFn: () => fetchTypeProduct({ page: page, pageSize: pageSize }),
    staleTime: 10 * 1000,
    refetchInterval: 10 * 1000,
    retry: false,
    // refetchOnWindowFocus: false,
    // enabled: false,
  });
}
export const useTypeProduct = ({
  page,
  pageSize,
}: {
  page: string;
  pageSize: string;
}) => {
  return useQuery(
    fetchTypeProductOptions({
      page,
      pageSize,
    })
  );
};
