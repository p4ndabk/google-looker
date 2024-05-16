import { createContext, useState, useContext, useEffect } from "react";
// import { useSDK } from "@looker/components-data";
import Loader from "../components/Loader";

export const DashboardContext = createContext({});

const config = await fetch("/config.json").then((res) => res.json());

export default function DashboardProvider({ children }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <DashboardContext.Provider
      value={{
        isLoading,
        config,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
};
