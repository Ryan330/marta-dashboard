//Init React
import React from "react";


//Train Function
const MartaTrain = ({train}) => {
    return(
        <div className="trainCardContainer">
            <div className="trainCard">
                <p key={train.TRAIN_ID}>
                    {train.DESTINATION},
                    {train.LINE},
                    {train.DIRECTION},
                    {train.WAITING_TIME}
                </p>
            </div>
        </div>
    );
}


export default MartaTrain;