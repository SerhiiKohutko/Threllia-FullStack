import {Hero} from "@/components/ReusableComponents/Hero.jsx";
import bgImage from "@/resources/ajfajm_bigger_writing_5fdc790a-ffc5-4a57-a6eb-fe80032c0eb7-min.png";
import {CollapsibleShop} from "@/components/ReusableComponents/CollapsibleShop.jsx";
import {FiltersCollapsible} from "@/components/Pages/Shop/FiltersCollapsible.jsx";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getAllProductsFiltered, getAllProductsPaginated} from "@/redux/shop/Action.js";
import {MyPagination} from "@/components/ReusableComponents/Pagination.jsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.jsx";
import {Position} from "@/components/ReusableComponents/Position.jsx";
import {getCurrPosition} from "@/components/ReusableComponents/Position.jsx";

// eslint-disable-next-line react-refresh/only-export-components
export const variants = {
    media: ["VINYL", "test2", "test3"],
    apparel: ["SHIRTS", "test5", "test6"],
    accessories: ["test7", "test8", "test9"],
};

export const Shop = () => {
    const navigate = useNavigate();

    const {categoryName} = useParams();
    const dispatch = useDispatch();
    const shop = useSelector(state => state.shop);
    const params = new URLSearchParams(location.search);

    const [position, setPosition] = useState([])
    const [currPage, setCurrPage] = useState(1)
    const [selectValue, setSelectValue] = useState("DSC_DATE");

    useEffect(() => {
        console.log(categoryName);
        getCurrPosition(setPosition, variants, categoryName)
        console.log(position);
        setCurrPage(1);
    }, [categoryName])

    useEffect(() => {
        if (position[0] && !position[1]) {
            dispatch(getAllProductsFiltered(currPage - 1, {
                categoryName: categoryName,
                subCategory: null,
                minPrice: params.get("minPrice"),
                maxPrice: params.get("maxPrice"),
                album: params.get("album"),
                sortingType : selectValue
            }));
        } else if (position[1]) {
            dispatch(getAllProductsFiltered(currPage - 1, {
                categoryName: position[0],
                subCategory: categoryName,
                minPrice: params.get("minPrice"),
                maxPrice: params.get("maxPrice"),
                album: params.get("album"),
                sortingType : selectValue
            }));
        } else {
            dispatch(getAllProductsPaginated(currPage - 1, {
                minPrice: params.get("minPrice"),
                maxPrice: params.get("maxPrice"),
                album: params.get("album"),
                sortingType : selectValue
            }))
        }
    }, [currPage, position, location.search, selectValue]);

    function handleSelectChange(value){

        if (value !== selectValue) {
            setSelectValue(value);
        }
    }
    return (
        <div className={"text-5xl"}>
            <Hero background={bgImage} pageTitle={"Shop"}/>
            <div className={"h-full bg-gray-900 text-white font-rubikPaint flex flex-row items-center justify-start"}>
                <div className={"flex flex-row w-full pt-10 max-w-7xl mx-auto"}>
                    <div className={"w-[300px] flex-shrink-0 mr-8"}>
                        <Position navigate={navigate}
                                  categoryName={categoryName}
                                  position={position}/>
                        <div className={"h-full sticky top-20"}>
                            <p className={"text-2xl pb-2 mb-2 border-b border-white"}>
                                Categories
                            </p>
                            <CollapsibleShop variants={variants}/>
                            <p className={"text-2xl pb-2 mt-2 border-b border-white"}>
                                Filters
                            </p>
                            <FiltersCollapsible/>
                        </div>
                    </div>

                    <div className={"flex-grow"}>
                        <div className={"flex flex-row justify-end pb-3"}>
                            <Select
                                value={selectValue}
                                onValueChange={handleSelectChange}>
                                <SelectTrigger className={"w-[180px] text-white"}>
                                    <SelectValue placeholder={<span className="text-gray-400">Sort By</span>}>
                                        {/* Display the current selected value */}
                                        {selectValue === "DSC_DATE" && "Newest To Oldest"}
                                        {selectValue === "ASC_DATE" && "Oldest To Newest"}
                                        {selectValue === "DSC_PRICE" && "Price High To Low"}
                                        {selectValue === "ASC_PRICE" && "Price Low To High"}
                                    </SelectValue>
                                </SelectTrigger>
                                <SelectContent className={"text-white bg-slate-700"}>
                                    <SelectItem value="DSC_DATE">Newest To Oldest</SelectItem>
                                    <SelectItem value="ASC_DATE">Oldest To Newest</SelectItem>
                                    <SelectItem value="DSC_PRICE">Price High To Low</SelectItem>
                                    <SelectItem value="ASC_PRICE">Price Low To High</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className={"grid grid-cols-3 md:grid-cols-3 sm:grid-cols-2 gap-4 w-full min-h-[800px]"}>
                            {
                                shop?.products?.map((item, index) => (
                                    <div key={index} className={"flex flex-col"}>
                                        <img
                                            onClick={() => navigate(`/shop/${categoryName}/${item.id}`)}
                                            src={"https://www.metallica.com/dw/image/v2/BCPJ_PRD/on/demandware.static/-/Sites-met-master/default/dw76259a49/images/hi-res/Wherever_I_May_Roam_Guest_Pass_Plaque.jpg?sw=650"}
                                            className={"px-0 border border-white cursor-pointer"}/>
                                        <h1 className={"text-3xl cursor-pointer"} onClick={() => navigate(`/shop/${categoryName}/${item.id}`)}>
                                            {item.name}
                                        </h1>
                                        <p className={"text-gray-200 text-xl cursor-text"}>
                                            {item.price}$
                                        </p>
                                    </div>
                                ))
                            }
                        </div>

                        <div className={"h-[5rem] flex flex-row items-center justify-center"}>
                            {shop.products.length !== 0 &&
                                <MyPagination plural={shop} currPage={currPage} setCurrPage={setCurrPage}/>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}