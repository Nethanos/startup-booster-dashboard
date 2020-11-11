import { MergedPullRequest } from "./MergedPullRequest";

export interface DetailedMergedPullRequest extends MergedPullRequest {
    additions: number;
    deletions: number;
}