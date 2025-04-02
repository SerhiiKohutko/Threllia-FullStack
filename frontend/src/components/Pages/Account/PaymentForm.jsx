import {Button} from "@/components/ui/button.jsx";
import {Input} from "@/components/ui/input.jsx";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {createPaymentDetails, getPaymentDetails, updatePaymentDetails} from "@/redux/auth/Action.js";

export const PaymentForm = () => {
    const [nameOnTheCard, setNameOnTheCard] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [cardType, setCardType] = useState('');
    const [expMonth, setExpMonth] = useState('');
    const [expYear, setExpYear] = useState('');
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const [isEditing, setIsEditing] = useState(false);

    const { id } = useParams();
    const navigate = useNavigate();
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!auth.loading && auth.user === null) {
            navigate("/login");
        }
    }, [auth.loading, auth.user, navigate]);

    useEffect(() => {
        if (id && !auth.loading) {
            setIsEditing(true);
            setNameOnTheCard(auth.paymentDetails.nameOnTheCard || '');
            setCardNumber(auth.paymentDetails.cardNumber || '');
            setCardType(auth.paymentDetails.type || '');
            setExpMonth(auth.paymentDetails.expMonth?.toString() || '');
            setExpYear(auth.paymentDetails.expYear?.toString() || '');
        }
    }, [auth.paymentDetails]);

    useEffect(() => {
        if (id) {
            dispatch(getPaymentDetails(id, localStorage.getItem("token")));
        }
    }, []);


    useEffect(() => {
        if (!auth.loading){
            setLoading(false);
        }
    }, [auth.loading])

    useEffect(() => {
        if (auth.error){
            setLoading(false);
            setError(error);
        }
    },[auth.error])

    const detectCardType = (number) => {
        const visaRegex = /^4/;
        const mastercardRegex = /^5[1-5]/;
        const discoverRegex = /^6(?:011|5)/;

        if (visaRegex.test(number)) {
            return 'VISA';
        } else if (mastercardRegex.test(number)) {
            return 'MASTERCARD';
        } else if (discoverRegex.test(number)) {
            return 'DISCOVER';
        }
        return '';
    };

    const handleCardNumberChange = (e) => {
        const value = e.target.value.replace(/\D/g, '').slice(0, 16);
        setCardNumber(value);

        const detectedType = detectCardType(value);
        if (detectedType) {
            setCardType(detectedType);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccess(false);
        setError('');

        if (!cardType) {
            setError('Please select a valid card type');
            return;
        }

        setLoading(true);

        const paymentData = {
            nameOnTheCard,
            cardNumber,
            type: cardType,
            expMonth: parseInt(expMonth, 10),
            expYear: parseInt(expYear, 10)
        };

        if (!isEditing) {
            dispatch(createPaymentDetails(paymentData, navigate));
        } else{
            dispatch(updatePaymentDetails(id, paymentData, setSuccess));
        }

    };

    const monthOptions = Array.from({ length: 12 }, (_, i) => {
        const month = i + 1;
        return (
            <option key={month} value={month}>
                {month.toString().padStart(2, '0')}
            </option>
        );
    });

    const currentYear = new Date().getFullYear();
    const yearOptions = Array.from({ length: 11 }, (_, i) => {
        const year = currentYear + i;
        return (
            <option key={year} value={year}>
                {year}
            </option>
        );
    });

    if (loading && isEditing) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <p className="text-white">Loading payment data...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black">
            <div className={"h-[6rem] bg-black"}></div>
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="mb-6">
                    <Button
                        className="bg-transparent hover:bg-gray-800 text-white border border-white font-medium py-2 px-4 flex items-center transition-colors duration-200"
                        onClick={() => navigate("/account/payment-settings")}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                        </svg>
                        Back to Payment Methods
                    </Button>
                </div>

                <div className="mb-8 text-left">
                    <h1 className="text-3xl font-bold tracking-wider text-white">
                        {isEditing ? 'EDIT PAYMENT METHOD' : 'ADD PAYMENT METHOD'}
                    </h1>
                    <p className="text-gray-300 mt-2">
                        {isEditing ? 'Update your payment details below.' : 'Enter your card details below.'}
                    </p>
                </div>

                {success && (
                    <div className="bg-green-900/80 text-white p-3 rounded mb-6 border border-green-700">
                        <p className="text-sm">
                            {isEditing
                                ? 'Your payment method has been updated successfully.'
                                : 'Your payment method has been added successfully.'
                            }
                        </p>
                    </div>
                )}

                {error && (
                    <div className="bg-red-900/80 text-white p-3 rounded mb-6 border border-red-700">
                        <p className="text-sm">{error}</p>
                    </div>
                )}

                <div className="bg-black/70 border border-gray-300 rounded p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Name on Card */}
                            <div className="md:col-span-2">
                                <label htmlFor="nameOnTheCard" className="text-sm text-gray-300 block mb-1">Name on Card</label>
                                <Input
                                    id="nameOnTheCard"
                                    type="text"
                                    value={nameOnTheCard}
                                    onChange={(e) => setNameOnTheCard(e.target.value)}
                                    className="bg-black/50 border border-gray-300 text-white placeholder:text-gray-500 h-12 rounded-sm focus:border-gray-100 w-full"
                                    required
                                />
                            </div>

                            {/* Card Number */}
                            <div className="md:col-span-2">
                                <label htmlFor="cardNumber" className="text-sm text-gray-300 block mb-1">Card Number</label>
                                <Input
                                    id="cardNumber"
                                    type="text"
                                    value={cardNumber}
                                    onChange={handleCardNumberChange}
                                    placeholder="**** **** **** ****"
                                    className="bg-black/50 border border-gray-300 text-white placeholder:text-gray-500 h-12 rounded-sm focus:border-gray-100 w-full"
                                    required
                                />
                            </div>

                            {/* Card Type */}
                            <div>
                                <label htmlFor="cardType" className="text-sm text-gray-300 block mb-1">Card Type</label>
                                <select
                                    id="cardType"
                                    value={cardType}
                                    onChange={(e) => setCardType(e.target.value)}
                                    className="bg-black/50 border border-gray-300 text-white placeholder:text-gray-500 h-12 rounded-sm focus:border-gray-100 w-full"
                                    required
                                >
                                    <option value="">Select card type</option>
                                    <option value="VISA">Visa</option>
                                    <option value="MASTERCARD">Mastercard</option>
                                    <option value="DISCOVER">Discover</option>
                                </select>
                            </div>

                            {/* Expiration */}
                            <div>
                                <label className="text-sm text-gray-300 block mb-1">Expiration Date</label>
                                <div className="grid grid-cols-2 gap-4">
                                    <select
                                        id="expMonth"
                                        value={expMonth}
                                        onChange={(e) => setExpMonth(e.target.value)}
                                        className="bg-black/50 border border-gray-300 text-white h-12 rounded-sm focus:border-gray-100"
                                        required
                                    >
                                        <option value="">Month</option>
                                        {monthOptions}
                                    </select>

                                    <select
                                        id="expYear"
                                        value={expYear}
                                        onChange={(e) => setExpYear(e.target.value)}
                                        className="bg-black/50 border border-gray-300 text-white h-12 rounded-sm focus:border-gray-100"
                                        required
                                    >
                                        <option value="">Year</option>
                                        {yearOptions}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="pt-6">
                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full md:w-auto bg-white hover:bg-gray-200 text-black font-medium py-3 px-8 rounded-sm transition-all duration-200"
                            >
                                {loading ? 'Saving...' : isEditing ? 'Update Payment Method' : 'Save Payment Method'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};