import axios from "axios";
import {
    GET_ALL_RELEASES_SUCCESS,
    GET_RELEASE_BY_ID_SUCCESS
} from "@/redux/releases/ActionType.js";
import {toast} from "react-toastify";

export const getAllReleases = (page, selectValue) => async (dispatch) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/releases`, {
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
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/releases/${id}`);
        dispatch({type: GET_RELEASE_BY_ID_SUCCESS, payload: response.data});
    } catch (err) {
        console.log(err);
    }
}

export const addRelease = (release) => async () => {
    try{
        await axios.post(`${import.meta.env.VITE_API_URL}/api/releases/admin`, release , {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization : `Bearer ${localStorage.getItem('token')}`
            }
        });

        toast.success("Release successfully added");
    }catch(err){
        toast.error(err.response.data.message)
    }
}

export const updateRelease = (id, release) => async () => {
    try {
        await axios.patch(`${import.meta.env.VITE_API_URL}/api/releases/admin/${id}`, release, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization : `Bearer ${localStorage.getItem('token')}`
            }
        })
        toast.success("Release successfully updated");
    }catch(err) {
        toast.error("Error");
    }
}

export const deleteRelease = (id) => async () => {
    try{
        await axios.delete(`${import.meta.env.VITE_API_URL}/api/releases/admin/${id}`,{
            headers: {
                Authorization : `Bearer ${localStorage.getItem('token')}`
            }
        });
        toast.success("Release successfully deleted");
    }catch (err){
        toast.error(err.response.data.message)
    }
}