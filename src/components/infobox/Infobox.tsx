import React from 'react';
import './Infobox.scss';


type InfoboxProps = {
    title: string;
}

export const Infobox = (infoBoxProps: InfoboxProps) => {

    return (<>
    
   <div className="infoboxCard">
        <div className="header">
            {infoBoxProps.title}
        </div>
   </div>

    </>)
}