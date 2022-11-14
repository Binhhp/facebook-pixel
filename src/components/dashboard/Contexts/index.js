import React, { useEffect, useState } from 'react';
import { GetBanners, GetInfoPixelBuffer, GetPosts } from '../Api';
import { FormatISOTimeZone } from '../../../config/timePicker';
export const FilterContext = React.createContext();
export const FilterProvider = ({ children }) => {
    const [filter, setFilter] = useState({
        start: (new Date()).toString(),
        end: (new Date()).toString(),
        pixelId: undefined,
        data: undefined
    });

    const [activeModal, setActiveModal] = useState(false);
    const handleModal = () => setActiveModal(!activeModal);

    const [items, setItems] = useState({
        banners: undefined,
        posts: [{},{}]
    });

    const fetchTabItems = () => {
        Promise.all([GetBanners(), GetPosts()]).then(result => {
            setItems({
                banners: [...result[0]],
                posts: [...result[1]]
            });
        })
    };

    useEffect(() => {
        fetchTabItems();
    }, []);

    const fetchAnalytics = async (startDate = "", endDate = "", pixelId = "") => {
        try{
            setFilter({
                ...filter,
                data: undefined
            });

            const startDefault = new Date(filter.start);
            const endDefault = new Date(filter.end);
            const startTimeZone = startDate ? startDate : startDefault;
            const endTimeZone = endDate ? endDate : endDefault;
            const id = pixelId ? pixelId : filter.pixelId;

            const startRequest = FormatISOTimeZone(startTimeZone, true);
            const endRequest = FormatISOTimeZone(endTimeZone);
            const data = await GetInfoPixelBuffer(id, startRequest, endRequest);
            setFilter({
                ...filter,
                pixelId: id,
                start: startTimeZone.toString(),
                end: endTimeZone.toString(),
                data: data
            });
        }
        catch{
            
        }
    }

    const onSetTimeZone = {
        updateStart: (start) => {
            setFilter({
                ...filter,
                start: start.toString()
            })
        },
        updateEnd: (end) => {
            setFilter({
                ...filter,
                start: end.toString()
            })
        },
        update: (request) => {
            const { start, end } = request;
            setFilter({
                ...filter,
                start: start.toString(),
                end: end.toString()
            })
        },
        reset: () => {
            setFilter({
                ...filter,
                start: (new Date()).toString(),
                end: (new Date()).toString()
            })
        }
    };
    
    const onSetPixelId = (pixelId) => {
        setFilter({
            ...filter,
            pixelId: pixelId
        })
    };

    return (
        <FilterContext.Provider value={{
            filter: filter,
            data: filter.data,
            fetchAnalytics: fetchAnalytics,
            timezone: onSetTimeZone,
            onSetPixelId: onSetPixelId,
            items: items,
            fetchTabItems: fetchTabItems,
            activeModal: activeModal,
            handleModal: handleModal
        }}>
            {children}
        </FilterContext.Provider>
    )
}