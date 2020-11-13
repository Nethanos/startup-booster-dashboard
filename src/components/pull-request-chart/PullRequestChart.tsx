import React, { useEffect, useState } from "react";
import convertMiliseconds from "../../helpers/DateConverter";
import { DetailedMergedPullRequest } from "../../models/DetailedMergedPullRequest";
import { PullRequestChart, PullRequestListBySize } from "../../models/PullRequestListBySize";
import { VerticalChart } from "./VerticalChart";

type PullRequestChartProps = {
  mergedPullRequestList: Array<DetailedMergedPullRequest>;
};

export const PullRequestVerticalChart = (props: PullRequestChartProps) => {

const [pullRequestChartData, setPullRequestChartData] = useState({} as PullRequestListBySize);  

function spreadPullRequestsBySize( pullRequestList: Array<DetailedMergedPullRequest>): void {

  function calculatePrSizeAndTime(prChart: PullRequestChart, pr: DetailedMergedPullRequest) {
    prChart.pullRequestSize++;
    prChart.pullRequestTimeInMili = new Date(pr.mergedAt).getTime() - new Date(pr.createdAt).getTime();
    prChart.pullRequestTimeString = convertMiliseconds(prChart.pullRequestTimeInMili, 'h').toString();
}

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

    setPullRequestChartData(pullRequestData);
}

  useEffect(() => {
    if(props.mergedPullRequestList.length)
      spreadPullRequestsBySize(props.mergedPullRequestList);
  }, [props.mergedPullRequestList]);

  const loadDataChart = () => {
    return pullRequestChartData.smallPullRequest ? 
    (<><VerticalChart pullRequestChartData={pullRequestChartData}></VerticalChart></>) 
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
