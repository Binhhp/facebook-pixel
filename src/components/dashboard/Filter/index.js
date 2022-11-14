import { Suspense, useState } from "react";
import DateRange from "./DateRange";
import Pixel from "./Pixel";

function Filter(){
    //Dropdown filter timezones
    const [filterTime, setFilterTime] = useState({
        isActive: false,
        value: "Today",
        inSelected: false,
        showCalendar: false
    });
    return (
        <div className="dashboard-filter">
            <Suspense fallback={"Loading...."}>
                <DateRange 
                    filterTime={filterTime} 
                    setFilterTime={setFilterTime}></DateRange>
                <Pixel></Pixel>
            </Suspense>
        </div>
    )
}
export default Filter;