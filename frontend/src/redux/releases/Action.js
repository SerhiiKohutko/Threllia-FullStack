import axios from "axios";
import {
    GET_ALL_RELEASES_SUCCESS,
    GET_RELEASE_BY_ID_SUCCESS
} from "@/redux/releases/ActionType.js";
import {toast} from "react-toastify";

export const getAllReleases = (page, selectValue) => async (dispatch) => {
    try {
        const response = await axios.get("http://localhost:8080/api/releases", {
            params: {
                page : page - 1,
                type : selectValue
            }
        });
        dispatch({type: GET_ALL_RELEASES_SUCCESS, payload: response.data});
    }catch(err) {
        console.log(err);
    }
}


export const getReleaseById = (id) => async (dispatch) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/releases/${id}`);
        dispatch({type: GET_RELEASE_BY_ID_SUCCESS, payload: response.data});
    } catch (err) {
        console.log(err);
    }
}

export const addRelease = (release) => async () => {
    try{
        await axios.post("http://localhost:8080/api/releases", release , {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });

        toast.success("Release successfully added");
    }catch(err){
        toast.error(err.response.data.message)
    }
}