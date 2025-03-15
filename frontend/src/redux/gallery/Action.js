import axios from "axios";
import {GET_ALL_PHOTOS_REQUEST, GET_ALL_PHOTOS_SUCCESS} from "@/redux/gallery/ActionType.js";

export const getAllPhotos = () => async (dispatch) => {
    dispatch({type: GET_ALL_PHOTOS_REQUEST});
    try{
        const response = await axios.get("http://localhost:8080/api/photos");
        dispatch({type: GET_ALL_PHOTOS_SUCCESS, payload: response.data});
    }catch(error){
        console.log(error);
    }
}