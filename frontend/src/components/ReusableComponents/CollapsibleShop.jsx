import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/components/ui/collapsible.jsx";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {ArrowUp, DotIcon} from "lucide-react";
import {Button} from "@/components/ui/button.jsx";

export const CollapsibleShop = ({variants}) => {

    const navigate = useNavigate();

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
                >
                    <CollapsibleTrigger className="text-xl cursor-pointer w-full">
                        <div className={"flex flex-row justify-between"}>
                            <p onClick={() => navigate("/shop/" + key)}>{key.charAt(0).toUpperCase() + key.slice(1)}</p>
                            <Button onClick={() => onCategorySelected(key)}><ArrowUp className={"bg-transparent"}/></Button>
                        </div>

                    </CollapsibleTrigger>
                    <CollapsibleContent className="cursor-pointer text-gray-600">
                        {values.map((item, index) => (
                            <p key={index} onClick={() => navigate("/shop/" + item)}>{item}</p>
                        ))}
                    </CollapsibleContent>
                </Collapsible>
            ))}
        </div>

    );
}