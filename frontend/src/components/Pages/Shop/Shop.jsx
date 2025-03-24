import {Hero} from "@/components/ReusableComponents/Hero.jsx";
import bgImage from "@/resources/ajfajm_bigger_writing_5fdc790a-ffc5-4a57-a6eb-fe80032c0eb7-min.png";
import {CollapsibleShop} from "@/components/ReusableComponents/CollapsibleShop.jsx";
import {FiltersCollapsible} from "@/components/Pages/Shop/FiltersCollapsible.jsx";
import {useParams} from "react-router-dom";
import {useEffect} from "react";

export const Shop = () => {

    const {categeryName} = useParams();

    return (
      <div className={"text-5xl"}>
          <Hero background={bgImage} pageTitle={"Shop"} />
          <div className={"h-full bg-white text-black font-rubikPaint flex flex-row items-center justify-center"}>
                <div className={"w-[60%] flex-row flex pt-10 space-x-3 justify-between"}>

                    <div className={"h-full"}>
                        <p className={"text-2xl pb-2 mb-2 border-b border-black"}>
                            Categories
                        </p>
                        <CollapsibleShop variants={{
                            media: ["test1", "test2", "test3"],
                            apparel: ["test1", "test2", "test3"],
                            accessories: ["test1", "test2", "test3"],
                        }}/>
                        <p className={"text-2xl pb-2 mt-2 border-b border-black"}>
                            Filters
                        </p>
                        <FiltersCollapsible/>
                    </div>
                    <div className={"grid grid-cols-3 md:grid-cols-3 sm:grid-cols-2 gap-4 w-[60%]"}>

                        {
                            Array.from({length: 6}).map((item, index) => (
                                <div key={index} className={"flex flex-col"}>
                                    <img
                                        src={"https://www.metallica.com/dw/image/v2/BCPJ_PRD/on/demandware.static/-/Sites-met-master/default/dw76259a49/images/hi-res/Wherever_I_May_Roam_Guest_Pass_Plaque.jpg?sw=650"}
                                      className={"px-0 border border-black cursor-pointer"}/>
                                      <h1 className={"text-3xl cursor-pointer"}>
                                          test
                                      </h1>
                                      <p className={"text-gray-800 text-xl"}>
                                          test$
                                      </p>
                                  </div>
                              ))
                          }

                      </div>
                </div>
          </div>
      </div>
    );
}