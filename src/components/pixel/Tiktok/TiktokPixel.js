import React, {useEffect, useState} from 'react';
import {Button} from '@shopify/polaris';
import ImageBannerTiktok from '../../../assets/images/banner-tiktok.png'
import Setup from "./Setup";
import axios from "axios";
import config from "../../../config/config";

const TiktokPixel = ({shop}) => {
    const [visibleSetup, setVisibleSetup] = useState(false);
    const [data, setData] = useState([])
    const handlerClickShowSetup = () => {
        setVisibleSetup(true)
    }
    useEffect(() => {
        getListPixel();
    },[])
    const getListPixel = () => {
        axios.get(config.rootLink + '/FrontEnd/GetAllTiktokPixels?domain=demo-peter-1.myshopify.com')
            .then(async (response) => {
                if(response.status === 200){
                    setData(response.data)
                }
            })
            .catch(function (error) {
                console.log(error)
            });
    }
    const renderSetup = () => {
      if(data.length > 0) {
          return (
              <Setup shop={shop} dataPixel={data[0]} />
        )
      }
      else{
          return (
              <div className="Tiktok-pixel-button">
                  <Button primary onClick={handlerClickShowSetup}>Setup Titok Pixel</Button>
                  <div className="Tiktok-pixel-banner">
                      <img src={ImageBannerTiktok} width="100%" alt=""/>
                  </div>
              </div>
          )
      }
    }
    return (
        <div className="Tiktok-pixel">
            {visibleSetup ? <Setup shop={shop} dataPixel={data[0]}  /> : ''}
            {visibleSetup ? '' : renderSetup()}
        </div>
    )
}
export default TiktokPixel;