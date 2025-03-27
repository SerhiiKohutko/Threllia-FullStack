import {createContext, useContext, useEffect, useState} from "react";
import {addProduct, getCart, removeAllItems, removeItem} from "@/components/Utils/CartUtils.js";

const CartContext = createContext();


export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        setCart(getCart())
    },[])


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
    return (
        <CartContext.Provider value={{cart, handleAddProductToCart, removeProductFromCart, removeAllItemsFromCart}}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => useContext(CartContext);