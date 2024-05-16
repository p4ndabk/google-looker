import { ComboBox } from "@/components/ui/combobox";
import { Skeleton } from "@/components/ui/skeleton";
import { useDashboard } from "@/context/Dashboard";
import { getDashboardFilters } from "@/services/api";
import useSWR from "swr";

export const CustomFilterSelector = () => {
  //*--- data from Backend ---*
  const {
    config: { dashboardId },
  } = useDashboard();
  const { isLoading, data } = useSWR(
    ["filters"],
    async () => await getDashboardFilters({ dashboardId }),
    {
      revalidateOnFocus: false,
    }
  );

  if (isLoading) {
    return <Skeleton className="w-[150px] h-[40px]" />;
  }

  return data.map((filter, index) => (
    <ComboBox
      key={`filter-${index}`}
      values={filter.data}
      field={filter.name}
      placeholder={filter.title}
    />
  ));
  //*--- end of data from Backend ---*

  //*--- Static Content ---*
  // const data = [
  //   {
  //     name: "filter1",
  //     title: "Filter 1",
  //     data: ["value1", "value2", "value3"],
  //   },
  // ];

  // return data.map((filter, index) => (
  //   <ComboBox
  //     key={`filter-${index}`}
  //     values={filter.data}
  //     field={filter.name}
  //     placeholder={filter.title}
  //   />
  // ));
};
