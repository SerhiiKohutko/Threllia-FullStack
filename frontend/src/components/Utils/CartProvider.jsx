import {createContext, useContext, useEffect, useState} from "react";
import {addProduct, getCart, removeAllItems, removeItem} from "@/components/Utils/CartUtils.js";

const CartContext = createContext();


export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        setCart(getCart())
    },[cart.length])


    const handleAddProductToCart = (product) => {
        addProduct(product)
        setCart(getCart());
    }

    const removeProductFromCart = (id) => {
        removeItem(id);
        setCart(getCart());
    }

    const removeAllItemsFromCart = (id) => {
        removeAllItems(id);
        setCart(getCart());
    }

    const getAllItems = () => {
        return {
            totalCost : cart.reduce((total, item) => total + item.price, 0),
            products : cart.map((item) => {return {
                productName : item.productName,
                quantity : item.quantity,
                price : item.price,
                productId:item.productId,
                imageUrl : item.imageUrl,
            }}),
        }
    }
    return (
        <CartContext.Provider value={{cart, handleAddProductToCart, removeProductFromCart, removeAllItemsFromCart, getAllItems}}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => useContext(CartContext);