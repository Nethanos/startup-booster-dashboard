export class MonthChartData {
    dataPerMonth: Array<MonthChartPerDay>

    constructor() {
        this.dataPerMonth = new Array<MonthChartPerDay>();
        for(let dayQuantity = 30; dayQuantity >= 0; dayQuantity--){
            this.dataPerMonth[dayQuantity] = new MonthChartPerDay();
             let currentDay = new Date();
             currentDay.setDate(currentDay.getDate() - dayQuantity);
             this.dataPerMonth[dayQuantity].day = currentDay;
        }
    }
}


class MonthChartPerDay {

    day: Date;
    totalPullRequestsOrIssuesOpened: number;
    totalPullRequestsOrIssuesClosed: number;

    constructor() {
        this.day = new Date();
        this.totalPullRequestsOrIssuesClosed = 0;
        this.totalPullRequestsOrIssuesOpened = 0;
    }
}