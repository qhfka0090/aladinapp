import { mainApp  } from "../contents/textdata";
import { Link } from 'react-router-dom';


function MainIcon(){
    return(
        <section id='main-icon'>
            <div className="icon-box">
                {
                    mainApp.map((icon,idx)=>(
                        <div className="icon-item" key={idx}>
                            <Link to={icon.url}>
                                <img src={icon.img} alt={icon.title} />
                                <p>{icon.title}</p>
                            </Link>
                        </div>
                    ))
                }
            </div>
        </section>
    )
}

export default MainIcon;