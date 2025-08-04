import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faShoppingCart, faBars, faTimes, faHouse, faBell, faClock, faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import { subMenu  } from "../contents/textdata";
import { randomMenu } from "../contents/textdata";

function Header(){
    return(
        <header id="header">
            <div className='header-top'>
                <h1><Link to='/'><img src='/images/logo.png' alt=''/></Link></h1>
                <Link to="/cart">
                        <FontAwesomeIcon icon={faShoppingCart} className='cart-icon' />
                        <span className='sr-only'>basket</span>
                </Link>
                <div className='toggle'>
                    <button className='toggle-btn'>
                        <FontAwesomeIcon icon={faBars} className='toggle-icon' />
                    </button>
                </div>
            </div>
            <div className='header-middle'>
                <input type="text" placeholder='검색어를 입력하세요'/>
                <button type='submit'>
                    <FontAwesomeIcon icon={faSearch} className='search-icon'/>
                </button>
            </div>
            <ul className='header-bottom'>
                <Swiper
                    slidesPerView={5}
                    spaceBetween={10}
                    freeMode={true}
                    modules={[FreeMode]}
                    className="mySwiper"
                >
                    {
                        subMenu.map((sub,idx)=>(
                            <SwiperSlide key={idx} className='subSlide'>
                                <Link to={sub.url}>{sub.title}</Link>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </ul>
            <div className='header-fix'>
                <button>
                    <FontAwesomeIcon icon={faHouse} className='house-icon fix-icon'/>
                </button>
                <button>
                    만권당
                </button>
                <button>
                    <FontAwesomeIcon icon={faCircleUser} className='user-icon fix-icon'/>
                </button>
                <button>
                    <FontAwesomeIcon icon={faBell} className='bell-icon fix-icon'/>
                </button>
                <button>
                    <FontAwesomeIcon icon={faClock} className='clock-icon fix-icon'/>
                </button>
            </div>
        </header>
    )
}

export default Header;