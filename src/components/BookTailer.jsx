import { bookTailer } from "../contents/textdata";
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ChevronRight } from 'lucide-react';




function BookTailer(){
    return(
        <section id='book-tailer'>
            <div className="title-box">
                <h2 className="title">북테일러</h2>
                <button className="title-btn">
                    <ChevronRight className='right-icon' />
                </button>
            </div>
            <div className="tailer-inner">
            <Swiper
                    loop={true}
                    slidesPerView={1.25}
                    spaceBetween={20}
                    freeMode={true}
                    className="book-swiper"
                >
                    {
                        bookTailer.map((item,idx)=>(
                            <SwiperSlide key={idx} className="swiper-inner">
                                <Link to={item.url}>
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

export default BookTailer;