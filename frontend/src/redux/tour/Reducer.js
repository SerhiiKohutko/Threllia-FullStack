import {GET_CLOSEST_SHOWS_SUCCESS} from "@/redux/tour/ActionType.js";

const initialState = {
    tourList: [],
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
        default: return state;
    }
}