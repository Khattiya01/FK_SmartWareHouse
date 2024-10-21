import { fetchLogo } from "@/api/manage/manage-logo";
import { queryOptions, useQuery } from "@tanstack/react-query";

function fetchLogoOptions() {
  return queryOptions({
    queryKey: ["fetchLogo"],
    queryFn: () => fetchLogo(),
    staleTime: 10 * 1000,
    refetchInterval: 0,
    retry: false,
    // refetchOnWindowFocus: false,
    // enabled: false,
  });
}
export const useLogo = () => {
  return useQuery(fetchLogoOptions());
};
