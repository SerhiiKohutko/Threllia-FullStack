import {
    GET_ALL_PHOTOS_PAGINATED_SUCCESS,
    GET_ALL_PHOTOS_SUCCESS,
    GET_PHOTO_COLLECTION_BY_ID_SUCCESS
} from "@/redux/gallery/ActionType.js";
import {GET_ALL_NEWS_PAGINATED_SUCCESS} from "@/redux/news/ActionType.js";

const initialState = {
    photos: [],
    pageablePart: {},
    loaded: false,
    error: null,
    galleryItemDetails : {}
}

export const photoReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_PHOTOS_SUCCESS:
            return {
                ...state,
                photos: action.payload
            }

        case GET_ALL_PHOTOS_PAGINATED_SUCCESS:
            return {
                ...state,
                pageablePart: action.payload,
                photos: action.payload.content
            }

            case GET_PHOTO_COLLECTION_BY_ID_SUCCESS:
                return {
                    ...state,
                    galleryItemDetails: action.payload
                }

        default:
            return state;
    }
}