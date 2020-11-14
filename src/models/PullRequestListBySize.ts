
export class PullRequestChart {
    pullRequestTimeInMili: number;
    pullRequestTimeString: string;
    pullRequestTotalCount: number; //PR total count

    constructor(pullRequestTimeInMiLi: number, pullRequestTimeString: string, pullRequestTotalCount: number) {
        this.pullRequestTimeInMili = pullRequestTimeInMiLi;
        this.pullRequestTimeString = pullRequestTimeString;
        this.pullRequestTotalCount = pullRequestTotalCount;
    }
}

export class PullRequestListBySize {

    smallPullRequest: PullRequestChart;
    mediumPullRequest: PullRequestChart;
    largePullRequest: PullRequestChart;
    
     constructor() {
        this.smallPullRequest = new PullRequestChart(0, '', 0);
        this.mediumPullRequest = new PullRequestChart(0, '', 0);
        this.largePullRequest = new PullRequestChart(0, '', 0);
    
     }

   
}