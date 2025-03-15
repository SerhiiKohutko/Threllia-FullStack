import {GET_ALL_PHOTOS_SUCCESS} from "@/redux/gallery/ActionType.js";

const initialState = {
    photos: [],
    loaded: false,
    error: null,
}

export const photoReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_PHOTOS_SUCCESS:
            return {
                ...state,
                photos: action.payload
            }
        default:
            return state;
    }
}