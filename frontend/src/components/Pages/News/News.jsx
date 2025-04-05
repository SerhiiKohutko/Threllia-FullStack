import bgImage from "@/resources/bg_3.png"
import {Hero} from "@/components/ReusableComponents/Hero.jsx";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {getAllNewsPaginated} from "@/redux/news/Action.js";
import {Button} from "@/components/ui/button.jsx";
import {ArrowRight} from "lucide-react";
import {MyPagination} from "@/components/ReusableComponents/Pagination.jsx";
import {SignUpBannerSection} from "@/components/Pages/HomePage/Sections/SignUpBannerSection.jsx";
import {useNavigate} from "react-router-dom";
import {format} from "date-fns/format";
import {getFormattedDate} from "@/components/Utils/DateParser.js";
import {LoadingPage} from "@/components/ReusableComponents/LoadingPage.jsx";

export const News = () => {
    const dispatch = useDispatch();
    const news = useSelector((state) => state.news);
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [currPage, setCurrPage] = useState(1);

    useEffect(() => {
        dispatch(getAllNewsPaginated(currPage));
    },[currPage])

    useEffect(() => {
        setLoading(news.loading)
    },[news.loading])

    if(loading){
        return <LoadingPage/>
    }
    return (
        <div>
            <Hero background={bgImage} pageTitle={"News"} />
            <div className={"min-h-[35rem] bg-black flex flex-col items-center"}>
                <div className={"w-[70%] border-orange-500 border-b py-8"}>
                    <p className={"text-white text-4xl font-deliciousHandrawn"}>Latest Updates</p>
                </div>
                <div className={"w-[70%] border-orange-500 border-b justify-items-start space-y-10 py-10 mb-5"}>
                    {
                        news.news?.map((latestUpdate, index) => (
                            index % 2 !== 0 ?
                                <div className={"w-full flex flex-row"}>
                                    <div className={"text-white w-[50%] flex flex-col items-end pr-8"}>
                                        <div className="text-amber-500 text-xl mb-2 text-right">{getFormattedDate(latestUpdate.dateCreated)}</div>
                                        <h3 className="text-white font-tradeWinds text-2xl mb-3 text-right">{latestUpdate.title}</h3>
                                        <div className={"text-gray-400 mb-4"}
                                             dangerouslySetInnerHTML={{__html: latestUpdate.content}}></div>
                                        <Button onClick={() => navigate(`/news/${latestUpdate.id}`)}
                                                variant="primary"
                                                className="font-tradeWinds border border-orange-500 text-white rounded-none hover:text-amber-500 p-0 flex items-center">
                                            <span className={"pl-3 ml-1"}>READ MORE</span> <ArrowRight
                                            className="ml-1 h-4 w-4 pr-1.5"/>
                                        </Button>
                                    </div>
                                    <img
                                        src={latestUpdate.imageName}
                                        alt={latestUpdate.title}
                                        className="object-cover w-[50%] max-h-96"
                                    />
                                </div> :
                                <div className={"w-full flex flex-row"}>
                                    <img
                                        src={latestUpdate.imageName}
                                        alt={latestUpdate.title}
                                        className="object-cover w-[50%] max-h-96"
                                    />
                                    <div className={"text-white w-[50%] pl-8"}>
                                        <div className="text-amber-500 text-xl mb-2">{getFormattedDate(latestUpdate.dateCreated)}</div>
                                        <h3 className="text-white font-tradeWinds text-2xl mb-3">{latestUpdate.title}</h3>
                                        <div className={"text-gray-400 mb-4"}
                                             dangerouslySetInnerHTML={{__html: latestUpdate.content}}></div>
                                        <Button onClick={() => navigate(`/news/${latestUpdate.id}`)}
                                                variant="primary"
                                                className="font-tradeWinds border border-orange-500 text-white rounded-none hover:text-amber-500 p-0 flex items-center">
                                            <span className={"pl-3 ml-1"}>READ MORE</span> <ArrowRight
                                            className="ml-1 h-4 w-4 pr-1.5"/>
                                        </Button>
                                    </div>
                                </div>
                        ))
                    }
                    {news.news.length > 0 &&
                        <MyPagination plural={news} currPage={currPage} setCurrPage={setCurrPage} />
                    }
                </div>
            </div>
            <SignUpBannerSection/>
        </div>
    );
}