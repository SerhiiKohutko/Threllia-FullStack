import axios from "axios";
import {store} from "@/redux/Store.js";
import {logout} from "@/redux/auth/Action.js";

const api = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}`
});

api.interceptors.response.use(
    response => response,
    error => {
        const message = error.response.data;

        if (message === 'Invalid or expired token' ) {
            store.dispatch(logout());
        }

        return Promise.reject(error);
    }
);

export default api;