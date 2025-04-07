import bgImage
    from "@/resources/ajfajm_big_burning_cross_7f4e8d49-44f0-4d57-b94d-9c20f7893d64.png";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getPastDateShows} from "@/redux/tour/Action.js";

import {
    PastTourDatesSection
} from "@/components/Pages/Tour/PastTourDates/PastTourDatesSection.jsx";
import {Hero} from "@/components/ReusableComponents/Hero.jsx";
import {LoadingPage} from "@/components/ReusableComponents/LoadingPage.jsx";

export const PastTourDates = () => {

    const tour = useSelector(store => store.tours);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [currPage, setCurrPage] = useState(1);

    useEffect(() => {
        dispatch(getPastDateShows(currPage - 1));
    },[currPage]);

    useEffect(() => {
        setLoading(tour.loading)
    },[tour.loading])

    if(loading){
        return <LoadingPage/>
    }


    return (
        <div>
            <Hero pageTitle={"Past Tour Dates"} background={bgImage}/>
            <PastTourDatesSection tour={tour} currPage={currPage} setCurrPage={setCurrPage}/>
        </div>
    );
}