import { recomendBook } from "../contents/textdata";
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ChevronRight } from 'lucide-react';
import { FreeMode } from 'swiper/modules';

function RecomendBook(){
    return(
        <section id='recomend'>
            <div className="title-box">
                <h2 className="title">만권당 추천 책</h2>
                <button className="title-btn">
                    <ChevronRight className='right-icon' />
                </button>
            </div>
            <div className="recomend-inner">
                <Swiper
                    loop={true}
                    slidesPerView={2.5}
                    spaceBetween={20}
                    freeMode={true}
                    className="recomend-swiper"
                >
                    {
                        recomendBook.map((item,idx)=>(
                            <SwiperSlide key={idx}>
                                <Link to={`/product/${item.id}`} state={{product:item}}>
                                    <img src={item.img} alt={item.title} />
                                    <h3>{item.title}</h3>
                                </Link>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>
        </section>
    )
}

export default RecomendBook;