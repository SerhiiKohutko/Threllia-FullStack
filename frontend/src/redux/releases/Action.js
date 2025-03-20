import axios from "axios";
import {GET_ALL_RELEASES_SUCCESS} from "@/redux/releases/ActionType.js";

export const getAllReleases = (page) => async (dispatch) => {
    try {
        const response = await axios.get("http://localhost:8080/api/releases", {
            params: {
                page : page - 1
            }
        });
        dispatch({type: GET_ALL_RELEASES_SUCCESS, payload: response.data});
    }catch(err) {
        console.log(err);
    }
}