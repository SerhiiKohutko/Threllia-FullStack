import axios from "axios";
import {
    CREATE_TICKET_PAYMENT_FAILURE,
    CREATE_TICKET_PAYMENT_REQUEST,
    CREATE_TICKET_PAYMENT_SUCCESS,
    GET_CLOSEST_SHOWS_FAILURE,
    GET_CLOSEST_SHOWS_REQUEST,
    GET_CLOSEST_SHOWS_SUCCESS, GET_PAST_SHOWS_FAILURE, GET_PAST_SHOWS_REQUEST,
    GET_PAST_SHOWS_SUCCESS,
    GET_SHOW_DETAILS_FAILURE,
    GET_SHOW_DETAILS_REQUEST,
    GET_SHOW_DETAILS_SUCCESS,
    GET_SHOWS_CONTAINING_BY_SONG_REQUEST
} from "@/redux/tour/ActionType.js";
import {toast} from "react-toastify";
import api from "@/components/Utils/axios.js";


export const getClosestShows = () => async (dispatch) => {
    dispatch({type: GET_CLOSEST_SHOWS_REQUEST});
    try{
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/concerts/closest`,);
        dispatch({type: GET_CLOSEST_SHOWS_SUCCESS, payload: response.data});
    }catch(err){
        dispatch({type: GET_CLOSEST_SHOWS_FAILURE, error : err});
    }
}

export const getPastDateShows = (page) => async (dispatch) => {
    dispatch({type: GET_PAST_SHOWS_REQUEST});
    try{
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/concerts/inactive`, {
            params: {
                page
            }
        });

        dispatch({type: GET_PAST_SHOWS_SUCCESS, payload: response.data});
    }catch(err){
        dispatch({type: GET_PAST_SHOWS_FAILURE, error : err});
    }
}

export const getShowDetails = (id) => async (dispatch) => {
    dispatch({type : GET_SHOW_DETAILS_REQUEST});
    try{
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/concerts/${id}`,);
        dispatch({type: GET_SHOW_DETAILS_SUCCESS, payload: response.data});
    }catch (err) {
        dispatch({type : GET_SHOW_DETAILS_FAILURE, err : err});
    }
}

export const getShowsContainSongByTitle = (songTitle, page) => async (dispatch) => {
    try {
        if (!songTitle) return;

        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/concerts`, {
            params: {
                songTitle: songTitle,
                page : page - 1
            }
        });

        dispatch({type: GET_PAST_SHOWS_SUCCESS, payload: response.data});
    }catch(err){
        console.log(err);
    }
}

export const updateShowDetail = (id, concert) => async (dispatch) => {
    dispatch({ type: "UPDATE_SHOW_REQUEST" });
    try {
        await api.patch(`${import.meta.env.VITE_API_URL}/api/concerts/admin/${id}`, concert);
        dispatch({ type: "UPDATE_SHOW_SUCCESS", payload: { id, concert } });
        toast.success("Successfully updated show details.");
    } catch (err) {
        dispatch({ type: "UPDATE_SHOW_FAILURE", error: err.message });
        toast.error(err.message);
    }
};

export const deleteShowById = (id) => async (dispatch) => {
    dispatch({ type: "DELETE_SHOW_REQUEST" });
    try {
        await api.delete(`${import.meta.env.VITE_API_URL}/api/concerts/admin/${id}`);
        dispatch({ type: "DELETE_SHOW_SUCCESS", payload: id });
        toast.success("Successfully deleted show.");
    } catch (err) {
        dispatch({ type: "DELETE_SHOW_FAILURE", error: err.message });
        toast.error(err.message);
    }
};


export const ticketPurchase = (ticketData) => async (dispatch) => {
    dispatch({type: CREATE_TICKET_PAYMENT_REQUEST})
    try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/payment/buy_ticket`, ticketData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });

        if (response.data.payment_link_url){
            localStorage.setItem("fromStripe", "true");
            window.location.href = response.data.payment_link_url;
        }
        dispatch({type: CREATE_TICKET_PAYMENT_SUCCESS})
    }catch (err){
        dispatch({type: CREATE_TICKET_PAYMENT_FAILURE})
        toast.error("Error while creating payment");
    }
}

export const updateTicketStatus = (jwt, paymentId) => async () => {
    try {
        if (!paymentId){
            return;
        }
        await axios.post(`${import.meta.env.VITE_API_URL}/api/tickets/update`, {
            paymentId : paymentId,
        }, {
            headers : {
                Authorization : `Bearer ${jwt}`
            }
        })
    }catch (e) {
        console.log(e);
    }
}