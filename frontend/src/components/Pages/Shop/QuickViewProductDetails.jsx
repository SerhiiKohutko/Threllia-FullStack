import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {getProductById} from "@/redux/shop/Action.js";
import {Button} from "@/components/ui/button.jsx";
import {useCart} from "@/components/Utils/CartProvider.jsx";

export const QuickViewProductDetails = ({productId, category}) => {
    const product = useSelector(state => state.shop.productDetails);
    const [quantity, setQuantity] = useState(1);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const {handleAddProductToCart} = useCart();
    const shop = useSelector(state => state.shop);

    const [isAnimated, setIsAnimated] = useState(false);

    useEffect(() => {
        if (productId && category) {
            console.log(`Fetching product with ID ${productId} and category ${category}`);
            dispatch(getProductById(productId, category));
        }
    }, [productId, category, dispatch]);

    useEffect(() => {
        setLoading(shop.productDetailsLoading);
    },[shop.productDetailsLoading])

    if (loading) {
        return <div className="min-h-fit bg-black text-white flex flex-col items-center justify-center p-8">
            <div className="flex items-center justify-center mb-4">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white"></div>
            </div>
            <p className="text-lg">Loading product details...</p>
        </div>;
    }

    function handleAddToCart() {
        setIsAnimated(true)
        handleAddProductToCart(
            {
                id : product?.id,
                productName : product?.name,
                productType: category,
                price : product?.price,
                quantity : quantity,
                imageUrl : product.imageUrl});
        setTimeout(() => {
            setIsAnimated(false)
        }, 1500)
    }
    return (
        <div className="min-h-fit bg-black text-white flex flex-row justify-center">
            <div className="container mx-auto px-4 py-12 flex flex-col md:flex-row">
                <div className="w-full md:w-1/2 mb-8 md:mb-0 md:mr-12">
                    <div className="border border-gray-800">
                    <img
                            src={product.imageUrl}
                            className="w-full object-cover"
                            alt="Product"
                        />
                    </div>
                </div>

                <div className="w-full md:w-1/2">
                    <h1 className="text-4xl font-bold mb-4 uppercase tracking-wider mt-3">
                        {product?.name}
                    </h1>

                    <div className="text-3xl font-bold text-red-600 mb-4">
                        ${product?.price}
                    </div>

                    <div className="mb-4">
                        <span className="font-bold">AVAILABILITY:</span>{' '}
                        <span className={product?.totalQuantity > 0 ? "text-green-500" : "text-red-500"}>
                            {product?.totalQuantity > 0 ? 'In Stock' : 'Out of Stock'}
                        </span>
                    </div>

                    <div className="flex items-center mb-6">
                        <button
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            className="bg-[#222] px-4 py-2 border border-gray-700"
                        >
                            -
                        </button>
                        <input
                            type="text"
                            value={quantity}
                            readOnly
                            className="w-16 text-center bg-black border border-gray-700 py-2"
                        />
                        <button
                            onClick={() => setQuantity(quantity + 1)}
                            className="bg-[#222] px-4 py-2 border border-gray-700"
                        >
                            +
                        </button>
                    </div>

                    <Button className={`w-full py-4  uppercase tracking-wider transition-colors ${isAnimated ? "bg-green-700 hover:bg-green-800" : "bg-red-700 hover:bg-red-800"}`}
                            variant="destructive" onClick={() => handleAddToCart()}>{isAnimated ? <span>Added to Cart</span> : <span>Add to Cart</span>}</Button>
                    <div className="mt-8 border-t border-gray-800 pt-4">
                        <Button className={"w-full"} variant={"secondary"} onClick={() => navigate(`/shop/${category}/${productId}`)}>Check Details</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
