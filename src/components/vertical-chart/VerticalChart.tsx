import React, { useEffect, useState } from "react";
import Chart, { ChartTooltipLabelColor, ChartTooltipModel } from "chart.js";

type VerticalChartProps = {
  chartData: any;
  buildChartFunction: Function;
};

let chart = {} as Chart;

export const VerticalChart = (props: VerticalChartProps) => {

  
function mountChart(chartData: any) {
  const chartRef = document.getElementById("prChart") as HTMLCanvasElement;

  if(chart.canvas){
    chart.destroy();
  }
    chart = new Chart(chartRef, props.buildChartFunction(chartData) );
  }
 

  useEffect(() => {
    mountChart(props?.chartData);
  }, [props.chartData]);

  return (
    <>
      <canvas id="prChart"></canvas>
    </>
  );
};
