import { BackgroundWithImages } from "@/components/BackgroundWithImages";
import { Filters } from "@/components/Filters";
import { Header } from "@/components/Header";
import { Outlet } from "react-router-dom";

export const Wrapper = () => {
  return (
    <>
      <BackgroundWithImages />
      <div className="flex flex-col">
        <div className="flex gap-6 flex-col mx-6 sm:mx-12">
          {/* <Header /> */}
          {/* <Filters /> */}
          <div className="my-8 mx-0 sm:mx-[54px] flex-1">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};
