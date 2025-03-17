import bgImage from "@/resources/ajfajm_big_burning_cross_7f4e8d49-44f0-4d57-b94d-9c20f7893d64.png";
import React from "react";

export const SongDetails = () => {
    return (
        <div>
            <div className="relative min-h-screen">
                <div
                    className="absolute inset-0 bg-center bg-contain w-full"
                    style={{
                        backgroundImage: `url('${bgImage}')`,
                        filter: "brightness(0.6)",
                    }}>

                    <div
                        className="absolute inset-0 bg-[url('/cracked-dark.png')] bg-cover opacity-10 pointer-events-none"></div>

                    <div
                        className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-t from-amber-700/40 to-transparent"></div>
                </div>


                <div className="relative z-10 flex items-center justify-center min-h-screen">
                    <h1 className="font-tradeWinds text-8xl text-white">SONG DETALS</h1>
                </div>
            </div>
        </div>
    );
}