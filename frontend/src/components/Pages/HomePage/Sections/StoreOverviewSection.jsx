import {Button} from "@/components/ui/button.jsx";
import {BoxesIcon} from "lucide-react";
import {useEffect, useState} from "react";
import {getAllProductsPaginated} from "@/redux/shop/Action.js";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useCart} from "@/components/Utils/CartProvider.jsx";
import {LoadingPageAlt} from "@/components/ReusableComponents/LoadingAlt.jsx";


export const StoreOverviewSection = () => {
    const shop = useSelector(state => state.shop);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {cart, handleAddProductToCart} = useCart();
    const [animatingProductKey, setAnimatingProductKey] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(shop.loading);
    }, [shop.loading]);

    useEffect(() => {
        dispatch(getAllProductsPaginated(0, {size: 3}));
    }, []);

    const handleAddToCart = (product) => {
        // Create a unique key using both id and product type
        const uniqueKey = `${product.id}-${product.productType}`;
        setAnimatingProductKey(uniqueKey);

        // Add the product to cart
        handleAddProductToCart({
            id: product.id,
            productType: product.productType,
            productName: product.name,
            price: product.price,
            quantity: 1,
            imageUrl: product.imageUrl
        });

        // Reset animation after the animation duration
        setTimeout(() => {
            setAnimatingProductKey(null);
        }, 1000);
    };

    const getUniqueKey = (product) => `${product.id}-${product.productType}`;


    return (
        <section id="shop" className="py-24 bg-gradient-to-b from-black to-gray-900 relative">
            {loading ?
                <LoadingPageAlt title={"merch"}/>
                :
                <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center mb-12">
                    <h2 className="text-5xl font-rubikPaint text-white mb-6 md:mb-0">MERCH</h2>
                    <Button onClick={() => navigate("/shop")} variant="ghost"
                            className="font-tradeWinds border border-amber-600 text-white hover:bg-amber-900/30 hover:text-orange-500">
                        VISIT STORE <BoxesIcon className="ml-2 h-4 w-4"/>
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {shop.products?.map((product, index) => {
                        const productKey = getUniqueKey(product);
                        return (
                            <div key={index} className="group">
                                <div
                                    className="bg-gray-800 border border-amber-700/20 overflow-hidden mb-4 aspect-square relative group-hover:border-amber-500 transition">
                                    <img
                                        src={product.imageUrl}
                                        alt={product.name}
                                        className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                                    />
                                    <div
                                        className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50"></div>
                                    <Button
                                        onClick={() => handleAddToCart(product)}
                                        variant="ghost"
                                        className={`absolute bottom-4 left-1/2 transform -translate-x-1/2 
                                        ${animatingProductKey === productKey ? 'bg-green-600 scale-110' : 'bg-amber-700 hover:bg-amber-600'} 
                                        text-white font-tradeWinds opacity-0 group-hover:opacity-100 transition-all duration-300`}
                                    >
                                        {animatingProductKey === productKey ? 'ADDED ✓' : 'ADD TO CART'}
                                    </Button>

                                    {/* Animation overlay when product is added */}
                                    {animatingProductKey === productKey && (
                                        <div className="absolute inset-0 bg-green-500/20 animate-pulse"></div>
                                    )}
                                </div>
                                <h3 className="text-white font-tradeWinds text-xl mb-1 cursor-pointer hover:text-orange-300"
                                    onClick={() => navigate(`/shop/${product.productType.toLowerCase()}/${product.id}`)}>{product.name}</h3>
                                <p className="text-amber-500 font-bold">${product.price}</p>
                            </div>
                        );
                    })}
                </div>
            </div>}
        </section>
    );
}