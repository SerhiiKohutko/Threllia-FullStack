import bgImage from '../../../../resources/ajfajm_bigger_writing_5fdc790a-ffc5-4a57-a6eb-fe80032c0eb7-min.png';
import { Button } from "@/components/ui/button.jsx";
import React from 'react';


export const HeroSection = () => {
    return (
        <section className="relative h-full">
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: `url('${bgImage}')`,
                    filter: "brightness(0.6)",
                }}
            ></div>

            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"/>

            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center text-white">
                <h1 className="text-7xl font-rubikPaint mb-12 mt-16 dripping-text fire-text cursor-default">
                    FROM JUSTICE NO HOPE TOUR
                </h1>

                <div className="space-y-6 flex flex-col mt-20">
                    <p className="text-4xl font-tradeWinds">
                        Threllia is coming to your town!
                    </p>
                    <span className="text-4xl font-tradeWinds">
                        '25 TOUR with new album "SO FAR ALL QUIET"
                    </span>
                    <span className="text-4xl font-tradeWinds">
                        Check if your city is in the list!
                    </span>
                </div>

                <Button variant="ghost" className="font-tradeWinds text-2xl mt-16 px-8 py-6">
                    TICKET INFO
                </Button>
                <Button variant="ghost" className="font-tradeWinds text-2xl mt-8 px-8 py-6">
                    New Album Song List
                </Button>
                <Button variant="ghost" className="font-tradeWinds text-2xl mt-8 px-8">
                    Tour Dates
                </Button>
            </div>

            <div className="absolute bottom-0 w-full h-24 bg-black shadow-2xl overflow-hidden">
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

                {/* Subtle Cracks */}
                <div className="absolute inset-0 bg-[url('/cracked-dark.png')] bg-cover opacity-10 pointer-events-none"></div>

                <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-t from-amber-700/40 to-transparent"></div>
            </div>

            <style jsx>{`
                .ash-container {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    overflow: hidden;
                }

                @keyframes riseUp {
                    0% {
                        transform: translateY(0) rotate(0deg);
                        opacity: 0.7;
                        width: 2px;
                        height: 2px;
                    }

                    50% {
                        opacity: 0.5;
                        width: 2px;
                        height: 2px;
                    }

                    100% {
                        transform: translateY(-100px) translateX(${Math.random() > 0.5 ? '15px' : '-15px'}) rotate(${Math.random() > 0.5 ? '180deg' : '-180deg'});
                        opacity: 0;
                        width: 0.5px;
                        height: 0.5px;
                    }
                }


            `}</style>
        </section>
    );
};
