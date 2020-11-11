export default function repositoryRequestQuery(owner: string, name: string): string {
    return `query getDocuments { 
      repository(owner: "micronaut-projects", name: "micronaut-core") {

        Issues: issues(last: 100, filterBy: {states: CLOSED}) {
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
  		}
    }`;
  }