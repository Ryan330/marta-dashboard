import React from "react";
import MartaTrain from "./MartaTrain";


const MartaLine = (props) => {
    let filteredTrainArray = props.trainArray.filter(train => {
        return(train.LINE.toLowerCase() === props.lineName);
    });

    let trainComponents = filteredTrainArray.map(_convertTrainToElement);

    return (
        <div>
            {trainComponents}
        </div>
    );
}


const _convertTrainToElement = (train) => {
    return(
        <MartaTrain train={train}/>
    );
}

export default MartaLine;