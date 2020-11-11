import React, { FormEvent, useState } from "react";
import { requestQuery } from "../../middlewares/ApolloClient";
import repositoryRequestQuery from './SearchBar.query';
import "./SearchBar.scss";

type SearchBarProps = {
  onGithubRequest: Function
}

export const SearchBar = (searchBarProps: SearchBarProps) => {


  const [owner, setOwner] = useState("");
  const [repository, setRepository] = useState("");

  const handleInputChange = (event: FormEvent<HTMLInputElement>, setterFunction: Function): void => {
    setterFunction(event?.currentTarget?.value);
  };


  const searchForRepository = async (event: any): Promise<void> => {
    if (event.charCode === 13) {
      const { data } = await requestQuery(
        repositoryRequestQuery(owner, repository)
      );
        searchBarProps.onGithubRequest(data);
    }
  };

  return (
    <>
      <div className="searchBarContent shadow-sm p-3 mb-5 bg-white rounded">
        <input
          className="userOrOrgInput"
          value={owner}
          onChange={(e) => handleInputChange(e, setOwner)}
          placeholder="User or Organization"
          type="text"
        />
        {owner}
        <input
          type="text"
          className="repoInput"
          value={repository}
          onKeyPress={searchForRepository}
          onChange={(e) => handleInputChange(e, setRepository)}
          placeholder="Repository"
        />
      </div>
    </>
  );
};
