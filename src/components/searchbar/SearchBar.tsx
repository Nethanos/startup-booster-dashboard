import React, { useState } from "react";
import { requestQuery } from "../../middlewares/ApolloClient";
import handleGithubData from "../../middlewares/GithubApiHandler";
import repositoryRequestQuery from './SearchBar.query';
import "./SearchBar.scss";

type SearchBarProps = {
  onGithubRequest: Function
}

export const SearchBar = (searchBarProps: SearchBarProps) => {

  const [owner, setOwner] = useState("");
  const [repository, setRepository] = useState("");

  const searchForRepository = async (event: any): Promise<void> => {
    if (event.charCode === 13) {
      const { data } = await requestQuery(
        repositoryRequestQuery(owner, repository)
      );
       const githubData = handleGithubData(data);
       searchBarProps.onGithubRequest(githubData)
    }
  };

  return (
    <>
      <div className="searchBarContent shadow-sm p-3 mb-5 bg-white rounded">
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
    </>
  );
};
