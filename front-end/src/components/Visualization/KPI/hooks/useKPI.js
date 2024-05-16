import { useQuery } from "@/hooks/useQuery";
import numeral from "numeral";

export const useKPI = ({ id }) => {

  //*--- data from Backend ---*
  const { data, fields, title, isLoaded, value_format } = useQuery({ id });

  const { measures } = fields || {};
  const hasTableCalculations = fields?.table_calculations?.length > 0;

  if (!isLoaded) return { isLoaded, title, formattedValue: "∅" };

  const valueInfo = hasTableCalculations ? fields?.table_calculations[0] : measures[0];

  const { name } = fields?.measures[0] || {};

  const value = hasTableCalculations
    ? data[0][valueInfo?.name]?.value ?? "∅"
    : data[0][name || ""]?.value;

  const formattedValue = numeral(value).format(value_format);
  // *--- end ofdata from Backend ---*

  //*--- Static Content ---*
  // const title = "Total Revenue";
  // const value = 123456;
  // const formattedValue = numeral(value).format("0,0");
  // const valueInfo = {
  //   color: "green",
  // };
  // const isLoaded = true;
  //*--- end of Static Content ---*

  return {
    isLoaded,
    title,
    formattedValue,
    color: valueInfo?.color,
    value,
  };
};
