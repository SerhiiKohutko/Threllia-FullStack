import {Hero} from "@/components/ReusableComponents/Hero.jsx";
import bgImage from "@/resources/ajfajm_bigger_writing_5fdc790a-ffc5-4a57-a6eb-fe80032c0eb7-min.png";
import {CollapsibleShop} from "@/components/ReusableComponents/CollapsibleShop.jsx";
import {FiltersCollapsible} from "@/components/Pages/Shop/FiltersCollapsible.jsx";
import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getAllProductsFiltered, getAllProductsPaginated} from "@/redux/shop/Action.js";
import {MyPagination} from "@/components/ReusableComponents/Pagination.jsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.jsx";
import {getCurrPosition, Position} from "@/components/ReusableComponents/Position.jsx";
import {Dialog, DialogContent, DialogTrigger} from "@/components/ui/dialog.jsx";
import {Button} from "@/components/ui/button.jsx";
import {QuickViewProductDetails} from "@/components/Pages/Shop/QuickViewProductDetails.jsx";
import {LoadingPage} from "@/components/ReusableComponents/LoadingPage.jsx";


// eslint-disable-next-line react-refresh/only-export-components
export const variants = {
    media: ["Vinyl", "Reissues", "CD", "DVD", "Books"],
    apparel: ["Shirts", "Outwear", "Footwear", "PANTS_N_SHORTS", "Headwear"],
    accessories: ["Jewelry", "VINYL_CARE", "BAGS_N_BACKPACKS", "GAMES_N_FIGURES", "STICKERS_PATCHES_BUTTONS"]
};

export const Shop = () => {
    const navigate = useNavigate();

    const {categoryName} = useParams();
    const dispatch = useDispatch();
    const shop = useSelector(state => state.shop);
    const params = new URLSearchParams(location.search);
    const [loading, setLoading] = useState(true);

    const [position, setPosition] = useState(null)
    const [currPage, setCurrPage] = useState(1)
    const [selectValue, setSelectValue] = useState("DSC_DATE");
    const [hoveredProduct, setHoveredProduct] = useState(null);

    useEffect(() => {
        document.title = 'Shop';
    }, [])

    useEffect(() => {
        getCurrPosition(setPosition, variants, categoryName)
        setCurrPage(1);
    }, [categoryName])

    useEffect(() => {
        if (!position) {
            return;
        }

        if (position[0] && !position[1]) {
            dispatch(getAllProductsFiltered(currPage - 1, {
                categoryName: categoryName,
                subType: null,
                minPrice: params.get("minPrice"),
                maxPrice: params.get("maxPrice"),
                album: params.get("album"),
                sortingType : selectValue
            }));
        } else if (position[1]) {
            dispatch(getAllProductsFiltered(currPage - 1, {
                categoryName: position[0],
                subType: categoryName,
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

    useEffect(() => {
        setLoading(shop.loading)
    },[shop.loading])

    if(loading){
        return <LoadingPage/>
    }

    function handleSelectChange(value){

        if (value !== selectValue) {
            setSelectValue(value);
        }
    }

    function navigateToProductDetails(productType, id){
        categoryName ? navigate(`/shop/${categoryName}/${id}`) : navigate(`/shop/${productType.toLowerCase()}/${id}`)
    }
    return (
        <div>
            <Hero background={bgImage} pageTitle={"Shop"}/>
            <div className={"h-full bg-gray-900 text-white flex flex-row items-center justify-start"}>
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
                                !shop.loading &&
                                shop?.products?.map((item, index) => (
                                    <div key={index} className={"flex flex-col relative group h-full"}>
                                        <div
                                            className={"relative flex flex-row justify-center h-[300px] overflow-hidden"}>
                                            <img
                                                src={item.imageUrl}
                                                className={"px-0 border border-black w-full h-full object-cover cursor-pointer"}
                                                onClick={() => navigateToProductDetails(item.productType, item.id)}
                                                onMouseEnter={() => setHoveredProduct(item.id)}
                                            />
                                            {hoveredProduct === item.id && (
                                                <div onMouseLeave={() => setHoveredProduct(null)}
                                                     className={"absolute bottom-0 h-fit w-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"}>
                                                    <Dialog>
                                                        <DialogTrigger asChild>
                                                            <Button onClick={() => console.log(item)}
                                                                className={"w-full border border-black rounded-none text-black bg-white hover:bg-black hover:text-white"}>Quick
                                                                View</Button>
                                                        </DialogTrigger>
                                                        <DialogContent
                                                            className="py-0 px-0 border-0 text-white max-w-3xl max-h-[80vh] data-[state=open]:!animate-none data-[state=closed]:!animate-none">
                                                            <QuickViewProductDetails productId={item.id}
                                                                                     category={!categoryName ? item.productType.toLowerCase() : position[0]}/>
                                                        </DialogContent>
                                                    </Dialog>
                                                </div>
                                            )}
                                        </div>
                                        <div className="mt-2">
                                            <h1
                                                className={"text-3xl cursor-pointer hover:text-orange-500"}
                                                onClick={() => navigateToProductDetails(item.productType, item.id)}
                                            >
                                                {item.name}
                                            </h1>
                                            <p className={"text-gray-200 text-xl cursor-text w-fit"}>
                                                {item.price}$
                                            </p>
                                        </div>
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