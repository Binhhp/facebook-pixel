import {
    Layout,
    Card,
    Form,
    FormLayout,
    Modal,
    TextField,
    Toast,
    ButtonGroup,
    Button,
    VideoThumbnail,
    MediaCard,
    TextContainer
} from '@shopify/polaris';
import React, {useState, useCallback, useEffect} from "react";
import axios from "axios";
import config from "../../../config/config";
import BallGiff from "../../../assets/images/ball.png"
import TiktokImage from "../../../assets/images/tiktok.png"

const ButtonList = ['Enabled', 'Disabled']
const Setup = ({shop, dataPixel}) => {
    const {ID, Status} = shop;
    const [idPixelInput, setId] = useState('');
    const [flag, setFlag] = useState(false)
    const [errorMessage, setError] = useState('')
    const [loading, setLoading] = useState(false);
    const [active, setActive] = useState(false);
    const [badgeStatus, setBadge] = useState('')
    const [enabled, setEnabled] = useState(true)
    const [titleButton, setTitle] = useState('Disabled')
    const [toast, setToast] = useState(false)
    const handleChange = useCallback((newValue) => {
        if (newValue.length > 25) {
            setError('TikTok Pixel ID max 25 characters')
        } else {
            setError('')
            setId(newValue)
            setEnabled(false)
        }

    }, []);
    const handleClose = useCallback(() => setActive(false), [active]);

    const toggleToast = useCallback(() => setToast((active) => !active), []);
    useEffect(() => {
        if (dataPixel) {
            setId(dataPixel.PixelID)
            setBadge('active')
            setFlag(true)
        }
    }, [])
    const handlerSubmit = () => {
        onSave()
    }
    const onSave = () => {
        setLoading(true)
        try {
            axios.post(config.rootLink + '/FrontEnd/CreateTiktokPixel', {
                ID: dataPixel ? dataPixel.ID : 0, ShopID: ID, Status: Status === 1 ? true : false, PixelID: idPixelInput
            })
                .then(async (response) => {
                    if (response.data.IsSuccess === true) {
                        await setLoading(false)
                        await setActive(true)
                        await setBadge('active')
                        await setEnabled(true)
                        if (flag) {
                            setActive(false)
                            await setToast(<Toast content={'Update Successfully !'} onDismiss={toggleToast}/>)
                        }
                    } else {
                        setLoading(false)
                        setEnabled(false)
                        setActive(false)
                        setBadge('')
                        setToast(<Toast error content={'Error ! ' + response.data.Messenger} onDismiss={toggleToast}/>)
                    }
                })
                .catch(function (error) {
                    setLoading(false)
                    setEnabled(false)
                    setActive(false)
                    setBadge('')
                    setToast(<Toast error content={'Error ! ' + error}/>)
                });
        } catch (e) {
            setLoading(false)
            setEnabled(false)
            setActive(false)
            setBadge('')
            setToast(<Toast error content={'Error ! ' + e}/>)
        }

    }
    const renderFooter = () => {
        return (<div className="Modal-footer-custom d-flex align-items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M16 8C16 3.582 12.418 0 8 0C3.582 0 0 3.582 0 8C0 12.418 3.582 16 8 16C12.418 16 16 12.418 16 8ZM7 11C7 11.5523 7.44772 12 8 12C8.55229 12 9 11.5523 9 11V9C9 8.44771 8.55229 8 8 8C7.44772 8 7 8.44771 7 9V11ZM7 5C7 5.55228 7.44772 6 8 6C8.55229 6 9 5.55228 9 5C9 4.44772 8.55229 4 8 4C7.44772 4 7 4.44772 7 5Z"
                      fill="#00A0AC"/>
            </svg>
            <p style={{marginLeft: "10px"}}>Install the Tiktok Pixel Helper
                <a href="https://chrome.google.com/webstore/detail/tiktok-pixel-helper/aelgobmabdmlfmiblddjfnjodalhidnn?hl=en"
                   target="_blank" style={{marginLeft: "5px"}}>
                    here.
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                              d="M9 8V9C9 9.553 8.553 10 8 10H1C0.425 10 0 9.516 0 9V2C0 1.448 0.448 1 1 1H2C3.03693 1 3.04053 2.5 2 2.5C1.82217 2.50502 1.64704 2.5 1.5 2.5V8.5H7.5C7.5 8.5 7.5 8.17779 7.5 8C7.5 7 9 7 9 8ZM5.25 0.75C5.25 0.335786 5.58579 0 6 0H10V4C10 4.41421 9.66421 4.75 9.25 4.75C8.83579 4.75 8.5 4.41421 8.5 4V2.56066L5.28033 5.78033C4.98744 6.07322 4.51256 6.07322 4.21967 5.78033C3.92678 5.48744 3.92678 5.01256 4.21967 4.71967L7.43934 1.5H6C5.58579 1.5 5.25 1.16421 5.25 0.75Z"
                              fill="#2C6ECB"/>
                    </svg>
                </a></p>

        </div>);
    }
    const switchButton = (type) => {
        setTitle(type)
        if (type === 'Enabled') {
            setEnabled(false)
        } else {
            setEnabled(true)
        }
    }
    return (<div className="Tiktok-setup">
        <Layout.Section>
            {toast}
            <div className={`Tiktok-badge d-flex ${badgeStatus}`}>
                <div className="Tiktok-badge-left">
                    <img src={TiktokImage} alt=""/>
                    <p>TikTok</p>
                </div>
                <div className="Tiktok-badge-right">
                    <h3>About Events Api</h3>
                    <p>
                        How can you make TikTok tracking more <br/> accurate data?
                        Enroll to become one of the first merchants on <br/> our beta version
                        <a href="https://docs.google.com/forms/d/e/1FAIpQLSd9MKS0oHMPFrAKGUic0S4OMmmTXCarJKGFjVAvfGzzRXy9vQ/viewform"
                           target="_blank">here</a>
                    </p>
                </div>
            </div>
            <Card sectioned>
                <div className="button-status">
                    <ButtonGroup>
                        {ButtonList && ButtonList.map(element => {

                            return <Button primary={element === titleButton ? true : false}
                                           onClick={() => switchButton(element)}>{element}</Button>
                        })}
                    </ButtonGroup>
                </div>

                <Form onSubmit={handlerSubmit}>
                    <FormLayout>
                        <div className="form-header d-flex">
                            <label htmlFor="">TikTok Pixel ID</label>
                            <a href="https://orichi.info/2022/09/17/how-to-find-the-tiktok-pixel-id-2022"
                               target="_blank">Where I can find it?</a>
                        </div>
                        <TextField
                            onChange={handleChange}
                            value={idPixelInput}
                            type="text"
                        />
                        <p className="error">{errorMessage}</p>
                        <Button loading={loading} submit primary disabled={enabled}>Save</Button>
                    </FormLayout>
                </Form>
                <div className="Modal-custom">
                    <Modal open={active}
                           onClose={handleClose}
                           title="Congratulations"
                           primaryAction={{
                               content: 'Got it', onAction: handleClose,
                           }}
                           secondaryActions={{
                               content: 'Need Help', onAction: () => {
                               },
                           }}
                           footer={renderFooter()}
                    >
                        <div className="Modal-gif">
                            <img src={BallGiff} alt=""/>
                        </div>
                        <Modal.Section>

                            <TextContainer>
                                <p style={{color: '#000000', lineHeight: "20px"}}>
                                    You've created the Tiktok Pixel successfully. After you install the pixel on your
                                    website,<br/>
                                    you will unlock the power of Pixel Checker. <br/>
                                    It will help you verify correct installation <br/>
                                    and monitor activity. <br/>
                                    TikTok Pixel Helper is a Chrome extension that can help you verify and troubleshoot
                                    pixel <br/> installation by checking for errors
                                </p>
                            </TextContainer>
                        </Modal.Section>
                    </Modal>
                </div>

            </Card>
        </Layout.Section>
        <Layout.Section secondary>
            <Card sectioned>
                <MediaCard
                    title="How to Test Tiktok Pixel Events"
                    primaryAction={{
                        content: 'Learn more', onAction: () => {
                            window.open("https://www.youtube.com/watch?v=JXkgBNg_S6M", '_blank').focus();
                        },
                    }}
                    description={`After you install the pixel on your website, you will unlock the power of Pixel Checker. It will help you verify correct installation and monitor activity.`}
                    popoverActions={[{
                        content: 'Dismiss', onAction: () => {
                        }
                    }]}
                >
                    <VideoThumbnail
                        videoLength={80}
                        // onClick={() => { window.open(moreAppConfig.linkVideo.howToGetFBPixel, '_blank').focus(); }}
                        thumbnailUrl="https://i3.ytimg.com/vi/JXkgBNg_S6M/maxresdefault.jpg"
                    />
                </MediaCard>
            </Card>
        </Layout.Section>
    </div>)
}
export default Setup;