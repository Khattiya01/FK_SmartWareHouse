import { fetchContact } from "@/api/manage/manage-contact";
import { queryOptions, useQuery } from "@tanstack/react-query";

function fetchContactOptions({
  page,
  pageSize,
}: {
  page: string;
  pageSize: string;
}) {
  return queryOptions({
    queryKey: ["fetchContact", page, pageSize],
    queryFn: () => fetchContact({ page: page, pageSize: pageSize }),
    staleTime: 10 * 1000,
    refetchInterval: 0,
    retry: false,
    // refetchOnWindowFocus: false,
    // enabled: false,
  });
}
export const useContact = ({
  page,
  pageSize,
}: {
  page: string;
  pageSize: string;
}) => {
  return useQuery(
    fetchContactOptions({
      page,
      pageSize,
    })
  );
};
