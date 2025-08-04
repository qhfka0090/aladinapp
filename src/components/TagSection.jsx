import { Link } from 'react-router-dom';

function TagSection(){
    return(
        <section id='tag'>
            <div className='tag-top'>
                <Link to='/usbon'>#어스본할인</Link>
                <Link to='/kimaeran'>#김애란</Link>
                <Link to='/Gam'>#깜냥8</Link>
            </div>
            <div className='tag-bottom'>
                <Link to='/youth'>#청춘의독서</Link>
                <Link to='eonam'>#어남선생</Link>
                <Link to='parkgomhee'>#박곰희</Link>
            </div>
        </section>
    )
}
export default TagSection;