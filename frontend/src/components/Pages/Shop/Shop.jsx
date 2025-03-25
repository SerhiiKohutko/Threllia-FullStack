import {Hero} from "@/components/ReusableComponents/Hero.jsx";
import bgImage from "@/resources/ajfajm_bigger_writing_5fdc790a-ffc5-4a57-a6eb-fe80032c0eb7-min.png";
import {CollapsibleShop} from "@/components/ReusableComponents/CollapsibleShop.jsx";
import {FiltersCollapsible} from "@/components/Pages/Shop/FiltersCollapsible.jsx";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getAllProductsFiltered, getAllProductsPaginated} from "@/redux/shop/Action.js";
import {MyPagination} from "@/components/ReusableComponents/Pagination.jsx";

export const Shop = () => {
    const navigate = useNavigate();

    const {categoryName} = useParams();
    const [position, setPosition] = useState([])
    const dispatch = useDispatch();
    const shop = useSelector(state => state.shop);

    const [currPage, setCurrPage] = useState(1)

    const variants = {
        media: ["VINYL", "test2", "test3"],
        apparel: ["SHIRTS", "test5", "test6"],
        accessories: ["test7", "test8", "test9"],
    };

    useEffect(() => {
        getCurrPosition()
        setCurrPage(1);
    }, [categoryName])

    useEffect(() => {
        console.log("CURRPAGE" + currPage);
        if (position[0] && !position[1]) {
            console.log("position", position)
            dispatch(getAllProductsFiltered(currPage - 1, {
                categoryName: categoryName,
                subCategory: null
            }));
        }
        else if (position[1]) {
            console.log("position", position)
            dispatch(getAllProductsFiltered(currPage - 1, {
                categoryName: position[0],
                subCategory: categoryName
            }));
        } else {
            dispatch(getAllProductsPaginated(currPage - 1))
        }
    }, [currPage, position])


    function getCurrPosition() {

        let currPosition = [];


        Object.entries(variants).forEach(([key]) => {
            if (key === categoryName) {
                currPosition = [key];
            }
        })


        Object.entries(variants).forEach(([key, value]) => {
            if (value.includes(categoryName)) {
                currPosition = [key, categoryName];
            }
        })

        setPosition(currPosition);
    }

    return (
      <div className={"text-5xl"}>
          <Hero background={bgImage} pageTitle={"Shop"} />
          <div className={"h-full bg-gray-900 text-white font-rubikPaint flex flex-row items-center justify-center"}>
              <div className={"w-[60%] flex-row flex pt-10 justify-center space-x-3"}>
                  <div className={"flex flex-col mr-4 w-[30%]"}>
                      <p className={"text-xl"}>
                          <span className={"cursor-pointer hover:underline"} onClick={() => navigate("/")}>Home</span>
                          <span> -> </span>
                          <span className={"cursor-pointer hover:underline"}
                                onClick={() => navigate("/shop")}>Shop</span>
                          {
                              categoryName && position.map(item => {
                                      return (
                                          <>
                                              <span> -> </span>
                                              <span className={"cursor-pointer hover:underline"}
                                                    onClick={() => navigate(`/shop/${item}`)}>{item.charAt(0).toUpperCase() + item.slice(1)}</span>
                                          </>
                                      )
                                  }
                              )
                          }
                      </p>

                      <div className={"h-full"}>
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
                  <div className={"flex flex-col"}>
                      <div className={"grid grid-cols-3 md:grid-cols-3 sm:grid-cols-2 gap-4 w-full"}>

                          {
                              shop?.products?.map((item, index) => (
                                  <div key={index} className={"flex flex-col"}>
                                      <img
                                          src={"https://www.metallica.com/dw/image/v2/BCPJ_PRD/on/demandware.static/-/Sites-met-master/default/dw76259a49/images/hi-res/Wherever_I_May_Roam_Guest_Pass_Plaque.jpg?sw=650"}
                                          className={"px-0 border border-white cursor-pointer"}/>
                                      <h1 className={"text-3xl cursor-pointer"}>
                                          {item.name}
                                      </h1>
                                      <p className={"text-gray-200 text-xl"}>
                                          {item.type}$
                                      </p>
                                  </div>
                              ))
                          }
                      </div>
                      <div className={"h-[5rem]  pb-5"}>
                            <MyPagination plural={shop} currPage={currPage} setCurrPage={setCurrPage}/>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    );
}