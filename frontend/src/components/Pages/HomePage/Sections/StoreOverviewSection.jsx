import {Button} from "@/components/ui/button.jsx";
import {BoxesIcon} from "lucide-react";
import {useEffect} from "react";
import {getAllProductsPaginated, getShopOverviewForMVP} from "@/redux/shop/Action.js";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useCart} from "@/components/Utils/CartProvider.jsx";

export const StoreOverviewSection = () => {
    const shop = useSelector(state => state.shop);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {cart, handleAddProductToCart, removeProductFromCart} = useCart();


    useEffect(() => {
        dispatch(getAllProductsPaginated( 0, {size : 3}));
    },[]);

    return (
        <section id="shop" className="py-24 bg-gradient-to-b from-black to-gray-900 relative">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center mb-12">
                    <h2 className="text-5xl font-rubikPaint text-white mb-6 md:mb-0">MERCH</h2>
                    <Button onClick={() => navigate("/shop")} variant="ghost" className="font-tradeWinds border border-amber-600 text-white hover:bg-amber-900/30 hover:text-orange-500">
                        VISIT STORE <BoxesIcon className="ml-2 h-4 w-4" />
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {shop.products?.map((product, index) => (
                        <div key={index} className="group">
                            <div className="bg-gray-800 border border-amber-700/20 overflow-hidden mb-4 aspect-square relative group-hover:border-amber-500 transition">
                                <img
                                    src={"http://localhost:8080/products/vinyl.jpg"}
                                    alt={product.name}
                                    className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50"></div>
                                <Button onClick={() => handleAddProductToCart({
                                    id : product.id,
                                    productType: product.productType,
                                    productName: product.name,
                                    price : product.price,
                                    quantity : 1,
                                    imageUrl: product.imageUrl
                                })}
                                        variant="ghost" className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-amber-700 hover:bg-amber-600 text-white font-tradeWinds opacity-0 group-hover:opacity-100 transition-opacity">
                                    ADD TO CART
                                </Button>
                            </div>
                            <h3 className="text-white font-tradeWinds text-xl mb-1 cursor-pointer hover:text-orange-300" onClick={() => navigate(`/shop/${product.productType.toLowerCase()}/${product.id}`)}>{product.name}</h3>
                            <p className="text-amber-500 font-bold">${product.price}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}