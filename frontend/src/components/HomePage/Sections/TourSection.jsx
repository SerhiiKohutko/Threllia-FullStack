import "./css/tour.css"
import {TourDatesCarousel} from "@/components/Tour/TourCard.jsx";
import {Button} from "@/components/ui/button.jsx";
import React from "react";


export const TourSectionOverviewSection = () => {
    return (
        <div className="relative bg-black/90 min-h-screen w-full flex flex-col items-center justify-center py-20 overflow-hidden">
            {/* Background image with crosses - this would be a div with a background image */}
            <div className="absolute inset-0 -z-20 bg-gradient-to-b from-gray-900 to-black opacity-80"></div>

            {/* Dripping effect */}
            <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-orange-800/20 to-transparent -z-10"></div>


            {/* Rain effect - moved to full container */}
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
                    className="text-xl font-tradeWinds mt-16 bg-transparent border border-orange-500/50 text-white hover:bg-orange-800/30 hover:border-orange-500 transition-colors px-8 py-3">
                    VIEW ALL DATES
                </Button>
                <div
                    className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-t from-amber-700/40 to-transparent"></div>
            </div>

            <style jsx global>{`
                @keyframes rain-fall {
                    0% {
                        transform: translateY(-10%);
                    }
          100% { transform: translateY(1000%); }
        }
        
        @keyframes fly-0 { 0% { transform: translate(0, 0) rotate(0deg); } 100% { transform: translate(100vw, -50vh) rotate(360deg); } }
        @keyframes fly-1 { 0% { transform: translate(0, 0) rotate(0deg); } 100% { transform: translate(-80vw, -30vh) rotate(360deg); } }
        @keyframes fly-2 { 0% { transform: translate(0, 0) rotate(0deg); } 100% { transform: translate(60vw, -70vh) rotate(360deg); } }
        @keyframes fly-3 { 0% { transform: translate(0, 0) rotate(0deg); } 100% { transform: translate(-120vw, -40vh) rotate(360deg); } }
        @keyframes fly-4 { 0% { transform: translate(0, 0) rotate(0deg); } 100% { transform: translate(90vw, -60vh) rotate(360deg); } }
        @keyframes fly-5 { 0% { transform: translate(0, 0) rotate(0deg); } 100% { transform: translate(-70vw, -50vh) rotate(360deg); } }
        @keyframes fly-6 { 0% { transform: translate(0, 0) rotate(0deg); } 100% { transform: translate(110vw, -30vh) rotate(360deg); } }
        @keyframes fly-7 { 0% { transform: translate(0, 0) rotate(0deg); } 100% { transform: translate(-100vw, -60vh) rotate(360deg); } }
      `}</style>
        </div>
    );
};

export default TourSectionOverviewSection;