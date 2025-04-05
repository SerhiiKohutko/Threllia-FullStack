import axios from "axios";
import {
    CREATE_PHOTO_COLLECTION_FAILURE,
    CREATE_PHOTO_COLLECTION_REQUEST,
    CREATE_PHOTO_COLLECTION_SUCCESS,
    DELETE_PHOTO_COLLECTION_FAILURE,
    DELETE_PHOTO_COLLECTION_REQUEST,
    DELETE_PHOTO_COLLECTION_SUCCESS,
    GET_ALL_PHOTOS_PAGINATED_FAILURE,
    GET_ALL_PHOTOS_PAGINATED_REQUEST,
    GET_ALL_PHOTOS_PAGINATED_SUCCESS,
    GET_PHOTO_COLLECTION_BY_ID_FAILURE,
    GET_PHOTO_COLLECTION_BY_ID_REQUEST,
    GET_PHOTO_COLLECTION_BY_ID_SUCCESS,
    UPDATE_PHOTO_COLLECTION_FAILURE,
    UPDATE_PHOTO_COLLECTION_REQUEST,
    UPDATE_PHOTO_COLLECTION_SUCCESS
} from "@/redux/gallery/ActionType.js";
import {toast} from "react-toastify";


export const getAllPhotosPaginated  = (page, order) => async (dispatch) => {
    dispatch({type : GET_ALL_PHOTOS_PAGINATED_REQUEST});
    try{
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/photos/paginated`, {
            params: {
                page : page - 1,
                order : order
            }
        });
        dispatch({type: GET_ALL_PHOTOS_PAGINATED_SUCCESS, payload: response.data});
    }catch(error){
        dispatch({type: GET_ALL_PHOTOS_PAGINATED_FAILURE, error: error.response.data.message});
        console.log(error);
    }
}

export const getPhotoCollectionDetails = (id) => async (dispatch) => {
    dispatch({type : GET_PHOTO_COLLECTION_BY_ID_REQUEST});
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/photos/${id}`);
        dispatch({type: GET_PHOTO_COLLECTION_BY_ID_SUCCESS, payload: response.data});
    }catch(error){
        dispatch({type : GET_PHOTO_COLLECTION_BY_ID_FAILURE, error: error.response.data.message});
        console.log(error);
    }
}

export const addPhotoCollection = (data, form, setPreviews) => async (dispatch) => {
    dispatch({type : CREATE_PHOTO_COLLECTION_REQUEST})
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
        dispatch({type: CREATE_PHOTO_COLLECTION_SUCCESS});
        form.reset();
        setPreviews([]);
    }catch(error){
        dispatch({type : CREATE_PHOTO_COLLECTION_FAILURE})
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

export  const updatePhotoCollection = (id, data, navigate) => async (dispatch) => {
    dispatch({type : UPDATE_PHOTO_COLLECTION_REQUEST})
    try {
        await axios.patch(`${import.meta.env.VITE_API_URL}/api/photos/admin/${id}`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization : `Bearer ${localStorage.getItem('token')}`
            }
        })
        toast.success("Collection updated successfully.")
        dispatch({type : UPDATE_PHOTO_COLLECTION_SUCCESS})
        navigate(`/gallery/${id}`);
    }catch (error) {
        dispatch({type : UPDATE_PHOTO_COLLECTION_FAILURE})
        toast.error(error.message)
    }
}

export const deletePhotoCollection = (id, navigate) => async (dispatch) => {
    dispatch({type : DELETE_PHOTO_COLLECTION_REQUEST})
    try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/api/photos/admin/${id}`,{
            headers: {
                Authorization : `Bearer ${localStorage.getItem('token')}`
            }
        })
        toast.success("Successfully deleted photoCollection");
        dispatch({type : DELETE_PHOTO_COLLECTION_SUCCESS, payload: id});
        navigate("/gallery")
    }catch(error){
        dispatch({type : DELETE_PHOTO_COLLECTION_FAILURE})
        toast.error(error.message)
    }
}