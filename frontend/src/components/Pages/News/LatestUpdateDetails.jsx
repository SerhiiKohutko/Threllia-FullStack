import {Hero} from "@/components/ReusableComponents/Hero.jsx";
import bgImage from "@/resources/bg_2.png";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect} from "react";
import {deleteLatestUpdateById, getLatestUpdateById} from "@/redux/news/Action.js";
import {StoreOverviewSection} from "@/components/Pages/HomePage/Sections/StoreOverviewSection.jsx";
import {getFormattedDate} from "@/components/Utils/DateParser.js";
import {Button} from "@/components/ui/button.jsx";

export const LatestUpdateDetailsPage = () => {
    const dispatch = useDispatch();
    const {latestUpdateId} = useParams();
    const news = useSelector(state => state.news);
    const navigate = useNavigate();

    const isAdmin = true;

    useEffect(() => {
        console.log(latestUpdateId);
        dispatch(getLatestUpdateById(latestUpdateId))
    },[])

    function handleDelete() {
        dispatch(deleteLatestUpdateById(latestUpdateId))
        navigate("/news");
    }
    return (
        <div className={"relative"}>
            <Hero background={bgImage} pageTitle={"Latest Update Details"}/>
            <div className={"min-h-[35rem] bg-black text-white flex flex-row justify-center"}>
                <div className={"w-[60%] flex flex-col justify-center my-8 space-y-5"}>
                    {/*If profile is admin - edit & deletion available*/}
                    {
                        isAdmin && <>
                            <Button onClick={() => navigate(`/admin/news/${latestUpdateId}`, {
                                state: {
                                    title : news.latestUpdateDetails?.title,
                                    imageName : news.latestUpdateDetails?.imageName,
                                    content: news.latestUpdateDetails?.content,
                                }
                            })}
                                    variant={"ghost"} className={"border rounded-none border-orange-500 mt-5 mr-4"}>Edit</Button>

                            <Button onClick={() => handleDelete()} variant={"ghost"} className={"border bg-red-700 text-white rounded-none border-orange-500 mt-5 mb-5"}>Delete</Button>
                        </>
                    }
                    <p className={"text-xl text-gray-400"}>{getFormattedDate(news.latestUpdateDetails?.dateCreated)}</p>
                    <h1 className={"text-5xl font-tradeWinds"}>{news.latestUpdateDetails?.title}</h1>
                    <img className={"border border-orange-300 h-50"}
                         src={"http://localhost:8080/news/" + news.latestUpdateDetails?.imageName}/>
                    <div className={"h-px w-full border-b border-orange-500 flex-grow"}></div>
                    <div className={"text-4xl font-rubikPaint"}
                         dangerouslySetInnerHTML={{__html: news.latestUpdateDetails.content}}></div>
                </div>
            </div>

            <StoreOverviewSection/>


                <div
                    className="absolute inset-0 bg-[url('/cracked-dark.png')] bg-cover opacity-10 pointer-events-none"></div>

                <div
                    className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-t from-amber-700/40 to-transparent"></div>
        </div>
    );
}