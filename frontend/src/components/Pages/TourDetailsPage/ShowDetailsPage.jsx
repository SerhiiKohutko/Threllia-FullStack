import bgImage from "@/resources/ajfajm_big_burning_cross_7f4e8d49-44f0-4d57-b94d-9c20f7893d64.png";
import React, {useEffect} from "react";
import {Hero} from "@/components/Hero/Hero.jsx";
import {useNavigate, useParams} from "react-router-dom";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { BsThreeDots } from "react-icons/bs";
import { BsThreeDotsVertical } from "react-icons/bs";
import {Button} from "@/components/ui/button.jsx"
import {SignUpBannerSection} from "@/components/HomePage/Sections/SignUpBannerSection.jsx";
import {useDispatch, useSelector} from "react-redux";
import {getShowDetails} from "@/redux/tour/Action.js";

export const ShowDetailsPage = () => {
    const [indexHovered, setIndexHovered] = React.useState(null);
    const dispatch = useDispatch();
    const {showId} = useParams();
    const navigate = useNavigate();
    const tour = useSelector((state) => state.tours);

    useEffect(() => {
        dispatch(getShowDetails(showId));
    },[])

    useEffect(() => {
        console.log(tour.tourDetails.songsList)
    },[tour.tourDetails.songsList])

    return (
        <div>
            <Hero pageTitle={"TOUR DETAILS"} background={bgImage}/>
            <div className={"bg-black min-h-[34rem] flex flex-col items-center pb-10"}>
                <div className={"text-3xl text-orange-700 justify-start w-[60%] border-b border-orange-500 mb-5 pb-3 mt-8 font-deliciousHandrawn "}>
                    <p>Tour: </p>
                    <p>Damage Inc</p>
                </div>
                <div className={"flex flex-row w-[60%] text-white text-3xl"}>
                    <p className={"text-amber-600 font-deliciousHandrawn"}>SETLIST:</p>
                </div>
                <div className={"flex flex-col w-[60%] pt-5 pl-3"}>

                    {
                        (tour.tourDetails?.songsList && tour.tourDetails.songsList.length > 0) ?
                        tour.tourDetails?.songsList?.map((item, index) => (
                            <div key={index} className={"flex flex-row items-center w-[50%] text-3xl font-tradeWinds text-white pb-6"}>
                                <div className={"flex flex-grow max-w-[60%]"}>
                                    <p className={index % 2 === 0 ? "text-orange-700" : "text-white"}>{index + 1}.
                                        <span className={"cursor-pointer hover:underline overflow-auto text-white"} onClick={() => navigate("/songs/" + item.id)}>{item.title}</span>
                                    </p>
                                </div>

                                <div className="relative ml-4 flex items-center flex-row" key={index}>
                                    <div onMouseLeave={() => setIndexHovered(null)} className="group">
                                        <button
                                            onMouseEnter={() => setIndexHovered(index)}
                                            className="w-full rounded-full bg-black text-white px-4 py-2 uppercase tracking-wider
                                            text-sm font-bold border border-white/20 text-center hover:bg-black/80
                                            transition-colors flex justify-between items-center">
                                            {indexHovered === index ? <BsThreeDotsVertical/> : <BsThreeDots/>}
                                        </button>
                                        <div
                                            className="absolute left-0 top-full mt-1 w-60 bg-black
                                            text-white border border-white/20 shadow-lg hidden
                                            group-hover:block group-focus-within:block z-20 group-hover:opacity-100">

                                            <div className="h-2 absolute -top-2 left-0 right-0 bg-transparent"></div>
                                            <div
                                                className="py-2 px-2 uppercase tracking-wider text-sm font-bold
                                            hover:bg-black/80 cursor-pointer border-b border-white/10"
                                                onClick={() => console.log("Lyrics & stats clicked")}>
                                                See lyrics & stats for this song
                                            </div>
                                            <div
                                                className="py-2 px-2 uppercase tracking-wider text-sm font-bold hover:bg-black/80 cursor-pointer"
                                                onClick={() => console.log("Concerts clicked")}>
                                                See all concerts with this song
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        )) : <div className={"text-3xl font-tradeWinds text-white pl-[-0.75rem]"}>No Songs Found</div>
                    }
                </div>
            </div>
            <SignUpBannerSection/>
        </div>
    );
}