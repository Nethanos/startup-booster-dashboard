import React, { ReactNode, useEffect } from "react";
import Chart from "chart.js";
import "./VerticalChart.scss";

type VerticalChartProps = {
  chartData: any;
  buildChartFunction: Function;
  title?: string;
  chartId: string;
};

export const VerticalChart = (props: VerticalChartProps) => {
  function mountChart(chartData: any) {
    const chartRef = document.getElementById(
      props.chartId
    ) as HTMLCanvasElement;
    if (chartRef) {
      new Chart(chartRef, props.buildChartFunction(chartData));
    }
  }

  useEffect(() => {
    mountChart(props?.chartData);
  }, [props.chartData]);

  return (
    <>
      {props.title && <div className="chartTitle"> {props.title} </div>}

      <div className="card-body">
        <canvas className="canvas" id={props.chartId}></canvas>
      </div>
    </>
  );
};
