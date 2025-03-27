import {useCart} from "@/components/Utils/CartProvider.jsx";
import {Button} from "@/components/ui/button.jsx";
import React, {useState} from "react";
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {useNavigate} from "react-router-dom";

export const CheckoutPage = () => {
    const navigate = useNavigate();
    const { cart, removeAllItemsFromCart, removeProductFromCart } = useCart();
    const [asAGuest, setAsAGuest] = useState(false);

    const calculateSubtotal = () => {
        return cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
    };

    return (
        <div className="min-h-screen bg-[#121212] text-white">
            <div className={"bg-black h-[6rem] border-white border-b"}></div>

            <div className="container min-h-[15rem] mx-auto px-4 py-12 flex flex-row justify-center space-x-5">
                <div className="bg-[#1E1E1E] rounded-lg border border-red-900/30 p-8 space-y-6 h-full  min-w-[45rem]">
                    <div className="flex justify-between items-center border-b border-red-900/30 pb-4">
                        <h1 className="text-4xl font-bold text-white">
                            Your Cart
                            <span className="text-red-600 ml-4">
                                ({cart.reduce((acc, item) => acc + item.quantity, 0)})
                            </span>
                        </h1>
                    </div>

                    {/* Cart Items */}
                    <div className="space-y-4">
                        {cart.map((item, index) => (
                            <div
                                key={index}
                                className="
                                    flex items-center
                                    bg-black/50
                                    border border-red-900/30
                                    rounded-lg
                                    p-4
                                    hover:bg-black/70
                                    transition-all
                                    duration-300 ">
                                <img
                                    src={item.imageUrl}
                                    alt={item.productName}
                                    className="w-36 h-36 object-cover rounded-md mr-6 shadow-lg"
                                />
                                <div className="flex-grow">
                                    <h3 className="font-bold text-lg text-white cursor-pointer" onClick={() => navigate(`/shop/${item.productType}/${item.id}`)}>{item.productName}</h3>
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
                                                className="
                                                    bg-red-900/30
                                                    text-white
                                                    hover:bg-red-900/50
                                                    rounded-none
                                                "
                                            >
                                                Remove All
                                            </Button>
                                        )}
                                        <Button
                                            onClick={() => removeProductFromCart(item.id)}
                                            variant="destructive"
                                            size="sm"
                                            className="
                                                bg-red-900/30
                                                text-white
                                                hover:bg-red-900/50
                                                rounded-none
                                            "
                                        >
                                            Remove
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Subtotal */}
                    <div className="flex justify-between items-center pt-6 border-t border-red-900/30">
                        <span className="text-xl font-bold">Subtotal</span>
                        <span className="text-2xl font-bold text-red-600">${calculateSubtotal()}</span>
                    </div>
                </div>

                {/* Right Side - Checkout Form */}
                <div className=" rounded-lg   p-8 space-y-6 h-full min-w-[35rem] ">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-white mb-4">Complete Your Order</h2>
                        <p className="text-gray-400">Proceed with your Threllia merchandise checkout</p>
                    </div>

                    <div className="space-y-4">
                        <input
                            type="email"
                            placeholder="Email Address"
                            className="
                                w-full
                                bg-black/50
                                border border-red-900/30
                                p-3
                                rounded-lg
                                text-white
                                placeholder-gray-500
                                focus:border-red-600
                                focus:ring-2
                                focus:ring-red-900/30"/>

                        <RadioGroup defaultValue="login" onValueChange={(value) => setAsAGuest(value === "guest")}>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="login" id="login" className={"bg-white w-5 h-5"} />
                                <Label htmlFor="option-one" className={"text-lg"}>I have an account</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="guest" id="guest" className={"bg-white w-5 h-5"}/>
                                <Label htmlFor="option-two" className={"text-lg"}>No, I'd like to proceed as a guest</Label>
                            </div>
                        </RadioGroup>

                        {!asAGuest && (
                            <input
                                type="password"
                                placeholder="Password"
                                className="
                                    w-full
                                    bg-black/50
                                    border border-red-900/30
                                    p-3
                                    rounded-lg
                                    text-white
                                    placeholder-gray-500
                                    focus:border-red-600
                                    focus:ring-2
                                    focus:ring-red-900/30"
                            />
                        )}
                        <Button
                            className="
                                w-full
                                bg-orange-700
                                text-white
                                hover:bg-orange-600
                                transition-colors
                                duration-300
                                rounded-none
                                py-3
                            "
                        >
                            Complete Purchase
                        </Button>
                        <Button
                            onClick={() => navigate("/shop")}
                            className="
                                w-full
                                bg-white
                                text-black
                                hover:bg-black
                                border
                                border-white
                                hover:text-white
                                hover:border-orange-500
                                transition-colors
                                duration-300
                                rounded-none
                                py-3">
                            Keep shopping
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};