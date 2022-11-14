import Banner from "./Banner";
import Posts from "./Posts";

function Tabs(){
    return (
        <div className="dashboard-tabs">
            <Banner></Banner>
            <Posts></Posts>
        </div>
    )
}

export default Tabs;