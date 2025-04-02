import React from "react";
import { Button } from "@/components/ui/button.jsx";
import {BackgroundEffects} from "@/components/Pages/Auth/AuthPage.jsx";
import {useSelector} from "react-redux";

export const SignUpBannerSection = () => {
    const auth = useSelector((state) => state.auth);

    if (auth.userObtained){
        return ;
    }
    return (

        <div className="relative h-[30rem] overflow-hidden">

           <BackgroundEffects/>

            <div
                className="relative z-10 flex flex-col items-center justify-center h-full max-w-4xl mx-auto px-6 text-center">
                <h2 className="text-5xl font-tradeWinds text-white mb-6">
                    JOIN THE <span className="text-orange-500">NIGHTMARE</span>
                </h2>

                <p className="text-gray-300 font-medium mb-8 max-w-lg">
                    Be the first to know about exclusive tour dates, limited edition merch,
                    and special fan events.
                </p>

                <div className="w-full max-w-lg">
                    <div
                        className="h-px w-full bg-gradient-to-r from-transparent via-orange-600 to-transparent mb-8"></div>

                    <div className="flex flex-col sm:flex-row gap-4 mb-6">
                        <input
                            type="text"
                            placeholder="YOUR NAME"
                            className="flex-1 bg-gray-900 bg-opacity-70 border border-gray-800 text-white px-4 py-3 focus:border-orange-500 focus:outline-none uppercase"
                        />
                        <input
                            type="email"
                            placeholder="YOUR EMAIL"
                            className="flex-1 bg-gray-900 bg-opacity-70 border border-gray-800 text-white px-4 py-3 focus:border-orange-500 focus:outline-none uppercase"
                        />
                    </div>

                    <Button
                        className="w-full bg-orange-600 hover:bg-orange-700 text-white py-6 font-tradeWinds text-xl relative overflow-hidden group">
                        <span className="relative z-10">JOIN THE LEGION</span>
                        <span
                            className="absolute inset-0 bg-orange-800 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></span>
                    </Button>

                    <p className="text-xs text-gray-500 mt-4">
                        By signing up, you agree to receive emails from Threllia and accept our privacy policy.
                    </p>
                </div>

            </div>
            <div
                className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-t from-amber-700/40 to-transparent"></div>

            <style jsx>{`
                @keyframes float {
                    0%, 100% {
                        transform: translateY(0) rotate(0deg);
                    }
                    50% {
                        transform: translateY(-40px) rotate(10deg);
                    }
                }

                @keyframes rainFall {
                    0% {
                        transform: translateY(0%);
                        opacity: 0.1;
                    }
                    50% {
                        opacity: 0.3; 
                    }
                    90% {
                        opacity: 0.15; 
                    }
                    100% {
                        transform: translateY(100vh); 
                        opacity: 0.05; 
                    }
                }
            `}</style>
        </div>
    );
};