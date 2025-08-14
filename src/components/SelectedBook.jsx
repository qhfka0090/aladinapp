import { selectedBook  } from "../contents/textdata";
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ChevronRight } from 'lucide-react';
import { Autoplay } from 'swiper/modules';


function SelectedBook(){
    return(
        <section id='selected-book'>
            <div className="title-box">
                <h2 className="title">편집장의 선택</h2>
                {/* <FontAwesomeIcon icon={faArrowRight} className="title-icon"/> */}
                <button className="title-btn">
                    <ChevronRight className='right-icon' />
                </button>
            </div>
            <div className="selected-inner">
            <Swiper
                /* autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }} */
                slidesPerView={1}
                spaceBetween={10}
                centeredSlides={true}
                grabCursor={true}
                loop={true}
                modules={[Autoplay]}
                className="sel-swiperr"
            >
                {
                    selectedBook.map((item,idx)=>(
                        <SwiperSlide key={item.id}>
                            <Link to={`/product/${item.id}`} state={{product:item}} className="img-link">
                                <div className="img-box">
                                    <img src={import.meta.env.BASE_URL + item.img} alt={item.title} />
                                </div>
                                <div className="text-box">
                                    <p className="sub-title">{item.desc}</p>
                                    <h3>{item.title}</h3>
                                    <p className="sub-text">{item.sub}</p>
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

export default SelectedBook;