import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@/hooks/useQuery";
import { varFade } from "@/utils/animations/variants";
import ReactECharts from "echarts-for-react";
import PropTypes from "prop-types";
import { TailSpin } from "react-loader-spinner";
import { motion } from "framer-motion";

function RadarChart({ id, style }) {

  //*--- data from Backend ---*
  // const { isLoaded, data, fields, title } = useQuery({ id });

  // if (!isLoaded) {
  //   return (
  //     <div className="flex flex-col gap-4">
  //       <Skeleton className="w-3/4 h-3 mt-2" />
  //       <div className="flex items-center justify-center" style={style}>
  //         <TailSpin height="40" width="40" color="white" radius="1" />
  //       </div>
  //     </div>
  //   );
  // }

  // const serieData = {
  //   name: "Energy Comsuption",
  //   value: Object.keys(data[0]).map((item) => {
  //     return data[0][item].value;
  //   }),
  // };

  // const max = serieData.value.reduce(
  //   (accumulator, value) => Math.max(accumulator, value),
  //   0
  // );

  // const indicator = Object.keys(data[0]).map((item, index) => {
  //   return {
  //     name: fields.measures[index].label,
  //     max,
  //   };
  // });
  //*--- end of data from Backend ---*

  //*--- Static Content ---*
  const title = "Energy consumption, 1990 vs 2021";
  const indicator = [
    { name: "Oil", max: 6500 },
    { name: "Solar", max: 16000 },
    { name: "Wind", max: 30000 },
    { name: "Nuclear", max: 38000 },
    { name: "Hydropower", max: 52000 },
    { name: "Gas", max: 25000 },
    { name: "Coal", max: 25000 },
  ];

  const serieData = {
    value: [4200, 3000, 20000, 35000, 50000, 18000],
    name: "2021",
  };
  //*--- end of Static Content ---*

  const serieName = "Energy Comsuption";

  const option = {
    legend: {
      show: false,
      data: [serieData.name],
      orient: "vertical",
      icon: "circle",
      align: "left",
      top: "0%",
      right: 0,
      itemStyle: {
        width: "8px",
        height: "8px",
      },
      textStyle: {
        color: "white",
        fontFamily: "'Source Sans 3'",
        fontSize: 12,
        fontWeight: "400",
      },
    },
    grid: {
      contailLabel: true,
      left: "20%",
      right: "20%",
    },
    radar: {
      axisName: {
        color: "rgba(255, 255, 255, 0.8)",
        fontFamily: "Barlow",
        fontSize: 10,
        fontWeight: "500",
        formatter: function (params) {
          return params.toUpperCase();
        },
      },
      splitArea: {
        show: true,
        areaStyle: {
          color: ["#080e20", "#111b2b"], // Cores das áreas entre as linhas
        },
      },
      indicator,
    },
    tooltip: {
      show: true,
    },
    series: [
      {
        name: serieName,
        type: "radar",
        symbol: "none",
        data: [
          {
            value: serieData.value,
            name: serieData.name,
            itemStyle: {
              color: "#EEAC2D",
            },
            tooltip: {
              show: true,
              backgroundColor: "#FFFFFF",
              textStyle: {
                color: "#1C233B",
                fontSize: 15,
                fontFamily: "Barlow",
                lineHeight: "20px",
                fontWeight: "400",
              },
              formatter: function (params) {
                let indicators = option.radar.indicator; // Acesso aos indicadores definidos na configuração do radar
                let result = `<div style="padding: 6px 10px; "><table style="width: 100%; border-collapse: collapse;"><tr><td style="padding-bottom: 14px"><strong>${params.name}</strong></td></tr>`;

                for (let i = 0; i < params.value.length; i++) {
                  result += `<tr><td style="text-align: left; border-bottom: 1px solid #E3E4E8; padding-bottom: 10px; padding-top: 6px;">
                    ${indicators[i].name}
                    </td><td style="text-align: right; border-bottom: 1px solid #E3E4E8; padding-bottom: 10px; padding-top: 6px;">${params.value[
                      i
                    ].toLocaleString()}</td></tr>`;
                }

                // Para adicionar o total
                let total = params.value.reduce((a, b) => a + b, 0);
                result += `<tr><td style="text-align: left; padding-top: 6px;"><strong>Total</strong><td style="text-align: right;">${total.toLocaleString()} TWh</td></td></tr></table></div>`;

                return result;
              },
            },
            rich: {
              strong: {
                fontSize: 20,
                fontFamily: "Barlow",
                fontWeight: "600",
                color: "#1C233B",
                lineHeight: "24px",
              },
            },
            emphasis: {
              areaStyle: {
                color: "#EEAC2D",
                opacity: 0.2,
              },
            },
          },
        ],
      },
    ],
  };

  return (
    <div className="flex flex-col gap-4 animate-fade">
      <motion.span
        variants={varFade().inLeft}
        animate="animate"
        initial="initial"
        className="opacity-80 text-white text-lg font-semibold font-['Barlow'] tracking-tight"
      >
        {title}
      </motion.span>
      <ReactECharts
        className="tracking-chart"
        option={option}
        style={style}
        opts={{
          renderer: "svg",
        }}
      />
    </div>
  );
}

RadarChart.propTypes = {
  title: PropTypes.string,
  style: PropTypes.object,
  id: PropTypes.string,
};

export default RadarChart;
