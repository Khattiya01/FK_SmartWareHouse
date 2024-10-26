import { fetchUser } from "@/api/manage/manage-user";
import { queryOptions, useQuery } from "@tanstack/react-query";

function fetchUserOptions() {
  return queryOptions({
    queryKey: ["fetchUser"],
    queryFn: () => fetchUser(),
    staleTime: 10 * 1000,
    refetchInterval: 0,
    retry: false,
    // refetchOnWindowFocus: false,
    // enabled: false,
  });
}
export const useUser = () => {
  return useQuery(fetchUserOptions());
};
