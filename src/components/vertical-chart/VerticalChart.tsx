import React, { useEffect } from "react";
import Chart from "chart.js";

type VerticalChartProps = {
  chartData: any;
  buildChartFunction: Function;
  title: string;
  chartId: string;
};

let chart = {} as Chart;

export const VerticalChart = (props: VerticalChartProps) => {
  function mountChart(chartData: any) {
    const chartRef = document.getElementById(props.chartId) as HTMLCanvasElement;

    if (chart.canvas) {
      chart.destroy();
    }
    chart = new Chart(chartRef, props.buildChartFunction(chartData));
  }

  useEffect(() => {
    mountChart(props?.chartData);
  }, [props.chartData]);

  return (
    <>
      <div className="card">
        <div className="card-header">
          {props.title}
        </div>
        <canvas id={props.chartId}></canvas>
      </div>
    </>
  );
};
