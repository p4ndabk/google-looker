import React, { createContext, useState, useContext } from "react";

export const FilterContext = createContext({});

export default function FilterProvider({ children }) {
  const [activeFilters, setActiveFilters] = useState({});
  const [clearFilters, setClearFilters] = useState(0);

  function handleClearFilters() {
    setActiveFilters({});
    setClearFilters(Date.now());
  }

  return (
    <FilterContext.Provider
      value={{
        activeFilters,
        setActiveFilters,
        handleClearFilters,
        clearFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export const useFilter = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilter must be used within a FilterProvider");
  }
  return context;
};
