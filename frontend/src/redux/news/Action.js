import {
    ADD_LATEST_UPDATE_FAILURE,
    ADD_LATEST_UPDATE_REQUEST,
    ADD_LATEST_UPDATE_SUCCESS,
    DELETE_LATEST_UPDATE_FAILURE,
    DELETE_LATEST_UPDATE_REQUEST,
    DELETE_LATEST_UPDATE_SUCCESS,
    GET_ALL_NEWS_PAGINATED_FAILURE,
    GET_ALL_NEWS_PAGINATED_REQUEST,
    GET_ALL_NEWS_PAGINATED_SUCCESS,
    GET_LATEST_UPDATE_BY_ID_FAILURE,
    GET_LATEST_UPDATE_BY_ID_REQUEST,
    GET_LATEST_UPDATE_BY_ID_SUCCESS,
    UPDATE_LATEST_UPDATE_FAILURE,
    UPDATE_LATEST_UPDATE_REQUEST,
    UPDATE_LATEST_UPDATE_SUCCESS
} from "@/redux/news/ActionType.js";
import axios from "axios";
import {toast} from "react-toastify";
import api from "@/components/Utils/axios.js";

export const getAllNewsPaginated = (page, isOverview) => async (dispatch) => {
    dispatch({ type: GET_ALL_NEWS_PAGINATED_REQUEST });
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/news/paginated`, {
            params: { page: page - 1, isOverview: isOverview }
        });

        dispatch({ type: GET_ALL_NEWS_PAGINATED_SUCCESS, payload: response.data });
    } catch (e) {
        dispatch({ type: GET_ALL_NEWS_PAGINATED_FAILURE, error: e.message });
        toast.error(e.message);
    }
};

export const getLatestUpdateById = (id) => async (dispatch) => {
    dispatch({ type: GET_LATEST_UPDATE_BY_ID_REQUEST });
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/news/${id}`);
        dispatch({ type: GET_LATEST_UPDATE_BY_ID_SUCCESS, payload: response.data });
    } catch (e) {
        dispatch({ type: GET_LATEST_UPDATE_BY_ID_FAILURE, error: e.message });
        toast.error(e.message);
    }
};

export const addLatestUpdate = (payload) => async (dispatch) => {
    dispatch({ type: ADD_LATEST_UPDATE_REQUEST });
    try {
        await api.post(`/api/news/admin`, payload, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });

        dispatch({ type: ADD_LATEST_UPDATE_SUCCESS });
        toast.success("Content added successfully!");
    } catch (e) {
        dispatch({ type: ADD_LATEST_UPDATE_FAILURE, error: e.message });
        toast.error(e.message);
    }
};

export const updateLatestUpdateById = (id, payload, navigate) => async (dispatch) => {
    dispatch({ type: UPDATE_LATEST_UPDATE_REQUEST });
    try {
        await api.patch(`/api/news/admin/${id}`, payload, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        dispatch({ type: UPDATE_LATEST_UPDATE_SUCCESS });
        toast.success("Content updated successfully!");
        navigate(`/news/${id}`);
    } catch (err) {
        dispatch({ type: UPDATE_LATEST_UPDATE_FAILURE, error: err.message });
        toast.error(err.message);
    }
};

export const deleteLatestUpdateById = (id) => async (dispatch) => {
    dispatch({ type: DELETE_LATEST_UPDATE_REQUEST });
    try {
        await api.delete(`/api/news/admin/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        dispatch({ type: DELETE_LATEST_UPDATE_SUCCESS, payload: id });
        toast.success("Latest Update deleted successfully!");
    } catch (e) {
        dispatch({ type: DELETE_LATEST_UPDATE_FAILURE, error: e.message });
        toast.error(e.message);
    }
};
