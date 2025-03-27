import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/components/ui/collapsible.jsx";
import {useEffect, useState} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {ArrowUp, DotIcon} from "lucide-react";
import {Button} from "@/components/ui/button.jsx";

export const CollapsibleShop = ({ variants }) => {
    const navigate = useNavigate();
    const { categoryName } = useParams();
    const [category, setCategory] = useState("");

    useEffect(() => {
        getCategoryOpened();
    }, [categoryName]);

    function getCategoryOpened() {
        let currPosition = "";

        Object.entries(variants).forEach(([key]) => {
            if (key === categoryName) {
                currPosition = key;
            }
        });

        Object.entries(variants).forEach(([key, value]) => {
            if (value.includes(categoryName)) {
                currPosition = key;
            }
        });

        setCategory(currPosition);
    }

    function onCategorySelected(value) {
        value === category ? setCategory(null) : setCategory(value);
    }

    return (
        <div className="pb-2 max-w-3xl mx-auto">
            {Object.entries(variants).map(([key, values]) => (
                <Collapsible key={key} open={category === key}>
                    <CollapsibleTrigger className="w-full">
                        <div className="flex items-center justify-between px-4 py-2">
                            <p
                                onClick={() => navigate("/shop/" + key)}
                                className="text-2xl font-semibold truncate max-w-[80%] cursor-pointer"
                            >
                                {key.charAt(0).toUpperCase() + key.slice(1)}
                            </p>
                            <Button
                                onClick={() => onCategorySelected(key)}
                                className={`p-2 rounded ${category === key ? "text-orange-700" : "text-gray-500"} bg-transparent hover:bg-gray-200 transition-all`}
                            >
                                <ArrowUp
                                    className={`transform ${category === key ? "rotate-180" : "rotate-0"} transition-all duration-300`}
                                />
                            </Button>
                        </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="cursor-pointer text-gray-200 text-lg overflow-hidden">
                        <div className="pl-6">
                            {values.map((item, index) => (
                                <p
                                    key={index}
                                    onClick={() => navigate("/shop/" + item)}
                                    className="py-1 truncate max-w-full hover:text-orange-500"
                                >
                                    {item}
                                </p>
                            ))}
                        </div>
                    </CollapsibleContent>
                </Collapsible>
            ))}
        </div>
    );
};

