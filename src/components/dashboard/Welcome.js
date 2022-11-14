import React, { useState } from "react";
import notify from "../../assets/images/notify-dashboard.png";
import {
    CircleAlertMajor,
    MobileCancelMajor
  } from '@shopify/polaris-icons';
import { Icon } from "@shopify/polaris";

function Welcome(){
    const [hiddenWelcome, setHiddenCloseWelcome] = useState(false);
    const handleCloseWelcome = () => setHiddenCloseWelcome(true);
    return (
        <>
            <div className="dashboard-header">
                <img src={notify} alt="Welcome"  />
                <p>Here's what's happening with your store today</p>
            </div>
            {
                !hiddenWelcome && 
                <div className="dashboard-welcome--text">
                    <div className="dashboard-welcome--icon">
                        <Icon source={CircleAlertMajor} color="warning" />
                    </div>
                    <p>Analytics feature is enabled automatically for all events created in version 2.0.0 and later. Pages created before that need to be republished to start having analytics. (All events are tracked by Conversion API only)</p>
                    <div onClick={handleCloseWelcome} className="dashboard-welcome--close">
                        <Icon source={MobileCancelMajor} color="base" />
                    </div>
                </div>
            }
        </>
    )
}

export default React.memo(Welcome);