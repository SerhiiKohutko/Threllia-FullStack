import './App.css'
import {Header} from "./components/ReusableComponents/Header.jsx";
import {Footer} from "@/components/ReusableComponents/Footer.jsx";
import {HomePage} from "@/components/Pages/HomePage/HomePage.jsx";
import {Route, Routes} from "react-router-dom";
import {UpcomingTourDates} from "@/components/Pages/Tour/UpcomingTourDates/UpcomingTourDates.jsx";
import {PastTourDates} from "@/components/Pages/Tour/PastTourDates/PastTourDates.jsx";
import {ShowDetailsPage} from "@/components/Pages/Tour/PastTourDates/ShowDetailsPage.jsx";
import {SongDetails} from "@/components/Pages/Music/Songs/SongDetails.jsx";
import {ReleasesSection} from "@/components/Pages/Music/Releases/Releases.jsx";
import {ReleaseDetails} from "@/components/Pages/Music/Releases/ReleaseDetails.jsx";
import {Songs} from "@/components/Pages/Music/Songs/Songs.jsx";
import {ScrollTop} from "@/components/Utils/ScrollTop.jsx";
import {News} from "@/components/Pages/News/News.jsx";
import {LatestUpdateDetailsPage} from "@/components/Pages/News/LatestUpdateDetails.jsx";
import {Gallery} from "@/components/Pages/Gallery/Gallery.jsx";
import {PhotoCollectionDetails} from "@/components/Pages/Gallery/PhotoCollectionDetails.jsx";
import {Shop} from "@/components/Pages/Shop/Shop.jsx";
import {ProductDetails} from "@/components/Pages/Shop/ProductDetailsPage.jsx";
import {CheckoutPage} from "@/components/Pages/Shop/CheckoutPage.jsx";
import {AdminPanel} from "@/components/Pages/AdminPanel/AdminPanel.jsx";
import SongDetailsInfoEditAdmin from "@/components/Pages/AdminPanel/EditPages/SongDetailsInfoEditAdmin.jsx";
import {ToastContainer} from "react-toastify";
import ReleaseDetailsEditAdmin from "@/components/Pages/AdminPanel/EditPages/ReleaseDetailsEditAdmin.jsx";
import ShowDetailsEditAdmin from "@/components/Pages/AdminPanel/EditPages/ShowDetailsEditAdmin.jsx";
import PhotoCollectionEditAdmin from "@/components/Pages/AdminPanel/EditPages/PhotoCollectionEditAdmin.jsx";
import {NewsEditAdmin} from "@/components/Pages/AdminPanel/EditPages/NewsEditAdmin.jsx";

//TODO - export admin buttons to separate component
//TODO - refactor selection of songs on admin pages to avoid code duplication (select and all the related functions can be exported to separate component)
function App() {


  return (
    <>
            <ScrollTop />
            <Header/>
                <ToastContainer/>
                <div className={"min-h-full"}>
                    <Routes>
                        <Route path="/" element={<HomePage/>}/>
                        <Route path="/tour" element={<UpcomingTourDates/>}/>
                        <Route path={"/tour/past"} element={<PastTourDates/>}/>
                        <Route path={"/tour/:showId"} element={<ShowDetailsPage/>}/>
                        <Route path={"/songs/:songId"} element={<SongDetails/>}/>
                        <Route path={"/releases"} element={<ReleasesSection/>}/>
                        <Route path={"/releases/:releaseId"} element={<ReleaseDetails/>}/>
                        <Route path={"/songs"} element={<Songs/>}/>
                        <Route path={"/news"} element={<News/>}/>
                        <Route path={"/news/:latestUpdateId"} element={<LatestUpdateDetailsPage/>}/>
                        <Route path={"/gallery"} element={<Gallery/>}/>
                        <Route path={"/gallery/:photoCollectionId"} element={<PhotoCollectionDetails/>}/>
                        <Route path={"/shop"} element={<Shop/>}/>
                        <Route path={"/shop/:categoryName"} element={<Shop/>}/>
                        <Route path={"/shop/:categoryName/:productId"} element={<ProductDetails/>}/>
                        <Route path={"/checkout"} element={<CheckoutPage/>}/>

                        <Route path={"/admin_panel"} element={<AdminPanel/>}/>
                        <Route path={"/admin/songs/:songId"} element={<SongDetailsInfoEditAdmin/>}/>
                        <Route path={"/admin/releases/:releaseId"} element={<ReleaseDetailsEditAdmin/>}/>
                        <Route path={"/admin/tour/:showId"} element={<ShowDetailsEditAdmin/>}/>
                        <Route path={"/admin/gallery/:photoCollectionId"} element={<PhotoCollectionEditAdmin/>}/>
                        <Route path={"/admin/news/:latestUpdateId"} element={<NewsEditAdmin/>}/>
                    </Routes>
                </div>
            <Footer/>
    </>
  )
}

export default App
