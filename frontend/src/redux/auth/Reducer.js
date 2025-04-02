import {
    CHANGE_PASSWORD_ERROR, DELETE_ADDRESS_SUCCESS,
    DELETE_PAYMENT_SUCCESS, GET_ADDRESS_DETAILS_FAILURE, GET_ADDRESS_DETAILS_REQUEST, GET_ADDRESS_DETAILS_SUCCESS,
    GET_ALL_ADDRESSES_FAILURE,
    GET_ALL_ADDRESSES_REQUEST,
    GET_ALL_ADDRESSES_SUCCESS,
    GET_ALL_ORDER_REQUEST,
    GET_ALL_ORDERS_FAILURE,
    GET_ALL_ORDERS_SUCCESS,
    GET_ALL_PAYMENT_DETAILS_FAILURE,
    GET_ALL_PAYMENT_DETAILS_REQUEST,
    GET_ALL_PAYMENT_DETAILS_SUCCESS,
    GET_PAYMENT_DETAILS_BY_ID_FAILURE,
    GET_PAYMENT_DETAILS_BY_ID_REQUEST,
    GET_PAYMENT_DETAILS_BY_ID_SUCCESS,
    GET_USER_DETAILS_FAILURE,
    GET_USER_DETAILS_REQUEST,
    GET_USER_DETAILS_SUCCESS,
    LOGIN_FAILURE,
    LOGIN_SUCCESS, UPDATE_ADDRESS_FAILURE, UPDATE_ADDRESS_REQUEST, UPDATE_ADDRESS_SUCCESS,
    UPDATE_PAYMENT_DETAILS_FAILURE,
    UPDATE_PAYMENT_DETAILS_REQUEST,
    UPDATE_PAYMENT_DETAILS_SUCCESS,
    USER_LOGOUT
} from "@/redux/auth/ActionType.js";
import {decodeJWT} from "@/components/Utils/JwtDecoder.js";


const initialState = {
    user: null,
    isAuthenticated: false,
    userDetails: {},
    loading: false,
    error : null,
    orders : [],
    orderDetails: {},
    payments : [],
    paymentDetails: {},
    addresses: [],
    addressDetails: {},
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
                },
                isAuthenticated: true
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

        case GET_ALL_PAYMENT_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case GET_ALL_PAYMENT_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                payments : action.payload
            }
        case GET_ALL_PAYMENT_DETAILS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            }

        case GET_PAYMENT_DETAILS_BY_ID_REQUEST:
            return {
                ...state,
                loading: true
            }
        case GET_PAYMENT_DETAILS_BY_ID_SUCCESS:
            return {
                ...state,
                loading: false,
                paymentDetails: action.payload
            }
        case GET_PAYMENT_DETAILS_BY_ID_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            }

        case UPDATE_PAYMENT_DETAILS_REQUEST, UPDATE_ADDRESS_REQUEST:
            return {
                ...state,
                loading: true
            }

            case UPDATE_PAYMENT_DETAILS_SUCCESS, UPDATE_ADDRESS_SUCCESS:
                return {
                    ...state,
                    loading: false
                }
        case UPDATE_PAYMENT_DETAILS_FAILURE, UPDATE_ADDRESS_FAILURE:
            return {
                ...state,
                error: action.error
            }

        case DELETE_ADDRESS_SUCCESS:
            return {
                ...state,
                addresses: state.addresses.filter(address => address.id !== action.payload)
            }

        case DELETE_PAYMENT_SUCCESS:
            return {
                ...state,
                payments: state.payments.filter(payment => payment.id !== action.payload)
            }

        case GET_ALL_ADDRESSES_REQUEST:
            return {
                ...state,
                loading: true
            }
            case GET_ALL_ADDRESSES_SUCCESS:
                return {
                    ...state,
                    loading: false,
                    addresses: action.payload
                }
        case GET_ALL_ADDRESSES_FAILURE:
            return {
                ...state,
                error: action.error,
                loading : false
            }

        case GET_ADDRESS_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }
            case GET_ADDRESS_DETAILS_SUCCESS:
                return {
                    ...state,
                    loading: false,
                    addressDetails: action.payload
                }

                case GET_ADDRESS_DETAILS_FAILURE:
                    return {
                        ...state,
                        loading: false,
                        error: action.error
                    }

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