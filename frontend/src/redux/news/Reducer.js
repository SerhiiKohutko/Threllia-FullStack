import {GET_ALL_NEWS_SUCCESS} from "@/redux/news/ActionType.js";

const initialState = {
    news : [],
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

        default:
            return state;
    }
}