import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {getCurrPosition, Position} from "@/components/ReusableComponents/Position.jsx";
import {variants} from "@/components/Pages/Shop/Shop.jsx";
import {deleteProductById, getProductById} from "@/redux/shop/Action.js";
import {Button} from "@/components/ui/button.jsx";
import {useCart} from "@/components/Utils/CartProvider.jsx";
import {AdminEditDeleteButtons} from "@/components/ReusableComponents/AdminEditDeleteButtons.jsx";
import {LoadingPage} from "@/components/ReusableComponents/LoadingPage.jsx";

export const ProductDetails = () => {
    const {categoryName, productId} = useParams();
    const product = useSelector(state => state.shop.productDetails);
    const [position, setPosition] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {handleAddProductToCart} = useCart();
    const [loading, setLoading] = useState(true);
    const shop = useSelector(state => state.shop);
    const [isAddingToCart, setIsAddingToCart] = useState(false);
    const [imageAnimating, setImageAnimating] = useState(false);

    useEffect(() => {
        getCurrPosition(setPosition, variants, categoryName.toLowerCase());
    }, []);

    useEffect(() => {
        dispatch(getProductById(productId, position[0]));
    }, [position]);

    useEffect(() => {
        setLoading(shop.productDetailsLoading)
    },[shop.productDetailsLoading])

    if(loading){
        return <LoadingPage/>
    }

    function handleDelete() {
        dispatch(deleteProductById(productId, categoryName))
        navigate("/shop");
    }

    const handleAddToCart = () => {
        setIsAddingToCart(true);
        setImageAnimating(true);

        handleAddProductToCart({
            id: product?.id,
            productName: product?.name,
            productType: position[0],
            price: product?.price,
            quantity: quantity,
            imageUrl: product.imageUrl
        });

        setTimeout(() => {
            setIsAddingToCart(false);
        }, 1500);

        setTimeout(() => {
            setImageAnimating(false);
        }, 800);
    };

    return (
        <div className="min-h-screen bg-black text-white">
            <div className={"h-[6rem] bg-black border-b border-white"}></div>
            <div className="container mx-auto px-4 py-12 flex flex-col md:flex-row">
                <div className="w-full md:w-1/2 mb-8 md:mb-0 md:mr-12 relative">
                    <div className="border border-gray-800 overflow-hidden relative">
                        <img
                            src={product.imageUrl}
                            className="w-full object-cover"
                            alt="Product"
                        />
                        {imageAnimating && (
                            <div
                                className="absolute inset-0 bg-green-500/30"
                                style={{
                                    animation: 'fadeOut 0.8s ease-in-out forwards'
                                }}
                            />
                        )}
                    </div>
                    <style jsx>{`
                        @keyframes fadeOut {
                            0% {
                                opacity: 1;
                            }
                            100% {
                                opacity: 0;
                            }
                        }
                    `}</style>
                </div>

                <div className="w-full md:w-1/2">
                    <Position position={position} navigate={navigate} categoryName={categoryName}/>

                    <AdminEditDeleteButtons state={{
                        name: product.name,
                        price: product.price,
                        description: product.description,
                        totalQuantity: product.totalQuantity,
                        imageUrl: product.imageUrl,
                        productType: product.productType,
                        sizes: product.sizeToQuantityMap,
                    }} navigationLink={`/admin/shop/${categoryName}/${productId}`} handleDelete={handleDelete}/>

                    <h1 className="text-4xl font-bold mb-4 uppercase tracking-wider mt-3 transition-transform duration-300 ease-in-out">
                        {product?.name}
                    </h1>

                    <div className="text-3xl font-bold text-red-600 mb-4">
                        ${product?.price}
                    </div>

                    <div className="bg-[#1a1a1a] border border-gray-800 p-4 mb-6 text-sm">
                        <strong className="text-red-600 block mb-2">PLEASE NOTE:</strong>
                        <ul className="list-disc list-inside space-y-2 text-gray-300">
                            <li>You will only be able to check out with this item in your cart.</li>
                            <li>You can only order 1 of the bundles at a time.</li>
                        </ul>
                    </div>

                    <div className="flex items-center mb-6">
                        <button
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            className="bg-[#222] px-4 py-2 border border-gray-700 transition-all hover:bg-gray-800"
                        >
                            -
                        </button>
                        <input
                            type="text"
                            value={product.totalQuantity > 0 ? quantity : 0}
                            readOnly
                            className="w-16 text-center bg-black border border-gray-700 py-2"
                        />
                        <button
                            onClick={() => setQuantity(Math.min(product?.totalQuantity, quantity + 1))}
                            className="bg-[#222] px-4 py-2 border border-gray-700 transition-all hover:bg-gray-800"
                        >
                            +
                        </button>
                    </div>

                    <div className="mb-4">
                        <span className="font-bold">AVAILABILITY:</span>{' '}
                        <span className={product?.totalQuantity > 0 ? "text-green-500" : "text-red-500"}>
                            {product?.totalQuantity > 0 ? 'In Stock' : 'Out of Stock'}
                        </span>
                    </div>

                    <Button
                        onClick={handleAddToCart}
                        disabled={product.totalQuantity === 0 || isAddingToCart}
                        className={`w-full py-4 uppercase tracking-wider transition-all duration-300 transform ${
                            isAddingToCart
                                ? 'bg-green-600 hover:bg-green-700 scale-105'
                                : 'bg-red-700 hover:bg-red-800'
                        }`}
                        variant="destructive">
                        {isAddingToCart ? 'Added to Cart! ✓' : 'Add to Cart'}
                        {isAddingToCart && (
                            <span className="ml-2 inline-block animate-bounce">🛒</span>
                        )}
                    </Button>

                    <div className="mt-8 border-t border-gray-800 pt-4">
                        <details>
                            <summary
                                className="cursor-pointer font-bold uppercase tracking-wider hover:text-red-500 transition-colors duration-300">
                                Description
                            </summary>
                            <div className="mt-4 text-gray-300">
                                <div dangerouslySetInnerHTML={{__html: product?.description}}></div>
                            </div>
                        </details>
                    </div>
                </div>
            </div>
        </div>
    );
}