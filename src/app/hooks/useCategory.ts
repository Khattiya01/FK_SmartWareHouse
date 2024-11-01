import { fetchCategory } from "@/api/manage/manage-category";
import { queryOptions, useQuery } from "@tanstack/react-query";

function fetchCategoryOptions({
  page,
  pageSize,
}: {
  page: string;
  pageSize: string;
}) {
  return queryOptions({
    queryKey: ["fetchCategory", page, pageSize],
    queryFn: () => fetchCategory({ page: page, pageSize: pageSize }),
    staleTime: 10 * 1000,
    refetchInterval: 10 * 1000,
    retry: false,
    // refetchOnWindowFocus: false,
    // enabled: false,
  });
}
export const useCategory = ({
  page,
  pageSize,
}: {
  page: string;
  pageSize: string;
}) => {
  return useQuery(
    fetchCategoryOptions({
      page,
      pageSize,
    })
  );
};
