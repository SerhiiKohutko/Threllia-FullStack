import {Button} from "@/components/ui/button.jsx";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {updateOrderStatus} from "@/redux/shop/Action.js";

export const SuccessPayment = () =>{
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const queryParams = new URLSearchParams(location.search);
    const paymentId = queryParams.get("payment_id");

    useEffect(() => {
        dispatch(updateOrderStatus(localStorage.getItem("token"), paymentId));
    },[])

    return (
        <div>
            <div className={"h-[6rem] bg-black"}></div>
                <div className={"flex flex-col text-center items-center justify-center"}>
                    <h1>Payment Successfull!</h1>
                    <Button onClick={() => navigate("/account")}>Get Back To Account</Button>
                </div>
        </div>
    )
}