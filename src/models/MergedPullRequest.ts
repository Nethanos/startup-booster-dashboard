export type MergedPullRequest = {
    createdAt: Date;
    mergedAt: Date;
    closedAt: Date;
    additions: number;
    deletions: number;
}