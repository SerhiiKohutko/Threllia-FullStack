import {
    GET_SONG_DETAILS_REQUEST,
    GET_SONG_DETAILS_SUCCESS,
    GET_SONG_DETAILS_FAILURE,
    GET_ALL_SONGS_ORDERED_REQUEST,
    GET_ALL_SONGS_ORDERED_SUCCESS,
    GET_ALL_SONGS_ORDERED_FAILURE,
    ADD_SONG_REQUEST,
    ADD_SONG_SUCCESS,
    ADD_SONG_FAILURE,
    UPDATE_SONG_REQUEST,
    UPDATE_SONG_SUCCESS,
    UPDATE_SONG_FAILURE,
    DELETE_SONG_REQUEST,
    DELETE_SONG_SUCCESS,
    DELETE_SONG_FAILURE
} from "@/redux/song/ActionType.js";

const initialState = {
    songsList: [],
    songDetails: {},
    loading: false,
    error: null
};

export const songReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_SONG_DETAILS_REQUEST:
        case GET_ALL_SONGS_ORDERED_REQUEST:
        case ADD_SONG_REQUEST:
        case UPDATE_SONG_REQUEST:
        case DELETE_SONG_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };

        case GET_SONG_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                songDetails: action.payload
            };

        case GET_ALL_SONGS_ORDERED_SUCCESS:
            return {
                ...state,
                loading: false,
                songsList: action.payload
            };

        case DELETE_SONG_SUCCESS:
            return {
                ...state,
                loading: false,
                songsList: state.songsList.filter(song => song.id !== action.payload)
            };

        case ADD_SONG_SUCCESS:
        case UPDATE_SONG_SUCCESS:
            return {
                ...state,
                loading: false
            };

        case GET_SONG_DETAILS_FAILURE:
        case GET_ALL_SONGS_ORDERED_FAILURE:
        case ADD_SONG_FAILURE:
        case UPDATE_SONG_FAILURE:
        case DELETE_SONG_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };

        default:
            return state;
    }
};
