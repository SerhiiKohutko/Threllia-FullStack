import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

export const Account = () => {

    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem("token")){
            navigate("/login");
        }
    },[])

    return (
        <div>
            <div className={"h-[6rem] bg-black"}></div>
            <h1 className={"text-black text-10xl"}>THIS IS UR ACCOUNT</h1>
        </div>
    );
}