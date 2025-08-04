import { livebook  } from "../contents/textdata";
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faUpLong, faDownLong } from '@fortawesome/free-solid-svg-icons';

function LiveSection(){
    return(
        <section id='live-section'>
            <div className='title-box'>
                <h2>실시간 클릭 Top 10</h2>
                {/* <div className='live-clock'>
                    <FontAwesomeIcon icon={faClock} className='clock'/>

                </div> */}
                <button className='title-btn'>
                    <ChevronDown className='right-icon' />
                </button>
            </div>
            <div className='live-box'>
                {
                    livebook.map((item,idx)=>(
                        <div key={idx} className="live-item">
                            <Link to={`/product/${item.id}`} state={{product:item}}>
                                <div className="item-box">
                                    <img src={item.img} alt={item.title} />
                                    <h3>{item.number}</h3>
                                    <p>{item.title}</p>
                                </div>
                                <p>{item.rank}</p>
                            </Link>
                        </div>
                    ))
                }
            </div>
        </section>
    )
}

export default LiveSection;