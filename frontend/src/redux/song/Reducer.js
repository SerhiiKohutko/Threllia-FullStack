import {GET_ALL_SONGS_ORDERED_SUCCESS, GET_SONG_DETAILS_SUCCESS} from "@/redux/song/ActionType.js";

const initialState = {
    songsList : {},
    songDetails : {}
}


export const songReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_SONG_DETAILS_SUCCESS:
            return {
                ...state,
                songDetails: action.payload
            }
        case GET_ALL_SONGS_ORDERED_SUCCESS:
            console.log(action.payload)
            return {
                ...state,
                songsList: action.payload
            }
            default:
                return state;
    }
}