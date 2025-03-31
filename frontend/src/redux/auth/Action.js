import axios from "axios";
import {GET_USER_DETAILS_SUCCESS, LOGIN_SUCCESS} from "@/redux/auth/ActionType.js";


export const login = (data, navigate) => async(dispatch) => {

    try {

        const response = await axios.post("http://localhost:8080/auth/login", data, {});

        localStorage.setItem("token", response.data);
        console.log(response.data);

        dispatch({type : LOGIN_SUCCESS,  payload : response.data})
        navigate("/account");

    }catch (error) {
        console.log(error);
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
    try {
        const response = await axios.get("http://localhost:8080/api/user", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        dispatch({type : GET_USER_DETAILS_SUCCESS, payload : response.data})
    }catch (error) {
        console.log(error);
    }
}