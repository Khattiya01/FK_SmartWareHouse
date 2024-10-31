import { fetchHomeDetail } from "@/api/manage/manage-home-detail";
import { queryOptions, useQuery } from "@tanstack/react-query";

function fetchHomeDetailOptions({
  page,
  pageSize,
}: {
  page: string;
  pageSize: string;
}) {
  return queryOptions({
    queryKey: ["fetchHomeDetail", page, pageSize],
    queryFn: () => fetchHomeDetail({ page: page, pageSize: pageSize }),
    staleTime: 10 * 1000,
    refetchInterval: 0,
    retry: false,
    // refetchOnWindowFocus: false,
    // enabled: false,
  });
}
export const useHomeDetail = ({
  page,
  pageSize,
}: {
  page: string;
  pageSize: string;
}) => {
  return useQuery(
    fetchHomeDetailOptions({
      page,
      pageSize,
    })
  );
};
