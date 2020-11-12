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
      <div className="infoboxCard">
        <div className="header">{infoBoxProps.title}</div>
        <div>{timeString}</div>
      </div>
    </>
  );
};
