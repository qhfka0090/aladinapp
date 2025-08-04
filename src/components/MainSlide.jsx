import { mainImg  } from "../contents/textdata";
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faPause, faPlay } from '@fortawesome/free-solid-svg-icons';

function MainSlide(){
    return(
        <section id='main-slide'>
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
                    mainImg.map((img,idx)=>(
                        <SwiperSlide key={idx} className="slide-box">
                            <Link to={img.url}>
                                <div className="main-img">
                                    <img src={img.img} alt={img.number} />
                                </div>
                                <div className="img-btn">
                                    <div className="pause-box">
                                        <FontAwesomeIcon icon={faPause} className="pause-icon"/>
                                    </div>
                                    <div className="img-num">
                                        <p>{img.number}</p>
                                        <p>/</p>
                                        <p>12</p>
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

export default MainSlide;