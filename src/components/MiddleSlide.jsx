import { middleimg  } from "../contents/textdata";
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons';

function MiddleSlide(){
    return(
        <section id='middle-slide'>
            <Swiper
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                slidesPerView={1}
                spaceBetween={10}
                loop={true}
                modules={[Autoplay]}
                className="middle-swiper"
            >
                {
                    middleimg.map((item,idx)=>(
                        <SwiperSlide key={idx} className="slide-box">
                            <Link to={item.url}>
                                <div className="main-img">
                                    <img src={item.img} alt={item.title} />
                                </div>
                                <div className="img-btn">
                                    <div className="pause-box">
                                        <FontAwesomeIcon icon={faPause} className="pause-icon"/>
                                    </div>
                                    <div className="img-num">
                                        <p>{item.number}</p>
                                        <p>/</p>
                                        <p>9</p>
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
export default MiddleSlide;