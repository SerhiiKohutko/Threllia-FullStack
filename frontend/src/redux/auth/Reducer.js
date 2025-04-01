import {
    CHANGE_PASSWORD_ERROR,
    GET_ALL_ORDER_REQUEST, GET_ALL_ORDERS_FAILURE,
    GET_ALL_ORDERS_SUCCESS, GET_USER_DETAILS_FAILURE, GET_USER_DETAILS_REQUEST,
    GET_USER_DETAILS_SUCCESS, LOGIN_FAILURE,
    LOGIN_SUCCESS, USER_LOGOUT
} from "@/redux/auth/ActionType.js";
import {decodeJWT} from "@/components/Utils/JwtDecoder.js";


const initialState = {
    user: null,
    userDetails: {},
    loading: false,
    error : null,
    orders : [],
    orderDetails: {}
}


export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            { const {sub, role} = decodeJWT(action.payload);
                if (role === "ROLE_ADMIN") {
                    localStorage.setItem("role", role);
                }else{
                    localStorage.setItem("role", role);
                }
            return {
                ...state,
                user: {
                    email: sub,
                    role: role
                }
            } }
            case LOGIN_FAILURE:
                return {
                    ...state,
                    error: action.error
                }

        case GET_USER_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            };
            case GET_USER_DETAILS_SUCCESS:
                return {...state, userDetails: action.payload, loading: false };
                case GET_USER_DETAILS_FAILURE:
                    return {...state, error: action.payload, loading: false };
        case GET_ALL_ORDER_REQUEST:
            return {...state, loading: true };
        case GET_ALL_ORDERS_SUCCESS:
            return {
                ...state,
                loading: false,
                orders : action.payload
            };
        case GET_ALL_ORDERS_FAILURE:
            return { ...state, loading: false, error: action.payload };

            case CHANGE_PASSWORD_ERROR:
                return {
                    ...state,
                    error: action.error
                }
            case USER_LOGOUT:
                return initialState;

            default:
                return state;
    }
}