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


    const [isPriceOpen, setIsPriceOpen] = useState(false);
    const [isAlbumOpen, setIsAlbumOpen] = useState(false);

    useEffect(() => {
        setPriceSelected(null);
        setIsPriceOpen(false);
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
        </div>
    );
};
