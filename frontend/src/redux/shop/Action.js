import axios from "axios";
import {
    GET_SHOP_OVERVIEW_FAILURE,
    GET_SHOP_OVERVIEW_REQUEST,
    GET_SHOP_OVERVIEW_SUCCESS
} from "@/redux/shop/ActionType.js";

export const getShopOverviewForMVP = ({page, size}) => async (dispatch) => {
    dispatch({type: GET_SHOP_OVERVIEW_REQUEST});
    try{
        const response = await axios.get(`http://localhost:8080/api/products/?`, {
            params: {
                size : size,
                page : page
            }
        });
        dispatch({type: GET_SHOP_OVERVIEW_SUCCESS, payload: response.data});
        console.log(response.data);
    }catch(err){
        dispatch({type: GET_SHOP_OVERVIEW_FAILURE, payload: err});
        console.error(err);
    }
}