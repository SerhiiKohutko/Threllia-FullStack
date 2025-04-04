import axios from "axios";
import {
    GET_ALL_PHOTOS_PAGINATED_SUCCESS,
    GET_PHOTO_COLLECTION_BY_ID_SUCCESS
} from "@/redux/gallery/ActionType.js";
import {toast} from "react-toastify";


export const getAllPhotosPaginated  = (page, order) => async (dispatch) => {
    try{
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/photos/paginated`, {
            params: {
                page : page - 1,
                order : order
            }
        });
        dispatch({type: GET_ALL_PHOTOS_PAGINATED_SUCCESS, payload: response.data});
    }catch(error){
        console.log(error);
    }
}

export const getPhotoCollectionDetails = (id) => async (dispatch) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/photos/${id}`);
        dispatch({type: GET_PHOTO_COLLECTION_BY_ID_SUCCESS, payload: response.data});
    }catch(error){
        console.log(error);
    }
}

export const addPhotoCollection = (data) => async () => {
    try {

        await axios.post(`${import.meta.env.VITE_API_URL}/api/photos/admin`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization : `Bearer ${localStorage.getItem('token')}`
            }
        });

        toast.success("Collection added successfully.", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
        });
    }catch(error){
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

export  const updatePhotoCollection = (id, data) => async () => {
    try {
        await axios.patch(`${import.meta.env.VITE_API_URL}/api/photos/admin/${id}`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization : `Bearer ${localStorage.getItem('token')}`
            }
        })
        toast.success("Collection updated successfully.")
    }catch (error) {
        toast.error(error.message)
    }
}

export const deletePhotoCollection = (id) => async (dispatch) => {
    try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/api/photos/admin/${id}`,{
            headers: {
                Authorization : `Bearer ${localStorage.getItem('token')}`
            }
        })
        toast.success("Successfully deleted photoCollection");
    }catch(error){
        toast.error(error.message)
    }
}