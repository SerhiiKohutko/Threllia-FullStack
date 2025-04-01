import axios from "axios";
import {
    CHANGE_PASSWORD_ERROR,
    GET_ALL_ORDER_REQUEST, GET_ALL_ORDERS_FAILURE,
    GET_ALL_ORDERS_SUCCESS, GET_USER_DETAILS_FAILURE, GET_USER_DETAILS_REQUEST,
    GET_USER_DETAILS_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST,
    LOGIN_SUCCESS, USER_LOGOUT
} from "@/redux/auth/ActionType.js";
import {toast} from "react-toastify";
import {decodeJWT} from "@/components/Utils/JwtDecoder.js";


export const login = (data, navigate) => async(dispatch) => {
    dispatch({type: LOGIN_REQUEST});
    try {

        const response = await axios.post("http://localhost:8080/auth/login", data, {});

        localStorage.setItem("token", response.data);
        console.log(response.data);

        dispatch({type : LOGIN_SUCCESS,  payload : response.data})
        navigate("/account");

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
        console.log(response.data);

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
        const response = await axios.get("http://localhost:8080/api/orders", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        console.log(JSON.stringify(response.data))
        dispatch({type : GET_ALL_ORDERS_SUCCESS, payload : response.data});
    }catch (error) {
        dispatch({type : GET_ALL_ORDERS_FAILURE, payload : error})
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
            const {sub, role} = decodeJWT(token);

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