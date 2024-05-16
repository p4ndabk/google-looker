import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@/hooks/useQuery";
import { cn } from "@/lib/utils";
import ReactECharts from "echarts-for-react";
import { TailSpin } from "react-loader-spinner";

function LineChart({ className, cardInfos, color, style }) {
  const { id } = cardInfos || {};

  //*--- data from Backend ---*
  // const { isLoaded, data, fields, title } = useQuery({ id });

  // if (!isLoaded) {
  //   return (
  //     <div>
  //       <Skeleton className="w-[80%] h-3 opacity-30" />
  //       <div className="flex items-center justify-center" style={style}>
  //         <TailSpin height="40" width="40" color="#1c233b" radius="1" />
  //       </div>
  //     </div>
  //   );
  // }

  // const { dimensions, measures } = fields;

  // const xAxisData = data.map((item) => item[dimensions[0].name].value);

  // const serieData = data.map((item, index) => {
  //   return {
  //     value: item[measures[0].name].value,
  //     label: item[measures[0].name].rendered,
  //     ...((index === 0 || index === data.length - 1) && {
  //       symbolSize: "8",
  //       symbol: "circle",
  //     }),
  //   };
  // });
   //*--- end of data from Backend ---*

  //*--- Static Content ---*
  const title = "Gas - Change in energy consumption";
  const xAxisData = ["1990", "1995", "2000", "2005", "2010", "2015", "2020"];
  const measures = [{ label: "Gas", name: "Gas" }];
  const serieData = [
    { value: 0, symbolSize: 8 },
    { value: 5 },
    { value: 20 },
    { value: 25 },
    { value: 50 },
    { value: 75 },
    { value: 150, symbolSize: 8 },
  ];
  //*--- Static Content ---*

  const hexToRgba = (hex, opacity) => {
    const bigint = parseInt(hex.substring(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };

  const borderColor = hexToRgba(color, 0.4);

  const options = {
    xAxis: {
      type: "category",
      show: false,
      interval: 0,
      boundaryGap: false,
      data: xAxisData,
      axisTick: {
        alignWithLabel: true,
      },
      axisLabel: {
        interval: 0,
      },
    },
    tooltip: {
      trigger: "axis",
      appendToBody: true,
      backgroundColor: "#FFFFFF",
      borderWidth: 0.5,
      borderRadius: 0,
      borderColor: "#D2D5DD",
      textStyle: {
        color: "#1C233B",
        fontSize: 15,
        fontFamily: "Barlow",
        lineHeight: "20px",
      },
      shadowColor: "transparent",
      padding: [16, 20],
      position: function ([x, y], params, dom, rect, size) {
        const graphWidth = size.viewSize[0];
        if (x < graphWidth / 2) {
          return [x + 30, y];
        } else {
          return [x - size.contentSize[0] - 20, y];
        }
      },
      formatter: function (params) {
        const year = params[0].name;
        const metricName = params[0].seriesName;
        const value = params[0]?.data?.label ?? params[0].data.value;

        return `

                <strong>${year}</strong>
                <div style="margin-top: 10px;">
                ${metricName}
                <span style="margin-left: 25px;">${value}</span>
                </div>
            `;
      },
      rich: {
        strong: {
          fontSize: 20,
          fontWeight: "600",
          color: "#1C233B",
          lineHeight: "24px",
        },
      },
      axisPointer: {
        type: "none",
      },
    },
    yAxis: {
      type: "value",
      show: false,

      splitLine: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      axisLabel: {
        show: false,
        interval: 0,
      },
      axisTick: {
        show: false,
      },
    },
    series: [
      {
        name: measures[0].label,
        data: serieData,
        type: "line",
        emphasis: {
          symbolSize: 20,
          itemStyle: {
            borderColor: borderColor,
            borderWidth: 5,
            AbortController,
          },
        },
        smooth: true,
        symbol: "circle",
        symbolSize: 2,
        lineStyle: {
          width: 3,
          color,
        },
        itemStyle: {
          color,
        },
        label: {
          show: true,
          interval: 0,
          position: "top",
          formatter: (params) => {
            if (params.dataIndex === 0 || params.dataIndex === xAxisData.length - 1) {
              return xAxisData[params.dataIndex];
            }
            return "";
          },
        },
      },
    ],
    grid: {
      left: "5%",
      right: "5%",
      bottom: "10%",
      top: "20%",
    },
  };

  return (
    <div className={cn(`flex flex-col gap-9`, className)}>
      <div className="text-slate-800 text-xl font-semibold font-['Barlow'] leading-normal">
        {title}
      </div>
      <ReactECharts option={options} style={style} />
    </div>
  );
}

export default LineChart;
