import { GithubQueryData } from "../models/GithubQueryData";
import { Issue } from "../models/Issue"
import { MergedPullRequest } from "../models/MergedPullRequest";

export default function handleGithubData(githubData: any): GithubQueryData {
    const { Issues, MergedPullRequests } = githubData.repository;
    
    const issueList: Array<Issue> = Issues.nodes;

    const mergedPullRequestList: Array<MergedPullRequest> = MergedPullRequests.nodes;

    return { 
        issueList,
        mergedPullRequestList
    } as GithubQueryData;

}
