import {useCart} from "@/components/Utils/CartProvider.jsx";
import {Button} from "@/components/ui/button.jsx";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {createPayment} from "@/redux/shop/Action.js";
import {toast, ToastContainer} from "react-toastify";
import {loginWhileCheckout} from "@/redux/auth/Action.js";
import {Input} from "@/components/ui/input.jsx";

export const CheckoutPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const { cart, removeAllItemsFromCart, removeProductFromCart, getAllItems, cleanTheCart } = useCart();
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        if (auth.isAuthenticated) {
            setIsLoggedIn(true);
        }
    }, [auth.isAuthenticated]);

    const calculateSubtotal = () => {
        return cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
    };

    async function handleCheckout() {
        if (!isLoggedIn) {
            console.log("login");
                const loginResult = await dispatch(loginWhileCheckout({ email, password }));
                if (!loginResult) {
                    setError("Wrong email or password");
                    return;
                }
        }

        setError(null);
        const products = getAllItems();

        await dispatch(createPayment(products, localStorage.getItem("token")));
        cleanTheCart();
    }

    const isCartEmpty = cart.length === 0;

    return (
        <div className="min-h-screen bg-[#121212] text-white">
            <ToastContainer />
            <div className="bg-black h-[6rem] border-white border-b"></div>

            <div className="container mx-auto px-4 py-12">
                {!isCartEmpty ? (
                    <div className="flex flex-col md:flex-row justify-center space-y-8 md:space-y-0 md:space-x-5">
                        <div className="bg-[#1E1E1E] rounded-lg border border-red-900/30 p-8 space-y-6 h-full min-w-0 md:min-w-[45rem]">
                            <div className="flex justify-between items-center border-b border-red-900/30 pb-4">
                                <h1 className="text-4xl font-bold text-white">
                                    Your Cart
                                    <span className="text-red-600 ml-4">
                                        ({cart.reduce((acc, item) => acc + item.quantity, 0)})
                                    </span>
                                </h1>
                            </div>

                            <div className="space-y-4">
                                {cart.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center bg-black/50 border border-red-900/30 rounded-lg p-4 hover:bg-black/70 transition-all duration-300">
                                        <img
                                            src={item.imageUrl}
                                            alt={item.productName}
                                            className="w-36 h-36 object-cover rounded-md mr-6 shadow-lg"
                                        />
                                        <div className="flex-grow">
                                            <h3
                                                className="font-bold text-lg text-white cursor-pointer"
                                                onClick={() => navigate(`/shop/${item.productType}/${item.id}`)}>
                                                {item.productName}
                                            </h3>
                                            <p className="text-gray-400">Quantity: {item.quantity}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold text-red-600 mb-2">${item.price.toFixed(2)}</p>
                                            <div className="flex space-x-2">
                                                {item.quantity > 1 && (
                                                    <Button
                                                        onClick={() => removeAllItemsFromCart(item.id)}
                                                        variant="destructive"
                                                        size="sm"
                                                        className="bg-red-900/30 text-white hover:bg-red-900/50 rounded-none">
                                                        Remove All
                                                    </Button>
                                                )}
                                                <Button
                                                    onClick={() => removeProductFromCart(item.id)}
                                                    variant="destructive"
                                                    size="sm"
                                                    className="bg-red-900/30 text-white hover:bg-red-900/50 rounded-none">
                                                    Remove
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="flex justify-between items-center pt-6 border-t border-red-900/30">
                                <span className="text-xl font-bold">Subtotal</span>
                                <span className="text-2xl font-bold text-red-600">${calculateSubtotal()}</span>
                            </div>
                        </div>

                        <div className="p-8 space-y-6 h-full min-w-0 md:min-w-[25rem]">
                            <div className="text-center">
                                <h2 className="text-3xl font-bold text-white mb-4">Complete Your Order</h2>
                                <p className="text-gray-400">Proceed with your Threllia merchandise checkout</p>
                            </div>

                            <div className="space-y-4">

                                {!isLoggedIn && (
                                    <>
                                        {
                                            error &&
                                            <div className="flex text-center text-red-600 mb-4 border-red-500 border-b ">
                                                <p>{error}</p>
                                            </div>
                                        }
                                        <Input
                                            type="email"
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Email Address"
                                            className="w-full bg-black/50 border border-red-900/30 p-3 rounded-lg text-white placeholder-gray-500 focus:border-red-600 focus:ring-2 focus:ring-red-900/30"
                                        />

                                        <Input
                                            type="password"
                                            placeholder="Password"
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full bg-black/50 border border-red-900/30 p-3 rounded-lg text-white placeholder-gray-500 focus:border-red-600 focus:ring-2 focus:ring-red-900/30"
                                        />
                                    </>
                                )}


                                <Button
                                    onClick={() => handleCheckout()}
                                    className="w-full bg-orange-700 text-white hover:bg-orange-600 transition-colors duration-300 rounded-none py-3">
                                    Complete Purchase
                                </Button>

                                <Button
                                    onClick={() => navigate("/shop")}
                                    className="w-full bg-white text-black hover:bg-black border border-white hover:text-white hover:border-orange-500 transition-colors duration-300 rounded-none py-3">
                                    Keep shopping
                                </Button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center text-center max-w-2xl mx-auto">
                        {/* Empty Cart Icon */}
                        <div className="mb-6 text-orange-500">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-32 w-32" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>

                        <h1 className="text-4xl font-bold mb-4">Your Cart is Empty</h1>
                        <p className="text-gray-400 text-lg mb-8">
                            Looks like you haven't added any merchandise to your cart yet.
                            Explore our shop to find amazing Threllia merchandise!
                        </p>

                        <Button
                            onClick={() => navigate("/shop")}
                            className="px-8 py-4 bg-orange-700 text-white hover:bg-orange-600 transition-colors duration-300 rounded-md text-lg font-semibold">
                            Browse Shop
                        </Button>

                    </div>
                )}
            </div>
        </div>
    );
};