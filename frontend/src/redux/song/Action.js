import axios from "axios";
import {GET_ALL_SONGS_ORDERED_SUCCESS, GET_SONG_DETAILS_SUCCESS} from "@/redux/song/ActionType.js";
import {toast} from "react-toastify";

export const getSongDetails = (id) => async (dispatch) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/songs/${id}`);
        dispatch({type: GET_SONG_DETAILS_SUCCESS, payload: response.data});
    }catch(err) {
        console.log(err);
    }
}

export const getAllSongsOrdered = () => async (dispatch) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/songs/ordered`);
        console.log(response);
        dispatch({type: GET_ALL_SONGS_ORDERED_SUCCESS, payload: response.data});
    } catch (e) {
        console.log(e);
    }
}

export const addShow = (show) => async () => {
    try{
        await axios.post(`http://localhost:8080/api/concerts`, show, {});
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
        await axios.post(`http://localhost:8080/api/songs`, song);

        toast.success("Add song successfully.")
    } catch (err) {
        toast.error("Error")
    }
}