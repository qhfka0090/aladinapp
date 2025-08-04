import { usborn } from "../contents/textdata";
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ChevronRight } from 'lucide-react';

function Usborn(){
    return(
        <section id='usborn'>
            <div className="title-box">
                <h2 className="title">어스본 최대 35% 단독할인전</h2>
                <button className="title-btn">
                    <ChevronRight className='right-icon' />
                </button>
            </div>
            <div className="usborn-inner">
                <Swiper
                    loop={true}
                    slidesPerView={2.5}
                    spaceBetween={20}
                    freeMode={true}
                    className="usborn-swiper"
                >
                    {
                        usborn.map((item,idx)=>(
                            <SwiperSlide key={idx}>
                                <Link to={`/product/${item.id}`} state={{product:item}}>
                                    <img src={item.img} alt={item.title} />
                                    <h3>{item.title}</h3>
                                    <p>{item.sub}</p>
                                </Link>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>
        </section>
    )
}

export default Usborn;