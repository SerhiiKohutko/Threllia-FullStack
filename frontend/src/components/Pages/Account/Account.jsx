import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getUserDetails, logout} from "@/redux/auth/Action.js";
import {Button} from "@/components/ui/button.jsx";

export const Account = () => {
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const userName = auth?.userDetails?.firstName && auth?.userDetails?.lastName ?
        `${auth.userDetails.firstName} ${auth.userDetails.lastName}` :
        "MEMBER";
    const joinDate = auth?.userDetails?.joinDate ?
        new Date(auth.userDetails.joinDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) :
        "2023";

    useEffect(() => {
        dispatch(getUserDetails());
    }, [dispatch]);

    useEffect(() => {
        if (!auth.loading && !auth.user) {
            navigate("/login");
        }
    }, [auth.loading, auth.user, navigate]);

    if (auth.loading) return <h1>Loading...</h1>;


    function handleLogout() {
        dispatch(logout());
        navigate("/login");
    }

    return (
        <div className="min-h-screen bg-black">
            <div className={"h-[6rem]"}></div>
            <div className="max-w-7xl mx-auto px-4 py-12">

                <div className="mb-12 text-left">
                    <h1 className="text-4xl font-bold tracking-wider text-white">{userName}</h1>
                    <p className="text-white mt-2">FIFTH MEMBER SINCE {joinDate}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Personal Information */}
                    <div
                        className="relative overflow-hidden border border-gray-300 rounded group cursor-pointer"
                        onClick={() => navigate("/account/personal-information")}>
                        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40 z-10"></div>
                        <img  alt="Personal Information" className="w-full h-48 object-cover bg-white" />
                        <div className="absolute bottom-0 left-0 p-6 z-20 w-full">
                            <h2 className="text-xl font-bold text-white">PERSONAL INFORMATION</h2>
                            <p className="text-gray-300 mt-1">Show or update your personal information.</p>
                        </div>
                        <div className="absolute bottom-6 right-6 z-20 bg-black/50 border border-white p-2 group-hover:bg-white group-hover:text-black transition-colors duration-200">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white group-hover:text-black" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>

                    {/* Orders */}
                    <div
                        className="relative overflow-hidden border border-gray-300 rounded group cursor-pointer"
                        onClick={() => navigate("/account/orders")}>
                        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40 z-10"></div>
                        <img  alt="Orders" className="w-full h-48 object-cover bg-orange-600" />
                        <div className="absolute bottom-0 left-0 p-6 z-20 w-full">
                            <h2 className="text-xl font-bold text-white">ORDERS</h2>
                            <p className="text-gray-300 mt-1">Check the status of your orders or see past orders.</p>
                        </div>
                        <div className="absolute bottom-6 right-6 z-20 bg-black/50 border border-white p-2 group-hover:bg-white group-hover:text-black transition-colors duration-200">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white group-hover:text-black" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>

                    {/* Addresses */}
                    <div
                        className="relative overflow-hidden border border-gray-300 rounded group cursor-pointer"
                        onClick={() => navigate("/account/addresses")}>
                        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40 z-10"></div>
                        <img alt="Addresses" className="w-full h-48 object-cover bg-red-500" />
                        <div className="absolute bottom-0 left-0 p-6 z-20 w-full">
                            <h2 className="text-xl font-bold text-white">ADDRESSES</h2>
                            <p className="text-gray-300 mt-1">Manage your billing and shipping addresses.</p>
                        </div>
                        <div className="absolute bottom-6 right-6 z-20 bg-black/50 border border-white p-2 group-hover:bg-white group-hover:text-black transition-colors duration-200">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white group-hover:text-black" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>

                    {/* Payment Settings */}
                    <div
                        className="relative overflow-hidden border border-gray-300 rounded group cursor-pointer"
                        onClick={() => navigate("/account/payment-settings")}>
                        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40 z-10"></div>
                        <img src="/api/placeholder/600/300" alt="Payment Settings" className="w-full h-48 object-cover bg-green-700" />
                        <div className="absolute bottom-0 left-0 p-6 z-20 w-full">
                            <h2 className="text-xl font-bold text-white">PAYMENT SETTINGS</h2>
                            <p className="text-gray-300 mt-1">Manage credit cards.</p>
                        </div>
                        <div className="absolute bottom-6 right-6 z-20 bg-black/50 border border-white p-2 group-hover:bg-white group-hover:text-black transition-colors duration-200">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white group-hover:text-black" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="mt-12 flex justify-end">
                    <Button
                        className="bg-transparent hover:bg-white text-white hover:text-black border border-white font-medium py-3 px-6 transition-all duration-200"
                        onClick={() => {
                            handleLogout()
                        }}>
                        Log Out
                    </Button>
                    <Button
                        className="bg-transparent hover:bg-white text-white hover:text-black border border-white font-medium py-3 px-6 transition-all duration-200"
                        onClick={() => {
                            console.log('Downloading user data');
                        }}>
                        DOWNLOAD MY DATA
                    </Button>
                </div>
            </div>
        </div>
    );
};


