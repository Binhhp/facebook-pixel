import { Button, DatePicker, Popover, TextField } from "@shopify/polaris";
import React, { useCallback, useState } from "react";
import { useContext } from "react";
import { FormatTime, LastDaysFromDate } from "../../../config/timePicker";
import { FilterContext } from "../Contexts";
import Dropdown from "./Dropdown";
function DateRange({ 
    filterTime, 
    setFilterTime, 
}){
    //Date range dropdown
    const [activeDateRange, setActiveDateRange] = useState({
        isActive: false,
        value: "Today",
    });
    const filterContext = useContext(FilterContext);
    const toggleActive = () => {
        if(filterTime?.inSelected){
            setTimeout(() => {
                setFilterTime({ ...filterTime, inSelected: false });
            }, 100);
        }
        else{
            setFilterTime({ ...filterTime, isActive: !filterTime.isActive });
        }
    }
    const activatorFilterTime = (
        <Button onClick={toggleActive} disclosure>
          {filterTime.value}
        </Button>
    );
    
    const yearToDay = new Date().getFullYear();
    const monthly = new Date().getMonth() + 1;
    const [{month, year}, setDate] = useState({ month: monthly, year: yearToDay });

    const handleMonthChange = useCallback(
        (month, year) => {
            setDate({month, year})
        },
        [],
    );
    const handleChangeStart = (newValue) => {
        filterContext.timezone.updateStart(newValue)
    };
    const handleChangeEnd = (newValue) => {
        filterContext.timezone.updateEnd(newValue)
    };

    const toggleActiveDateRange = () => setActiveDateRange({ ...activeDateRange, isActive: !activeDateRange.isActive });
    const handleSelectDateRange = (dateRange) => () => {
        var days, label;
        let today = new Date();
        switch (dateRange){
            case "yesterday":
                days = 1; label = "Yesterday";
                break;

            case "7days":
                days = 7; label = "Last 7 days";
                break;

            case "30days":
                days = 30; label = "Last 30 days";
                break;

            case "60days":
                days = 60; label = "Last 60 days";
                break;
            case "custom":
                days = 0; label = "Custom";
                break;
            default: days = 0; label = "Today";
        }
        if(days > 0){
            today.setHours(0);
            today.setMinutes(0);
            today.setSeconds(0);
        }
        if(days > 1){
            today = LastDaysFromDate(new Date(), 1);
        }
        const last = LastDaysFromDate(new Date(), days);
        setActiveDateRange({
            ...activeDateRange, value: label, isActive: false
        });
        const filterTimeState = {...filterTime, value: label, inSelected: true };
        if(dateRange !== "custom") {
            filterTimeState["showCalendar"] = false;
        }
        setFilterTime(filterTimeState);
        return filterContext.timezone.update({start: last, end: today});
    }

    const handleShowCalendar = () => {
        const value = {...filterTime, isActive: true, value: "Custom", inSelected: true, showCalendar: true };
        setFilterTime(value);
        setActiveDateRange({
            ...activeDateRange, value: "Custom", isActive: false
        });
    }

    const handleResetDate = () => {
        filterContext.timezone.reset();
        if(!filterTime?.showCalendar){
            setActiveDateRange({ ...activeDateRange, value: "Today" });
            setFilterTime({...filterTime, value: "Today" });
        }
    }

    const handleSelectedDate = async () => {
        if(filterContext.filter.pixelId){
            setFilterTime({...filterTime, isActive: false });
            const start = new Date(filterContext.filter.start);
            const end = new Date(filterContext.filter.end);
            filterContext.timezone.update({ start: start, end: end });
            await filterContext.fetchAnalytics(start, end);
        }
    }

    const handleChangeDate = (date) => {
        filterContext.timezone.update({ ...date });
    };
    return (
        <div className="dashboard-filter--time">
            <Popover
                preventFocusOnClose={true}
                sectioned
                ariaHaspopup={false}
                preferredPosition="mostSpace"
                fluidContent={true}
                active={filterTime.isActive}
                activator={activatorFilterTime}
                onClose={toggleActive}>
               <div className="dashboard-filter--date">
                    <div className="dashboard-filter-timezones">
                        <span>Date range</span>
                        <Dropdown
                            showCalendar={handleShowCalendar}
                            activeDateRange={activeDateRange}
                            toggleActiveDateRange={toggleActiveDateRange}
                            handleSelectDateRange={handleSelectDateRange}
                        ></Dropdown>
                    </div>
                    <div className="dashboard-filter--monthly">
                        {
                            filterTime.showCalendar
                            ? <React.Fragment>
                                <div className="dashboard-filter--monthlyText" style={{display: 'flex', flexDirection: 'row'}}>
                                    <div className="input-time mr">
                                        <TextField
                                            id="start-time"
                                            value={FormatTime(new Date(filterContext.filter.start))}
                                            onChange={handleChangeStart}
                                            label="Starting"
                                            type="text"
                                            disabled/>
                                    </div>
                                    <div className="input-time ml">
                                        <TextField
                                            disabled
                                            onChange={handleChangeEnd}
                                            id="end-time"
                                            value={FormatTime(new Date(filterContext.filter.end))}
                                            label="Ending"
                                            type="text"/>
                                    </div>
                                </div>
                                <div style={{ marginTop: "20px" }}>
                                    <DatePicker
                                        id="datePicker"
                                        month={month}
                                        year={year}
                                        disableDatesAfter={new Date()}
                                        disableDatesBefore={LastDaysFromDate(new Date(), 60)}
                                        onChange={handleChangeDate}
                                        onMonthChange={handleMonthChange}
                                        selected={{
                                            start: new Date(filterContext.filter.start),
                                            end: new Date(filterContext.filter.end)
                                        }}
                                        multiMonth
                                        allowRange
                                    />
                                </div>
                            </React.Fragment>
                            : ""
                        }
                        <div className="dashboard-filter--submit" style={{ display: "flex" }}>
                            <Button disabled={!filterContext.filter.pixelId} onClick={handleSelectedDate} id="selected">Selected DateTime</Button>
                            <Button onClick={handleResetDate} id="reset">Reset DateTime</Button>
                        </div>
                    </div>
               </div>
            </Popover>
        </div>
    )
}
export default React.memo(DateRange);
