import {Button} from "@/components/ui/button.jsx";
import {useDispatch} from "react-redux";
import {useEffect} from "react";

export const PastShow = ({show, navigate}) => {

    return (
        <div className={"flex flex-row text-white justify-between items-end border-b border-orange-300 py-5"}>
            <div className={"flex flex-row justify-start w-1/3"}>
                <div className={"flex flex-col"}>
                    <p className={"text-lg"}>{show?.date}</p>
                    <p className={"text-3xl"}>{show?.country + ", " + show?.city}</p>
                </div>
            </div>

            <div className={"flex flex-row justify-center w-1/3 text-center"}>
                <p className={"text-3xl"}>{show?.place}</p>
            </div>

            <div className={"flex flex-row justify-end w-1/3"}>
                <Button
                    onClick={() => navigate("/tour/" + show?.id)}
                    variant={"ghost"}
                    className={"text-3xl p-8 rounded-none border border-orange-500"}
                >
                    Explore Show
                </Button>
            </div>
        </div>
    )
}