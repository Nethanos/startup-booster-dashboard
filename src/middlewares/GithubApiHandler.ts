import { GithubQueryData } from "../models/GithubQueryData";
import { Issue } from "../models/Issue"
import { MergedPullRequest } from "../models/MergedPullRequest";

export default function handleGithubData(githubData: any): GithubQueryData {

    const { Issues, MergedPullRequests, IssuesPerMonth } = githubData.data.repository;
    const pullRequestListPerMonth =  githubData.data.pullRequestsPerMonth.nodes
    
    const issueList: Array<Issue> = Issues.nodes;

    const mergedPullRequestList: Array<MergedPullRequest> = MergedPullRequests.nodes;

    const issueListPerMonth = IssuesPerMonth.nodes;

    return { 
        issueList,
        mergedPullRequestList,
        issueListPerMonth,
        pullRequestListPerMonth
    } as GithubQueryData;

}
