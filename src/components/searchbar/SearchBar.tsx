import React, { useState } from "react";
import { requestQuery } from "../../middlewares/ApolloClient";
import handleGithubData from "../../middlewares/GithubApiHandler";
import { Loading } from "../loading/Loading";
import repositoryRequestQuery from './SearchBar.query';
import "./SearchBar.scss";

type SearchBarProps = {
  onGithubRequest: Function
}

export const SearchBar = (searchBarProps: SearchBarProps) => {

  const [isLoading, setIsLoading] = useState(false)

  const [owner, setOwner] = useState("");
  const [repository, setRepository] = useState("");

  const searchForRepository = async (event: any): Promise<void> => {
    if (event.charCode === 13) {
      setIsLoading(true);
    requestQuery(repositoryRequestQuery(owner, repository)).then(data => {
      const githubData = handleGithubData(data);
      setIsLoading(false); 
      searchBarProps.onGithubRequest(githubData);
    }).catch(errors => {
      console.error(errors);
    }).finally(() => setIsLoading(false));
    }
  };

  return (
    <>
      <div className="searchBarContent shadow-sm p-3 bg-white rounded">
        <input
          className="userOrOrgInput"
          value={owner}
          onChange={(e) => setOwner(e?.target.value)}
          placeholder="User or Organization"
          type="text"
        />
        <input
          type="text"
          className="repoInput"
          value={repository}
          onKeyPress={searchForRepository}
          onChange={(e) => setRepository(e?.target?.value)}
          placeholder="Repository"
        />
      </div>
      <div className="loadingContainer mb-5">
      {isLoading && <Loading></Loading>}

      </div>
    </>
  );
};
