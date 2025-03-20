import {GET_ALL_RELEASES_SUCCESS, GET_RELEASE_BY_ID_SUCCESS} from "@/redux/releases/ActionType.js";

const initialState = {
    releasesList : [],
    pageablePart: {},
    loading: false,
    error: null,
    releaseDetails: {}
}



export const releasesReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_RELEASES_SUCCESS:
            return {
                ...state,
                releasesList: action.payload.content,
                pageablePart: action.payload
            }

        case GET_RELEASE_BY_ID_SUCCESS:
            return {
                ...state,
                releaseDetails: action.payload
            }

        default:
            return state;
    }
}