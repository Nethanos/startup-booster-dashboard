import React, { useState } from "react";
import { requestQuery } from "../../middlewares/ApolloClient";
import handleGithubData from "../../middlewares/GithubApiHandler";
import { Loading } from "../loading/Loading";
import repositoryRequestQuery from "./SearchBar.query";
import "./SearchBar.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type SearchBarProps = {
  onGithubRequest: Function;
};

export const SearchBar = (searchBarProps: SearchBarProps) => {
  const notifyError = (message: string) =>
    toast.error(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const [isLoading, setIsLoading] = useState(false);

  const [owner, setOwner] = useState("");
  const [repository, setRepository] = useState("");

  const searchForRepository = async (event: any): Promise<void> => {
    if (event.charCode === 13) {
      if(!isInputValid()) {
        notifyError("Please fill in all fields!");
        return;
      }   
      setIsLoading(true);
      try {
        const data = await requestQuery(
          repositoryRequestQuery(owner, repository)
        );
        const githubData = handleGithubData(data);
        searchBarProps.onGithubRequest(githubData);
      }catch(e) {
        notifyError(e.toString());
      }
      setIsLoading(false);

    
    }
  };

  function isInputValid(): boolean {
    return !!owner && !!repository;
  }

  return (
    <>
      <ToastContainer />
      <div className="searchBarContent shadow-sm p-3 bg-white rounded">
        <input
          className="userOrOrgInput"
          value={owner}
          onKeyPress={searchForRepository}
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
