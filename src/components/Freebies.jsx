import { freebies } from "../contents/textdata";
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ChevronRight } from 'lucide-react';

function Freebies(){
    return(
        <section id='free'>
            <div className="title-box">
                <h2 className="title">알라딘이 만든 사은품</h2>
                <button className="title-btn">
                    <ChevronRight className='right-icon' />
                </button>
            </div>
            <div className="free-inner">
            <Swiper
                slidesPerView={1}
                spaceBetween={10}
                centeredSlides={true}
                grabCursor={true}
                loop={true}
                className="swiper-box"
            >
                {
                    freebies.map((item,idx)=>(
                        <SwiperSlide key={idx} className="slide-box">
                            <Link to={item.url}>
                                <div className="main-img">
                                    <img src={item.img} alt={item.title} />
                                </div>
                                <div className="img-btn">
                                    <div className="img-title">
                                        <h3>{item.title}</h3>
                                    </div>
                                    <div className="img-num">
                                        <p>{item.number}</p>
                                        <p>/</p>
                                        <p>15</p>
                                    </div>
                                </div>
                            </Link>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
            </div>
        </section>
    )
}

export default Freebies;