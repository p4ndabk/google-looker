import { useState } from "react";
import { useSearchParams } from "react-router-dom";

export const useQueryParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [key, setKey] = useState(0);

  const queryParams = Array.from(searchParams.entries()).reduce((acc, [key, value]) => {
    acc[key] = value;
    return acc;
  }, {});

  const hasFilters = Object.keys(queryParams).length > 0;

  function clearAllFilters() {
    setSearchParams({});
    setKey((prev) => prev + 1);
  }

  return {
    queryParams,
    hasFilters,
    clearAllFilters,
    key,
  };
};




