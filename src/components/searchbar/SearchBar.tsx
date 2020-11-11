import React, { FormEvent, useState } from "react";
import { requestQuery } from "../../middlewares/ApolloClient";
import repositoryRequestQuery from './SearchBar.query';
import "./SearchBar.scss";

export const SearchBar = () => {
  const [owner, setOwner] = useState("");
  const [repository, setRepository] = useState("");

  const handleOwnerChange = (event: FormEvent<HTMLInputElement>): void => {
    setOwner(event?.currentTarget?.value);
  };

  const handleRepositoryChange = (event: FormEvent<HTMLInputElement>): void => {
    setRepository(event?.currentTarget?.value);
  };

  const searchForRepository = async (event: any): Promise<void> => {
    if (event.charCode === 13) {
      const { data } = await requestQuery(
        repositoryRequestQuery(owner, repository)
      );
      console.log(data);
    }
  };

  return (
    <>
      <div className="searchBarContent shadow-sm p-3 mb-5 bg-white rounded">
        <input
          className="userOrOrgInput"
          value={owner}
          onChange={handleOwnerChange}
          placeholder="User or Organization"
          type="text"
        />
        <input
          type="text"
          className="repoInput"
          value={repository}
          onKeyPress={searchForRepository}
          onChange={handleRepositoryChange}
          placeholder="Repository"
        />
      </div>
    </>
  );
};
