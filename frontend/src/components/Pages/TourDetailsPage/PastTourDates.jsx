import bgImage
    from "@/resources/ajfajm_big_burning_cross_7f4e8d49-44f0-4d57-b94d-9c20f7893d64.png";
import {TourDatesCarousel} from "@/components/HomePage/Sections/SectionComponents/TourCard.jsx";
import {Button} from "@/components/ui/button.jsx";
import React from "react";

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import {PastShow} from "@/components/Pages/TourDetailsPage/PastShow.jsx";

//TODO - fix background image
export const PastTourDates = () => {
    return (
        <div>
            <div className="relative min-h-screen">
                <div
                    className="absolute inset-0 bg-center w-full"
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
                    <h1 className="font-tradeWinds text-8xl text-white">PAST TOUR DATES</h1>
                </div>
            </div>

            <div className="h-full bg-gray-900 flex flex-col items-center pb-36">
                <div className={"flex flex-row w-[80%] border-b border-orange-500 text-nowrap mt-8 mb-8"}>
                    <div className={"flex flex-row w-full justify-start"}>
                        <p className={"text-6xl font-tradeWinds text-white"}>Past Tour Dates</p>
                    </div>
                    <div className={"flex flex-row"}>
                        <Pagination className={"flex w-full flex-row justify-end"}>
                            <PaginationContent className={"text-white"}>
                                <PaginationItem>
                                    <PaginationPrevious href="#" />
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationLink href="#">1</PaginationLink>
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationEllipsis />
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationNext href="#" />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
                </div>

                <div className={"w-[80%]"} >
                    {
                     [1,1,1,1,1].map((item, index) => (
                         <PastShow/>
                     ))
                    }
                </div>
            </div>
        </div>
    );
}