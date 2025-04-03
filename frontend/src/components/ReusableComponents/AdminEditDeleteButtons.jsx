import {Button} from "@/components/ui/button.jsx";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

export const AdminEditDeleteButtons = ({navigationLink, state, handleDelete}) => {
    const navigate = useNavigate();
    const [isAdmin, setIsAdmin] = useState(false);
    const auth = useSelector(state => state.auth);

    useEffect(() => {
        if (auth.userAdmin) {
            setIsAdmin(true);
        }
    },[auth.userAdmin]);

    return (
        <>
            {/*If profile is admin - edit & deletion available*/}
            {
                isAdmin && <>
                    <Button onClick={() => navigate(navigationLink, {state: state})}
                            variant={"ghost"} className={"border rounded-none border-orange-500 mt-5 mr-4 text-white"}>Edit</Button>
                    <Button onClick={handleDelete} variant={"ghost"} className={"border bg-red-700 text-white rounded-none border-orange-500 mt-5 mb-5"}>Delete</Button>
                </>
            }
        </>

    );
}