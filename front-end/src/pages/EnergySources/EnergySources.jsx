import BarChart from "@/components/Visualization/BarChart";
import RadarChart from "@/components/Visualization/RadarChart";
import { motion } from "framer-motion";
import cards from "../cards.json";
import { Card } from "./components/Card";
import { ContainerWithBorderTop } from "@/components/Visualization/ContainerWithBorderTop";
import { varFade } from "@/utils/animations/variants";
import MotionViewport from "@/utils/animations/components/MotionViewport";

export function EnergySources() {
  return (
    <MotionViewport>
      <main className="flex flex-col gap-[56px] animate-fade-1">
        <div className="flex flex-col gap-5">
          <motion.h1
            variants={varFade().inLeft}
            initial="initial"
            animate="animate"
            className=" text-white text-[90px] font-bold font-['Barlow'] leading-[92px] tracking-[0.9px]"
          >
            Global energy data
          </motion.h1>
          <motion.h5
            variants={varFade().inRight}
            initial="initial"
            animate="animate"
            className="max-w-[760px] font-SourceSans text-xl"
          >
            Compiled data on world energy consumption, coming from different energy
            sources (World energy consumption data per/by fuel). Analyze how the use of
            fossil fuels and alternative energies have evolved globally and by country.
          </motion.h5>
        </div>

        <article className="grid md:grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div variants={varFade().in} initial="initial" animate="animate">
            <ContainerWithBorderTop>
              {/* <BarChart id="FYFR9tV16KgQlyA8AlHEpb" style={{ height: "192px" }} /> */}
              <div style={{ height: "192px" }}>barchart</div>
            </ContainerWithBorderTop>
          </motion.div>

          <motion.div variants={varFade().in} initial="initial" animate="animate">
            <ContainerWithBorderTop>
              {/* <RadarChart id="uBwUDELKOhv9j76pr7b5Tg" style={{ height: "192px" }} /> */}
              <div style={{ height: "192px" }}>radarchart</div>
            </ContainerWithBorderTop>
          </motion.div>
        </article>

        <article className="flex flex-col gap-6">
          <ContainerWithBorderTop>
            <h6 className="opacity-70 text-white font-bold font-['Barlow'] uppercase leading-7 tracking-[1.92px]">
              Worldwide statistics, Change in energy consumption, 1990-2021
            </h6>
          </ContainerWithBorderTop>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[25px]">
            {/* {cards.map((card, index) => (
              <Card cardInfos={card} key={`card-energy-sources${index}`} />
            ))} */}
            <div style={{ height: "1000px" }} />
          </div>
        </article>
      </main>
    </MotionViewport>
  );
}
