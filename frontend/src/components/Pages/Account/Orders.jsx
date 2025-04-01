import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {Button} from "@/components/ui/button.jsx";
import {getAllOrders} from "@/redux/auth/Action.js";

export const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);

    useEffect(() => {
        setOrders(auth.orders)
    }, [auth.orders]);

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate("/auth");
            return;
        }

        dispatch(getAllOrders(localStorage.getItem('token')));

        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, [navigate]);

    return (
        <div className="min-h-screen bg-black">
            <div className={"h-[6rem] bg-black"}></div>
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="mb-6">
                    <Button
                        className="bg-transparent hover:bg-gray-800 text-white border border-white font-medium py-2 px-4 flex items-center transition-colors duration-200"
                        onClick={() => navigate("/account")}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                        </svg>
                        Back to Account
                    </Button>
                </div>

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
                    ) : orders?.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-white">You haven't placed any orders yet.</p>
                            <Button
                                className="mt-4 bg-white hover:bg-gray-200 text-black font-medium py-2 px-6 transition-all duration-200"
                                onClick={() => navigate("/shop")}>
                                Shop Now
                            </Button>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {orders?.map((order) => (
                                <div key={order.id} className="border border-gray-700 rounded p-4">
                                    <div className="flex flex-col md:flex-row justify-between mb-4">
                                        <div>
                                            <h3 className="text-white font-bold text-lg">Order #{order.id}</h3>
                                            <p className="text-gray-400">
                                                Placed on {new Date(order.dateOrdered).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <div className="mt-2 md:mt-0">
                                            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium
                                                ${order.status === 'SUCCESS' ? 'bg-green-900 text-green-200' :
                                                order.status === 'FAILURE' ? 'bg-blue-900 text-blue-200' :
                                                    'bg-yellow-900 text-yellow-200'}`}>
                                                {order.status}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="border-t border-gray-700 pt-4">
                                        <h4 className="text-white font-medium mb-2">Items</h4>
                                        <ul className="space-y-2">
                                            {order.orderItems?.map((item, index) => (
                                                <li key={index} className="flex justify-between text-gray-300">
                                                    <span>{item.quantity}x {item.productName}</span>
                                                    <span>${item.price?.toFixed(2)}</span>
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="border-t border-gray-700 mt-4 pt-4 flex justify-between">
                                            <span className="text-white font-bold">Total</span>
                                            <span className="text-white font-bold">${order.totalCost.toFixed(2)}</span>
                                        </div>
                                    </div>

                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}