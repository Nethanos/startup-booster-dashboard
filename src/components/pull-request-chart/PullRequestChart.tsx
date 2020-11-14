import React, { useEffect, useState } from "react";
import convertMiliseconds from "../../helpers/DateConverter";
import { DetailedMergedPullRequest } from "../../models/DetailedMergedPullRequest";
import { PullRequestChart, PullRequestListBySize } from "../../models/PullRequestListBySize";
import { VerticalChart } from "../vertical-chart/VerticalChart";

type PullRequestChartProps = {
  mergedPullRequestList: Array<DetailedMergedPullRequest>;
};



function buildChartOptions(pullRequestChartData: any){
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
              return `Pull requests - ${dataset[tooltipItem.index].pullRequestTotalCount}`;
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


export const PullRequestVerticalChart = (props: PullRequestChartProps) => {

  function calculatePrSizeAndTime(prChart: PullRequestChart, pr: DetailedMergedPullRequest) {
    prChart.pullRequestTotalCount++; //totalCount
    prChart.pullRequestTimeInMili = new Date(pr.mergedAt).getTime() - new Date(pr.createdAt).getTime();
    prChart.pullRequestTimeString = convertMiliseconds(prChart.pullRequestTimeInMili, 'h').toString();
}

const [pullRequestChartData, setPullRequestChartData] = useState({} as PullRequestListBySize);  

function spreadPullRequestsBySize( pullRequestList: Array<DetailedMergedPullRequest>): void {

   let pullRequestData = new PullRequestListBySize()

    const {smallPullRequest: smlPr, mediumPullRequest: mdPr, largePullRequest: lgPr} = pullRequestData;

    pullRequestList.forEach((pr) => {
      const prSize = pr.additions + pr.deletions;
      if(prSize < 100) {
        calculatePrSizeAndTime(smlPr, pr);
      }else if(prSize < 1000) {
        calculatePrSizeAndTime(mdPr, pr);
      }else {
        calculatePrSizeAndTime(lgPr, pr);
      }
    });

    //calculate media

    setPullRequestChartData(pullRequestData);
}

  useEffect(() => {
    if(props.mergedPullRequestList.length)
      spreadPullRequestsBySize(props.mergedPullRequestList);
  }, [props.mergedPullRequestList]);

  const loadDataChart = () => {
    return pullRequestChartData.smallPullRequest ? 
    (<><VerticalChart buildChartFunction={buildChartOptions} chartData={pullRequestChartData}></VerticalChart></>) 
    : <h2>No Data To Display</h2>
  }

  return (<>
  <div className="card">
      <div className="card-header">
    Average Pull Request by Size
      </div>
  <div className="card-body">
    {loadDataChart()}
  </div>
  </div>
  </>);
};
