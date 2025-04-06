import {
    GET_ALL_RELEASES_REQUEST,
    GET_ALL_RELEASES_SUCCESS,
    GET_ALL_RELEASES_FAILURE,
    GET_RELEASE_BY_ID_REQUEST,
    GET_RELEASE_BY_ID_SUCCESS,
    GET_RELEASE_BY_ID_FAILURE,
    ADD_RELEASE_REQUEST,
    ADD_RELEASE_SUCCESS,
    ADD_RELEASE_FAILURE,
    UPDATE_RELEASE_REQUEST,
    UPDATE_RELEASE_SUCCESS,
    UPDATE_RELEASE_FAILURE,
    DELETE_RELEASE_REQUEST,
    DELETE_RELEASE_SUCCESS,
    DELETE_RELEASE_FAILURE
} from "@/redux/releases/ActionType.js";

const initialState = {
    releasesList: [],
    pageablePart: {},
    releaseDetails: {},
    loading: false,
    error: null
};

export const releasesReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_RELEASES_REQUEST:
        case GET_RELEASE_BY_ID_REQUEST:
        case ADD_RELEASE_REQUEST:
        case UPDATE_RELEASE_REQUEST:
        case DELETE_RELEASE_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };

        case GET_ALL_RELEASES_SUCCESS:
            return {
                ...state,
                loading: false,
                releasesList: action.payload.content,
                pageablePart: action.payload
            };

        case GET_RELEASE_BY_ID_SUCCESS:
            return {
                ...state,
                loading: false,
                releaseDetails: action.payload
            };

        case ADD_RELEASE_SUCCESS:
        case UPDATE_RELEASE_SUCCESS:
            return {
                ...state,
                loading: false
            };

        case DELETE_RELEASE_SUCCESS:
            return {
                ...state,
                loading: false,
                releasesList: state.releasesList.filter(r => r.id !== action.payload)
            };

        case GET_ALL_RELEASES_FAILURE:
        case GET_RELEASE_BY_ID_FAILURE:
        case ADD_RELEASE_FAILURE:
        case UPDATE_RELEASE_FAILURE:
        case DELETE_RELEASE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };

        default:
            return state;
    }
};
