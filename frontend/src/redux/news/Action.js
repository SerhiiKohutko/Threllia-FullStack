import axios from "axios";
import {GET_ALL_NEWS_SUCCESS} from "@/redux/news/ActionType.js";

export const getAllLatestUpdates = () => async (dispatch) => {
    try {
        const response = await axios.get("http://localhost:8080/api/news");
        dispatch({type : GET_ALL_NEWS_SUCCESS, payload : response.data});
    } catch (err){
        console.error(err)
    }
}