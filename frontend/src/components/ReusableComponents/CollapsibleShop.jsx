import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/components/ui/collapsible.jsx";
import {useState} from "react";

export const CollapsibleShop = ({variants}) => {

    const [category, setCategory] = useState("");

    function onCategorySelected(value){
        value === category ? setCategory(null) : setCategory(value);
    }

    return (
        <div className={"pb-2"}>
            {Object.entries(variants).map(([key, values]) => (
                <Collapsible
                    key={key}
                    open={category === key}
                    onOpenChange={() => onCategorySelected(key)}
                >
                    <CollapsibleTrigger className="text-xl">
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                    </CollapsibleTrigger>
                    <CollapsibleContent className="cursor-pointer text-gray-600">
                        {values.map((item, index) => (
                            <p key={index}>{item}</p>
                        ))}
                    </CollapsibleContent>
                </Collapsible>
            ))}
        </div>

    );
}