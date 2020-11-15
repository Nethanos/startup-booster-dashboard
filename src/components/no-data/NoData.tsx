import React from 'react';
import './NoData.scss';

export const NoDataDisplay = () => {
    return (<> 
        <div className="d-flex justify-content-center d-flex align-items-center">
        <div className="noInfoLabel">
        <h2>NO INFO TO SHOW. PLEASE SEARCH A REPO.</h2>
        </div>
      </div></>)
}