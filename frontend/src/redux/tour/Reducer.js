import {
    CREATE_TICKET_PAYMENT_FAILURE,
    CREATE_TICKET_PAYMENT_REQUEST, CREATE_TICKET_PAYMENT_SUCCESS,
    DELETE_SHOW_FAILURE,
    DELETE_SHOW_REQUEST, GET_CLOSEST_SHOWS_FAILURE, GET_CLOSEST_SHOWS_REQUEST,
    GET_CLOSEST_SHOWS_SUCCESS, GET_PAST_SHOWS_FAILURE, GET_PAST_SHOWS_REQUEST,
    GET_PAST_SHOWS_SUCCESS, GET_SHOW_DETAILS_FAILURE,
    GET_SHOW_DETAILS_REQUEST,
    GET_SHOW_DETAILS_SUCCESS, UPDATE_SHOW_FAILURE, UPDATE_SHOW_REQUEST
} from "@/redux/tour/ActionType.js";

const initialState = {
    tourList: [],
    pageablePart: {},
    error: null,
    loading: false,
    tourDetails: {}
}


export const tourReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CLOSEST_SHOWS_REQUEST:
        case GET_SHOW_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case GET_CLOSEST_SHOWS_SUCCESS:
            return {
                ...state,
                loading: false,
                tourList: action.payload
            }
        case GET_CLOSEST_SHOWS_FAILURE:
        case GET_SHOW_DETAILS_FAILURE:
            return {
                ...state,
                loading: false
            }

            case GET_PAST_SHOWS_REQUEST:
                return {
                    ...state,
                    loading: true
                }

            case GET_PAST_SHOWS_SUCCESS:
                return {
                    ...state,
                    loading: false,
                    tourList: action.payload.content,
                    pageablePart: action.payload
                }
        case GET_PAST_SHOWS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case GET_SHOW_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                tourDetails: action.payload
            }
            case UPDATE_SHOW_REQUEST:
                return {
                    ...state,
                    loading: true,
                }

        case "UPDATE_SHOW_SUCCESS":
            return {
                ...state,
                tourList: state.tourList.map((show) =>
                    show.id === action.payload.id ? { ...show, ...action.payload.concert } : show
                ),
                loading: false
            };

        case UPDATE_SHOW_FAILURE:
            return {
                ...state,
                loading: true,
            }

            case DELETE_SHOW_REQUEST:
                return {
                    ...state,
                    loading: true,
                }

        case "DELETE_SHOW_SUCCESS":
            return {
                ...state,
                tourList: state.tourList.filter((show) => show.id !== action.payload),
                loading: false
            };

        case DELETE_SHOW_FAILURE:
            return {
                ...state,
                loading: false,
            }

            case CREATE_TICKET_PAYMENT_REQUEST:
                return {
                    ...state,
                    loading: true
                }
                case CREATE_TICKET_PAYMENT_SUCCESS:
                    case CREATE_TICKET_PAYMENT_FAILURE:
                    return {
                        ...state,
                        loading: false
                    }

        default: return state;
    }
}