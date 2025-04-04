import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import {Button} from "@/components/ui/button.jsx";
import {deleteAddress, getAllAddresses} from "@/redux/auth/Action.js";
import {BackgroundEffectsAlt} from "@/components/Pages/Music/Releases/ReleaseDetails.jsx";
import {LoadingPage} from "@/components/ReusableComponents/LoadingPage.jsx";

export const Addresses = () => {
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (auth.userObtained  && !auth.user) {
            navigate("/login");
        }
    }, [auth.userObtained , auth.user, navigate]);

    useEffect(() => {
        dispatch(getAllAddresses(localStorage.getItem("token")));
    }, []);

    useEffect(() => {
        if (!auth.loading){
            setLoading(false);
            setAddresses(auth.addresses);
        }
    },[auth.loading]);

    useEffect(() => {
        setAddresses(auth.addresses);
    }, [auth.addresses]);

    const handleDeleteAddress = async (addressId) => {
        try {
            dispatch(deleteAddress(addressId, localStorage.getItem("token")));
        } catch (err) {
            setError('An error occurred');
            console.error(err);
            setTimeout(() => setError(''), 3000);
        }
    };

    if (auth.loading) {
        return <LoadingPage/>;
    }

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

                {/* Addresses Section */}
                <div>
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h1 className="text-3xl font-bold tracking-wider text-white">ADDRESSES</h1>
                            <p className="text-gray-300 mt-2">Manage your shipping addresses.</p>
                        </div>
                        <Button
                            className="bg-white hover:bg-gray-200 text-black font-medium py-2 px-4 rounded-sm transition-colors duration-200"
                            onClick={() => navigate("/account/addresses/add")}
                        >
                            Add New Address
                        </Button>
                    </div>

                    {loading ? (
                        <div className="text-white text-center py-8">Loading addresses...</div>
                    ) : addresses.length === 0 ? (
                        <div className="text-gray-400 text-center py-8 border border-gray-700 rounded">
                            <p>You haven't added any addresses yet.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {addresses.map((address) => (
                                <div key={address.id} className="border border-gray-300 rounded p-6 bg-black/70">
                                    <h3 className="text-xl font-bold text-white mb-2">{address.addressName}</h3>
                                    <div className="text-gray-300 space-y-1">
                                        <p>{address.firstName} {address.lastName}</p>
                                        <p>{address.address}</p>
                                        <p>{address.city}, {address.state} {address.zipCode}</p>
                                        <p>{address.country}</p>
                                        <p>Phone: {address.number}</p>
                                    </div>
                                    <div className="mt-4 flex space-x-4">
                                        <button
                                            onClick={() => navigate(`/account/addresses/edit/${address.id}`)}
                                            className="text-gray-300 hover:text-white text-sm"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDeleteAddress(address.id)}
                                            className="text-gray-300 hover:text-white text-sm"
                                        >
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