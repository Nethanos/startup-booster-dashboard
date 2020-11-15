import { ChartConfiguration, ChartOptions } from "chart.js";
import React, { useEffect, useState } from "react";
import { getExactDate } from "../../helpers/DateConverter";
import { Issue } from "../../models/Issue";
import { MergedPullRequest } from "../../models/MergedPullRequest";
import { MonthChartData } from "../../models/MonthChartData";
import { VerticalChart } from "../vertical-chart/VerticalChart";
import "./AveragePerMonthChart.scss";

type AveragePerMonthChartProps = {
  issueList: Array<Issue>;
  pullRequestList: Array<MergedPullRequest>;
};

export const AveragePerMonthChart = (props: AveragePerMonthChartProps) => {
  const [selectedChart, setSelectedChart] = useState("ISSUES");

  const commonChartOptions: ChartOptions = {
    elements: {
      point: {
        radius: 0,
      },
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
            stepSize: 1,
          },
        },
      ],
    },
  };

  function getDateMonthParsed(date: Date) {
    return `${date.getDate()}/${date.getMonth()}`;
  }

  function buildMonthPRData(data: MonthChartData) {
    let monthChartData = new MonthChartData();

    monthChartData.dataPerMonth.forEach((data) => {
      props.pullRequestList.forEach((pullRequest) => {
        if (
          getExactDate(new Date(pullRequest.createdAt)) ===
          getExactDate(data.day)
        ) {
          data.totalPullRequestsOrIssuesOpened++;
        }
        if (
          getExactDate(new Date(pullRequest.closedAt)) ===
          getExactDate(data.day)
        ) {
          data.totalPullRequestsOrIssuesClosed++;
        }
        if (
          getExactDate(new Date(pullRequest.mergedAt)) ===
          getExactDate(data.day)
        ) {
          data.totalPullRequestsMerged++;
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
            label: "Closed Pull Requests",
            backgroundColor: "red",
            borderColor: "red",
            pointBackgroundColor: "red",
            fill: false,
          },
          {
            data: monthChartData.dataPerMonth.map(
              (data) => data.totalPullRequestsOrIssuesOpened
            ),
            label: "Opened Pull Requests",
            backgroundColor: "green",
            borderColor: "green",
            pointBackgroundColor: "green",
            fill: false,
          },
          {
            data: monthChartData.dataPerMonth.map(
              (data) => data.totalPullRequestsMerged
            ),
            label: "Merged Pull Requests",
            backgroundColor: "blue",
            borderColor: "blue",
            pointBackgroundColor: "blue",
            fill: false,
          },
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
            fill: false,
          },
          {
            data: monthChartData.dataPerMonth.map(
              (data) => data.totalPullRequestsOrIssuesOpened
            ),
            label: "Opened Issues",
            backgroundColor: "green",
            borderColor: "green",
            pointBackgroundColor: "green",
            fill: false,
          },
        ],
      },
      options: commonChartOptions,
    };
  }

  useEffect(() => {
    buildMonthIssueChartData();
  }, [props.issueList, props.pullRequestList]);

  function loadSelectedChart() {
    return (
      <>
        <div className="monthHeader col-sm-12">
          <div className="chartTitle"> Month Summary </div>
          <div
            className="btn-group container"
            role="group"
            aria-label="Basic example"
          >
            <button
              className={`col-md-2 wizard ${selectedChart === 'ISSUES' ? "selected" : "unselected"}`}
              onClick={() => setSelectedChart("ISSUES")}
              type="button"
            >
              <p className="wizard-label">Issues</p>
              {props.issueList.length}
            </button>
            <button
              className={`wizard ${selectedChart === 'PRS' ? "select" : "unselected"}`}
              onClick={() => setSelectedChart("PRS")}
              type="button"
            >
              <p className="wizard-label">Pull Requests</p>
              {props.pullRequestList.length}
            </button>
          </div>
        </div>

      <div className="col-sm-12">
      {selectedChart === "ISSUES" ? (
          <VerticalChart
            chartId="issue-by-month-chart"
            chartData={props.issueList}
            buildChartFunction={buildMonthIssueChartData}
          ></VerticalChart>
        ) : (
          <VerticalChart
            chartId="pr-by-month-chart"
            chartData={props.pullRequestList}
            buildChartFunction={buildMonthPRData}
          ></VerticalChart>
        )}
      </div>
       
      </>
    );
  }

  function loadChartData() {
    return props.issueList.length ? loadSelectedChart() : <h1>No Data</h1>;
  }

  return <>{loadChartData()}</>;
};
