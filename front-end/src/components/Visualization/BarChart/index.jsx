import PropTypes from "prop-types";
import ReactECharts from "echarts-for-react";
import { useQuery } from "@/hooks/useQuery";
import { Skeleton } from "@/components/ui/skeleton";
import { TailSpin } from "react-loader-spinner";
import { motion } from "framer-motion";
import { varFade } from "@/utils/animations/variants";

// import useQuery from "../../../hooks/useQuery";

function BarChart({ id, style }) {
  const { isLoaded, error, fields, title, data, ...rest } = useQuery({ id });

  if (!isLoaded) {
    return (
      <div className="flex flex-col gap-4">
        <Skeleton className="w-3/4 h-3 mt-2" />
        <div className="flex items-center justify-center" style={style}>
          <TailSpin height="40" width="40" color="white" radius="1" />
        </div>
      </div>
    );
  }

  if (error) {
    return <h1>error</h1>;
  }

  const { measures } = fields;

  const labels = measures.map(({ label }) => ({ label }));
  const serieData = Object.values(data[0]);

  const serie = {
    type: "bar",
    barMinHeight: "24px",
    barCategoryGap: "4px",

    label: {
      show: true,
      position: "outside",
      fontSize: "10px",
      color: "white",
      fontFamily: "Barlow",
      fontWeight: "500",
      formatter: ({ data }) => {
        return data.rendered;
      },
    },
    itemStyle: {
      color: function (params) {
        return colors[params.dataIndex];
      },
    },
    data: serieData,
  };

  const colors = [
    "#6A6158",
    "#B08C55",
    "#D9B683",
    "#2D428F",
    "#566AB6",
    "#6798B4",
    "#50B2B2",
  ];

  const option = {
    grid: {
      left: "4%",
      right: "4%",
      top: 0,
      bottom: 0,
      containLabel: true,
    },
    xAxis: {
      name: "amount",
      show: false,
      axisLabel: { show: false },
      axisTick: {
        show: false,
      },
      axisLine: {
        show: false,
      },
    },
    yAxis: {
      type: "category",
      inverse: true,
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        fontSize: "10px",
        color: "rgba(255, 255, 255, 0.8)",
        fontFamily: "Barlow",
        fontWeight: "500",

        formatter: function (params) {
          return params.toUpperCase();
        },
      },
      data: labels.map((item) => item.label),
    },
    series: [serie],
  };

  return (
    <div className="flex flex-col gap-4 animate-fade">
      <motion.span
        className="opacity-80 text-white text-lg font-semibold font-['Barlow'] tracking-tight"
        variants={varFade().inLeft}
        animate="animate"
        initial="initial"
      >
        {title}
      </motion.span>
      <ReactECharts
        className="tracking-chart"
        option={option}
        style={style}
        lazyUpdate
        opts={{
          renderer: "svg",
        }}
      />
    </div>
  );
}

BarChart.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  style: PropTypes.object,
};

export default BarChart;
