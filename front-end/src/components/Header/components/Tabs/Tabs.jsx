import { Tabs as CustomTabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NavLink, useLocation } from "react-router-dom";
import "./Tabs.styles.css";
import { motion } from "framer-motion";

export function Tabs() {
  const location = useLocation();

  const routes = [
    {
      path: "/energy-sources",
      name: "Energy Sources",
      disabled: false,
    },
    {
      path: "/world",
      name: "World",
      disabled: true,
    },
    {
      path: "/projections",
      name: "Projections",
      disabled: true,
    },
  ];

  const activeTab = location.pathname === "/" ? routes[0].path : location.pathname;

  return (
    <>
      <CustomTabs value={activeTab} className="w-full overflow-auto">
        <TabsList className="gap-8">
          {routes.map((route) => (
            <TabsTrigger
              className="tabs relative"
              value={route.path}
              disabled={route.disabled}
              key={route.path}
            >
              <NavLink to={route.path}>
                <span className="text-white text-xl font-semibold font-['Barlow'] leading-loose">
                  {route.name}
                </span>
              </NavLink>
              {route.path === activeTab ? (
                <motion.div className="underline" layoutId="underline" />
              ) : null}
            </TabsTrigger>
          ))}
        </TabsList>
      </CustomTabs>
    </>
  );
}
