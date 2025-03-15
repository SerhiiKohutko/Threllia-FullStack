import axios from "axios";

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