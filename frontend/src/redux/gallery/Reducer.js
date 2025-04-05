import {
    CREATE_PHOTO_COLLECTION_FAILURE,
    CREATE_PHOTO_COLLECTION_REQUEST,
    CREATE_PHOTO_COLLECTION_SUCCESS, DELETE_PHOTO_COLLECTION_FAILURE,
    DELETE_PHOTO_COLLECTION_REQUEST,
    DELETE_PHOTO_COLLECTION_SUCCESS,
    GET_ALL_PHOTOS_PAGINATED_FAILURE,
    GET_ALL_PHOTOS_PAGINATED_REQUEST,
    GET_ALL_PHOTOS_PAGINATED_SUCCESS,
    GET_ALL_PHOTOS_SUCCESS,
    GET_PHOTO_COLLECTION_BY_ID_FAILURE,
    GET_PHOTO_COLLECTION_BY_ID_REQUEST,
    GET_PHOTO_COLLECTION_BY_ID_SUCCESS, UPDATE_PHOTO_COLLECTION_FAILURE,
    UPDATE_PHOTO_COLLECTION_REQUEST,
    UPDATE_PHOTO_COLLECTION_SUCCESS
} from "@/redux/gallery/ActionType.js";

const initialState = {
    photos: [],
    pageablePart: {},
    loading: false,
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

        case GET_ALL_PHOTOS_PAGINATED_REQUEST:
        case CREATE_PHOTO_COLLECTION_REQUEST:
        case UPDATE_PHOTO_COLLECTION_REQUEST:
        case DELETE_PHOTO_COLLECTION_REQUEST:
            return {
                ...state,
                loading: true
            };
        case GET_ALL_PHOTOS_PAGINATED_SUCCESS:
            return {
                ...state,
                loading: false,
                pageablePart: action.payload,
                photos: action.payload.content
            }
            case GET_ALL_PHOTOS_PAGINATED_FAILURE:
                return {
                    ...state,
                    loading: false
                }

                case GET_PHOTO_COLLECTION_BY_ID_REQUEST:
                    return {
                        ...state,
                        loading: true
                    }

            case GET_PHOTO_COLLECTION_BY_ID_SUCCESS:
                return {
                    ...state,
                    loading: false,
                    galleryItemDetails: action.payload
                }
                case GET_PHOTO_COLLECTION_BY_ID_FAILURE:
                    return {
                        ...state,
                        loading: false
                    }
        case DELETE_PHOTO_COLLECTION_SUCCESS:
            return {
                ...state,
                loading: false,
                photos: state.photos.filter(photo => photo.id !== action.payload)
            }
        case UPDATE_PHOTO_COLLECTION_SUCCESS:
        case CREATE_PHOTO_COLLECTION_SUCCESS:
        case DELETE_PHOTO_COLLECTION_FAILURE:
        case CREATE_PHOTO_COLLECTION_FAILURE:
        case UPDATE_PHOTO_COLLECTION_FAILURE:
            return {
                ...state,
                loading: false
            };

        default:
            return state;
    }
}