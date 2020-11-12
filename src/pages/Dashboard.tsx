import React, { useState } from "react";
import { Infobox } from "../components/infobox/Infobox";
import { SearchBar } from "../components/searchbar/SearchBar";
import { Sidemenu } from "../components/sidemenu/Sidemenu";
import convertMiliseconds from "../helpers/DateConverter";
import { GithubQueryData } from "../models/GithubQueryData";
import { Issue } from "../models/Issue";
import { MergedPullRequest } from "../models/MergedPullRequest";
import "./Dashboard.scss";

export const Dashboard = () => {
  
  const handleRequest = (githubData: GithubQueryData) => {
    setAverageIssueCloseTime(githubData.issueList);
    setAveragePullRequestMergeTime(githubData.mergedPullRequestList);
  };

  const [averageIssueCloseTime, setAverageIssueCloseTime] = useState(
    [] as Array<Issue>
  );

  const [
    averagePullRequestMergeTime,
    setAveragePullRequestMergeTime,
  ] = useState([] as Array<MergedPullRequest>);

  function averageIssueCloseTimeFunction(issueList: Array<Issue>) {
    let totalIssueMilisseconds = 0;

    issueList.forEach((issue) => {
      totalIssueMilisseconds +=
        new Date(issue.closedAt).getTime() -
        new Date(issue.createdAt).getTime();
    });
    return convertMiliseconds(totalIssueMilisseconds / issueList.length);
  }

  function averagePullRequestMergeTimeFunction(
    pullRequestList: Array<MergedPullRequest>
  ) {
    let totalIssueMilisseconds = 0;

    pullRequestList.forEach((pullRequestList) => {
      totalIssueMilisseconds +=
        new Date(pullRequestList.mergedAt).getTime() -
        new Date(pullRequestList.createdAt).getTime();
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
                <div>first area</div>
              </div>
              <div className="col-sm-12 col-md-6 mr-auto card align-items-center">
                <Infobox
                  title="Average Issue Close Time"
                  info={averageIssueCloseTime}
                  infoFunction={averageIssueCloseTimeFunction}
                ></Infobox>
              </div>
              <div className="col-sm-12 col-md-6 mr-auto card align-items-center">
                <Infobox
                  title="Average Pull Request Merge Time"
                  info={averagePullRequestMergeTime}
                  infoFunction={averagePullRequestMergeTimeFunction}
                ></Infobox>
              </div>
              <div className="col-sm-12 align-items-center card">
                SECOND AREA{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
