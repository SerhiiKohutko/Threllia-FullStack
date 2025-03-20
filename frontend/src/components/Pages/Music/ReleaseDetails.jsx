import {Hero} from "@/components/Hero/Hero.jsx";
import {useParams} from "react-router-dom";
import bgImage from '../../../resources/releases.bg.png';
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {getReleaseById} from "@/redux/releases/Action.js";
import {TrackList} from "@/components/Pages/TourDetailsPage/Song/TrackList.jsx";


export const ReleaseDetails = () => {
    const { releaseId } = useParams();
    const release = useSelector(state => state.releases);
    const dispatch = useDispatch();

    // For lightning effects
    const [lightningActive, setLightningActive] = useState(false);
    const [lightningPosition, setLightningPosition] = useState({ x: 50, y: 30 });

    const [sparklePositions] = useState([...Array(20)].map(() => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 2 + Math.random() * 3,
        color: {
            r: 255,
            g: 150 + Math.random() * 100,
            b: Math.random() * 50,
            a: 0.7 + Math.random() * 0.3
        },
        duration: 3 + Math.random() * 5,
        delay: Math.random() * 5
    })));

    // Function to trigger lightning effect
    const triggerLightning = () => {
        const newX = Math.floor(Math.random() * 80) + 10;
        const newY = Math.floor(Math.random() * 40) + 10;

        setLightningPosition({ x: newX, y: newY });
        setLightningActive(true);

        setTimeout(() => {
            setLightningActive(false);
        }, 200);
    };

    useEffect(() => {
        dispatch(getReleaseById(releaseId));

        // Lightning effect interval
        const lightningInterval = setInterval(() => {
            if (Math.random() < 0.15) {
                triggerLightning();
            }
        }, 2000);

        return () => clearInterval(lightningInterval);
    }, [dispatch, releaseId]);

    return (
        <div className="relative">
            <Hero background={bgImage} pageTitle={release.releaseDetails?.title} />


            <div className="relative min-h-[30rem] bg-gray-900 flex flex-col items-center overflow-hidden">
                <div className="absolute inset-0 bg-black bg-opacity-70"></div>

                <div className="absolute inset-0 opacity-20"
                     style={{
                         backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\' fill=\'%23333333\' fill-opacity=\'0.4\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
                         backgroundSize: '100px 100px'
                     }}>
                </div>

                {/* Lightning effects */}
                <div className="absolute inset-0 pointer-events-none">
                    <svg className="absolute w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <path
                            className={`transition-opacity duration-75 ${lightningActive ? 'opacity-100' : 'opacity-0'}`}
                            d={`M${lightningPosition.x},-10 
                               L${lightningPosition.x + 3},${lightningPosition.y} 
                               L${lightningPosition.x - 2},${lightningPosition.y + 10} 
                               L${lightningPosition.x + 5},${lightningPosition.y + 30}
                               L${lightningPosition.x - 3},${lightningPosition.y + 50}
                               L${lightningPosition.x + 7},${lightningPosition.y + 70}
                               L${lightningPosition.x},100`}
                            stroke="#FF6B00"
                            strokeWidth="1"
                            fill="none"
                            filter="drop-shadow(0 0 15px #FF6B00)"
                        />
                    </svg>
                    <div
                        className={`absolute w-full h-full bg-orange-500 mix-blend-overlay transition-opacity duration-100 ${lightningActive ? 'opacity-10' : 'opacity-0'}`}
                    ></div>
                </div>

                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {sparklePositions.map((spark, i) => (
                        <div
                            key={`sparkle-${i}`}
                            className="absolute rounded-full"
                            style={{
                                left: `${spark.left}%`,
                                top: `${spark.top}%`,
                                width: `${spark.size}px`,
                                height: `${spark.size}px`,
                                backgroundColor: `rgba(${spark.color.r}, ${spark.color.g}, ${spark.color.b}, ${spark.color.a})`,
                                filter: lightningActive ? 'blur(1.5px) brightness(1.5)' : 'blur(1px)',
                                boxShadow: lightningActive
                                    ? '0 0 5px 2px rgba(255,146,10,0.5)'
                                    : '0 0 3px 1px rgba(255,146,10,0.3)',
                                animation: `float ${spark.duration}s ease-in-out ${spark.delay}s infinite`,
                                transition: 'all 0.15s ease-out',
                            }}
                        ></div>
                    ))}
                </div>

                <div className="relative z-10 w-full max-w-6xl mx-auto px-4 pt-12 pb-24">
                    <div className="flex flex-col md:flex-row justify-between items-center w-full border-b border-orange-500 pb-8 mb-8">
                        <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
                            <h3 className="text-orange-500 font-tradeWinds text-2xl mb-4">BAND MEMBERS</h3>
                            <div className="grid md:grid-cols-2 gap-4 text-white">
                                {release.releaseDetails?.nameToInstrumentsPlayed &&
                                    Object.entries(release.releaseDetails.nameToInstrumentsPlayed).map(([name, instrument], index) => (
                                        <div key={index} className="bg-gray-800 bg-opacity-50 p-4 border-l-2 border-orange-500 transform transition-transform hover:translate-x-2">
                                            <p className="text-orange-300 font-tradeWinds">
                                                <span className="block text-white opacity-80">{name}</span>
                                                {instrument}
                                            </p>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>

                        <div className="md:w-1/2 flex justify-center">
                            <div className="relative group">
                                <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 rounded-lg blur opacity-70 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>

                                <img
                                    src={release.releaseDetails?.coverName ? `http://localhost:8080/releases/${release.releaseDetails.coverName}` : '/placeholder.jpg'}
                                    alt={release.releaseDetails?.title || "Album cover"}
                                    className="relative w-64 h-64 object-cover border-2 border-orange-500 shadow-lg shadow-orange-500/50 cursor-pointer transform transition-all duration-300 hover:scale-105"
                                />

                                <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-opacity duration-300 flex items-center justify-center">
                                    <span className="text-orange-500 font-tradeWinds text-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        {release.releaseDetails?.releaseYear || ""}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tracklist and Description */}
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-12">
                        <div className="lg:w-3/5">
                            <h2 className="text-white text-3xl font-tradeWinds mb-6 flex items-center">
                                <span className="mr-2">TRACKLIST</span>
                                <div className="h-px flex-grow bg-gradient-to-r from-orange-600 via-orange-500 to-transparent"></div>
                            </h2>

                            <div className="bg-gray-900 bg-opacity-70 backdrop-blur-sm border border-gray-800 p-6">
                                {release.releaseDetails?.trackList ? (
                                    <TrackList trackList={release.releaseDetails.trackList} />
                                ) : (
                                    <div className="py-16 text-center text-gray-500">
                                        <p className="font-tradeWinds">Tracklist loading...</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="lg:w-2/5">
                            <h2 className="text-orange-500 text-3xl font-tradeWinds mb-6 flex items-center">
                                <span className="mr-2">ABOUT</span>
                                <div className="h-px flex-grow bg-gradient-to-r from-orange-500 via-orange-600 to-transparent"></div>
                            </h2>

                            <div className="bg-gray-900 bg-opacity-50 backdrop-blur-sm border border-gray-800 p-6">
                                <div className="mb-6">
                                    <h3 className="text-white font-tradeWinds text-xl mb-2">DESCRIPTION</h3>
                                    <p className="text-orange-300 leading-relaxed">
                                        {release.releaseDetails?.description || "No description available for this release."}
                                    </p>
                                </div>

                                <div className="pt-6 border-t border-gray-800">
                                    <h3 className="text-white font-tradeWinds text-xl mb-2">RELEASE INFO</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-gray-400">Released:</p>
                                            <p className="text-orange-300 font-tradeWinds">
                                                {release.releaseDetails?.dateReleased || "Unknown"}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-t from-amber-700/40 to-transparent"></div>
            </div>

            <style jsx>{`
                @keyframes float {
                    0%, 100% {
                        transform: translateY(0) rotate(0deg);
                    }
                    50% {
                        transform: translateY(-20px) rotate(5deg);
                    }
                }
            `}</style>
        </div>
    );
};