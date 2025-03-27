import { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@radix-ui/react-collapsible"; // импортировать вашу кнопку
import {Button} from "@/components/ui/button.jsx";
import {ArrowUp} from "lucide-react"; // или используйте свою иконку стрелки

export const FiltersCollapsible = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { categoryName } = useParams();

    const [priceSelected, setPriceSelected] = useState(null);
    const priceRanges = ["0-24.99", "25-49.99", "50-99.99", "100"];

    const [albumSelected, setAlbumSelected] = useState(null);
    const albums = ["mop", "black", "justice"];

    const [isPriceOpen, setIsPriceOpen] = useState(false);
    const [isAlbumOpen, setIsAlbumOpen] = useState(false);

    useEffect(() => {
        setPriceSelected(null);
        setAlbumSelected(null);
        setIsPriceOpen(false);
        setIsAlbumOpen(false);
    }, [categoryName]);

    function handlePriceChange(price) {
        setPriceSelected((prevPrice) => {
            const urlParams = new URLSearchParams(location.search);

            if (prevPrice === price) {
                urlParams.delete("minPrice");
                urlParams.delete("maxPrice");
            } else {
                if (price !== "100") {
                    const [minPrice, maxPrice] = price.split("-");
                    urlParams.set("minPrice", minPrice);
                    urlParams.set("maxPrice", maxPrice);
                } else {
                    urlParams.delete("maxPrice");
                    urlParams.set("minPrice", price);
                }
            }

            navigate(`${location.pathname}?${urlParams.toString()}`);

            return prevPrice === price ? null : price;
        });
    }

    function handleAlbumChange(album) {
        setAlbumSelected((prevAlbum) => {
            const urlParams = new URLSearchParams(location.search);

            if (prevAlbum === album) {
                urlParams.delete("album");
            } else {
                urlParams.set("album", album);
            }

            navigate(`${location.pathname}?${urlParams.toString()}`);

            return prevAlbum === album ? null : album;
        });
    }

    return (
        <div>
            <Collapsible open={isPriceOpen} onOpenChange={setIsPriceOpen}>
                <CollapsibleTrigger className="text-xl flex w-full justify-between items-center px-4 py-2 cursor-pointer">
                    <p>Price</p>
                    <Button
                        className={`p-2 rounded bg-transparent ${
                            isPriceOpen ? "text-blue-500" : "text-gray-500"
                        } hover:bg-gray-200 transition-all`}
                    >
                        <ArrowUp
                            className={`transform ${isPriceOpen ? "rotate-180" : "rotate-0"} transition-all duration-300`}
                        />
                    </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="cursor-pointer text-gray-600">
                    <div className="flex flex-col">
                        {priceRanges.map((price, index) => (
                            <label key={index} className="flex items-center cursor-pointer pl-5">
                                <input
                                    type="radio"
                                    name="price"
                                    value={price}
                                    checked={priceSelected === price}
                                    onClick={() => handlePriceChange(price)}
                                    className="hidden"
                                />
                                <div
                                    className={`w-5 h-5 border-2  flex items-center justify-center mr-2
                                       ${priceSelected === price ? "bg-black" : "bg-white"}`}
                                >
                                    {priceSelected === price && <div className="w-4 h-4 bg-black"></div>}
                                </div>
                                <span className="text-xl">{price}</span>
                            </label>
                        ))}
                    </div>
                </CollapsibleContent>
            </Collapsible>
            <Collapsible open={isAlbumOpen} onOpenChange={setIsAlbumOpen}>
                <CollapsibleTrigger className="text-xl flex justify-between w-full items-center px-4 py-2 cursor-pointer">
                    <span>Album</span>
                    <Button
                        className={`p-2 rounded bg-transparent ${
                            isAlbumOpen ? "text-blue-500" : "text-gray-500"
                        } hover:bg-gray-200 transition-all`}
                    >
                        <ArrowUp
                            className={`transform ${isAlbumOpen ? "rotate-180" : "rotate-0"} transition-all duration-300`}
                        />
                    </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="cursor-pointer text-gray-600">
                    <div className="flex flex-col">
                        {albums.map((album, index) => (
                            <label key={index} className="flex items-center cursor-pointer pl-5">
                                <input
                                    type="radio"
                                    name="album"
                                    value={album}
                                    checked={albumSelected === album}
                                    onClick={() => handleAlbumChange(album)}
                                    className="hidden"
                                />
                                <div
                                    className={`w-5 h-5 border-2 flex items-center justify-center mr-2
                                       ${albumSelected === album ? "bg-black" : "bg-white"}`}
                                >
                                    {albumSelected === album && <div className="w-4 h-4 bg-black"></div>}
                                </div>
                                <span className="text-xl">{album}</span>
                            </label>
                        ))}
                    </div>
                </CollapsibleContent>
            </Collapsible>
        </div>
    );
};
