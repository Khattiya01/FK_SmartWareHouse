import { fetchProduct } from "@/api/manage/manage-product";
import { queryOptions, useQuery } from "@tanstack/react-query";

function fetchProductOptions({
  page,
  pageSize,
  searchText,
  category,
}: {
  page: string;
  pageSize: string;
  searchText: string;
  category: string;
}) {
  return queryOptions({
    queryKey: ["fetchProduct", page, pageSize, searchText, category],
    queryFn: () =>
      fetchProduct({
        page: page,
        pageSize: pageSize,
        searchText: searchText,
        category: category,
      }),
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
  searchText,
  category,
}: {
  page: string;
  pageSize: string;
  searchText: string;
  category: string;
}) => {
  return useQuery(
    fetchProductOptions({
      page,
      pageSize,
      searchText,
      category,
    })
  );
};
