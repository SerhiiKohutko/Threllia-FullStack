import axios from "axios";

export const login = (data) => async() => {

    try {

        const response = await axios.post("http://localhost:8080/auth/login", data, {});

        console.log(response.data);

        // localStorage.setItem("token", response.data);

    }catch (error) {
        console.log(error);
    }
}