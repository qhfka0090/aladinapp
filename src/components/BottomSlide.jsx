import { bottomImg } from "../contents/textdata";
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faPause, faPlay } from '@fortawesome/free-solid-svg-icons';

function BottomSlide(){
    return(
        <section id='bottom-slide'>
            <Swiper
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                slidesPerView={1}
                spaceBetween={10}
                centeredSlides={true}
                grabCursor={true}
                loop={true}
                modules={[Autoplay]}
                className="swiper-box"
            >
                {
                    bottomImg.map((item,idx)=>(
                        <SwiperSlide key={idx} className="slide-box">
                            <Link to={item.url}>
                                <div className="main-img">
                                    <img src={item.img} alt={item.id} />
                                </div>
                                <div className="img-btn">
                                    <div className="pause-box">
                                        <FontAwesomeIcon icon={faPause} className="pause-icon"/>
                                    </div>
                                    <div className="img-num">
                                        <p>{item.id}</p>
                                        <p>/</p>
                                        <p>32</p>
                                        <FontAwesomeIcon icon={faPlus} className="plus-icon"/>
                                    </div>
                                </div>
                            </Link>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </section>
    )
}

export default BottomSlide;