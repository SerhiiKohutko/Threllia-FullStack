import {GET_CLOSEST_SHOWS_SUCCESS, GET_PAST_SHOWS_SUCCESS} from "@/redux/tour/ActionType.js";

const initialState = {
    tourList: [],
    pageablePart: {},
    error: null,
    loading: false,
    tourDetails: {}
}


export const tourReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CLOSEST_SHOWS_SUCCESS:
            return {
                ...state,
                loading: false,
                tourList: action.payload
            }

            case GET_PAST_SHOWS_SUCCESS:
                return {
                    ...state,
                    loading: false,
                    tourList: action.payload.content,
                    pageablePart: action.payload
                }

        default: return state;
    }
}