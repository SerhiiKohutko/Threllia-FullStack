import axios from "axios";
import {
    CHANGE_PASSWORD_ERROR, DELETE_ADDRESS_SUCCESS,
    DELETE_PAYMENT_SUCCESS, GET_ADDRESS_DETAILS_FAILURE, GET_ADDRESS_DETAILS_REQUEST, GET_ADDRESS_DETAILS_SUCCESS,
    GET_ALL_ADDRESSES_FAILURE,
    GET_ALL_ADDRESSES_REQUEST,
    GET_ALL_ADDRESSES_SUCCESS,
    GET_ALL_ORDER_REQUEST,
    GET_ALL_ORDERS_FAILURE,
    GET_ALL_ORDERS_SUCCESS,
    GET_ALL_PAYMENT_DETAILS_FAILURE,
    GET_ALL_PAYMENT_DETAILS_REQUEST,
    GET_ALL_PAYMENT_DETAILS_SUCCESS,
    GET_PAYMENT_DETAILS_BY_ID_FAILURE,
    GET_PAYMENT_DETAILS_BY_ID_REQUEST,
    GET_PAYMENT_DETAILS_BY_ID_SUCCESS,
    GET_USER_DETAILS_FAILURE,
    GET_USER_DETAILS_REQUEST,
    GET_USER_DETAILS_SUCCESS,
    LOGIN_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS, UPDATE_ADDRESS_FAILURE, UPDATE_ADDRESS_REQUEST, UPDATE_ADDRESS_SUCCESS,
    UPDATE_PAYMENT_DETAILS_FAILURE,
    UPDATE_PAYMENT_DETAILS_REQUEST,
    UPDATE_PAYMENT_DETAILS_SUCCESS,
    USER_LOGOUT
} from "@/redux/auth/ActionType.js";
import {toast} from "react-toastify";
import {decodeJWT} from "@/components/Utils/JwtDecoder.js";

export const login = (data, navigate) => async(dispatch) => {
    dispatch({type: LOGIN_REQUEST});
    try {
        const response = await axios.post("http://localhost:8080/auth/login", data, {});

        localStorage.setItem("token", response.data);

        dispatch({type : LOGIN_SUCCESS,  payload : response.data})
        if (navigate) {
            navigate("/account");
        }

    }catch (error) {
        dispatch({type : LOGIN_FAILURE, error: error.response.data.message === "Invalid credentials" ? error.response.data.message : "Error while authentication"});
        console.log(error.response.data.message);
    }
}

export const registerUser = (data, navigate) => async() => {
    try {
        await axios.post("http://localhost:8080/auth/register", data, {});

        navigate("/login");
    }catch (error) {
        console.log(error);
    }
}

export const getUserDetails = (token) => async(dispatch) => {
    dispatch({type: GET_USER_DETAILS_REQUEST})

    const authToken = token || localStorage.getItem("token");

    if (!authToken) {
        return dispatch({type: GET_USER_DETAILS_FAILURE, payload: "No auth token"});
    }

    try {
        const response = await axios.get("http://localhost:8080/api/user", {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        })
        dispatch({type: GET_USER_DETAILS_SUCCESS, payload: response.data})
    } catch (error) {
        dispatch({type: GET_USER_DETAILS_FAILURE, payload: error})
    }
}

export const updateUserDetails = (data, navigate) => async(dispatch) => {
    try {
        const response = await axios.patch("http://localhost:8080/api/user", data, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })

        localStorage.setItem("token", response.data);

        dispatch({type : LOGIN_SUCCESS,  payload : response.data})
        navigate("/account");
    }catch (error) {
        toast.error(error.response.data.message);
    }
}

export const updateUserPassword = (data, navigate) => async(dispatch) => {
    try {
        await axios.patch("http://localhost:8080/api/user/change_password", data, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })

        navigate("/account");
    }catch (error) {
        dispatch({type: CHANGE_PASSWORD_ERROR, error : error.response.data.message});
    }
}

export const getAllOrders = (token) => async(dispatch) => {
    dispatch({type : GET_ALL_ORDER_REQUEST});
    try {
        const response = await axios.get("http://localhost:8080/api/user/orders", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        dispatch({type : GET_ALL_ORDERS_SUCCESS, payload : response.data});
    }catch (error) {
        dispatch({type : GET_ALL_ORDERS_FAILURE, payload : error})
        console.log(error);
    }
}

export const getAllAddresses = (token) => async(dispatch) => {
    dispatch({type : GET_ALL_ADDRESSES_REQUEST});
    try {
        const response = await axios.get("http://localhost:8080/api/user/addresses", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        dispatch({type : GET_ALL_ADDRESSES_SUCCESS, payload : response.data});
    }catch (e) {
        dispatch({type : GET_ALL_ADDRESSES_FAILURE, error : e.response.data.message});
    }
}

export const deleteAddress = (id ,token) => async(dispatch) => {
    await axios.delete(`http://localhost:8080/api/user/addresses/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    dispatch({type : DELETE_ADDRESS_SUCCESS, payload : id})
}

export const getAddressDetails = (id, token) => async(dispatch) => {
    dispatch({type : GET_ADDRESS_DETAILS_REQUEST})
    try {
        const response = await axios.get(`http://localhost:8080/api/user/addresses/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        dispatch({type : GET_ADDRESS_DETAILS_SUCCESS, payload : response.data})
    }catch (error) {
        dispatch({type : GET_ADDRESS_DETAILS_FAILURE, error : error.response.data.message});
        console.log(error);
    }
}

export const createAddress = (data, navigate) => async() => {
    try {
        await axios.post("http://localhost:8080/api/user/addresses", data, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        navigate("/account");
    } catch (e) {
        console.log(e)
    }
}

export const updateAddress = (id, data, setSuccess) => async(dispatch) => {
    dispatch({type : UPDATE_ADDRESS_REQUEST});
    try {
        const response = await axios.patch(`http://localhost:8080/api/user/addresses/${id}`, data,{
            headers : {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        dispatch({type : UPDATE_ADDRESS_SUCCESS, payload : response.data})
        setSuccess("Address updated successfully created!");
    }catch (error) {
        dispatch({type: UPDATE_ADDRESS_FAILURE, payload : error.response.data.message});
        console.log(error);
    }
}
export const createPaymentDetails = (data, navigate) => async() => {
    try {
        await axios.post("http://localhost:8080/api/user/payment_details", data, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        navigate("/account");
    } catch (e) {
        console.log(e)
    }
}

export const getAllPaymentDetails = (token) => async(dispatch) => {
    dispatch({type : GET_ALL_PAYMENT_DETAILS_REQUEST});
    try {
        const response = await axios.get("http://localhost:8080/api/user/payment_details", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        dispatch({type : GET_ALL_PAYMENT_DETAILS_SUCCESS, payload : response.data});
    }catch (error) {
        dispatch({type : GET_ALL_PAYMENT_DETAILS_FAILURE, payload : error})
        console.log(error);
    }
}

export const getPaymentDetails = (id, token) => async(dispatch) => {
    dispatch({type : GET_PAYMENT_DETAILS_BY_ID_REQUEST})
    try {
        const response = await axios.get(`http://localhost:8080/api/user/payment_details/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        dispatch({type : GET_PAYMENT_DETAILS_BY_ID_SUCCESS, payload : response.data})
    }catch (error) {
        dispatch({type : GET_PAYMENT_DETAILS_BY_ID_FAILURE, error : error.response.data.message});
        console.log(error);
    }
}

export const deletePayment = (id, token) => async(dispatch) => {
        await axios.delete(`http://localhost:8080/api/user/payment_details/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

    dispatch({type : DELETE_PAYMENT_SUCCESS, payload : id})
}

export const updatePaymentDetails = (id, data, setSuccess) => async(dispatch) => {
    dispatch({type : UPDATE_PAYMENT_DETAILS_REQUEST});
    try {
        const response = await axios.patch(`http://localhost:8080/api/user/payment_details/${id}`, data,{
            headers : {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        dispatch({type : UPDATE_PAYMENT_DETAILS_SUCCESS, payload : response.data})
        setSuccess("Payment details updated successfully created!");
    }catch (error) {
        dispatch({type: UPDATE_PAYMENT_DETAILS_FAILURE, payload : error.response.data.message});
        console.log(error);
    }
}

export const logout = () => async(dispatch) => {
    localStorage.removeItem("token");
    dispatch({type : USER_LOGOUT});
}


export const checkAuthState = () => async(dispatch) => {
    const token = localStorage.getItem("token");

    if (token) {
        try {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: token
            });

            dispatch(getUserDetails(token));

        } catch (error) {
            console.log("Invalid token", error);
            localStorage.removeItem("token");
            dispatch({type: USER_LOGOUT});
        }
    }
}

export const loginWhileCheckout = (userData) => async (dispatch) => {
    try {
        await dispatch(login(userData));
        const token = localStorage.getItem("token");
        return !!token;
    } catch (e) {
        console.error("Login error:", e);
        return false;
    }
};