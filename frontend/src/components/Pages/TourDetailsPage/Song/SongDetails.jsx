import bgImage from "@/resources/ajfajm_big_burning_cross_7f4e8d49-44f0-4d57-b94d-9c20f7893d64.png";
import React from "react";
import {Hero} from "@/components/Hero/Hero.jsx";
import {Button} from "@/components/ui/button.jsx";
import {
    Pagination,
    PaginationContent, PaginationEllipsis,
    PaginationItem,
    PaginationLink, PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination.jsx";
import {PastShow} from "@/components/Pages/TourDetailsPage/PastShow.jsx";
import {SignUpBannerSection} from "@/components/HomePage/Sections/SignUpBannerSection.jsx";
import SongDetailsSection from "@/components/Pages/TourDetailsPage/Song/SongDetailsSection.jsx";

export const SongDetails = () => {
    return (
        <div>
            <Hero pageTitle={"So Far All Quite"}/>
            <SongDetailsSection/>

            <div className="relative h-full bg-gradient-to-b from-gray-800 to-black  flex flex-col items-center pb-36">
                <div className={"flex flex-row w-[80%] border-b border-orange-500 text-nowrap mt-8 mb-8"}>
                    <div className={"flex flex-row w-full justify-start"}>
                        <p className={"text-6xl font-tradeWinds text-white"}>Past Tour Dates</p>
                    </div>
                    <div className={"flex flex-row"}>
                        <Pagination className={"flex w-full flex-row justify-end"}>
                            <PaginationContent className={"text-white"}>
                                <PaginationItem>
                                    <PaginationPrevious href="#"/>
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationLink href="#">1</PaginationLink>
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationEllipsis/>
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationNext href="#"/>
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
                </div>

                <div className={"w-[80%]"}>
                    {
                        [1, 1, 1, 1, 1].map((item, index) => (
                            <PastShow/>
                        ))
                    }

                </div>

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

                <div
                    className="absolute inset-0 bg-[url('/cracked-dark.png')] bg-cover opacity-10 pointer-events-none"></div>

                <div
                    className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-t from-amber-700/40 to-transparent"></div>

            </div>

            <SignUpBannerSection/>
        </div>
    );
}