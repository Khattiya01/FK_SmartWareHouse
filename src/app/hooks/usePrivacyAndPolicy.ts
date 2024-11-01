import { fetchPrivacyAndPolicy } from "@/api/manage/manage-privacy-policy";
import { queryOptions, useQuery } from "@tanstack/react-query";

function fetchPrivacyAndPolicyOptions({
  page,
  pageSize,
}: {
  page: string;
  pageSize: string;
}) {
  return queryOptions({
    queryKey: ["fetchPrivacyAndPolicy", page, pageSize],
    queryFn: () => fetchPrivacyAndPolicy({ page: page, pageSize: pageSize }),
    staleTime: 10 * 1000,
    refetchInterval: 10 * 1000,
    retry: false,
    // refetchOnWindowFocus: false,
    // enabled: false,
  });
}
export const usePrivacyAndPolicy = ({
  page,
  pageSize,
}: {
  page: string;
  pageSize: string;
}) => {
  return useQuery(
    fetchPrivacyAndPolicyOptions({
      page,
      pageSize,
    })
  );
};
