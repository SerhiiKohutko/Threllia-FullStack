import {GET_SONG_DETAILS_SUCCESS} from "@/redux/song/ActionType.js";

const initialState = {
    songDetails : {}
}


export const songReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_SONG_DETAILS_SUCCESS:
            return {
                ...state,
                songDetails: action.payload
            }
            default:
                return state;
    }
}