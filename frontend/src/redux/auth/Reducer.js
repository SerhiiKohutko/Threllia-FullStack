import {
    GET_ALL_ORDER_REQUEST, GET_ALL_ORDERS_FAILURE,
    GET_ALL_ORDERS_SUCCESS,
    GET_USER_DETAILS_SUCCESS,
    LOGIN_SUCCESS
} from "@/redux/auth/ActionType.js";
import {decodeJWT} from "@/components/Utils/JwtDecoder.js";


const initialState = {
    userDetails: {
        sub : "", role : ""
    },
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
                userDetails: {
                    email: sub,
                    role: role
                }
            } }

            case GET_USER_DETAILS_SUCCESS:
                console.log(action.payload);
                return { userDetails: action.payload };

        case GET_ALL_ORDER_REQUEST:
            return { loading: true };
        case GET_ALL_ORDERS_SUCCESS:
            return {
                loading: false,
                orders : action.payload
            };
        case GET_ALL_ORDERS_FAILURE:
            return { loading: false, error: action.payload };


            default:
                return state;
    }
}