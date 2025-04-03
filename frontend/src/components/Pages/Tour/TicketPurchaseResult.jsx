import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import {Button} from "@/components/ui/button.jsx";
import {updateTicketStatus} from "@/redux/tour/Action.js";
import {useDispatch} from "react-redux";
import {BackgroundEffectsAlt} from "@/components/Pages/Music/Releases/ReleaseDetails.jsx";
import {BackgroundEffects} from "@/components/Pages/Auth/AuthPage.jsx";


export const TicketSuccessPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const queryParams = new URLSearchParams(location.search);
    const paymentId = queryParams.get("payment_id");


    useEffect(() => {
        dispatch(updateTicketStatus(localStorage.getItem("token"), paymentId));
    }, [dispatch, paymentId]);

    return (
        <div className={"bg-black h-screen"}>
            <BackgroundEffectsAlt/>
            <div className={"h-[6rem] bg-black"}> </div>
        <div className=" relative z-10 max-w-2xl mx-auto p-8 bg-black/70 text-white border border-green-500/30 shadow-lg text-center my-12">

            <div className="text-green-400 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
            </div>
            <h2 className="text-3xl font-bold mb-4 font-rubikPaint">Payment successfull</h2>
            <p className="mb-6 text-lg">
                Thanks for the purchase! Your ticket was sent on your email.
            </p>
            <div className="bg-black/50 border border-green-500/20 p-4 mb-6 mx-auto max-w-md">
                <p className="text-green-300 font-bold mb-2">What's next?</p>
                <ul className="text-left text-sm space-y-2 text-gray-300">
                    <li>• Check email - we sent you the confirmation with ticket details</li>
                    <li>• Save the ticket - you will need it to get on the show</li>
                    <li>• If you didn't get the ticket - check "Spam"</li>
                </ul>
            </div>
            <p className="text-sm text-gray-400 mb-8">
               Id of your purchase is saved in our system. If you have questions about it, feel free to contact us
            </p>
            <div className="space-x-4">
                <Button
                    onClick={() => navigate('/')}
                    variant="ghost"
                    className="px-6 py-2 border border-orange-500/50 text-white font-bold hover:bg-orange-800/50 hover:border-orange-500 transition-colors">
                    Back to Main
                </Button>
                <Button
                    onClick={() => navigate('/tours/upcoming')}
                    variant="ghost"
                    className="px-6 py-2 border border-white/30 text-white font-bold hover:bg-white/10 transition-colors">
                    All Shows
                </Button>
            </div>
        </div>
        </div>
    );
};


export const TicketFailurePage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const queryParams = new URLSearchParams(location.search);
    const paymentId = queryParams.get("payment_id");

    useEffect(() => {
        dispatch(updateTicketStatus(localStorage.getItem("token"), paymentId));
    }, [dispatch, paymentId]);
    return (
        <div className={"bg-black h-screen"}>
            <BackgroundEffectsAlt/>
            <div className={"h-[6rem] bg-black"}></div>
            <div
                className="max-w-2xl mx-auto p-8 bg-black/70 text-white border border-red-500/30 shadow-lg backdrop-blur-sm text-center my-12">
                <div className="text-red-400 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none"
                         viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                </div>
                <h2 className="text-3xl font-bold mb-4 font-rubikPaint"> Payment failed</h2>
                <p className="mb-6 text-lg">
                    Unfortunately, there was a problem processing your payment.
                </p>
                <div className="bg-black/50 border border-red-500/20 p-4 mb-6 mx-auto max-w-md">
                    <p className="text-red-300 font-bold mb-2">Possible reasons:</p>
                    <ul className="text-left text-sm space-y-2 text-gray-300">
                        <li>• Insufficient funds in the account</li>
                        <li>• The bank declined the transaction for security reasons.</li>
                        <li>• There was a problem processing the payment in our system</li>
                        <li>• The card details were entered incorrectly.</li>
                    </ul>
                </div>
                <p className="text-sm text-gray-400 mb-8">
                    There were no funds written in your account. You can try again or use another payment method.
                </p>
                <div className="space-x-4">
                    <Button
                        onClick={() => window.history.back()}
                        variant="ghost"
                        className="px-6 py-2 border border-orange-500/50 text-white font-bold hover:bg-orange-800/50 hover:border-orange-500 transition-colors"
                    >
                        Try Again
                    </Button>
                    <Button
                        onClick={() => navigate('/')}
                        variant="ghost"
                        className="px-6 py-2 border border-white/30 text-white font-bold hover:bg-white/10 transition-colors"
                    >
                        Back to Main
                    </Button>
                </div>
            </div>
        </div>
    );
};