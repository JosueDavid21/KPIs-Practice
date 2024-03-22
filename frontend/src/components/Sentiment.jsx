import React, { useEffect, useRef } from "react";
import * as echarts from "echarts/core";
import {
  ToolboxComponent,
  LegendComponent,
  TooltipComponent,
} from "echarts/components";
import { PieChart } from "echarts/charts";
import { LabelLayout } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";

import "./KPIs/KPI_emotions.css";

echarts.use([
  ToolboxComponent,
  LegendComponent,
  PieChart,
  CanvasRenderer,
  LabelLayout,
  TooltipComponent,
]);

const Sentiment = ({ data }) => {
  const chartRef = useRef(null);
  useEffect(() => {
    const option = {
      tooltip: {
        show: true,
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)",
      },
      legend: {
        top: "bottom",
      },
      toolbox: {
        show: true,
        feature: {
          saveAsImage: {
            show: true,
            title: "Descargar png",
            name: "Emociones",
          },
        },
      },
      color: ["#ee6666", "#5470c6", "#91cc75"],
      series: [
        {
          name: "Sentimientos",
          type: "pie",
          radius: [50, 100],
          center: ["50%", "40%"],
          roseType: "area",
          itemStyle: {
            borderRadius: 10,
            borderColor: "#fff",
            borderWidth: 3,
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 16,
              fontWeight: "bold",
            },
          },
          data: data,
        },
      ],
    };
    const myChart = echarts.init(chartRef.current);
    myChart.setOption(option);
  }, [data]);
  return <div ref={chartRef} className="sentiment"></div>;
};

export default Sentiment;
