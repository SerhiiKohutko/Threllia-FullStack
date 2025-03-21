import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getAllSongsOrdered} from "@/redux/song/Action.js";
import {Hero} from "@/components/ReusableComponents/Hero.jsx";
import bgImage
    from "@/resources/bg_2.png";
import {useNavigate} from "react-router-dom";

export const Songs = () => {
    const dispatch = useDispatch();
    const songs = useSelector(state => state.song);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getAllSongsOrdered());
    },[])

    return (
        <div>
            <Hero background={bgImage} pageTitle={"Songs"} buttonContent={"Listen To Threllia"} navigateTo={"#"} />

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