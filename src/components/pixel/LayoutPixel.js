import React, { Component, useRef } from 'react';
import { Tabs, Card } from '@shopify/polaris';
import Step1 from './steps/Step1';
import Step2 from './steps/Step2';
import Step3 from './steps/Step3';
import CreatePixel from './CreatePixel';
import ManagePixel from './ManagePixel';
import Setting from './Setting';
import ChoosePlan from '../plan/ChoosePlan';
import Setup from '../feed/Setup';
import Help from '../document/Help';
import Dashboard from '../dashboard';
import { FilterProvider } from '../dashboard/Contexts';
import TiktokPixel from "./Tiktok/TiktokPixel";
import moreAppConfig from "../../config/moreAppConfig";
import URLNotFound from '../plugins/URLNotFound';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    NavLink,
    useHistory,
    withRouter
} from "react-router-dom";



const SetTabSelected = (tabSelected, hasPixel = false) => {
    localStorage.setItem('tab', tabSelected);
    return [
        {
            number: moreAppConfig.Tab.DASHBOARD,
            selected: tabSelected === moreAppConfig.Tab.DASHBOARD ?? true,
            id: 'dashboard',
            content: 'Dashboard'
        },
        {
            number: moreAppConfig.Tab.CREATE_PIXEL,
            selected: tabSelected === moreAppConfig.Tab.CREATE_PIXEL ?? false,
            id: 'create-pixel',
            content: hasPixel ? 'Edit Pixel': 'Create Pixel'
        },
        {
            number: moreAppConfig.Tab.MANAGE_PIXCEL,
            selected: tabSelected === moreAppConfig.Tab.MANAGE_PIXCEL ?? false,
            id: 'manage-pixel',
            content: 'Manage Pixel'
        },
        {
            number: moreAppConfig.Tab.SETTING,
            selected: tabSelected === moreAppConfig.Tab.SETTING ?? false,
            id: 'setting',
            content: 'Setting'
        },
        {
            number: moreAppConfig.Tab.PLAN,
            selected: tabSelected === moreAppConfig.Tab.PLAN ?? false,
            id: 'plan',
            content: 'Plan'
        },
        {
            number: moreAppConfig.Tab.FEED_PIXEL,
            selected: tabSelected === moreAppConfig.Tab.FEED_PIXEL ?? false,
            id: 'feed',
            content: 'Facebook Product Feed'
        },
        {
            number: moreAppConfig.Tab.HELP,
            selected: tabSelected === moreAppConfig.Tab.HELP ?? false,
            id: 'help',
            content: 'Help'
        },
        {
            number: moreAppConfig.Tab.TIKTOK_PIXEL,
            selected: tabSelected === moreAppConfig.Tab.TIKTOK_PIXEL ?? false,
            id: 'tiktok-pixel',
            content: 'Tiktok Pixels'
        },
    ]
}

class LayoutPixel extends Component {

    constructor(props) {
        super(props);
        this.props.onRef(this);
        var tabSelected = localStorage.getItem('tab') ? parseInt(localStorage.getItem('tab')) : moreAppConfig.Tab.DASHBOARD;
        this.state = {
            TabIndex: 0,
            content: null,
            tabs: SetTabSelected(tabSelected),
            tabSelected: localStorage.getItem('tab') ? parseInt(localStorage.getItem('tab')) : moreAppConfig.Tab.DASHBOARD
        }
        this.callbackStepSetupChange = this.callbackStepSetupChange.bind(this);
    }

    callbackPixelStepSetupFunction = (pixel) => {
        this.props.AppCallbackShopFuntion({
            ...this.props.shop,
            StepSetup: 1,
            pixelStepSetup: pixel
        });

        this.setState({
            tabs: SetTabSelected(moreAppConfig.Tab.CREATE_PIXEL)
        });
        setTimeout(() => {
            this.ReloadComponent(moreAppConfig.Tab.CREATE_PIXEL);
        }, 100);

    }


    callbackStepSetupChange = (stepSetup) => {
        this.setState({
            tabs: SetTabSelected(moreAppConfig.Tab.CREATE_PIXEL)
        })
        if (stepSetup === 3) {
            this.props.AppCallbackShopFuntion({
                ...this.props.shop,
                StepSetup: stepSetup,
                pixelStepSetup: null,
                pixelStepSetupName: this.props.shop.pixelStepSetup.Title
            });
        }
        else if (stepSetup === 4) {
            this.props.AppCallbackShopFuntion({
                ...this.props.shop,
                StepSetup: 0,
                pixelStepSetup: null
            });
        }
        else {
            this.props.AppCallbackShopFuntion({
                ...this.props.shop,
                StepSetup: stepSetup
            });
        }
        this.ReloadComponent(moreAppConfig.Tab.CREATE_PIXEL);
    };

    callbackSelectedTabCreateChange = (selected, pixel) => {
        if (pixel != null) {

            this.setState({
                tabs: SetTabSelected(selected, true)
            })
        }
        else {
            this.setState({
                tabs: SetTabSelected(selected)
            })
        }
        this.props.AppCallbackSelectedTabCreateFunction(selected, pixel);


    }

    callbackSelectedTabChange = (selected) => {
        this.setState({
            tabs: SetTabSelected(selected)
        })
        this.props.AppCallbackSelectedTabFunction(selected);

    }

    callbackSavePixelSuccess = (selected) => {
        this.setState({
            tabs: SetTabSelected(selected)
        })
        this.props.AppCallbackAfterSavePixelSuccess();
        this.ReloadComponent(selected);
    }


    callbackIsShowPlanFuntion = (isShowPlan) => {
        this.props.AppCallbackIsShowPlanFuntion(isShowPlan);
    }
    handleSetOnlyTabChange = (selected) => {
        this.setState({
            tabs: SetTabSelected(selected)
        })
    }
    ReloadComponent = (tab) => {
        switch (tab) {
            case 0:
                this.setState({
                    content: <Card.Section>
                        <FilterProvider>
                            <Dashboard onSelectedTabs={this.props.onSelectedTabs} onSelectedShop={this.props.onSelectedShop}></Dashboard>
                        </FilterProvider>
                    </Card.Section>
                });
                break;
           
            case 1:
                console.log('this.props.shop.StepSetup', this.props.shop.StepSetup);
                switch (this.props.shop.StepSetup) {
                    case 0:
                        this.setState({
                            content: <>
                                <Card.Section>
                                    <Step1 shop={this.props.shop} setting={this.props.setting} pixelStepSetup={this.props.pixelStepSetup}
                                        callbackStepSetupChange={this.callbackStepSetupChange}
                                        callbackSelectedTabChange={this.callbackSelectedTabChange}
                                        callbackPixelStepSetupFunction={this.callbackPixelStepSetupFunction}
                                        AppCallbackSettingFuntion={this.props.AppCallbackSettingFuntion}></Step1>
                                </Card.Section>
                            </>
                        });
                        break;
                   
                    case 1:
                        this.setState({
                            content: <>
                                <Card.Section>
                                    <Step2 shop={this.props.shop} setting={this.props.setting} pixelStepSetup={this.props.pixelStepSetup} callbackStepSetupChange={this.callbackStepSetupChange} ></Step2>
                                </Card.Section>
                            </>
                        });
                        break;
                    
                    case 3:
                        this.setState({
                            content: <>
                                <Card.Section>
                                    <Step3 shop={this.props.shop} setting={this.props.setting} pixelStepSetupName={this.props.shop.pixelStepSetupName}
                                        callbackStepSetupChange={this.callbackStepSetupChange}
                                        callbackSelectedTabChange={this.callbackSelectedTabChange}
                                        callbackSelectedTabCreateChange={this.callbackSelectedTabCreateChange}
                                        AppCallbackCheckPlanCreatePixelFunction={this.props.AppCallbackCheckPlanCreatePixelFunction}></Step3>
                                </Card.Section>
                            </>
                        });
                        break;
                    
                    case 2:
                        this.setState({
                            content: <>
                                <Card.Section>
                                    <CreatePixel shop={this.props.shop} setting={this.props.setting} pixelEdit={this.props.pixelEdit}
                                        callbackSelectedTabChange={this.callbackSelectedTabChange}
                                        callbackIsShowPlanFuntion={this.callbackIsShowPlanFuntion}
                                        callbackSavePixelSuccess={this.callbackSavePixelSuccess}></CreatePixel>
                                </Card.Section>
                            </>
                        });
                        break;
                    
                    default:
                        break;
                }
                break;
            case 2:
                this.setState({
                    content: <>
                        <Card.Section>
                            <ManagePixel shop={this.props.shop} setting={this.props.setting} hasRating={this.props.hasRating} isCompleteSave={this.props.isCompleteSave}
                                AppCallbackWriteQuickReview={this.props.AppCallbackWriteQuickReview}
                                AppCallBackIsCompleteSave={this.props.AppCallBackIsCompleteSave}
                                callbackStepSetupChange={this.callbackStepSetupChange}
                                callbackSelectedTabChange={this.callbackSelectedTabChange}
                                callbackSelectedTabCreateChange={this.callbackSelectedTabCreateChange}
                                AppCallbackCheckPlanCreatePixelFunction={this.props.AppCallbackCheckPlanCreatePixelFunction}
                                AppCallbackPixelCountFunction={this.props.AppCallbackPixelCountFunction}></ManagePixel>
                        </Card.Section>
                    </>
                });
                break;
           
            case 3:
                this.setState({
                    content: <>
                        <Card.Section>
                            <Setting shop={this.props.shop} setting={this.props.setting} AppCallbackSettingFuntion={this.props.AppCallbackSettingFuntion}></Setting>
                        </Card.Section>
                    </>
                });
                break;
            
            case 4:
                this.setState({
                    content: <>
                        <Card.Section>
                            <div className={'plan'}>
                                <ChoosePlan shop={this.props.shop} setting={this.props.setting}
                                    AppCallbackIsShowPlanFuntion={this.props.AppCallbackIsShowPlanFuntion}
                                    AppCallbackIsLoadingFuntion={this.props.AppCallbackIsLoadingFuntion}
                                    AppCallbackShopFuntion={this.props.AppCallbackShopFuntion}
                                    AppCallbackSettingFuntion={this.props.AppCallbackSettingFuntion} />
                            </div>
                        </Card.Section>
                    </>
                });
                break;
            
            case 5:
                this.setState({
                    content: <>
                        <Setup shop={this.props.shop} setting={this.props.setting} feed={this.props.feed}
                            AppCallbackShopFuntion={this.props.AppCallbackShopFuntion}
                            AppCallbackFeedFuntion={this.props.AppCallbackFeedFuntion}></Setup>
                    </>
                });
                break;
            
            case 6:
                this.setState({
                    content: <>
                        <Help shop={this.props.shop} setting={this.props.setting}></Help>
                    </>
                });
                break;
            
            case 7:
                this.setState({
                    content: <>
                        <Card.Section>
                            <TiktokPixel shop={this.props.shop} />
                        </Card.Section>
                    </>
                });
                break;
           
            default:
                break;
        }
    }
    handleTabChange = (selected) => {

        this.setState({
            tabs: SetTabSelected(selected)
        })
        this.ReloadComponent(selected);

    };
    componentDidMount() {
        this.ReloadComponent(this.state.tabSelected);
    }
    
    
    render() {


        return (

            <>
                <div className="Polaris-Tabs__Wrapper">
                    <ul role="tablist" className="Polaris-Tabs">
                        {this.state.tabs.map((item) => {
                            return (
                                <li tabindex={item.number} className="Polaris-Tabs__TabContainer" role="presentation">
                                    <button ref={this.props.ref} id={item.id} role="tab" type="button" tabindex="0" className={item.selected ? "Polaris-Tabs__Tab Polaris-Tabs__Tab--selected" : "Polaris-Tabs__Tab"} aria-selected="true" aria-controls="create-pixel-panel"
                                        onClick={() => {
                                            this.handleTabChange(item.number);
                                            var path = item.id;
                                            if (item.number !== 1) {
                                                this.props.history.push('/' + path + '?shop=' + this.props.shop?.Domain + '&admin=1');
                                            } 

                                        }}
                                    ><span className="Polaris-Tabs__Title">{item.content}</span></button>
                                </li>
                            )
                        })}
                    </ul>
                </div>
                {this.state.content}
            </>

        )


    }



}

export default withRouter(LayoutPixel);