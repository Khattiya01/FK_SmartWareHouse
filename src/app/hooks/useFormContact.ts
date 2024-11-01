import { fetchFormContact } from "@/api/manage/manage-form-contact";
import { queryOptions, useQuery } from "@tanstack/react-query";

function fetchFormContactOptions({
  page,
  pageSize,
  searchText,
  startDate,
  endDate,
}: {
  page: string;
  pageSize: string;
  searchText: string;
  startDate: string;
  endDate: string;
}) {
  return queryOptions({
    queryKey: [
      "fetchFormContact",
      page,
      pageSize,
      searchText,
      startDate,
      endDate,
    ],
    queryFn: () =>
      fetchFormContact({
        page: page,
        pageSize: pageSize,
        searchText: searchText,
        startDate: startDate,
        endDate: endDate,
      }),
    staleTime: 10 * 1000,
    refetchInterval: 10 * 1000,
    retry: false,
    // refetchOnWindowFocus: false,
    // enabled: false,
  });
}
export const useFormContact = ({
  page,
  pageSize,
  searchText,
  startDate,
  endDate,
}: {
  page: string;
  pageSize: string;
  searchText: string;
  startDate: string;
  endDate: string;
}) => {
  return useQuery(
    fetchFormContactOptions({
      page,
      pageSize,
      searchText,
      startDate,
      endDate,
    })
  );
};
