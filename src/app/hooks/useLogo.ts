import { fetchLogo } from "@/api/manage/manage-logo";
import { queryOptions, useQuery } from "@tanstack/react-query";

function fetchLogoOptions({
  page,
  pageSize,
}: {
  page: string;
  pageSize: string;
}) {
  return queryOptions({
    queryKey: ["fetchLogo", page, pageSize],
    queryFn: () => fetchLogo({ page: page, pageSize: pageSize }),
    staleTime: 10 * 1000,
    refetchInterval: 0,
    retry: false,
    // refetchOnWindowFocus: false,
    // enabled: false,
  });
}
export const useLogo = ({
  page,
  pageSize,
}: {
  page: string;
  pageSize: string;
}) => {
  return useQuery(
    fetchLogoOptions({
      page,
      pageSize,
    })
  );
};
