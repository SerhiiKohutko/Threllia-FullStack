import {Hero} from "@/components/Hero/Hero.jsx";
import bgImage
    from "@/resources/ajfajm_THRELLIA_LOGO_2651e459-ae61-4677-9aa7-7979295791e2.png";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getAllReleases} from "@/redux/releases/Action.js";


export const ReleasesSection = () => {

    const dispatch = useDispatch();
    const {releasesList} = useSelector(state => state.releases);

    useEffect(() => {
        dispatch(getAllReleases());
    }, []);

    return (
        <div>
            <Hero pageTitle={"Releases"} background={bgImage}/>
            <div className={"min-h-[30rem] bg-gray-900 flex flex-col items-center"}>
                <div className={"text-white w-[50%] h-full border-b-2 border-orange-300 flex flex-row justify-between mt-8 pb-5"}>
                    <p class={"text-3xl font-rubikPaint"}>Releases</p>
                    <Select>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Theme"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="light">Light</SelectItem>
                            <SelectItem value="dark">Dark</SelectItem>
                            <SelectItem value="system">System</SelectItem>
                        </SelectContent>
                    </Select>

                </div>
                <div className={"w-[50%] mt-8 mb-8"}>
                    <div class={" grid grid-cols-4 lg:grid-cols-4 gap-2"}>
                        {
                            releasesList.map(elem => {
                                return (
                                    <div>
                                        <img src={"http://localhost:8080/releases/" + elem.coverName}
                                             className={"cursor-pointer"}/>
                                        <p className={"text-2xl text-white"}>{elem.title}</p>
                                        <p className={"text-2xl text-gray-200"}>{elem.dateReleased}</p>
                                    </div>
                                );
                            })
                        }

                    </div>
                </div>
            </div>
        </div>
    );
}