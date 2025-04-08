import React, {useEffect, useState} from 'react';
import {Button} from "@/components/ui/button.jsx";
import {useDispatch, useSelector} from "react-redux";
import {getClosestShows} from "@/redux/tour/Action.js";
import {getFormattedDate} from "@/components/Utils/DateParser.js";
import {useNavigate} from "react-router-dom";
import {LoadingPage} from "@/components/ReusableComponents/LoadingPage.jsx";
import {LoadingPageAlt} from "@/components/ReusableComponents/LoadingAlt.jsx";

export const TourCard = ({ id, date, city, country, place }) => {
    const navigate = useNavigate();

    useEffect(() => {
        console.log(id);
    }, []);

    return (
        <div className="relative z-10 bg-black/70 text-white p-6 flex flex-col h-full w-full border border-orange-500/30 shadow-lg backdrop-blur-sm transition-all duration-300 hover:border-orange-500 hover:bg-black/80 group">
            <div className="absolute -z-10 top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-orange-800/20"></div>
            <h3 className="text-3xl font-bold mb-1 font-rubikPaint">{city}</h3>
            <h4 className="text-xl font-bold mb-4 text-orange-400"> {country}</h4>
            <p className="text-lg mb-2 font-tradeWinds">{getFormattedDate(date)}</p>
            <p className="text-sm text-gray-400 mb-6">{place}</p>

            <div className="space-y-3 mt-auto">
                <Button onClick={() => navigate(`/ticket/purchase/${id}`)} variant="ghost" className="block w-full py-2 border border-orange-500/50 text-white font-bold hover:bg-orange-800/50 hover:border-orange-500 transition-colors">
                    BUY TICKETS
                </Button>
                <Button variant="ghost" className="block w-full py-2 border border-white/30 text-white font-bold hover:bg-white/10 transition-colors">
                    MORE INFO
                </Button>
            </div>
        </div>
    );
};

export const TourDatesCarousel = () => {
    const dispatch = useDispatch();
    const tour = useSelector(store => store.tours);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        dispatch(getClosestShows())
    },[])

    useEffect(() => {
        setLoading(tour.loading)
    },[tour.loading])

    if(loading){
        return <LoadingPageAlt title={"shows"}/>
    }
    return (
        <div className="w-full max-w-6xl mx-auto px-4 relative">
            {tour.tourList?.length > 0 ?
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-transform duration-500">
                {tour.tourList?.map((tour, index) => (
                    <TourCard key={index} {...tour} />
                ))}
            </div>
                :
                <div className={"flex text-center text-white text-5xl font-tradeWinds justify-center"}><span>No shows planned yet.</span></div>}
        </div>
    );
};