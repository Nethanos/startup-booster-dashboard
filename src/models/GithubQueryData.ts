import { DetailedMergedPullRequest } from "./DetailedMergedPullRequest";
import { Issue } from "./Issue";
import { MergedPullRequest } from "./MergedPullRequest";

export interface GithubQueryData {
    issueList: Array<Issue>
    mergedPullRequestList: Array<DetailedMergedPullRequest>;
    issueListPerMonth: Array<Issue>;
    pullRequestListPerMonth: Array<MergedPullRequest>;
}