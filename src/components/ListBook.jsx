import { listBook } from "../contents/textdata";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from '@fortawesome/free-solid-svg-icons';

function ListBook(){
    return(
        <section id='listbook'>
            <div className='list-box'>
                {
                    listBook.map((item,idx)=>(
                        <div className="list-icon" key={idx}>
                            <Link to={item.url}>
                                <img src={item.img} alt={item.title} />
                                <p className="bg-black"></p>
                                <p>{item.title}</p>
                            </Link>
                        </div>
                    ))
                }
            </div>
            <div className='list-bottom'>
                <FontAwesomeIcon icon={faPlus} className="plus-icon"/>
                <Link to=''>전체 분야보기</Link>
            </div>
        </section>
    )
}

export default ListBook;