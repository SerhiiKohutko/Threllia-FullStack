import bgImage
    from "@/resources/ajfajm_THRELLIA_aggressive_style_metal_band_logo_for_profile_pi_0572d61d-363c-45bc-9c66-9833d73e2d63.png";
import React, {useEffect, useState} from "react";
import {TourCard, TourDatesCarousel} from "@/components/Pages/HomePage/Sections/SectionComponents/TourCard.jsx";
import {Button} from "@/components/ui/button.jsx";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {LoadingPage} from "@/components/ReusableComponents/LoadingPage.jsx";


//TODO - ADD HERO COMPONENT
export const UpcomingTourDates = () => {
    const navigate = useNavigate();

    useEffect(() => {
        document.title = 'Tour';
    }, [])

    return (
        <div>
            <div className="relative min-h-screen">
                <div
                    className="absolute inset-0 bg-cover bg-center min-h-full"
                    style={{
                        backgroundColor: "black",
                        backgroundImage: `url('${bgImage}')`,
                        filter: "brightness(0.6)",
                    }}>

                    <div
                        className="absolute inset-0 bg-[url('/cracked-dark.png')] bg-cover opacity-10 pointer-events-none"></div>

                    <div
                        className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-t from-amber-700/40 to-transparent"></div>
                </div>


                <div className="relative z-10 flex items-center justify-center min-h-screen">
                    <h1 className="font-tradeWinds text-8xl text-white">UPCOMING TOUR DATES</h1>
                </div>
            </div>

            <div
                className="relative bg-black/90 min-h-screen w-full flex flex-row items-center justify-center py-20 overflow-hidden">
                <div className="absolute inset-0 -z-20 bg-gradient-to-b from-gray-900 to-black opacity-80"></div>

                <div
                    className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-orange-800/20 to-transparent -z-10"></div>


                <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
                    {[...Array(50)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-px bg-white/30"
                            style={{
                                top: `-${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                                height: `${Math.random() * 20 + 10}%`,
                                opacity: Math.random() * 0.7 + 0.3,
                                animation: `rain-fall ${Math.random() * 1.5 + 0.5}s linear infinite`
                            }}
                        />
                    ))}
                </div>

                <div className="mt-10 text-center z-10">
                    <h2 className="font-rubikPaint text-6xl md:text-8xl text-white mb-4 drop-shadow-[0_0_10px_rgba(234,88,12,0.5)]">
                        FROM JUSTICE <span className="text-orange-500">NO HOPE</span>
                    </h2>
                    <p className="font-tradeWinds text-2xl md:text-3xl text-white mb-16 opacity-80">
                        TOUR <span className="text-orange-400">DATES</span>
                    </p>

                    <TourDatesCarousel/>

                    <Button
                        onClick={() => {navigate("/tour/past")}}
                        className="text-xl font-tradeWinds mt-16 bg-transparent border border-orange-500/50 text-white hover:bg-orange-800/30 hover:border-orange-500 transition-colors px-8 py-3">
                        VIEW PAST TOUR DATES
                    </Button>
                    <div
                        className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-t from-amber-700/40 to-transparent"></div>
                </div>
            </div>
        </div>
    )
}
