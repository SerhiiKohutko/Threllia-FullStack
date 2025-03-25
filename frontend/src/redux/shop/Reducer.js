import {
    GET_ALL_PRODUCTS_PAGINATED_SUCCESS,
    GET_SHOP_OVERVIEW_FAILURE,
    GET_SHOP_OVERVIEW_REQUEST,
    GET_SHOP_OVERVIEW_SUCCESS
} from "@/redux/shop/ActionType.js";

const initialState={
    products : [],
    pageablePart : {},
    loading:false,
    error:null,
    productDetails:{}
}


export const shopReducer=(state=initialState, action)=>{
    switch(action.type){
        case GET_SHOP_OVERVIEW_REQUEST:
            return {
                ...state,
                loading:true
            }
        case GET_SHOP_OVERVIEW_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                products: action.payload
            }

            case GET_SHOP_OVERVIEW_FAILURE:
                return {
                    ...state,
                    loading: false,
                    error: action.payload,
                }

                case GET_ALL_PRODUCTS_PAGINATED_SUCCESS:
                    return {
                        ...state,
                        products : action.payload.content,
                        pageablePart: action.payload
                    }
        default:
            return state;
    }
}