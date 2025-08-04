import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';


function Footer(){
    const [ show, setShow ] = useState(true);

    const showContent = () => {
        setShow((prevShow)=>!prevShow);
    }
    return(
        <footer id='main-footer'>
            <div className="footer-nav">
                <Link to='/login'>
                    로그인
                </Link>
                <Link to='/all'>
                    전체 메뉴
                </Link>
                <Link to='/compony'>
                    회사 소개
                </Link>
                <Link to='/publishing'>
                    출판사 안내
                </Link>
            </div>
            <div className='footer-top'>
                <div className='footer-title'>
                    <h3>(주)알라딘커뮤니케이션</h3>
                    <button className='footer-btn' onClick={()=>showContent()}>
                        {
                            show ? (
                                <ChevronDown className='right-icon' />
                            ):(
                                <ChevronUp className='right-icon' />
                            )
                        }
                        
                    </button>
                </div>
                {
                    !show && (
                        <div className='footer-inner'>
                            <p>대표이사 : 최우경</p>
                            <p>사업자등록 :201-81-23094</p>
                            <p>통신판매업신고 : 2003-서울중구-01520</p>
                            <p>호스팅 제공자 : 알라딘커뮤니케이션</p>
                            <div className='inner-text'>
                                <p>본사 : 서울시 중구 서소문로 89-31</p>
                                <p>중고매장위치 : <Link to='/localmore'>자세히보기</Link></p>
                            </div>
                            <p className='copy'>&copy; Aladin Communication. All Rigths Reserved.</p>
                        </div>
                    )
                }
                
            </div>
            <div className='footer-bottom'>
                <div className='bottom-title'>
                    <p>일반문의 (발신자 부담) <span>1544-2514</span></p>
                </div>
                <div className='footer-btn'>
                    <button>1:1문의</button>
                    <button>FAQ</button>
                </div>
                <button>중고매장 위치, 영업시간 안내</button>
                <div className='footer-info'>
                    <Link to=''>
                        이용약관
                    </Link>
                    <Link to=''>
                        <strong>개인정보처리방침</strong>
                    </Link>
                    <Link to=''>
                        청소년보호정책
                    </Link>
                    <Link to='' className='last-a'>
                        사업자정보
                    </Link>
                </div>
            </div>
        </footer>
    )
}

export default Footer;