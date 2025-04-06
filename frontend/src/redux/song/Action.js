import axios from "axios";
import {
    GET_SONG_DETAILS_REQUEST,
    GET_SONG_DETAILS_SUCCESS,
    GET_SONG_DETAILS_FAILURE,
    GET_ALL_SONGS_ORDERED_REQUEST,
    GET_ALL_SONGS_ORDERED_SUCCESS,
    GET_ALL_SONGS_ORDERED_FAILURE,
    ADD_SONG_REQUEST,
    ADD_SONG_SUCCESS,
    ADD_SONG_FAILURE,
    UPDATE_SONG_REQUEST,
    UPDATE_SONG_SUCCESS,
    UPDATE_SONG_FAILURE,
    DELETE_SONG_REQUEST,
    DELETE_SONG_SUCCESS,
    DELETE_SONG_FAILURE
} from "@/redux/song/ActionType.js";
import { toast } from "react-toastify";
import api from "@/components/Utils/axios.js";

// DETAILS
export const getSongDetails = (id) => async (dispatch) => {
    dispatch({ type: GET_SONG_DETAILS_REQUEST });
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/songs/${id}`);
        dispatch({ type: GET_SONG_DETAILS_SUCCESS, payload: response.data });
    } catch (err) {
        dispatch({ type: GET_SONG_DETAILS_FAILURE, error: err.message });
        toast.error("Failed to fetch song details.");
    }
};

export const addShow = (show) => async () => {
    try{
        await api.post("/api/concerts/admin", show, {
            headers: {
                Authorization : `Bearer ${localStorage.getItem('token')}`
            }
        });
        toast.success("Show add successfully.", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
        });
    }catch (err){
        toast.error("Error", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
        });
    }
}

// ORDERED LIST
export const getAllSongsOrdered = () => async (dispatch) => {
    dispatch({ type: GET_ALL_SONGS_ORDERED_REQUEST });
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/songs/ordered`);
        dispatch({ type: GET_ALL_SONGS_ORDERED_SUCCESS, payload: response.data });
    } catch (e) {
        dispatch({ type: GET_ALL_SONGS_ORDERED_FAILURE, error: e.message });
        toast.error("Failed to fetch songs.");
    }
};

// ADD SONG
export const addSong = (song) => async (dispatch) => {
    dispatch({ type: ADD_SONG_REQUEST });
    try {
        await api.post(`/api/songs/admin`, song, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        dispatch({ type: ADD_SONG_SUCCESS });
        toast.success("Song added successfully.");
    } catch (err) {
        dispatch({ type: ADD_SONG_FAILURE, error: err.message });
        toast.error("Failed to add song.");
    }
};

// UPDATE SONG
export const updateSong = (id, data) => async (dispatch) => {
    dispatch({ type: UPDATE_SONG_REQUEST });
    try {
        await api.patch(`/api/songs/admin/${id}`, data, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        dispatch({ type: UPDATE_SONG_SUCCESS });
        toast.success("Song updated successfully.");
    } catch (e) {
        dispatch({ type: UPDATE_SONG_FAILURE, error: e.message });
        toast.error("Failed to update song.");
    }
};

// DELETE SONG
export const deleteSong = (id) => async (dispatch) => {
    dispatch({ type: DELETE_SONG_REQUEST });
    try {
        await api.delete(`/api/songs/admin/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        dispatch({ type: DELETE_SONG_SUCCESS, payload: id });
        toast.success("Song deleted successfully.");
    } catch (err) {
        dispatch({ type: DELETE_SONG_FAILURE, error: err.message });
        toast.error("Failed to delete song.");
    }
};