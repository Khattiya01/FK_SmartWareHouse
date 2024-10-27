import { fetchPrivacyAndPolicy } from "@/api/manage/manage-privacy-policy";
import { queryOptions, useQuery } from "@tanstack/react-query";

function fetchPrivacyAndPolicyOptions() {
  return queryOptions({
    queryKey: ["fetchPrivacyAndPolicy"],
    queryFn: () => fetchPrivacyAndPolicy(),
    staleTime: 10 * 1000,
    refetchInterval: 0,
    retry: false,
    // refetchOnWindowFocus: false,
    // enabled: false,
  });
}
export const usePrivacyAndPolicy = () => {
  return useQuery(fetchPrivacyAndPolicyOptions());
};
