import React, { useState } from "react";
import { AveragePerMonthChart } from "../components/average-per-month-chart/AveragePerMonthChart";
import { Infobox } from "../components/infobox/Infobox";
import { PullRequestVerticalChart } from "../components/pull-request-chart/PullRequestChart";
import { SearchBar } from "../components/searchbar/SearchBar";
import { Sidemenu } from "../components/sidemenu/Sidemenu";
import convertMiliseconds from "../helpers/DateConverter";
import { DetailedMergedPullRequest } from "../models/DetailedMergedPullRequest";
import { GithubQueryData } from "../models/GithubQueryData";
import { Issue } from "../models/Issue";
import { MergedPullRequest } from "../models/MergedPullRequest";
import "./Dashboard.scss";

export const Dashboard = () => {


  /**
   * 
   * @description responsible for send the github data to each
   * component
   * @param githubData - wrapper of required data to use application
   */
  function handleRequest(githubData: GithubQueryData) {
    setAverageIssueCloseTime(githubData.issueList);
    setAveragePullRequestMergeTime(githubData.mergedPullRequestList);
    setIssueListPerMonth(githubData.issueListPerMonth);
  }


  /**
   * @description states of attributes that holds github request data 
   * already handled by application
   * 
   */
  const [averageIssueCloseTime, setAverageIssueCloseTime] = useState(
    [] as Array<Issue>
  );

  const [
    averagePullRequestMergeTime,
    setAveragePullRequestMergeTime,
  ] = useState([] as Array<DetailedMergedPullRequest>);

  const [issueListPetMonth, setIssueListPerMonth] = useState([] as Array<Issue>)


  /**
   * @description Responsible for calculate issue average close time 
   * @param issueList - last 100 issues from githubApi
   */
  function averageIssueCloseTimeFunction(issueList: Array<Issue>) {
    let totalIssueMilisseconds = 0;

    issueList.forEach((issue) => {
      totalIssueMilisseconds +=
        (new Date(issue.closedAt).getTime() -
        new Date(issue.createdAt).getTime());
    });
    return convertMiliseconds(totalIssueMilisseconds / issueList.length);
  }

  /**
   * @description responsible for calculate PR average merge time
   * @param pullRequestList - last 100 pull requests from githubApi
   */
  function averagePullRequestMergeTimeFunction(
    pullRequestList: Array<MergedPullRequest>
  ) {
    let totalIssueMilisseconds = 0;

    pullRequestList.forEach((pullRequestList) => {
      totalIssueMilisseconds +=
        (new Date(pullRequestList.mergedAt).getTime() -
        new Date(pullRequestList.createdAt).getTime());
    });
    return convertMiliseconds(totalIssueMilisseconds / pullRequestList.length);
  }

  return (
    <>
      <div className="mainContent">
        <div className="sideMenu">
          <Sidemenu></Sidemenu>
        </div>

        <div className="searchBar">
          <SearchBar onGithubRequest={handleRequest}></SearchBar>
        </div>

        <div className="dashboard">
          <div className="container">
            <div className="row">
              <div className="col-sm-12 align-items-center card">
                <PullRequestVerticalChart mergedPullRequestList={averagePullRequestMergeTime}></PullRequestVerticalChart>
              </div>

              <div id="issuesInfobox" className="col-sm-12 col-md-6 mr-auto card align-items-center">
                <Infobox
                  title="Average Issue Close Time"
                  info={averageIssueCloseTime}
                  infoFunction={averageIssueCloseTimeFunction}
                ></Infobox>
              </div>

              <div id="prInfoBox" className="col-sm-12 col-md-6 mr-auto card align-items-center">
                <Infobox
                  title="Average Pull Request Merge Time"
                  info={averagePullRequestMergeTime}
                  infoFunction={averagePullRequestMergeTimeFunction}
                ></Infobox>
              </div>

              <div className="col-sm-12 align-items-center card">
              <AveragePerMonthChart issueList={issueListPetMonth}></AveragePerMonthChart>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};
