import React from 'react';

import './Loading.scss'

export const Loading = () => {
  return (
    <>
      <div className="progress-container">
        <div className="progress">
          <div className="progress-bar">
            <div className="progress-shadow"></div>
          </div>
        </div>
      </div>
    </>
  );
};
