import { Icon, Modal, Stack, TextContainer } from "@shopify/polaris";
import { CircleAlertMajor } from "@shopify/polaris-icons";
import { useContext } from "react";
import { FilterContext } from "../Contexts";


function Popup({ 
    onSelectedTabs,
    onSelectedShop,
    shop
}){
    const context = useContext(FilterContext);
    const handleTabs = () => {
        context.handleModal();
        onSelectedTabs(1);
        onSelectedShop(2);
        
    }
    return (
        <Modal
            footer
            title={ <div className="popup-title">
                        <div style={{ marginRight: '10px'}}>
                            <Icon source={CircleAlertMajor} color="warning" />
                        </div>
                        <div style={{ fontSize: '17px', fontWeight: '500' }}>Add Facebook Pixel</div>
                    </div>}
            open={context.activeModal}
            onClose={context.handleModal}
            primaryAction={{
                content: 'Add Facebook Pixel',
                onAction: handleTabs,
            }}>
            <Modal.Section className="create-pixel-modal">
                <Stack vertical>
                    <Stack.Item>
                        <TextContainer>
                            <p>Please add at least one pixel to continue the feature</p>
                        </TextContainer>
                    </Stack.Item>
                </Stack>
            </Modal.Section>    
        </Modal>
    )
}

export default Popup;