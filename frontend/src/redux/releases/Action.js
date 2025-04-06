import axios from "axios";
import {
    GET_ALL_RELEASES_REQUEST,
    GET_ALL_RELEASES_SUCCESS,
    GET_ALL_RELEASES_FAILURE,
    GET_RELEASE_BY_ID_REQUEST,
    GET_RELEASE_BY_ID_SUCCESS,
    GET_RELEASE_BY_ID_FAILURE,
    ADD_RELEASE_REQUEST,
    ADD_RELEASE_SUCCESS,
    ADD_RELEASE_FAILURE,
    UPDATE_RELEASE_REQUEST,
    UPDATE_RELEASE_SUCCESS,
    UPDATE_RELEASE_FAILURE,
    DELETE_RELEASE_REQUEST,
    DELETE_RELEASE_SUCCESS,
    DELETE_RELEASE_FAILURE
} from "@/redux/releases/ActionType.js";
import { toast } from "react-toastify";
import api from "@/components/Utils/axios.js";

// GET ALL RELEASES
export const getAllReleases = (page, selectValue) => async (dispatch) => {
    dispatch({ type: GET_ALL_RELEASES_REQUEST });
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/releases`, {
            params: {
                page: page - 1,
                type: selectValue
            }
        });
        dispatch({ type: GET_ALL_RELEASES_SUCCESS, payload: response.data });
    } catch (err) {
        dispatch({ type: GET_ALL_RELEASES_FAILURE, error: err.message });
        toast.error("Failed to fetch releases.");
    }
};

// GET BY ID
export const getReleaseById = (id) => async (dispatch) => {
    dispatch({ type: GET_RELEASE_BY_ID_REQUEST });
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/releases/${id}`);
        dispatch({ type: GET_RELEASE_BY_ID_SUCCESS, payload: response.data });
    } catch (err) {
        dispatch({ type: GET_RELEASE_BY_ID_FAILURE, error: err.message });
        toast.error("Failed to fetch release.");
    }
};

// ADD
export const addRelease = (release, form) => async (dispatch) => {
    dispatch({ type: ADD_RELEASE_REQUEST });
    try {
        await api.post(`/api/releases/admin`, release, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        dispatch({ type: ADD_RELEASE_SUCCESS });
        toast.success("Release successfully added");
        form.reset();
    } catch (err) {
        dispatch({ type: ADD_RELEASE_FAILURE, error: err.message });
        toast.error(err.response?.data?.message || "Failed to add release");
    }
};

// UPDATE
export const updateRelease = (id, release) => async (dispatch) => {
    dispatch({ type: UPDATE_RELEASE_REQUEST });
    try {
        await api.patch(`/api/releases/admin/${id}`, release, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        dispatch({ type: UPDATE_RELEASE_SUCCESS });
        toast.success("Release successfully updated");
    } catch (err) {
        dispatch({ type: UPDATE_RELEASE_FAILURE, error: err.message });
        toast.error("Failed to update release");
    }
};

// DELETE
export const deleteRelease = (id) => async (dispatch) => {
    dispatch({ type: DELETE_RELEASE_REQUEST });
    try {
        await api.delete(`/api/releases/admin/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        dispatch({ type: DELETE_RELEASE_SUCCESS, payload: id });
        toast.success("Release successfully deleted");
    } catch (err) {
        dispatch({ type: DELETE_RELEASE_FAILURE, error: err.message });
        toast.error(err.response?.data?.message || "Failed to delete release");
    }
};
