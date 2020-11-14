import { ChartConfiguration, ChartOptions } from "chart.js";
import React, { useEffect, useState } from "react";
import { getExactDate } from "../../helpers/DateConverter";
import { Issue } from "../../models/Issue";
import { MergedPullRequest } from "../../models/MergedPullRequest";
import { MonthChartData } from "../../models/MonthChartData";
import { VerticalChart } from "../vertical-chart/VerticalChart";

type AveragePerMonthChartProps = {
  issueList: Array<Issue>;
  pullRequestList?: Array<MergedPullRequest>
};


export const AveragePerMonthChart = (props: AveragePerMonthChartProps) => {


  const [selectedChart, setSelectedChart] = useState('ISSUES');

  const commonChartOptions: ChartOptions = {
    elements: {
      point: {
        radius: 0
      }
    },
    scales: {
      xAxes: [
        {
          ticks: {
            stepSize: 5,
          },
        },
      ],
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            stepSize: 1
          }
        }
      ]
    },
  }

  function getDateMonthParsed(date: Date) {
    return `${date.getDate()}/${date.getMonth()}`;
  }


  function buildMonthPullRequestsChartData(): ChartConfiguration {

    let monthChartData = new MonthChartData();

    monthChartData.dataPerMonth.forEach((data) => {
      props.issueList.forEach((issue) => {
        if (
          getExactDate(new Date(issue.createdAt)) === getExactDate(data.day)
        ) {
          data.totalPullRequestsOrIssuesOpened++;
        }
        if (getExactDate(new Date(issue.closedAt)) === getExactDate(data.day)) {
          data.totalPullRequestsOrIssuesClosed++;
        }
      });
    });
    return {
      type: "line",
      data: {
        labels: monthChartData.dataPerMonth
          .reverse()
          .map((data) => getDateMonthParsed(data.day)),
        datasets: [
          {
            data: monthChartData.dataPerMonth.map(
              (data) => data.totalPullRequestsOrIssuesClosed
            ),
            label: "Closed Issues",
            backgroundColor: "red",
            borderColor: "red",
            pointBackgroundColor: "red",
            fill: false
          },
          {
            data: monthChartData.dataPerMonth.map(
              (data) => data.totalPullRequestsOrIssuesOpened
            ),
            label: "Opened Issues",
            backgroundColor: "green",
            borderColor: "green",
            pointBackgroundColor: "green",
            fill: false
          }
        ],
      },
      options: commonChartOptions,
    };

  }

  function buildMonthIssueChartData(): ChartConfiguration {
    let monthChartData = new MonthChartData();

    monthChartData.dataPerMonth.forEach((data) => {
      props.issueList.forEach((issue) => {
        if (
          getExactDate(new Date(issue.createdAt)) === getExactDate(data.day)
        ) {
          data.totalPullRequestsOrIssuesOpened++;
        }
        if (getExactDate(new Date(issue.closedAt)) === getExactDate(data.day)) {
          data.totalPullRequestsOrIssuesClosed++;
        }
      });
    });
    return {
      type: "line",
      data: {
        labels: monthChartData.dataPerMonth
          .reverse()
          .map((data) => getDateMonthParsed(data.day)),
        datasets: [
          {
            data: monthChartData.dataPerMonth.map(
              (data) => data.totalPullRequestsOrIssuesClosed
            ),
            label: "Closed Issues",
            backgroundColor: "red",
            borderColor: "red",
            pointBackgroundColor: "red",
            fill: false
          },
          {
            data: monthChartData.dataPerMonth.map(
              (data) => data.totalPullRequestsOrIssuesOpened
            ),
            label: "Opened Issues",
            backgroundColor: "green",
            borderColor: "green",
            pointBackgroundColor: "green",
            fill: false
          }
        ],
      },
      options: commonChartOptions,
    };
  }

  useEffect(() => {
    buildMonthIssueChartData();
  }, [props.issueList]);




  function loadSelectedChart() {
    return selectedChart === 'ISSUES' ?
    (  <>
      <VerticalChart
        title="Month Summary"
        chartId="issue-by-month-chart"
        chartData={props.issueList}
        buildChartFunction={buildMonthIssueChartData}
      ></VerticalChart></>
      ) : (<>
      <VerticalChart
          title="Month Summary"
          chartId="pr-by-month-chart"
          chartData={props.issueList}
          buildChartFunction={buildMonthPullRequestsChartData}
        ></VerticalChart>
        </>)

  }


  function loadChartData() {
    return props.issueList.length ? 
    loadSelectedChart() : <h1>No Data</h1>
  }

  return <>{loadChartData()}</>;
};
