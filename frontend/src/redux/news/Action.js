import axios from "axios";
import {
    GET_ALL_NEWS_PAGINATED_SUCCESS,
    GET_LATEST_UPDATE_BY_ID_SUCCESS
} from "@/redux/news/ActionType.js";
import {toast} from "react-toastify";

export const getAllNewsPaginated = (page, isOverview) => async (dispatch) => {
    try{
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/news/paginated`, {
            params : {page : page - 1, isOverview : isOverview}

        });

        dispatch({type : GET_ALL_NEWS_PAGINATED_SUCCESS, payload : response.data});
    }catch (e) {
        console.error(e)
    }
}

export const getLatestUpdateById = (id) => async (dispatch) => {
    try {

        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/news/${id}`);

        dispatch({type : GET_LATEST_UPDATE_BY_ID_SUCCESS, payload : response.data});
    }catch (e) {
        console.log(e);
    }
}

export const addLatestUpdate = (payload) => async () => {
    try {
        await axios.post(`${import.meta.env.VITE_API_URL}/api/news/admin`, payload, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization : `Bearer ${localStorage.getItem("token")}`
            }
        });

        toast.success("Content added successfully!");

    }catch (e) {
            toast.error(e.response.data);
    }
}

export const updateLatestUpdateById = (id, payload) => async () => {
    try {
        await axios.patch(`${import.meta.env.VITE_API_URL}/api/news/admin/${id}`,payload, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization : `Bearer ${localStorage.getItem("token")}`
            }
        })
        toast.success("Content updated successfully!");
    }catch (err){
        toast.error(err.message)
    }
}

export const deleteLatestUpdateById = (id) => async () => {
    try{
        await axios.delete(`${import.meta.env.VITE_API_URL}/api/news/admin/${id}`, {
            headers: {
            Authorization : `Bearer ${localStorage.getItem("token")}`
            }
        })
        toast.success("Latest Update deleted successfully!");
    }catch (e) {
        toast.error(e.message);
    }
}