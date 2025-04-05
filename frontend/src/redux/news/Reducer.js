import {
    GET_ALL_NEWS_PAGINATED_REQUEST,
    GET_ALL_NEWS_PAGINATED_SUCCESS,
    GET_ALL_NEWS_PAGINATED_FAILURE,
    GET_LATEST_UPDATE_BY_ID_REQUEST,
    GET_LATEST_UPDATE_BY_ID_SUCCESS,
    GET_LATEST_UPDATE_BY_ID_FAILURE,
    ADD_LATEST_UPDATE_REQUEST,
    ADD_LATEST_UPDATE_SUCCESS,
    ADD_LATEST_UPDATE_FAILURE,
    UPDATE_LATEST_UPDATE_REQUEST,
    UPDATE_LATEST_UPDATE_SUCCESS,
    UPDATE_LATEST_UPDATE_FAILURE,
    DELETE_LATEST_UPDATE_REQUEST,
    DELETE_LATEST_UPDATE_SUCCESS,
    DELETE_LATEST_UPDATE_FAILURE
} from "@/redux/news/ActionType.js";

const initialState = {
    news: [],
    pageablePart: {},
    loading: false,
    error: null,
    latestUpdateDetails : {}
};

export const newsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_NEWS_PAGINATED_REQUEST:
        case GET_LATEST_UPDATE_BY_ID_REQUEST:
        case ADD_LATEST_UPDATE_REQUEST:
        case UPDATE_LATEST_UPDATE_REQUEST:
        case DELETE_LATEST_UPDATE_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };

        case GET_ALL_NEWS_PAGINATED_SUCCESS:
            return {
                ...state,
                loading: false,
                news: action.payload.content,
                pageablePart: action.payload
            };

        case GET_LATEST_UPDATE_BY_ID_SUCCESS:
            return {
                ...state,
                loading: false,
                latestUpdateDetails : action.payload
            }

        case ADD_LATEST_UPDATE_SUCCESS:
        case UPDATE_LATEST_UPDATE_SUCCESS:
            return {
                ...state,
                loading: false
            };

        case DELETE_LATEST_UPDATE_SUCCESS:
            return {
                ...state,
                loading: false,
                news: state.newsList.filter(news => news.id !== action.payload)
            };

        case GET_ALL_NEWS_PAGINATED_FAILURE:
        case GET_LATEST_UPDATE_BY_ID_FAILURE:
        case ADD_LATEST_UPDATE_FAILURE:
        case UPDATE_LATEST_UPDATE_FAILURE:
        case DELETE_LATEST_UPDATE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };

        default:
            return state;
    }
};
