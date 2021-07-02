import React, { useState } from "react";

const Dashboard = ({ dataParentToChild }) => {



    return (
        <div>
            
            ---------{console.log(dataParentToChild)}
            {dataParentToChild}
        </div>
    )
}

export default Dashboard