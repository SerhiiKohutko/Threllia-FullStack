import bgImage
    from "@/resources/ajfajm_big_burning_cross_7f4e8d49-44f0-4d57-b94d-9c20f7893d64.png";
import {TourDatesCarousel} from "@/components/HomePage/Sections/SectionComponents/TourCard.jsx";
import {Button} from "@/components/ui/button.jsx";
import React, {useEffect, useState} from "react";

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
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getPastDateShows} from "@/redux/tour/Action.js";

//TODO - fix background image
export const PastTourDates = () => {
    const navigate = useNavigate();
    const tour = useSelector(store => store.tours);
    const dispatch = useDispatch();
    const [currPage, setCurrPage] = useState(1);
    const [startPage, setStartPage] = useState(1);
    const [endPage, setEndPage] = useState(3);



    useEffect(() => {
        dispatch(getPastDateShows(currPage - 1));
    },[currPage]);



    function handleNextPageChange() {
        setCurrPage(prevPage => {
            const newPage = prevPage + 1;

            if (prevPage === endPage) {
                setStartPage(startPage + 1);
                setEndPage(endPage + 1);
            }

            return newPage;
        });
    }

    function handlePrevPageChange() {
        setCurrPage(prevPage => {
            const newPage = prevPage - 1;

            if (newPage < startPage) {
                setStartPage(startPage - 1);
                setEndPage(endPage - 1);
            }

            return newPage;
        });
    }
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
                <h1 className="font-tradeWinds text-8xl text-white">PAST TOUR DATES</h1>
            </div>
        </div>

        <div className="h-full bg-gray-900 flex flex-col items-center pb-36">
            <div className={"flex flex-row w-[80%] border-b border-orange-500 text-nowrap mt-8 mb-8"}>
                <div className={"flex flex-row w-full justify-start"}>
                    <p className={"text-6xl font-tradeWinds text-white"}>Past Tour Dates</p>
                </div>
                <div className={"flex flex-row"}>
                    <Pagination className={"flex w-full flex-row justify-end bg-transparent"}>
                        <PaginationContent className={"text-white"}>
                            <div>
                                <PaginationItem className={currPage === 1 ? "hidden" : "" + "cursor-pointer"}>
                                    <PaginationPrevious style={{ backgroundColor: 'transparent' }} onClick={handlePrevPageChange}/>
                                </PaginationItem>
                            </div>
                            <div>
                                {
                                    tour.pageablePart?.totalPages > 3 ? Array.from({length: 3}, (_, i) => i + startPage).map((item, index) => {
                                        return <PaginationLink style={{ backgroundColor: currPage !== item && 'transparent' }}
                                                               onClick={() => setCurrPage(item)}
                                                               className={"hover:border-b cursor-pointer"}
                                                               isActive={currPage === item}
                                                               key={index}>{item}</PaginationLink>
                                    }) : Array.from({length: tour.pageablePart?.totalPages}).map((item, index) => {
                                        return <PaginationLink style={{ backgroundColor: 'transparent' }}
                                                               onClick={() => setCurrPage(item)}
                                                               className={"hover:border-b cursor-pointer"}
                                                               isActive={currPage === item}
                                                               key={index}>{item}</PaginationLink>
                                    })
                                }

                            </div>
                            <div>
                                <PaginationItem
                                    className={currPage === tour.pageablePart?.totalPages ? "invisible" : "" + "cursor-pointer"}>
                                    <PaginationNext style={{ backgroundColor: 'transparent' }} onClick={handleNextPageChange}/>
                                </PaginationItem>
                            </div>
                        </PaginationContent>
                    </Pagination>
                </div>
            </div>

            <div className={"w-[80%]"}>
                {
                    tour.tourList?.map((item, index) => (
                        <PastShow show={item} navigate={navigate}/>
                    ))
                }
            </div>
        </div>
    </div>
    );
}