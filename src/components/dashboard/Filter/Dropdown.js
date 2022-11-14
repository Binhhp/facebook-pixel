import { ActionList, Icon, Popover } from "@shopify/polaris";
import { ChevronDownMinor } from "@shopify/polaris-icons";

function Dropdown({ 
    activeDateRange, 
    toggleActiveDateRange, 
    handleSelectDateRange,
    showCalendar
}){
    const activatorDateRange = (
        <div style={{ borderColor: activeDateRange.isActive ? `#4499A3` : `#ccc`, width: `100%`}} 
            onClick={toggleActiveDateRange} 
            className="btn-dropdown">
            <div>{activeDateRange.value}</div>
            <div><Icon source={ChevronDownMinor} color="base" /></div>
        </div>
      );
    return (
        <Popover
            fullWidth
            active={activeDateRange.isActive}
            activator={activatorDateRange}
            onClose={toggleActiveDateRange}>
            <ActionList
                actionRole="menuitem"
                items={[
                    {
                        content: 'Today',
                        onAction: handleSelectDateRange("today"),
                    },
                    {
                        content: 'Yesterday',
                        onAction: handleSelectDateRange("yesterday"),
                    },
                    {
                        content: 'Last 7 days',
                        onAction: handleSelectDateRange("7days"),
                    },
                    {
                        content: 'Last 30 days',
                        onAction: handleSelectDateRange('30days'),
                    },
                    {
                        content: 'Last 60 days',
                        onAction: handleSelectDateRange('60days'),
                    },
                    {
                        content: 'Custom',
                        onAction: showCalendar
                    },
                ]}/>
        </Popover>
    )
}

export default Dropdown;