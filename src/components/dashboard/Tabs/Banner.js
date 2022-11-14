import { Suspense, useContext } from "react";
import SwiperCore, { Autoplay, Navigation, Pagination } from "swiper";
// Import Swiper styles
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'
import { FilterContext } from "../Contexts";
import { Card, SkeletonBodyText, SkeletonDisplayText, TextContainer } from "@shopify/polaris";

SwiperCore.use([Pagination, Autoplay, Navigation]);
function Banner(){
    const context = useContext(FilterContext);
    return (
        <div className="dashboard-whatNew">
            <Suspense fallback={""}>
            {
                context.items.banners !== undefined ?
                (
                    context.items.banners.length > 0 &&
                    <Swiper
                        loop={false} 
                        centeredSlides={true}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                        }}
                        pagination={{
                            clickable: true,
                        }}
                        navigation={false}
                        modules={[Autoplay, Pagination]}
                        className="slider-banner">
                        {
                            context.items.banners.map((x, index) => (
                                <SwiperSlide key={`banner-${index}`} >
                                    <a rel="noReferrer" href={`${x?.Link}`} target="_blank" className="dashboard-whatNew--img">
                                        <img src={x?.Image} alt={x?.Title} />
                                    </a>
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                )
                : <Card sectioned>
                    <TextContainer>
                        <SkeletonDisplayText size="small" />
                        <SkeletonBodyText />
                    </TextContainer>
                </Card>
            }
            </Suspense>
        </div>
    )
}

export default Banner;