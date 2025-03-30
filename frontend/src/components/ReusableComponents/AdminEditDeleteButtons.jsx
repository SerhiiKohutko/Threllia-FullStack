import {Button} from "@/components/ui/button.jsx";
import React from "react";
import {useNavigate} from "react-router-dom";

export const AdminEditDeleteButtons = ({navigationLink, state, handleDelete}) => {
    const navigate = useNavigate();
    const isAdmin = true;

    return (
        <>
            {/*If profile is admin - edit & deletion available*/}
            {
                isAdmin && <>
                    <Button onClick={() => navigate(navigationLink, {state: state})}
                            variant={"ghost"} className={"border rounded-none border-orange-500 mt-5 mr-4"}>Edit</Button>
                    <Button onClick={() => handleDelete} variant={"ghost"} className={"border bg-red-700 text-white rounded-none border-orange-500 mt-5 mb-5"}>Delete</Button>
                </>
            }
        </>

    );
}