import {ArrowRight} from "lucide-react";
import {Button} from "@/components/ui/button.jsx";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getAllLatestUpdates} from "@/redux/news/Action.js";

export const LatestUpdateOverview = () => {

    const dispatch = useDispatch();
    const news = useSelector(state => state.news)
    const imagesUrl = "http://localhost:8080/news/";

    useEffect(() => {
        dispatch(getAllLatestUpdates());
    }, []);

    return (
        <section className="py-24 bg-gray-900 relative">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center mb-12">
                    <h2 className="text-5xl font-rubikPaint text-white mb-6 md:mb-0">LATEST UPDATES</h2>
                    <Button variant="primary" className="font-tradeWinds border border-amber-600 text-white hover:text-amber-600">
                        ALL NEWS <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {news.news?.map((update, index) => (
                        <div key={index} className="group bg-gradient-to-br from-black to-gray-900 border border-amber-700/20 p-6 hover:border-amber-500 transition">
                            <div className="mb-6 overflow-hidden">
                                <img
                                    src={imagesUrl + update.imageName}
                                    alt={update.title}
                                    className="w-full h-48 object-cover transition duration-500 group-hover:scale-105"
                                />
                            </div>
                            <div className="text-amber-500 text-sm mb-2">{update.dateCreated}</div>
                            <h3 className="text-white font-tradeWinds text-2xl mb-3">{update.title}</h3>
                            <p className="text-gray-400 mb-4">{update.content}</p>
                            <Button variant="primary" className="font-tradeWinds text-white hover:text-amber-500 p-0 flex items-center ">
                                <span className={"ml-1"}>READ MORE</span> <ArrowRight className="ml-1 h-4 w-4" />
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}