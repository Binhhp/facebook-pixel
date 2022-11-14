
export function FormatTime(time = ""){
    if(time){
        const date = new Date(time);
        const format = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();
        return format;
    }
    else{
        const dateToDay = new Date();
        return (dateToDay.getMonth() + 1) + "/" + dateToDay.getDate() + "/" + dateToDay.getFullYear();
    }
}

export function LastDaysFromDate(date, days){
    try{
        var last = new Date(date.getTime() - (days * 24 * 60 * 60 * 1000));
        return last;
    }
    catch{
        const dateToDay = new Date();
        return dateToDay.toString("yyy-MM-dd")
    }
}

export function NextDaysFromDate(date, days){
    try{
        var next = new Date(date.getTime() + (days * 24 * 60 * 60 * 1000));
        return next;
    }
    catch{
        const dateToDay = new Date();
        return dateToDay.toString("yyy-MM-dd")
    }
}

export const GetDatesBetween = (startDate, endDate, includeEndDate = true) => {
    const dates = [];
    if(startDate && endDate) {
        const currentDate = startDate;
        while (currentDate?.getTime() < endDate?.getTime()) {
            const timeZone = new Date(currentDate);
            const timeString = FormatTime(timeZone);
            dates.push(timeString);
            currentDate.setDate(currentDate.getDate() + 1);
        }
        if (includeEndDate) dates.push(FormatTime(endDate));
    }
    return dates;
};

export const FormatISOTimeZone = (date, resetTime = false) => {
    const hours = resetTime ? "00" : (date.getHours() < 10 ? `0${date.getHours()}` : date.getHours());
    const minutes = resetTime ? "00" : (date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes());
    const seconds = resetTime ? "00" : (date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds());
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}T${hours}:${minutes}:${seconds}`;
}