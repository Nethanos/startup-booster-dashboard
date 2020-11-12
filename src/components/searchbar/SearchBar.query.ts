export default function repositoryRequestQuery(owner: string, name: string): string {
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
          
      }
    }`;
  }