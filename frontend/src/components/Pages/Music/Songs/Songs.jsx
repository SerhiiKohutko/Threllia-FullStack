import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {getAllSongsOrdered} from "@/redux/song/Action.js";
import {Hero} from "@/components/ReusableComponents/Hero.jsx";
import bgImage
    from "@/resources/bg_2.png";
import {useNavigate} from "react-router-dom";
import {LoadingPage} from "@/components/ReusableComponents/LoadingPage.jsx";

export const Songs = () => {
    const dispatch = useDispatch();
    const songs = useSelector(state => state.song);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        document.title = 'Songs';
    }, [])

    useEffect(() => {
        dispatch(getAllSongsOrdered());
    },[])

    useEffect(() => {
        setLoading(songs.loading)
    },[songs.loading])

    if(loading){
        return <LoadingPage/>
    }
    return (
        <div>
            <Hero background={bgImage} pageTitle={"Songs"} buttonContent={"Listen To Threllia"} navigateTo={"https://open.spotify.com/artist/5R6TtzzCoaQAwyVjsAjyuz?si=vAYIxm9GQbGWFJ_M1vfm-A"} />

            <div className={"h-full bg-black flex flex-col justify-center items-center w-full"}>
                <div className={"w-[60%] mt-5 mb-8"}>
                    {
                        songs.songsList?.characters?.map((item, index) => (
                            <div key={index} className={"h-full border-b border-orange-500 text-white"}>
                                <p className={"font-rubikPaint text-3xl"}>{item}</p>
                                {
                                    songs.songsList?.songs?.filter(e => e.title.charAt(0) === item).map((el, index) => (
                                        <div onClick={() => navigate("/songs/" + el.id)}
                                             className={"cursor-pointer text-xl font-tradeWinds max-w-fit hover:text-amber-600 transition-[200ms]"} key={index}>
                                            <span>{el.title}</span>
                                        </div>
                                    ))
                                }
                                <div className="h-px flex-grow bg-gradient-to-r from-orange-600 via-orange-500 to-transparent"></div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}