import { listItem } from "../contents/textdata";
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from "react";


function ListSection(){
    const [ show, setShow ] = useState(true);
    
    const showContent = () => {
        setShow((prevShow)=>!prevShow);
    }
    return(
        <section id='list'>
            <div className="list-top">
                <Link to=''>
                    <h3>7월 신용카드 무이자 안내</h3>
                    <button className="list-btn" onClick={()=>showContent()}>
                        {
                            show ? (
                                <ChevronUp className='right-icon' />
                            ):(
                                <ChevronDown className='right-icon' />
                            )
                        }
                    </button>
                </Link>
            </div>
            <div className="list-bottom">
                {
                    show && (
                        <>
                        {
                            listItem.map((list,idx)=>(
                                <Link to={list.url} key={idx}>
                                    <h4>{list.list}</h4>
                                    <p>{list.title}</p>
                                </Link>
                            ))
                        }
                        </>
                    )
                }
                
            </div>
        </section>
    )
}
export default ListSection;