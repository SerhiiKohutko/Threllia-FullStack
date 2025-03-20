import {MyPagination} from "@/components/Pages/TourDetailsPage/pagination/Pagination.jsx";
import {PastShow} from "@/components/Pages/TourDetailsPage/PastTourDatesComponents/PastShow.jsx";
import React from "react";
import {useNavigate} from "react-router-dom";

export const PastTourDatesSection = ({tour, currPage, setCurrPage}) => {
    const navigate = useNavigate();

    return (
        <div className="h-full bg-gray-900 flex flex-col items-center pb-36">
            <div className={"flex flex-row w-[80%] border-b border-orange-500 text-nowrap mt-8 mb-8"}>
                <div className={"flex flex-row w-full justify-start"}>
                    <p className={"text-6xl font-tradeWinds text-white"}>Past Tour Dates</p>
                </div>
                <div className={"flex flex-row"}>
                    <MyPagination plural={tour} currPage={currPage} setCurrPage={setCurrPage}/>
                </div>
            </div>

            <div className={"w-[80%]"}>
                {
                    tour.tourList?.map((item) => (
                        <PastShow show={item} navigate={navigate}/>
                    ))
                }
            </div>
        </div>
    );
}