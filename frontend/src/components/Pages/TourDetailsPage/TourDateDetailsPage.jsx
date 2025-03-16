import {useParams} from "react-router-dom";
import {Header} from "@/components/Header/Header.jsx";
import bgImage from "@/resources/ajfajm_THRELLIA_aggressive_style_metal_band_logo_for_profile_pi_0572d61d-363c-45bc-9c66-9833d73e2d63.png";
import React from "react";

export const TourDateDetailsPage = () => {
    const {tourId} = useParams();

    return (
        <div className={"min-h-full"}>
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: `url('${bgImage}')`,
                    filter: "brightness(0.6)",
                }}
            ></div>

        </div>
    );

}