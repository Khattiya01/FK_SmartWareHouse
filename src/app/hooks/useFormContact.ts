import { fetchFormContact } from "@/api/manage/manage-form-contact";
import { queryOptions, useQuery } from "@tanstack/react-query";

function fetchFormContactOptions({
  page,
  pageSize,
}: {
  page: string;
  pageSize: string;
}) {
  return queryOptions({
    queryKey: ["fetchFormContact", page, pageSize],
    queryFn: () => fetchFormContact({ page: page, pageSize: pageSize }),
    staleTime: 10 * 1000,
    refetchInterval: 0,
    retry: false,
    // refetchOnWindowFocus: false,
    // enabled: false,
  });
}
export const useFormContact = ({
  page,
  pageSize,
}: {
  page: string;
  pageSize: string;
}) => {
  return useQuery(
    fetchFormContactOptions({
      page,
      pageSize,
    })
  );
};
