import axios from "axios";
import config from "../../../config/config";

export const GetInfoPixelBuffer = async (pixelId, startTime, endTime) => {
    const { data } = await axios.get(`${config.rootLink}/frontend/analytics?shop=${config.shop}&pixelID=${pixelId}&startDate=${startTime}&endDate=${endTime}`)
    .catch(error => {
        return {
            data: undefined
        };
    });
    return data;
}

export const GetPixels = async () => {
    const { data } = await axios.get(`${config.rootLink}/frontend/pixels?shop=${config.shop}`).catch(error => {
        return {
            data: undefined
        };
    });
    return data;
}

export const GetBanners = async () => {
    const { data } = await axios.get(`${config.rootLink}/frontend/banners`);
    return data;
}

export const GetPosts = async () => {
    const { data } = await axios.get(`${config.rootLink}/frontend/posts`);
    return data;
}