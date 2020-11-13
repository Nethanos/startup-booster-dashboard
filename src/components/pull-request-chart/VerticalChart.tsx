import React, { useEffect, useState } from "react";
import Chart, { ChartTooltipLabelColor, ChartTooltipModel } from "chart.js";
import { PullRequestListBySize } from "../../models/PullRequestListBySize";

type VerticalChartProps = {
  pullRequestChartData: PullRequestListBySize;
};


let chart = {} as Chart;
function buildChartOptions(pullRequestChartData: PullRequestListBySize){
    const {
        smallPullRequest,
        mediumPullRequest,
        largePullRequest,
      } = pullRequestChartData;
    
      const labels = ["Small", "Medium", "Big"];
      const dataset = [
        smallPullRequest,
        mediumPullRequest,
        largePullRequest,
      ];

      console.log(dataset);

   return {
        type: "bar",
        data: {
          labels,
          datasets: [
            {
              data: dataset.map((dataset) => parseInt(dataset.pullRequestTimeString)),
              backgroundColor: [
                "rgba(66, 135, 245)",
                "rgba(66, 135, 245)",
                "rgba(66, 135, 245)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          tooltips: {
            backgroundColor: 'white',
            titleFontColor: 'black',
            titleFontSize: 0,
            bodyAlign: 'center' as 'center',
            titleAlign: 'center' as 'center',
            displayColors: false,
            bodyFontColor: 'black',
            footerFontFamily: "'Roboto', sans-serif",
            callbacks: {
              label: (tooltipItem: any) => {
                return `Average Time - ${tooltipItem.value}h`;
              },
              afterLabel: (tooltipItem: any) => {
                return `Pull requests - ${dataset[tooltipItem.index].pullRequestSize}`;
              }
              
            }
          },
          legend: {
            display: false,
          },
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                  stepSize: 8,
                  callback: (value: any) => {
                    return `${value}h`;
                  },
                },
              },
            ],
          },
        },
      }
}

function mountChart(pullRequestChartData: PullRequestListBySize) {
  const chartRef = document.getElementById("prChart") as HTMLCanvasElement;

  if(chart.canvas){
    chart.destroy();
  }
    chart = new Chart(chartRef, buildChartOptions(pullRequestChartData));
  }
 


export const VerticalChart = (props: VerticalChartProps) => {
  useEffect(() => {
    mountChart(props?.pullRequestChartData);
  }, [props.pullRequestChartData]);

  return (
    <>
      <canvas id="prChart"></canvas>
    </>
  );
};
