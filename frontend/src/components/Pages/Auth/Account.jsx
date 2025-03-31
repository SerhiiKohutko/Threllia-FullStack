import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getUserDetails} from "@/redux/auth/Action.js";
import {Button} from "@/components/ui/button.jsx";
import {Input} from "@/components/ui/input.jsx";


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
        if (!auth.userDetails || !localStorage.getItem('token')) {
            navigate("/auth");
        }
    }, [auth, navigate]);

    useEffect(() => {
        dispatch(getUserDetails(localStorage.getItem('token')));
    },[])

    return (
        <div className="min-h-screen bg-black">
            <div className={"h-[6rem]"}></div>
            <div className="max-w-7xl mx-auto px-4 py-12">
                {/* Header */}
                <div className="mb-12 text-left">
                    <h1 className="text-4xl font-bold tracking-wider text-white">{userName}</h1>
                    <p className="text-white mt-2">FIFTH MEMBER SINCE {joinDate}</p>
                </div>

                {/* Account Options Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Personal Information */}
                    <div
                        className="relative overflow-hidden border border-gray-300 rounded group cursor-pointer"
                        onClick={() => navigate("/account/personal-information")}
                    >
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
                        onClick={() => navigate("/account/orders")}
                    >
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
                        onClick={() => navigate("/account/addresses")}
                    >
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
                        onClick={() => navigate("/account/payment-settings")}
                    >
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
                            // Handle data download
                            console.log('Downloading user data');
                        }}
                    >
                        DOWNLOAD MY DATA
                    </Button>
                </div>
            </div>
        </div>
    );
};

// Personal Information Page Component
export const PersonalInformationPage = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [country, setCountry] = useState('');
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const [updateError, setUpdateError] = useState('');

    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!auth.userDetails || !localStorage.getItem('token')) {
            navigate("/auth");
            return;
        }

        // Load user data from state
        if (auth.userDetails) {
            setFirstName(auth.userDetails.firstName || '');
            setLastName(auth.userDetails.lastName || '');
            setEmail(auth.userDetails.email || '');
            setDateOfBirth(auth.userDetails.dateOfBirth ?
                new Date(auth.userDetails.dateOfBirth).toISOString().split('T')[0] : '');
            setCountry(auth.userDetails.country || '');
        }
    }, [auth, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setUpdateSuccess(false);
        setUpdateError('');

        const userData = {
            firstName,
            lastName,
            email,
            dateOfBirth,
            country
        };

        // Dispatch update action
        dispatch(updateUserProfile(userData))
            .then(() => {
                setUpdateSuccess(true);
                setTimeout(() => setUpdateSuccess(false), 3000);
            })
            .catch(error => {
                setUpdateError('Failed to update profile. Please try again.');
            });
    };

    return (
        <div className="min-h-screen bg-black">
            <div className="max-w-7xl mx-auto px-4 py-12">
                {/* Back Button */}
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

                {/* Header */}
                <div className="mb-8 text-left">
                    <h1 className="text-3xl font-bold tracking-wider text-white">PERSONAL INFORMATION</h1>
                    <p className="text-gray-300 mt-2">Update your personal details below.</p>
                </div>

                {/* Status Messages */}
                {updateSuccess && (
                    <div className="bg-green-900/80 text-white p-3 rounded mb-6 border border-green-700">
                        <p className="text-sm">Your profile has been updated successfully.</p>
                    </div>
                )}

                {updateError && (
                    <div className="bg-red-900/80 text-white p-3 rounded mb-6 border border-red-700">
                        <p className="text-sm">{updateError}</p>
                    </div>
                )}

                {/* Form */}
                <div className="bg-black/70 border border-gray-300 rounded p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* First Name */}
                            <div>
                                <label htmlFor="firstName" className="text-sm text-gray-300 block mb-1">First Name</label>
                                <Input
                                    id="firstName"
                                    type="text"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    className="bg-black/50 border border-gray-300 text-white placeholder:text-gray-500 h-12 rounded-sm focus:border-gray-100 w-full"
                                    required
                                />
                            </div>

                            {/* Last Name */}
                            <div>
                                <label htmlFor="lastName" className="text-sm text-gray-300 block mb-1">Last Name</label>
                                <Input
                                    id="lastName"
                                    type="text"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    className="bg-black/50 border border-gray-300 text-white placeholder:text-gray-500 h-12 rounded-sm focus:border-gray-100 w-full"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="text-sm text-gray-300 block mb-1">Email</label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="bg-black/50 border border-gray-300 text-white placeholder:text-gray-500 h-12 rounded-sm focus:border-gray-100 w-full"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="dateOfBirth" className="text-sm text-gray-300 block mb-1">Date of Birth</label>
                                <Input
                                    id="dateOfBirth"
                                    type="date"
                                    value={dateOfBirth}
                                    onChange={(e) => setDateOfBirth(e.target.value)}
                                    className="bg-black/50 border border-gray-300 text-white placeholder:text-gray-500 h-12 rounded-sm focus:border-gray-100 w-full"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="country" className="text-sm text-gray-300 block mb-1">Country</label>
                                <select
                                    id="country"
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                                    className="bg-black/50 border border-gray-300 text-white placeholder:text-gray-500 h-12 rounded-sm focus:border-gray-100 w-full"
                                    required
                                >
                                    <option value="">Select your country</option>
                                    <option value="US">United States</option>
                                    <option value="CA">Canada</option>
                                    <option value="UK">United Kingdom</option>
                                    <option value="AU">Australia</option>
                                </select>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-gray-700">
                            <h3 className="text-xl font-bold text-white mb-4">Password</h3>
                            <Button
                                type="button"
                                className="bg-transparent hover:bg-gray-800 text-white border border-white py-2 px-4 transition-colors duration-200"
                                onClick={() => navigate("/account/change-password")}
                            >
                                Change Password
                            </Button>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-6">
                            <Button
                                type="submit"
                                className="w-full md:w-auto bg-white hover:bg-gray-200 text-black font-medium py-3 px-8 rounded-sm transition-all duration-200"
                            >
                                Save Changes
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

// Orders Page Component
export const OrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const auth = useSelector((state) => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (!auth.userDetails || !localStorage.getItem('token')) {
            navigate("/auth");
            return;
        }

        // Simulate fetching orders
        setTimeout(() => {
            setOrders([
                {
                    id: 'ORD-12345',
                    date: '2025-02-15',
                    status: 'Delivered',
                    total: 49.99,
                    items: [
                        { name: 'T-Shirt', quantity: 1, price: 29.99 },
                        { name: 'Poster', quantity: 1, price: 19.99 }
                    ]
                },
                {
                    id: 'ORD-12346',
                    date: '2025-01-20',
                    status: 'Shipped',
                    total: 89.99,
                    items: [
                        { name: 'Hoodie', quantity: 1, price: 59.99 },
                        { name: 'Hat', quantity: 1, price: 24.99 },
                        { name: 'Sticker Pack', quantity: 1, price: 5.00 }
                    ]
                }
            ]);
            setLoading(false);
        }, 1000);
    }, [auth, navigate]);

    return (
        <div className="min-h-screen bg-black">
            <div className="max-w-7xl mx-auto px-4 py-12">
                {/* Back Button */}
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

                {/* Header */}
                <div className="mb-8 text-left">
                    <h1 className="text-3xl font-bold tracking-wider text-white">YOUR ORDERS</h1>
                    <p className="text-gray-300 mt-2">View your order history and check status.</p>
                </div>

                {/* Orders List */}
                <div className="bg-black/70 border border-gray-300 rounded p-6">
                    {loading ? (
                        <div className="text-center py-12">
                            <p className="text-white">Loading your orders...</p>
                        </div>
                    ) : error ? (
                        <div className="text-center py-12">
                            <p className="text-red-500">{error}</p>
                        </div>
                    ) : orders.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-white">You haven't placed any orders yet.</p>
                            <Button
                                className="mt-4 bg-white hover:bg-gray-200 text-black font-medium py-2 px-6 transition-all duration-200"
                                onClick={() => navigate("/shop")}
                            >
                                Shop Now
                            </Button>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {orders.map((order) => (
                                <div key={order.id} className="border border-gray-700 rounded p-4">
                                    <div className="flex flex-col md:flex-row justify-between mb-4">
                                        <div>
                                            <h3 className="text-white font-bold text-lg">Order #{order.id}</h3>
                                            <p className="text-gray-400">
                                                Placed on {new Date(order.date).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <div className="mt-2 md:mt-0">
                                            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium
                                                ${order.status === 'Delivered' ? 'bg-green-900 text-green-200' :
                                                order.status === 'Shipped' ? 'bg-blue-900 text-blue-200' :
                                                    'bg-yellow-900 text-yellow-200'}`}>
                                                {order.status}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="border-t border-gray-700 pt-4">
                                        <h4 className="text-white font-medium mb-2">Items</h4>
                                        <ul className="space-y-2">
                                            {order.items.map((item, index) => (
                                                <li key={index} className="flex justify-between text-gray-300">
                                                    <span>{item.quantity}x {item.name}</span>
                                                    <span>${item.price.toFixed(2)}</span>
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="border-t border-gray-700 mt-4 pt-4 flex justify-between">
                                            <span className="text-white font-bold">Total</span>
                                            <span className="text-white font-bold">${order.total.toFixed(2)}</span>
                                        </div>
                                    </div>

                                    <div className="mt-4 flex justify-end">
                                        <Button
                                            className="bg-transparent hover:bg-gray-800 text-white border border-white font-medium py-2 px-4 transition-colors duration-200"
                                            onClick={() => navigate(`/account/orders/${order.id}`)}
                                        >
                                            View Details
                                        </Button>
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

