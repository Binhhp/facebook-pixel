import { SkeletonBodyText, SkeletonDisplayText } from "@shopify/polaris";
import { useContext } from "react";
import notify from "../../../assets/images/notify-dashboard.png";
import config from "../../../config/config";
import { FilterContext } from "../Contexts";

function Posts(){
    const dashboardContext = useContext(FilterContext);
    return (
        <div className="dashboard-tabs--posts">
            <div className="post-header">
                <img src={notify} alt="What New" />
                <span>what's new</span>
            </div>
            <div className="post-content">
                <div className="list-post">
                {
                    dashboardContext.items.posts.length > 0 && dashboardContext.items.posts.map((post, index) => (
                        <div key={index} className="post-wrapper">
                            <div className="post-item">
                                <a href={`${post?.Link}`} rel="noreferrer" target="_blank" className="post-title">{post?.Title ? post?.Title : <SkeletonDisplayText size="small" />}</a>
                                <div className="post-desc">
                                    {
                                        post?.Description 
                                        ? post?.Description.length > 150 
                                            ? `${post.Description.subString(150, post.Description.length)}...` 
                                            : post.Description
                                        : <SkeletonBodyText />
                                    }
                                </div>
                                <div className="post-created">{post?.CreateAt ? FormatTimeStamp(post?.CreateAt) : <SkeletonDisplayText size="small" />}</div>
                            </div>
                            { index < (dashboardContext.items.posts.length - 1) ? <div className="dot"></div> : ''}
                        </div>
                    ))
                }
                </div>
                <div className="view-more-post">
                    <a href={`${config.linkViewMore}`} rel="noReferrer" target="_blank">View More</a>
                </div>
            </div>
        </div>
    )
}
function FormatTimeStamp(val) {
    const date = new Date(parseInt(val.replace("/Date(", "").replace(")/",""), 10));
    return date.getDate() + '/' + ((date.getMonth() + 1 < 10) ? `0${date.getMonth() + 1}` : (date.getMonth() + 1)) + '/' + date.getFullYear();
}
export default Posts;