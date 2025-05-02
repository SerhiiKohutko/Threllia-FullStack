import {Hero} from "@/components/ReusableComponents/Hero.jsx";
import bgImage
    from "@/resources/ajfajm_THRELLIA_LOGO_2651e459-ae61-4677-9aa7-7979295791e2.png";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select.jsx"
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {getAllReleases} from "@/redux/releases/Action.js";
import {MyPagination} from "@/components/ReusableComponents/Pagination.jsx";
import {useNavigate} from "react-router-dom";
import {LoadingPage} from "@/components/ReusableComponents/LoadingPage.jsx";
import {getFormattedDate} from "@/components/Utils/DateParser.js";



export const ReleasesSection = () => {

    const dispatch = useDispatch();
    const releases = useSelector(state => state.releases);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [currPage, setCurrPage] = useState(1);
    const [selectValue, setSelectValue] = useState("DSC");

    useEffect(() => {
        document.title = 'Music';
    }, [])

    useEffect(() => {
        dispatch(getAllReleases(currPage, selectValue));
    }, [currPage, selectValue]);

    useEffect(() => {
        setLoading(releases.loading)
    },[releases.loading])

    if(loading){
        return <LoadingPage/>
    }
    function handleSelectChange(value){
        if (value !== selectValue) {
            setSelectValue(value);
        }
    }
    return (
        <div>
            <Hero pageTitle={"Releases"} background={bgImage}/>
            <div className={"min-h-[50rem] bg-gray-900 flex flex-col items-center"}>
                <div className={"text-white w-[50%] h-full border-b-2 border-orange-300 flex flex-row justify-between mt-8 pb-5"}>
                    <p className={"text-3xl font-rubikPaint"}>Releases</p>
                    <Select onValueChange={handleSelectChange}>
                        <SelectTrigger className="w-[180px] text-white">
                            <SelectValue placeholder={<span className="text-gray-400">Sort By</span>} />
                        </SelectTrigger>
                        <SelectContent className={"text-white bg-slate-700 "}>
                            <SelectItem className={"focus:bg-gray-400"} value="DSC">Newest to oldest</SelectItem>
                            <SelectItem className={"focus:bg-gray-400"} value="ASC">Oldest to newest</SelectItem>
                        </SelectContent>
                    </Select>

                </div>
                <div className={"w-[50%] mt-8 mb-8"}>
                    <div className={" grid grid-cols-4 lg:grid-cols-4 gap-2"}>
                        {
                            releases.releasesList?.map(elem => {
                                return (
                                    <div onClick={() => navigate(`/releases/${elem.id}`)}>
                                        <img src={elem.coverName}
                                             className={"cursor-pointer"}/>
                                        <p className={"text-2xl text-white"}>{elem.title}</p>
                                        <p className={"text-2xl text-gray-200"}>{getFormattedDate(elem.dateReleased)}</p>
                                    </div>
                                );
                            })
                        }

                    </div>
                </div>

                <div className={"min-h-full pb-5 pt-5"}>
                    { releases.releasesList?.length > 0 &&
                        <MyPagination plural={releases} currPage={currPage} setCurrPage={setCurrPage} />
                    }
                </div>
            </div>
        </div>
    );
}