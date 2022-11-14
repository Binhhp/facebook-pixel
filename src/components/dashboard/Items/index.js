import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserFriends } from '@fortawesome/free-solid-svg-icons'
import { Icon, SkeletonDisplayText } from "@shopify/polaris";
import { MinusMinor } from "@shopify/polaris-icons";
import { useContext } from "react";
import { FilterContext } from "../Contexts";
function Items(){
    const filterContext = useContext(FilterContext);
    return (
        <div className="dashboard-items">
            <div className="dashboard-items--pageItem">
            {
                (filterContext.data || defaultItems).map((x, index) => (
                    <div key={`page-${index}`} className="dashboard-items--page mr-5">
                        <div className="dashboard-items--header">
                            <div className="dashboard-items--title">{x?.Title || <SkeletonDisplayText size="small" />}</div>
                            <div className="dashboard-items--icon">
                                <FontAwesomeIcon icon={faUserFriends} />
                            </div>
                        </div>
                        <div className="dashboard-items--content">
                            <span className="dashboard-items--totalEvents">
                                {
                                    x?.TotalEvents 
                                    ? x.TotalEvents.toLocaleString("en-IN") 
                                    :   <div className="dashboard-items--totalEvents-empty">
                                            <Icon source={MinusMinor} color="base" />
                                            <Icon source={MinusMinor} color="base" />
                                            <Icon source={MinusMinor} color="base" />
                                        </div>
                                }
                            </span>
                            <span className="dashboard-items--conversation">Conversions API</span>
                        </div>
                    </div>
                ))
            } 
            </div>
        </div>
    )
}

const defaultItems = [
    {
        Title: "PageView"
    },
    {
        Title: "Initiate Checkout"
    },
    {
        Title: "Purchase"
    },
    {
        Title: "View Content"
    },
    {
        Title: "Add To Cart"
    }
]
export default Items;