import { Banner, Button, Card, Form, FormLayout, Link, Modal, Select, SettingToggle, TextContainer, TextField, TextStyle, Toast } from '@shopify/polaris';
import axios from 'axios';
import React, { Component, useState } from 'react';
import config from '../../config/config';
import timezones from '../../config/timezone';
import {
    withRouter
} from "react-router-dom";


class Setting extends Component {
    constructor(props) {
        
        super(props);
        let tz1 = timezones.find(p => p.value == this.props.setting.CustomJsCart);
        let tz = tz1 == undefined ? timezones.find(p => p.time == this.props.setting.TimeZone) : tz1;
        this.state = {
            status: this.props.setting.Active,
            timezoneSelected: this.props.setting.TimeZone == null ? 'Default timezone' : tz.value,
            timeDelay: this.props.setting.TimeDelay,
            alert: null,
            timezone: timezones,
            IsOpen: false,
            isLoadingAppEmbed: false
        }
        this.handleToggle = this.handleToggle.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleTimeDelayChange = this.handleTimeDelayChange.bind(this);
        this.saveSetting = this.saveSetting.bind(this);
    }

    onActionSetStatus = () => {
        var that = this;
        axios.post(config.rootLink + '/FrontEnd/ChangeActive', { ShopID: this.props.shop.ID, status: !this.state.status })
            .then(function (response) {
                // handle success
                if (response.data.IsSuccess) {
                    that.setState({ status: !that.state.status, IsOpen: false });
                }
            })
            .catch(function (error) {
                // handle error
                console.log(error);
                this.setState({ IsOpen: false })
            });
    }

    handleToggle = () => {
        if (this.state.status) {
            this.setState({ IsOpen: true });
        }
        else {
            this.onActionSetStatus();
        }

    }

    handleSelectChange = (e) => {
        this.setState({ timezoneSelected: e })
    }

    handleTimeDelayChange = (e) => {
        this.setState({ timeDelay: e })
    }

    toggleActive = () => {
        this.setState({ alert: null });
    }

    saveSetting = () => {
        let that = this;
        let tz = this.state.timezone.find(p => p.value === this.state.timezoneSelected);
        axios.post(config.rootLink + '/FrontEnd/UpdateSetting', {
            ShopID: this.props.shop.ID,
            ID: this.props.setting.ID,
            Timezone: (tz == undefined || tz.value == 'Default timezone') ? null : tz.time,
            CustomJsCart: (tz == undefined || tz.value == 'Default timezone') ? null : tz.value,
            TimeDelay: this.state.timeDelay
        })
            .then(function (response) {
                
                // handle success
                if (response.data.IsSuccess) {
                    that.setState({ alert: <Toast content={response.data.Messenger} onDismiss={that.toggleActive} duration={4500} /> })
                    that.props.AppCallbackSettingFuntion(response.data.Setting);
                }
                else {
                    that.setState({ alert: <Toast content={response.data.Messenger} onDismiss={that.toggleActive} duration={4500} /> })
                }
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });
    }

    render() {
        return (
            <>

                {
                    false ?
                        <div style={{ marginBottom: '10px' }}>
                            <Banner
                                title="Theme Extensions 2.0"
                                status="info"
                            >
                                <p style={{ marginBottom: '10px' }}>In the case that you do not see any options to enable the Facebook Pixels Conversion API app in the theme editor, please click APP EMBEDS section or refer to the instruction in <Link url="https://orichi.info/2022/03/28/facebook-pixels-conversion-api-on-online-store-2-0/"  external={true}>this blog</Link></p>
                                <Button

                                    loading={this.state.isLoadingAppEmbed}
                                    onClick={() => {
                                        
                                        let that = this;
                                        this.setState({ isLoadingAppEmbed: true });
                                        window.open('https://' + config.shop + '/admin/themes/current/editor?context=apps&activateAppId=67bf7d46-e794-4117-adb7-273fd162e4d1/orichi-pixel', "_blank");
                                        axios.get(config.rootLink + '/FrontEnd/AppEmbed?shop=' + config.shop + '&isEnable=' + (!this.props.setting.IsEnableAppEmbed))
                                            .then(function (response) {
                                                if (response) {
                                                    that.props.AppCallbackSettingFuntion({
                                                        ...that.props.setting,
                                                        IsEnableAppEmbed: !that.props.setting.IsEnableAppEmbed
                                                    })
                                                }
                                                that.setState({ isLoadingAppEmbed: false });

                                            })
                                            .catch(function (error) {
                                                // handle error
                                                console.log(error);
                                                that.setState({ isLoadingAppEmbed: false });
                                            })
                                    }}
                                    style={{ marginTop: '10px' }}
                                >{this.props.setting.IsEnableAppEmbed == true ? 'Disable APP EMBEDS' : 'Enable APP EMBEDS'}</Button>
                            </Banner>
                        </div>
                        : <></>
                }


                <SettingToggle
                    action={{
                        content: this.state.status ? 'Deactivate' : 'Activate',
                        onAction: this.handleToggle,
                    }}
                    enabled={this.state.status}
                >
                    This setting is <TextStyle variation="strong">{this.state.status ? 'activated' : 'deactivated'}</TextStyle>.
                </SettingToggle>
                <Card>
                    <Card.Section>
                        <Form>
                            <FormLayout>
                                <Select
                                    label="Timezone"
                                    options={this.state.timezone}
                                    onChange={this.handleSelectChange}
                                    value={this.state.timezoneSelected}
                                />
                                <TextField
                                    label="Delayed Pixel Fires (seconds)"
                                    value={`${this.state.timeDelay == null ? '' : this.state.timeDelay}`}
                                    onChange={this.handleTimeDelayChange}
                                    helpText="Suppose you want to track users who interact with your website a few seconds before firing a pixel event. You can enable this option."
                                />
                                <Button primary onClick={this.saveSetting}>Save</Button>

                                {this.state.alert}
                            </FormLayout>
                        </Form>

                    </Card.Section>
                </Card>
                <Modal
                    open={this.state.IsOpen}
                    onClose={() => { this.setState({ IsOpen: false }) }}
                    title="Disable app"
                    primaryAction={{
                        content: 'Ok',
                        onAction: () => { this.onActionSetStatus(); },
                    }}
                    secondaryActions={[
                        {
                            content: 'Cancel',
                            onAction: () => { this.setState({ IsOpen: false }) },
                        },
                    ]}
                >
                    <Modal.Section>
                        <TextContainer>
                            <p>
                                Do you want to disable app?
                            </p>
                        </TextContainer>
                    </Modal.Section>
                </Modal>
            </>
        );
    }
}

export default withRouter(Setting);