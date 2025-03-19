import {GET_ALL_RELEASES_SUCCESS} from "@/redux/releases/ActionType.js";

const initialState = {
    releasesList : [],
    loading: false,
    error: null,
    releaseDetails: {}
}



export const releasesReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_RELEASES_SUCCESS:
            return {
                ...state,
                releasesList: action.payload
            }

        default:
            return state;
    }
}