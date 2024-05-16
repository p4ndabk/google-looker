import { getData } from "@/services/api";
import useSWR from "swr";
import { useQueryParams } from "./useQueryParams";
import { useDashboard } from "@/context/Dashboard";

export const useQuery = ({ id }) => {
  const { queryParams } = useQueryParams();
  const {
    config: { dashboardId },
  } = useDashboard();
  const {
    data: resData,
    isLoading,
    error,
  } = useSWR(
    [id, queryParams],
    async () =>
      await getData({
        slug: id,
        dashboardId: dashboardId,
        filters: queryParams,
      }),
    {
      revalidateOnFocus: false,
    }
  );

  return {
    isLoaded: !isLoading,
    error,
    ...resData,
  };
};
