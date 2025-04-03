import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {Button} from "@/components/ui/button.jsx";
import {ToastContainer} from "react-toastify";
import {deletePayment, getAllPaymentDetails} from "@/redux/auth/Action.js";
import {BackgroundEffectsAlt} from "@/components/Pages/Music/Releases/ReleaseDetails.jsx";

export const PaymentMethods = () => {
    const [paymentDetails, setPaymentDetails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [successMessage] = useState('');

    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (auth.userObtained  && !auth.user) {
            navigate("/login");
        }
    }, [auth.userObtained , auth.user, navigate]);

    useEffect(() => {
       dispatch(getAllPaymentDetails(localStorage.getItem("token")));
    }, []);

    useEffect(() => {
        if (!auth.loading){
            setLoading(false);
            setPaymentDetails(auth.payments)
        }
    },[auth.loading]);

    useEffect(() => {
        setPaymentDetails(auth.payments);
    }, [auth.payments]);

    const handleDeletePaymentDetail = async (paymentId) => {
        try {
            dispatch(deletePayment(paymentId, localStorage.getItem("token")));
        } catch (err) {
            setError('An error occurred');
            console.error(err);
            setTimeout(() => setError(''), 3000);
        }
    };

    const formatCardNumber = (cardNumber) => {
        // Display only last 4 digits for security
        return `**** **** **** ${cardNumber.slice(-4)}`;
    };

    return (
        <div className="min-h-screen bg-black">
            <ToastContainer />
            <BackgroundEffectsAlt/>
            <div className={"h-[6rem] bg-black"}></div>
            <div className="relative z-10 max-w-7xl mx-auto px-4 py-12">
                <div className="mb-6">
                    <Button
                        className="bg-transparent hover:bg-gray-800 text-white border border-white font-medium py-2 px-4 flex items-center transition-colors duration-200"
                        onClick={() => navigate("/account")}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                        </svg>
                        Back to Account
                    </Button>
                </div>

                {successMessage && (
                    <div className="bg-green-900/80 text-white p-3 rounded mb-6 border border-green-700">
                        <p className="text-sm">{successMessage}</p>
                    </div>
                )}

                {error && (
                    <div className="bg-red-900/80 text-white p-3 rounded mb-6 border border-red-700">
                        <p className="text-sm">{error}</p>
                    </div>
                )}

                {/* Payment Details Section */}
                <div>
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h1 className="text-3xl font-bold tracking-wider text-white">PAYMENT METHODS</h1>
                            <p className="text-gray-300 mt-2">Manage your payment methods.</p>
                        </div>
                        <Button
                            className="bg-white hover:bg-gray-200 text-black font-medium py-2 px-4 rounded-sm transition-colors duration-200"
                            onClick={() => navigate("/account/payment-methods/add")}>
                            Add New Payment Method
                        </Button>
                    </div>

                    {loading ? (
                        <div className="text-white text-center py-8">Loading payment methods...</div>
                    ) : paymentDetails.length === 0 ? (
                        <div className="text-gray-400 text-center py-8 border border-gray-700 rounded">
                            <p>You haven't added any payment methods yet.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {paymentDetails.map((payment) => (
                                <div key={payment.id} className="border border-gray-300 rounded p-6 bg-black/70">
                                    <div className="flex justify-between items-start">
                                        <h3 className="text-xl font-bold text-white mb-2">{payment.type}</h3>
                                        <div className="bg-gray-800 px-3 py-1 rounded text-sm">{payment.type}</div>
                                    </div>
                                    <div className="text-gray-300 space-y-1">
                                        <p className="text-lg">{formatCardNumber(payment.cardNumber)}</p>
                                        <p>{payment.nameOnTheCard}</p>
                                        <p>Expires: {payment.expMonth.toString().padStart(2, '0')}/{payment.expYear}</p>
                                    </div>
                                    <div className="mt-4 flex space-x-4">
                                        <button
                                            onClick={() => navigate(`/account/payment-methods/edit/${payment.id}`)}
                                            className="text-gray-300 hover:text-white text-sm">
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDeletePaymentDetail(payment.id)}
                                            className="text-gray-300 hover:text-white text-sm">
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};