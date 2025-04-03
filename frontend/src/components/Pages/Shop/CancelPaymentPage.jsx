import {Button} from "@/components/ui/button.jsx";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {updateOrderStatus} from "@/redux/shop/Action.js";
import {useDispatch} from "react-redux";


export const CancelPaymentPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const queryParams = new URLSearchParams(location.search);
    const paymentId = queryParams.get("payment_id");

    useEffect(() => {
        const stripeUrl = "https://checkout.stripe.com/";
        console.log(!window.frames.top.document.referrer.startsWith(stripeUrl));
        if (!document.referrer.startsWith(stripeUrl)) {
            console.log(!document.referrer.startsWith(stripeUrl));
            // navigate("/");
        }
    }, []);

    useEffect(() => {
        dispatch(updateOrderStatus(localStorage.getItem("token"), paymentId));
    }, [dispatch, paymentId]);

    return (
        <div className="min-h-screen bg-[#121212] text-white">
            <div className="bg-black h-[6rem] border-white border-b"></div>

            <div className="container mx-auto px-4 py-20">
                <div className="flex flex-col items-center justify-center text-center max-w-2xl mx-auto">
                    <div className="mb-6 text-red-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-32 w-32" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>

                    <h1 className="text-4xl font-bold mb-4">Payment Cancelled</h1>
                    <p className="text-gray-400 text-lg mb-8">
                        Your payment process was cancelled. If you experienced any issues during checkout,
                        please try again or contact our support team for assistance.
                    </p>

                    <div className="space-y-4 w-full max-w-sm">
                        <Button
                            onClick={() => navigate("/checkout")}
                            className="w-full bg-orange-700 text-white hover:bg-orange-600 transition-colors duration-300 rounded-none py-3"
                        >
                            Return to Checkout
                        </Button>

                        <Button
                            onClick={() => navigate("/shop")}
                            className="w-full bg-white text-black hover:bg-black border border-white hover:text-white hover:border-orange-500 transition-colors duration-300 rounded-none py-3"
                        >
                            Continue Shopping
                        </Button>

                    </div>
                </div>
            </div>
        </div>
    );
};