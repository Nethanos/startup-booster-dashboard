import React, { useEffect, useState } from "react";
import mountTimeString from "../../helpers/TimeStringFactory";
import "./Infobox.scss";

type InfoboxProps = {
  title: string;
  info?: any;
  infoFunction: Function;
};

export const Infobox = (infoBoxProps: InfoboxProps) => {
  const [timeString, setTimeString] = useState("");

  useEffect(() => {
    setTimeString(
      mountTimeString(infoBoxProps.infoFunction(infoBoxProps.info))
    );
  }, [infoBoxProps.info]);

  return (
    <>
      <div className="card infoboxCard col-sm-12 shadow-sm p-3 mb-5 bg-white rounded">
        <div className="chartTitle">{infoBoxProps.title}</div>
        <div className="card-body contentBody d-flex align-self-center">{timeString}</div>
      </div>
    </>
  );
};
