import { ChartConfiguration } from "chart.js";
import React, { useEffect, useState } from "react";
import convertMiliseconds from "../../helpers/DateConverter";
import { MergedPullRequest } from "../../models/MergedPullRequest";
import {PullRequestChart,PullRequestListBySize } from "../../models/PullRequestListBySize";
import { NoDataDisplay } from "../no-data/NoData";
import { VerticalChart } from "../vertical-chart/VerticalChart";
import './PullRequestChart.scss'

type PullRequestChartProps = {
  mergedPullRequestList: Array<MergedPullRequest>;
};


/**
 * @description responsible to build chartConfiguration object 
 * as a param of Chart Object from chart.js
 * @param pullRequestChartData 
 */
function buildChartOptions(pullRequestChartData: any): ChartConfiguration {
  
  const { smallPullRequest, mediumPullRequest, largePullRequest} = pullRequestChartData;

  const labels = ["Small", "Medium", "Large"];
  const dataset = [smallPullRequest, mediumPullRequest, largePullRequest];

  return {
    type: "bar",
    data: {
      labels,
      datasets: [
        {
          data: dataset.map((dataset) =>
            parseInt(dataset.pullRequestTimeString)
          ),
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
      maintainAspectRatio: false,
      tooltips: {
        backgroundColor: "white",
        titleFontColor: "black",
        titleFontSize: 0,
        bodyAlign: "center" as "center",
        titleAlign: "center" as "center",
        displayColors: false,
        bodyFontColor: "black",
        footerFontFamily: "'Roboto', sans-serif",
        callbacks: {
          label: (tooltipItem: any) => {
            return `Average Time - ${tooltipItem.value}h`;
          },
          afterLabel: (tooltipItem: any) => {
            return `Pull requests - ${
              dataset[tooltipItem.index].pullRequestTotalCount
            }`;
          },
        },
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
  };
}

export const PullRequestVerticalChart = (props: PullRequestChartProps) => {

  /**
   * @description responsible for calculate de average and format to days
   * @param prChart - type of chart model(small, medium or large)
   * @param pr - pull request data
   */
  function calculatePrSizeAndTime( prChart: PullRequestChart, pr: MergedPullRequest ) {
    prChart.pullRequestTotalCount++;
    prChart.pullRequestTimeInMili =
      new Date(pr.mergedAt).getTime() - new Date(pr.createdAt).getTime();
    prChart.pullRequestTimeString = convertMiliseconds(prChart.pullRequestTimeInMili, "h" ).toString();
  }

  const [pullRequestChartData, setPullRequestChartData] = useState( {} as PullRequestListBySize);


  /**
   * @description responsible for spread the full pull request data in a
   * list with each size
   * @param pullRequestList 
   */
  function spreadPullRequestsBySize(
    pullRequestList: Array<MergedPullRequest>
  ): void {
    let pullRequestData = new PullRequestListBySize();

    const { smallPullRequest: smlPr, mediumPullRequest: mdPr, largePullRequest: lgPr } = pullRequestData;

    pullRequestList.forEach((pr) => {
      const prSize = pr.additions + pr.deletions;
      if (prSize < 100) {
        calculatePrSizeAndTime(smlPr, pr);
      } else if (prSize < 1000) {
        calculatePrSizeAndTime(mdPr, pr);
      } else {
        calculatePrSizeAndTime(lgPr, pr);
      }
    });


    setPullRequestChartData(pullRequestData);
  }

  useEffect(() => {
    if (props.mergedPullRequestList.length)
      spreadPullRequestsBySize(props.mergedPullRequestList);
  }, [props.mergedPullRequestList]);

  const loadDataChart = () => {
    return pullRequestChartData.smallPullRequest ? (
      <>
        <VerticalChart
          chartId="pr-chart-by-size"
          title="Average Pull Request By Size"
          buildChartFunction={buildChartOptions}
          chartData={pullRequestChartData}
        ></VerticalChart>
      </>
    ) : (
      <div className="noDataField">
     <NoDataDisplay></NoDataDisplay>

      </div>
    );
  };

  return (
    <>
    <div className="col-sm-12 prChart">

    {loadDataChart()}

    </div>
    </>
  );
};
