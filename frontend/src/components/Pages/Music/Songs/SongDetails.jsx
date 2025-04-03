import bgImage from "@/resources/ajfajm_big_burning_cross_7f4e8d49-44f0-4d57-b94d-9c20f7893d64.png";
import React, {useEffect, useState} from "react";
import {Hero} from "@/components/ReusableComponents/Hero.jsx";
import {SignUpBannerSection} from "@/components/Pages/HomePage/Sections/SignUpBannerSection.jsx";
import SongDetailsInfo from "@/components/Pages/Music/Songs/SongDetailsInfo.jsx";
import {useDispatch, useSelector} from "react-redux";
import {getSongDetails} from "@/redux/song/Action.js";
import {useParams} from "react-router-dom";
import {getShowsContainSongByTitle} from "@/redux/tour/Action.js";
import {
    PastTourDatesSection
} from "@/components/Pages/Tour/PastTourDates/PastTourDatesSection.jsx";


export const SongDetails = () => {
    const dispatch = useDispatch();
    const song = useSelector((state) => state.song);
    const tour = useSelector(state => state.tours)
    const {songId} = useParams();

    const [currPage, setCurrPage] = useState(1);

    useEffect(() => {
        dispatch(getSongDetails(songId));
    },[])


    useEffect(() => {
        dispatch(getShowsContainSongByTitle(song.songDetails.title, currPage));
    }, [song.songDetails?.title, currPage])

    return (
        <div>
            <Hero pageTitle={song.songDetails?.title} background={bgImage}/>

            <SongDetailsInfo title={song.songDetails?.title}
                             lyrics={song.songDetails?.lyrics}
                             totalShows={tour.pageablePart?.totalElements}
                             lastTimePlayed={song.songDetails?.lastTimePlayed}
                             firstTimePlayed={song.songDetails?.firstTimePlayed}
                             appearedOn={song.songDetails?.appearedOn}
                             songId = {songId}
                             authors = {song.songDetails?.authors}
            />

            <div className={"relative text-white"}>
                {tour.tourList?.length > 0 && <PastTourDatesSection tour={tour} currPage={currPage} setCurrPage={setCurrPage}/>}

                <div className="ash-container">
                    {[...Array(50)].map((_, i) => (
                        <div
                            key={`ash-${i}`}
                            className="ash-particle"
                            style={{
                                left: `${i * 2}%`,
                                animationDelay: `${Math.random() * 5}s`,
                                animationDuration: `${3 + Math.random() * 4}s`
                            }}
                        />
                    ))}
                </div>

                <div
                    className="absolute inset-0 bg-[url('/cracked-dark.png')] bg-cover opacity-10 pointer-events-none"></div>

                <div
                    className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-t from-amber-700/40 to-transparent"></div>

            </div>
            <SignUpBannerSection/>
        </div>
    );
}