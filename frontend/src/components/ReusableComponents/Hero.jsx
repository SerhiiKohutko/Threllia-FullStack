import React from "react";
import {Button} from "@/components/ui/button.jsx";
import {useNavigate} from "react-router-dom";

export const Hero = ({pageTitle, background, buttonContent, navigateTo, additionalInfoForShowDetails}) => {
    const navigate = useNavigate();

    return (
        <div>
            <div className="relative min-h-screen">
                <div
                    className="absolute inset-0 bg-center bg-cover w-full"
                    style={{
                        backgroundImage: `url('${background}')`,
                        filter: "brightness(0.6)",
                    }}>

                    <div
                        className="absolute inset-0 bg-[url('/cracked-dark.png')] bg-cover opacity-10 pointer-events-none"></div>

                    <div
                        className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-t from-amber-700/40 to-transparent"></div>
                </div>


                <div className="relative z-10 flex flex-col items-center justify-center min-h-screen font-tradeWinds text-white">
                    <h1 className="text-8xl">{pageTitle}</h1>
                    {
                        buttonContent &&
                        <div >
                            <Button onClick={() =>  window.location.href=navigateTo} variant={"ghost"} className={"text-3xl p-5 pt-6 border-2 rounded-none border-white mt-3 w-full transition-[200ms]"}>{buttonContent}</Button>
                        </div>
                    }
                    {
                        additionalInfoForShowDetails &&
                        <div className={"text-6xl mt-4"}>
                            {additionalInfoForShowDetails.place},<span>     </span>
                            <span className={"text-gray-300"}>{additionalInfoForShowDetails.date}</span>
                        </div>

                    }
                </div>
            </div>
        </div>
    );
}