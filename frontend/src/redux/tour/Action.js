import axios from "axios";
import {
    GET_PAST_SHOWS_SUCCESS,
    GET_SHOW_DETAILS_FAILURE,
    GET_SHOW_DETAILS_REQUEST,
    GET_SHOW_DETAILS_SUCCESS
} from "@/redux/tour/ActionType.js";

export const getClosestShows = () => async (dispatch) => {
    dispatch({type: "GET_CLOSEST_SHOWS_REQUEST"});
    try{
        const response = await axios.get("http://localhost:8080/api/concerts/closest");
        dispatch({type: "GET_CLOSEST_SHOWS_SUCCESS", payload: response.data});
        console.log(response.data);
    }catch(err){
        dispatch({type: "GET_CLOSEST_SHOWS_ERROR", error : err});
        console.log(err);
    }
}

export const getPastDateShows = (page) => async (dispatch) => {
    dispatch({type: "GET_PAST_SHOWS_REQUEST"});
    try{
        const response = await axios.get("http://localhost:8080/api/concerts/inactive", {
            params: {
                page
            }
        });

        dispatch({type: "GET_PAST_SHOWS_SUCCESS", payload: response.data});
        console.log(response.data);
    }catch(err){
        dispatch({type: "GET_PAST_SHOWS_ERROR", error : err});
    }
}

export const getShowDetails = (id) => async (dispatch) => {
    dispatch({type : GET_SHOW_DETAILS_REQUEST});
    try{
        console.log("ID = " + id);
        const response = await axios.get(`http://localhost:8080/api/concerts/${id}`);
        dispatch({type: GET_SHOW_DETAILS_SUCCESS, payload: response.data});
        console.log(JSON.stringify(response.data) + "SONG DETAILS DETAILS DETAILS");
    }catch (err) {
        dispatch({type : GET_SHOW_DETAILS_FAILURE, err : err});
        console.log(err + "ERPERPEPRE");
    }
}

export const getShowsContainSongByTitle = (songTitle, page) => async (dispatch) => {
    try {
        if (!songTitle) return;

        const response = await axios.get(`http://localhost:8080/api/concerts`, {
            params: {
                songTitle: songTitle,
                page : page - 1
            }
        });

        dispatch({type: GET_PAST_SHOWS_SUCCESS, payload: response.data});
        console.log(JSON.stringify(response.data));
    }catch(err){
        console.log(err);
    }
}