import {Button} from "@/components/ui/button.jsx";

export const PastShow = () => {
    return (
        <div className={"flex flex-row text-white justify-between items-end border-b border-orange-300 py-5"}>
            <div className={"flex flex-row justify-end"}>
                <div className={"flex flex-col"}>
                    <p className={"text-lg"}>2024/3/3</p>
                    <p className={"text-3xl"}>Usa, TX, Austin</p>
                </div>
            </div>
            <div className={"flex flex-row justify-center"}>
                <p className={"text-3xl"}>Estadio</p>
            </div>
            <div className={"flex flex-row justify-end"}>
                <Button variant={"ghost"} className={"text-3xl p-8 rounded-none border border-orange-500"}>Explore Show</Button>
            </div>
        </div>
    )
}