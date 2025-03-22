import axios from "axios";
import {
    GET_ALL_PHOTOS_REQUEST,
    GET_ALL_PHOTOS_SUCCESS,
    GET_PHOTO_COLLECTION_BY_ID_SUCCESS
} from "@/redux/gallery/ActionType.js";
import {GET_ALL_NEWS_PAGINATED_SUCCESS} from "@/redux/news/ActionType.js";

export const getAllPhotos = () => async (dispatch) => {
    dispatch({type: GET_ALL_PHOTOS_REQUEST});
    try{
        const response = await axios.get("http://localhost:8080/api/photos");
        dispatch({type: GET_ALL_PHOTOS_SUCCESS, payload: response.data});
    }catch(error){
        console.log(error);
    }
}

export const getAllPhotosPaginated  = (page, order) => async (dispatch) => {
    try{
        const response = await axios.get("http://localhost:8080/api/photos/paginated", {
            params: {
                page : page - 1,
                order : order
            }
        });
        dispatch({type: GET_ALL_NEWS_PAGINATED_SUCCESS, payload: response.data});
    }catch(error){
        console.log(error);
    }
}

export const getPhotoCollectionDetails = (id) => async (dispatch) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/photos/${id}`);
        dispatch({type: GET_PHOTO_COLLECTION_BY_ID_SUCCESS, payload: response.data});
    }catch(error){
        console.log(error);
    }
}