import React from 'react';
import { Button } from '@/components/ui/button.jsx';
import { Play } from 'lucide-react';
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {deleteSong} from "@/redux/song/Action.js";
import {AdminEditDeleteButtons} from "@/components/ReusableComponents/AdminEditDeleteButtons.jsx";


const SongDetailsInfo = ({title, lyrics, totalShows, firstTimePlayed, lastTimePlayed, appearedOn, songId, authors}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    function handleDelete(){
        dispatch(deleteSong(songId));
        navigate("/songs");
    }

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-black to-gray-700 text-white">
            <div className="container mx-auto px-4 py-12 text-center">
                <h1 className="text-5xl md:text-7xl font-bold mb-2">
                    <span className="text-white font-rubikPaint"></span>
                    <span className="text-orange-500 font-rubikPaint">{title}</span>
                </h1>
                <p className="text-xl text-gray-400 italic font-rubikPaint">
                    WRITTEN BY{" "}
                    {authors?.length === 1 ? (
                        <span>{authors[0]}</span>
                    ) : authors?.length === 2 ? (
                        <span>{authors[0]} & {authors[1]}</span>
                    ) : (
                        authors?.map((item, index) => (
                            <span key={index}>
                                 {item}{index !== authors.length - 1 ? ", " : ""}
                            </span>
                        ))
                    )}
                </p>

                <AdminEditDeleteButtons state={{
                    title,
                    lyrics,
                    authors
                }} navigationLink={`/admin/songs/${songId}`} handleDelete={handleDelete} />

            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
                    {/* Left side - Song details */}
                    <div className="flex flex-col items-center pt-6">
                        <div className="text-center font-tradeWinds">
                            <h2 className="text-4xl font-bold mb-2">TOTAL PERFORMANCES</h2>
                            <p className="text-orange-500 text-3xl font-bold mb-6">{totalShows}</p>

                            <div className="mb-8">
                                <p className="text-xl font-bold italic mb-1">FIRST PERFORMED LIVE:</p>
                                <p className="text-2xl font-bold">{firstTimePlayed}</p>
                                <p className="text-gray-400">{!firstTimePlayed ? <span>Never Played Live</span> : <span>Some Place</span>}</p>
                            </div>

                            <div>
                                <p className="text-xl font-bold italic mb-1">MOST RECENT:</p>
                                <p className="text-2xl font-bold">{lastTimePlayed}</p>
                                <p className="text-gray-400">{!firstTimePlayed ? <span>Never Played Live</span> : <span>Some Place</span>}</p>
                            </div>
                            <div className={"h-px bg-orange-600 flex-grow mt-2"}></div>
                        </div>
                        <div className="  p-6">
                            <h2 className="text-4xl font-bold mb-6 text-center font-tradeWinds">APPEARED ON</h2>
                            <div className="grid gap-4 grid-cols-2 items-center">
                                {
                                    appearedOn?.map(release => {
                                        return <div onClick={() => navigate("/releases/" + release.id)}>
                                            <img
                                                src={"http://localhost:8080/releases/" + release?.coverName}
                                                alt="Live Album"
                                                className="w-full h-[10rem] border border-gray-800 cursor-pointer"
                                            />
                                        </div>
                                    })
                                }
                            </div>
                        </div>
                    </div>

                    <div className="border border-orange-900 h-fit p-6">
                        <div className="flex flex-col items-center text-center">
                            <h2 className="text-4xl font-bold mb-6">LYRICS</h2>

                            <div className="text-lg space-y-4 mb-6">
                                {
                                    <div dangerouslySetInnerHTML={{__html:lyrics}}></div>
                                }
                            </div>
                            <Button variant="outline"
                                    className="w-full bg-transparent border-orange-800 text-white hover:bg-orange-900 mb-2 flex items-center justify-center gap-2">
                                <Play size={18}/>
                                <span>PLAY SONG</span>
                            </Button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default SongDetailsInfo;