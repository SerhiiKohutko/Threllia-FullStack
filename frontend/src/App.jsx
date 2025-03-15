
import './App.css'
import {Header} from "./components/header.jsx";
import {Hero} from "./components/hero.jsx";
import {SignUpBanner} from "@/components/SignUpBanner.jsx";
import {TourSectionOverview} from "@/components/Tour/TourSection.jsx";
import {StoreOverview} from "@/components/StoreOverview.jsx";
import {LatestUpdateOverview} from "@/components/LatestUpdateOverview.jsx";
import {GalleryOverview} from "@/components/GalleryOverview.jsx";
import {Footer} from "@/components/Footer.jsx";
import {FollowUsSection} from "@/components/FollowUsSection.jsx";


function App() {


  return (
    <>
        <Header/>
        <Hero/>
        <SignUpBanner/>
        <TourSectionOverview/>
        <StoreOverview/>
        <LatestUpdateOverview/>
        <GalleryOverview/>
        <FollowUsSection/>
        <SignUpBanner/>
        <Footer/>
    </>
  )
}

export default App
