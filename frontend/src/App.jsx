import './App.css'
import {Header} from "./components/Header/Header.jsx";
import {Footer} from "@/components/Footer/Footer.jsx";
import {HomePage} from "@/components/HomePage/HomePage.jsx";
import {Route, Routes} from "react-router-dom";
import {UpcomingTourDates} from "@/components/Pages/TourDetailsPage/UpcomingTourDates.jsx";
import {TourDateDetailsPage} from "@/components/Pages/TourDetailsPage/TourDateDetailsPage.jsx";
import {PastTourDates} from "@/components/Pages/TourDetailsPage/PastTourDates.jsx";


function App() {


  return (
    <>
            <Header/>
                <div className={"min-h-full"}>
                    <Routes>
                        <Route path="/" element={<HomePage/>}/>
                        <Route path="/tour" element={<UpcomingTourDates/>}/>
                        <Route path={"/tour/past"} element={<PastTourDates/>}/>
                        <Route path={"/tour/:tourId"} element={<TourDateDetailsPage/>}/>
                    </Routes>
                </div>
            <Footer/>
    </>
  )
}

export default App
