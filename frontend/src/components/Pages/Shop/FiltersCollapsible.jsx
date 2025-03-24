import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/components/ui/collapsible.jsx";
import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";


// TODO - fix when redirecting to the other category filters are not annulled
export const FiltersCollapsible = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [priceSelected, setPriceSelected] = useState(null);
    const priceRanges = ["0-24.99", "25-49.99", "50-99.99", "100"];

    const [albumSelected, setAlbumSelected] = useState(null);
    const albums = ["mop", "black", "justice"];

    function handlePriceChange(price) {
        priceSelected === price ? setPriceSelected(null) : setPriceSelected(price);

        const urlParams = new URLSearchParams(location.search);

        if (price !== "100") {
            const [minPrice, maxPrice] = price.split("-");
            urlParams.set("minPrice", minPrice);
            urlParams.set("maxPrice", maxPrice);
        } else {
            urlParams.set("minPrice", price);
        }

        navigate(`${location.pathname}?${urlParams.toString()}`);
        window.scrollTo(0, 0);
    }

    function handleAlbumChange(album) {
        albumSelected === album ? setAlbumSelected(null) : setAlbumSelected(album);

        const urlParams = new URLSearchParams(location.search);
        urlParams.set("album", album);


        navigate(`${location.pathname}?${urlParams.toString()}`);
        window.scrollTo(0, 0);
    }
    return (
        <div>
            <Collapsible>
                <CollapsibleTrigger className="text-xl">Price</CollapsibleTrigger>
                <CollapsibleContent className="cursor-pointer text-gray-600">
                    <div className="flex flex-col">
                        {priceRanges.map((price, index) => (
                            <label key={index} className="flex items-center cursor-pointer">
                                <input
                                    type="radio"
                                    name="price"
                                    value={price}
                                    checked={priceSelected === price}
                                    onClick={() => handlePriceChange(price)}
                                    className="hidden"
                                />
                                <div
                                    className={`w-5 h-5 border-2 border-black flex items-center justify-center mr-2
                                       ${priceSelected === price ? "bg-black" : "bg-white"}`}
                                >
                                    {priceSelected === price && <div className="w-2 h-2 bg-white"></div>}
                                </div>
                                <span className="text-xl">{price}</span>
                            </label>
                        ))}
                    </div>
                </CollapsibleContent>
            </Collapsible>
            <Collapsible>
                <CollapsibleTrigger className="text-xl">Album</CollapsibleTrigger>
                <CollapsibleContent className="cursor-pointer text-gray-600">
                    <div className="flex flex-col">
                        {albums.map((album, index) => (
                            <label key={index} className="flex items-center cursor-pointer">
                                <input
                                    type="radio"
                                    name="album"
                                    value={album}
                                    checked={albumSelected === album}
                                    onClick={() => handleAlbumChange(album)}
                                    className="hidden"
                                />
                                <div
                                    className={`w-5 h-5 border-2 border-black flex items-center justify-center mr-2
                                       ${albumSelected === album ? "bg-black" : "bg-white"}`}
                                >
                                    {albumSelected === album && <div className="w-2 h-2 bg-white"></div>}
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
