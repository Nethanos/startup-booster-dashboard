import { Issue } from "./Issue";
import { MergedPullRequest } from "./MergedPullRequest";

export interface GithubQueryData {
    issueList: Array<Issue>
    mergedPullRequestList: Array<MergedPullRequest>;
}