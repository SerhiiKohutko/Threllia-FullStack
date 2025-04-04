import {ArrowRight} from "lucide-react";
import {Button} from "@/components/ui/button.jsx";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {getAllNewsPaginated} from "@/redux/news/Action.js";
import {useNavigate} from "react-router-dom";

export const truncateHtml = (html, maxLength) => {
                const tempDiv = document.createElement("div");
                tempDiv.innerHTML = html;
                const textContent = tempDiv.textContent || tempDiv.innerText;

                if (textContent.length <= maxLength) return html;

                let result = '';
                let currentLength = 0;
                let nodes = tempDiv.childNodes;

                const processNodes = (nodeList) => {
                    for (let i = 0; i < nodeList.length && currentLength < maxLength; i++) {
                        const node = nodeList[i];

                        if (node.nodeType === 3) { // Text node
                            const text = node.textContent;
                            const remainingLength = maxLength - currentLength;

                            if (currentLength + text.length <= maxLength) {
                                result += text;
                                currentLength += text.length;
                            } else {
                                result += text.slice(0, remainingLength) + '...';
                                currentLength = maxLength;
                                break;
                            }
                        }
                        else if (node.nodeType === 1) {
                            const tagName = node.tagName.toLowerCase();
                            result += `<${tagName}>`;

                            if (node.childNodes.length > 0) {
                                processNodes(node.childNodes);
                            }

                            if (currentLength < maxLength) {
                                result += `</${tagName}>`;
                            }
                        }
                    }
                };

                processNodes(nodes);
                return result;
            };
export const LatestUpdateOverviewSection = () => {

    const dispatch = useDispatch();
    const news = useSelector(state => state.news)
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getAllNewsPaginated(1, true));
    }, []);

    return (
        <section className="py-24 bg-gray-900 relative">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center mb-12">
                    <h2 className="text-5xl font-rubikPaint text-white mb-6 md:mb-0">LATEST UPDATES</h2>
                    <Button onClick={() => navigate("/news")} variant="primary" className="font-tradeWinds border border-amber-600 text-white hover:text-amber-600">
                        ALL NEWS <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {news.news?.map((update, index) => (
                        <div key={index} className="group bg-gradient-to-br from-black to-gray-900 border border-amber-700/20 p-6 hover:border-amber-500 transition">
                            <div className="mb-6 overflow-hidden">
                                <img
                                    src={update.imageName}
                                    alt={update.title}
                                    className="w-full h-48 object-cover transition duration-500 group-hover:scale-105"
                                />
                            </div>
                            <div className="text-amber-500 text-sm mb-2">{update.dateCreated}</div>
                            <h3 className="text-white font-tradeWinds text-2xl mb-1">{update.title}</h3>
                            <div className={"text-gray-400 mb-4 line-clamp-3 "}
                                 dangerouslySetInnerHTML={{__html: update.content}}></div>
                            <Button onClick={() => navigate(`/news/${update.id}`)} variant="primary"
                                    className="font-tradeWinds text-white hover:text-amber-500 p-0 flex items-center ">
                                <span className={"ml-1"}>READ MORE</span> <ArrowRight className="ml-1 h-4 w-4" />
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}