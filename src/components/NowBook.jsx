import { nowBook } from "../contents/textdata";
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar } from 'swiper/modules';

function NowBook(){
    return(
        <section id='now-book'>
            <h2>지금, 화제의 책</h2>
            <Swiper
                scrollbar={{
                    hide: true,
                }}
                loop={true}
                slidesPerView={1}
                spaceBetween={10}
                centeredSlides={true}
                grabCursor={true}
                modules={[Scrollbar]}
                className="now-swiper"
            >
                {
                    nowBook.map((item,idx)=>(
                        <SwiperSlide key={idx} className="slide-box">
                            <Link to={`/product/${item.id}`} state={{product:item}}>
                                <img src={item.img} alt={item.title} />
                                <div className="swiper-box">
                                    <h3>{item.title}</h3>
                                    <p>{item.sub}</p>
                                    <p className="text-red">{item.desc}</p>
                                </div>
                            </Link>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </section>
    )
}

export default NowBook;