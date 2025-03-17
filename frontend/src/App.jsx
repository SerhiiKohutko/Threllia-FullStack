import './App.css'
import {Header} from "./components/Header/Header.jsx";
import {Footer} from "@/components/Footer/Footer.jsx";
import {HomePage} from "@/components/HomePage/HomePage.jsx";
import {Route, Routes} from "react-router-dom";
import {UpcomingTourDates} from "@/components/Pages/TourDetailsPage/UpcomingTourDates.jsx";
import {PastTourDates} from "@/components/Pages/TourDetailsPage/PastTourDates.jsx";
import {ShowDetailsPage} from "@/components/Pages/TourDetailsPage/ShowDetailsPage.jsx";
import {SongDetails} from "@/components/Pages/TourDetailsPage/Song/SongDetails.jsx";


function App() {


  return (
    <>
            <Header/>
                <div className={"min-h-full"}>
                    <Routes>
                        <Route path="/" element={<HomePage/>}/>
                        <Route path="/tour" element={<UpcomingTourDates/>}/>
                        <Route path={"/tour/past"} element={<PastTourDates/>}/>
                        <Route path={"/tour/:showId"} element={<ShowDetailsPage/>}/>
                        <Route path={"/tour/:showId/:songId"} element={<SongDetails/>}/>
                    </Routes>
                </div>
            <Footer/>
    </>
  )
}

export default App
