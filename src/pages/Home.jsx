import BookTailer from "../components/BookTailer";
import BottomSlide from "../components/BottomSlide";
import Freebies from "../components/Freebies";
import ListBook from "../components/ListBook";
import ListSection from "../components/ListSection";
import LiveSection from "../components/LiveSection";
import MainIcon from "../components/MainIcon";
import MainSlide from "../components/MainSlide";
import MiddleSlide from "../components/MiddleSlide";
import NowBook from "../components/NowBook";
import RecomendBook from "../components/RecomendBook";
import SelectedBook from "../components/SelectedBook";
import TagSection from "../components/TagSection";
import Usborn from "../components/Usborn";


function Home(){
    return(
        <section id="home">
            <MainSlide />
            <MainIcon />
            <SelectedBook />
            <LiveSection />
            <TagSection />
            <MiddleSlide />
            <NowBook />
            <RecomendBook />
            <Freebies />
            <Usborn />
            <BookTailer />
            <BottomSlide />
            <ListBook />
            <ListSection />
        </section>
    )
}
export default Home;