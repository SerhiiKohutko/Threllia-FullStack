import {BsThreeDots, BsThreeDotsVertical} from "react-icons/bs";
import React from "react";
import {useNavigate} from "react-router-dom";

export const TrackList = ({ trackList }) => {
    const navigate = useNavigate();
    const [indexHovered, setIndexHovered] = React.useState(null);

    return (
        <div className="flex flex-col w-full pt-5 pl-3">
            {(trackList && trackList.length > 0) ?
                trackList?.map((item, index) => (
                    <div key={index}
                         className="flex flex-row items-center justify-between w-full text-3xl font-tradeWinds text-white pb-6">
                        <div className="mr-4 max-w-[80%]">
                            <p className={index % 2 === 0 ? "text-orange-700" : "text-white"}>
                                {index + 1}.{" "}
                                <span
                                    className="cursor-pointer hover:underline whitespace-nowrap text-white"
                                    onClick={() => navigate("/songs/" + item.id)}
                                >
                                    {item.title}
                                </span>
                            </p>
                        </div>

                        <div className="relative ml-auto" onMouseLeave={() => setIndexHovered(null)}>
                            <div className="group">
                                <button
                                    onMouseEnter={() => setIndexHovered(index)}
                                    className="rounded-full bg-black text-white px-4 py-2 uppercase tracking-wider
                                        text-sm font-bold border border-white/20 text-center hover:bg-black/80
                                        transition-colors flex justify-between items-center"
                                >
                                    {indexHovered === index ? <BsThreeDotsVertical/> : <BsThreeDots/>}
                                </button>
                                <div
                                    className="absolute right-0 top-full mt-1 w-60 bg-black
                                        text-white border border-white/20 shadow-lg hidden
                                        group-hover:block group-focus-within:block z-20 group-hover:opacity-100"
                                >
                                    <div className="h-2 absolute -top-2 left-0 right-0 bg-transparent"></div>
                                    <div
                                        className="py-2 px-2 uppercase tracking-wider text-sm font-bold
                                        hover:bg-black/80 cursor-pointer border-b border-white/10"
                                        onClick={() => console.log("Lyrics & stats clicked")}
                                    >
                                        See lyrics & stats for this song
                                    </div>
                                    <div
                                        className="py-2 px-2 uppercase tracking-wider text-sm font-bold hover:bg-black/80 cursor-pointer"
                                        onClick={() => console.log("Concerts clicked")}
                                    >
                                        See all concerts with this song
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )) :
                <div className="text-3xl font-tradeWinds text-white">No Songs Found</div>
            }
        </div>
    );
}