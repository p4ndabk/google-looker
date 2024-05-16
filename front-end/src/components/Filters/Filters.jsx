import { Filter as FilterIcon } from "lucide-react";
import { Separator } from "../ui/separator";
import { CustomFilterSelector } from "./components/CustomFilterSelector";
import { useQueryParams } from "@/hooks/useQueryParams";
import { Button } from "../ui/button";

export const Filters = () => {
  const { hasFilters, clearAllFilters, key } = useQueryParams();
  return (
    <div className="flex px-5 py-3 bg-[#182039cc] bg-opacity-80 items-center gap-[17px] flex-col sm:w-max sm:flex-row">
      <div className="flex items-center gap-[17px] h-full">
        <div className="flex items-center gap-1">
          <FilterIcon className="text-white" width={20} height={20} />
          <span className="text-gray-300 text-lg font-semibold font-['Barlow'] tracking-tight">
            Filters
          </span>
        </div>
        <Separator className="hidden sm:block " orientation="vertical" />
      </div>
      <div>
        <CustomFilterSelector key={`${key}-filtersSelector`} />
      </div>
      {hasFilters && (
        <Button className="h-8" variant="outline" onClick={clearAllFilters}>
          Clear
        </Button>
      )}
      {/* <ComboBox values={["test", "bbg", "tste2"]} field="test" placeholder="Country" /> */}
    </div>
  );
};
