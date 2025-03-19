import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination.jsx";
import React, {useState} from "react";

export const MyPagination = ({tour, currPage, setCurrPage}) => {
    const [startPage, setStartPage] = useState(1);
    const [endPage, setEndPage] = useState(3);

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
                                                   className={"hover:border-b cursor-pointer "}
                                                   isActive={currPage === item}
                                                   key={index}>{item}</PaginationLink>
                        }) : Array.from({length: tour.pageablePart?.totalPages}, (_, i) => i + startPage).map((item, index) => {
                            return <PaginationLink style={{ backgroundColor: currPage !== item && 'transparent' }}
                                                   onClick={() => setCurrPage(item)}
                                                   className={"hover:border-b cursor-pointer "}
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
    );
}