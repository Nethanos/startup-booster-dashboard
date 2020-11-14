export default function repositoryRequestQuery(owner: string, name: string): string {
  const lastMonth = new Date();
  lastMonth.setMonth(lastMonth.getMonth() - 1);
    return `query getDocuments { 
      repository(owner: "${owner}", name: "${name}") {
         Issues: issues(last: 100, filterBy: {states: CLOSED}) {
                totalCount,
                nodes {
                  createdAt,
                  closedAt
                }
        },
         MergedPullRequests: pullRequests(last: 100, states: MERGED) {
              nodes {
                createdAt,
                mergedAt,
                additions,
                deletions
              }
         },      
          IssuesPerMonth: issues(last: 100, filterBy: {states: [OPEN], since: "${lastMonth.toISOString()}"}) {
            nodes {
              createdAt,
              closedAt,
            }
          }
  },
     pullRequestsPerMonth: search(query: "repo:${owner}/${name} is:pr created:>${lastMonth.toISOString()} ", type: ISSUE, last: 100) {
              nodes {
                ... on PullRequest {
                  createdAt,
                  closedAt,
                  mergedAt
                }
              }
          }
    }`;
  }