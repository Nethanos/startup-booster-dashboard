import axios, { AxiosRequestConfig } from 'axios';

const ApiBaseUrl = 'https://api.github.com/graphql';

const requestConfig: AxiosRequestConfig = { 
    headers: {
        Authorization: `bearer ${process.env.REACT_APP_GITHUB_API_TOKEN}`
    }
}


function getRepositoryCreationTimeQuery(owner: string, repositoryName: string): string {
    return `{
        repository(owner: "${owner}", name: "${repositoryName}") {
            createdAt
        }
    }`
}

function getRepositoryQuery(owner: string, repositoryName: string): string {
    return ` {
        repository(owner: "${owner}", name: "${repositoryName}") {
            issues {
                totalCount
            }
        }
    }`
}

 function fetchRepository(query: string): Promise<any> {
    return axios.post(ApiBaseUrl, {query}, requestConfig);
}

export function getRepositoryIssuesAndPullRequests(owner: string, repositoryName: string) {

    return fetchRepository(getRepositoryQuery(owner, repositoryName));

}

export function getRepositoryCreationTime(owner: string, repositoryName: string) {
    return fetchRepository(getRepositoryCreationTimeQuery(owner, repositoryName));
}
