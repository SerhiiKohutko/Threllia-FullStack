import axios from "axios";
import {GET_SONG_DETAILS_SUCCESS} from "@/redux/song/ActionType.js";

export const getSongDetails = (id) => async (dispatch) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/songs/${id}`);
        dispatch({type: GET_SONG_DETAILS_SUCCESS, payload: response.data});
    }catch(err) {
        console.log(err);
    }
}