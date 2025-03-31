import {LOGIN_SUCCESS} from "@/redux/auth/ActionType.js";
import {decodeJWT} from "@/components/Utils/JwtDecoder.js";


const initialState = {
    userDetails: {
        sub : "", role : ""
    }
}


export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            { const {sub, role} = decodeJWT(action.payload);
                if (role === "ROLE_ADMIN") {
                    localStorage.setItem("role", role);
                }else{
                    localStorage.setItem("role", role);
                }
            return {
                ...state,
                userDetails: {
                    email: sub,
                    role: role
                }
            } }

            default:
                return state;
    }
}