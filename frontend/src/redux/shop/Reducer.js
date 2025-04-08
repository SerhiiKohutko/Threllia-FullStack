import {
    CREATE_PAYMENT_REQUEST, CREATE_PAYMENT_SUCCESS,
    CREATE_PRODUCT_FAILURE, CREATE_PRODUCT_REQUEST, CREATE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAILURE, DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_SUCCESS,
    GET_ALL_PRODUCTS_PAGINATED_FAILURE,
    GET_ALL_PRODUCTS_PAGINATED_REQUEST,
    GET_ALL_PRODUCTS_PAGINATED_SUCCESS, GET_PRODUCT_BY_ID_FAILURE, GET_PRODUCT_BY_ID_REQUEST, GET_PRODUCT_BY_ID_SUCCESS,
    GET_SHOP_OVERVIEW_FAILURE,
    GET_SHOP_OVERVIEW_REQUEST,
    GET_SHOP_OVERVIEW_SUCCESS, UPDATE_PRODUCT_FAILURE, UPDATE_PRODUCT_REQUEST, UPDATE_PRODUCT_SUCCESS
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
        case GET_ALL_PRODUCTS_PAGINATED_REQUEST:
        case CREATE_PRODUCT_REQUEST:
        case UPDATE_PRODUCT_REQUEST:
        case DELETE_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };


        case GET_PRODUCT_BY_ID_REQUEST:
            return {
                ...state,
                productDetailsLoading: true
            }

        case GET_SHOP_OVERVIEW_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                products: action.payload
            };

        case GET_ALL_PRODUCTS_PAGINATED_SUCCESS:
            return {
                ...state,
                loading: false,
                products: action.payload.content,
                pageablePart: action.payload
            };

        case GET_PRODUCT_BY_ID_SUCCESS:
            return {
                ...state,
                productDetailsLoading: false,
                productDetails: action.payload
            };

        case CREATE_PRODUCT_SUCCESS:
        case UPDATE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false
            };

        case DELETE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                products: state.products.filter(p => p.id !== action.payload)
            };

        case GET_SHOP_OVERVIEW_FAILURE:
        case GET_ALL_PRODUCTS_PAGINATED_FAILURE:
        case GET_PRODUCT_BY_ID_FAILURE:
        case CREATE_PRODUCT_FAILURE:
        case UPDATE_PRODUCT_FAILURE:
        case DELETE_PRODUCT_FAILURE:
            return {
                ...state,
                loading: false,
                productDetailsLoading: false,
                error: action.error || action.payload
            };

        case CREATE_PAYMENT_REQUEST:
            return {
                ...state,
                loading: true,
            }
            case CREATE_PAYMENT_SUCCESS, CREATE_PRODUCT_FAILURE:
                return {
                    ...state,
                    loading: false
                }
        default:
            return state;
    }
}