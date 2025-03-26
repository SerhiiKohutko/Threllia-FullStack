import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {getCurrPosition, Position} from "@/components/ReusableComponents/Position.jsx";
import {variants} from "@/components/Pages/Shop/Shop.jsx";
import {getProductById} from "@/redux/shop/Action.js";

export const ProductDetails = () => {

    const {categoryName, productId} = useParams();
    const shop = useSelector(state => state.shop);
    const [position, setPosition] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        getCurrPosition(setPosition, variants, categoryName);
    }, []);

    useEffect(() => {
        dispatch(getProductById(productId, position[0]));
    },[position])

    return (
      <div>
          <div className={"h-[6rem] bg-black border-b border-white"}></div>
          <section>
              <div className={"flex flex-row w-[60%]"}>
                  <div className={"flex flex-col"}>

                  </div>
                  <div  className={"flex flex-col"}>
                      <Position navigate={navigate} categoryName={categoryName} position={position}/>
                      <div>
                          <h1>{shop.productDetails?.name}</h1>
                      </div>
                  </div>
              </div>
          </section>
      </div>
    );
}