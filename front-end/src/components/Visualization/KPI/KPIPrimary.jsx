import PropTypes from "prop-types";
import { Skeleton } from "@/components/ui/skeleton";
import { useKPI } from "./hooks/useKPI";

function KPIPrimary({ kpiInfo }) {
  const { title, formattedValue, isLoaded } = useKPI({ id: kpiInfo?.id }) || {};

  if (!isLoaded) {
    return (
      <div className="flex flex-col items-end gap-2 opacity-30">
        <Skeleton className="w-[80%] h-4" />
        <Skeleton className="w-[60%] h-16" />
      </div>
    );
  }

  // *--- Static Content ---*
  // const title = "Gas energy consumption, 2021 (TWh)";
  // const formattedValue = "309525.74";
  //*--- end of Static Content ---*

  return (
    <div className="flex flex-col items-end ">
      <span className="text-right text-slate-800 text-xs font-semibold font-SourceSans uppercase leading-tight tracking-wider">
        {title}
      </span>

      <div
        className="text-right  text-[64px] font-bold font-['Barlow'] uppercase leading-[64px]"
        style={{
          color: kpiInfo?.color,
        }}
      >
        {formattedValue}
      </div>
    </div>
  );
}

KPIPrimary.propTypes = {
  kpiInfo: PropTypes.object,
};

export default KPIPrimary;
