import axios from "axios";
import {GET_ALL_SONGS_ORDERED_SUCCESS, GET_SONG_DETAILS_SUCCESS} from "@/redux/song/ActionType.js";
import {toast} from "react-toastify";

export const getSongDetails = (id) => async (dispatch) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/songs/${id}`);
        dispatch({type: GET_SONG_DETAILS_SUCCESS, payload: response.data});
    }catch(err) {
        console.log(err);
    }
}

export const getAllSongsOrdered = () => async (dispatch) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/songs/ordered`);
        dispatch({type: GET_ALL_SONGS_ORDERED_SUCCESS, payload: response.data});
    } catch (e) {
        console.log(e);
    }
}

export const addShow = (show) => async () => {
    try{
        await axios.post(`${import.meta.env.VITE_API_URL}/api/concerts/admin`, show, {
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

export const addSong = (song) => async () => {
    try {
        await axios.post(`${import.meta.env.VITE_API_URL}/api/songs/admin`, song, {
            headers: {
                Authorization : `Bearer ${localStorage.getItem('token')}`
            }
        });

        toast.success("Add song successfully.")
    } catch (err) {
        toast.error("Error")
    }
}

export const updateSong = (id, data) => async () => {

    try {
        await axios.patch(`${import.meta.env.VITE_API_URL}/api/songs/admin/${id}`, data, {
            headers: {
                Authorization : `Bearer ${localStorage.getItem('token')}`
            }
        });

        toast.success("Update song successfully.")
    }catch (e){
        toast.error("Error")
    }
}

export const deleteSong = (id) => async () => {
    try {
        console.log(id)
        await axios.delete(`${import.meta.env.VITE_API_URL}/api/songs/admin/${id}`, {
            headers: {
                Authorization : `Bearer ${localStorage.getItem('token')}`
            }
        });

        toast.success("Delete successfully.")
    }catch(err){
        console.log(err);
        toast.error("Error")
    }
}