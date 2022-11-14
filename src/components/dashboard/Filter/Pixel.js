import { Badge, Button, Popover, RadioButton, Stack } from "@shopify/polaris";
import React, { useContext } from "react";
import { useEffect, useState } from "react";
import { GetPixels } from "../Api";
import { FilterContext } from "../Contexts";

function Pixel(){

    const filterContext = useContext(FilterContext);
    const [filterPixel, setFilterPixel] = useState({
        isActive: false,
        value: ""
    });
    const toggleActivePixel = () => {
        if(filterPixel?.value !== "(empty)") {
            setFilterPixel({ ...filterPixel, isActive: !filterPixel.isActive });
        }
    }
    const activatorFilterPixel = (
        <Button onClick={toggleActivePixel} disclosure>
          {filterPixel.value ? filterPixel.value : "Loading..."}
        </Button>
    );
    
    const [value, setValue] = useState("");
    const handleChange = (_checked, newValue) => {
        setValue(newValue);
        setFilterPixel({...filterPixel, isActive: true, value: `Pixel: ${newValue}` });
        filterContext.fetchAnalytics("", "", newValue);
    }

    const [pixels, setPixels] = useState([]);
    useEffect(() => {
        GetPixels().then(async (data) => {
            if(data && Array.isArray(data) && data.length > 0){
                const pixelID = data[0].PixelID;
                await filterContext.fetchAnalytics("", "", pixelID);
                setPixels([...data]);
                setValue(pixelID);
                setFilterPixel({...filterPixel, value:  `Pixel: ${pixelID}` });
            }
            else{
                setValue("(empty)");
                setFilterPixel({...filterPixel, value: "(empty)" });
                filterContext.onSetPixelId("");
                filterContext.handleModal();
            }
        })
        .catch(() => {
            setValue("(empty)");
            setFilterPixel({...filterPixel, value: "(empty)" });
            filterContext.onSetPixelId("");
        })
    }, [])
    return (
        <div className="dashboard-filter--pixel">
            <Popover
                active={filterPixel.isActive}
                activator={activatorFilterPixel}
                autofocusTarget="filter-node"
                onClose={toggleActivePixel}>
               <div className="dashboard-filter--select">
                    <Stack vertical>
                        {
                            pixels.map((p, index) => (
                                <div key={`pixel-${index}`} className="dashboard-filter--item">
                                    <div className="dashboard-filter--radio">
                                        <RadioButton
                                            id={p?.PixelID}
                                            label={p?.PixelID}
                                            value={p?.PixelID}
                                            checked={value === p?.PixelID}
                                            name={p?.PixelID}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    {
                                        p?.Status ? <Badge size="small" status="success">Active</Badge> : <Badge size="small">Disable</Badge>
                                    }
                                </div>
                            ))
                        }
                    </Stack>
               </div>
            </Popover>
        </div>
    )
}
export default React.memo(Pixel);