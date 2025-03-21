import {GET_ALL_NEWS_PAGINATED_SUCCESS, GET_ALL_NEWS_SUCCESS} from "@/redux/news/ActionType.js";

const initialState = {
    news : [],
    pageablePart: {},
    loading : false,
    error : null,
    latestUpdateDetails : {}
}

export const newsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_NEWS_SUCCESS:
            return {
                ...state,
                news : action.payload
            }
        case GET_ALL_NEWS_PAGINATED_SUCCESS:
            return {
                ...state,
                news : action.payload.content,
                pageablePart: action.payload
            }
        default:
            return state;
    }
}