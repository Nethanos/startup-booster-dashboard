import React from "react";
import { SearchBar } from "../components/searchbar/SearchBar";
import { Sidemenu } from "../components/sidemenu/Sidemenu";
import "./Dashboard.scss";

export const Dashboard = () => {


  const handleRequest = (githubRequest:any) => {
  }


  return (
    <>
      <div className="mainContent">
        <div className="sideMenu">
          <Sidemenu></Sidemenu>
        </div>

        <div className="searchBar">
          <SearchBar onGithubRequest={handleRequest}></SearchBar>
        </div>

        <div className="dashboard">
          <div className="container">
            <div className="row">
              <div className="col-sm-12 align-items-center card">
                <div>first area</div>
              </div>
              <div className="col-sm-12 col-md-6 mr-auto card align-items-center">
                INFOBOX
              </div>
              <div className="col-sm-12 col-md-6 mr-auto card align-items-center">
                INFOBOX
              </div>
              <div className="col-sm-12 align-items-center card">
                SECOND AREA{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
