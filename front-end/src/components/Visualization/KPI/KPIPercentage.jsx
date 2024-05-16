import { Skeleton } from "@/components/ui/skeleton";
import { useKPI } from "./hooks/useKPI";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

// import { Skeleton, Stack, Typography } from "@mui/material";
// import numeral from "numeral";
// import useQuery from "../../../hooks/useQuery";

const KPIPercentage = ({ kpiInfo }) => {
  const { text, id } = kpiInfo;
  const { isLoaded, value, formattedValue } = useKPI({ id }) || {};

  if (!isLoaded) {
    return (
      <div className="flex flex-col items-end justify-end opacity-30">
        <Skeleton className="w-[30%] h-4" />
      </div>
    );
  }

  // *--- Static Content ---*
  // const kpiValue = { value: 0.1 };
  // const formattedValue = "10.00%";
  //*--- end of Static Content ---*

  return (
    <div className="flex items-center justify-end gap-1">
      <ArrowUp
        className={cn(
          "w-4 h-4 text-slate-800 transition-[rotate]",
          value > 0 ? "rotate-180" : ""
        )}
      />

      <span className="text-right text-slate-800 text-base font-bold font-['Barlow'] leading-[18px] tracking-tight">
        {formattedValue}
      </span>
      <div className="text-right text-slate-800 text-base font-normal font-['Barlow'] leading-[18px] tracking-tight">
        {text}
      </div>
    </div>
  );
};

export default KPIPercentage;
