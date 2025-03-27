
export function getCart(){
    return JSON.parse(localStorage.getItem("cart")) || [];
}

export function addProduct(product){
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const exist = cart.findIndex((item) => product.id === item.id);


    if (exist > -1){
        cart[exist].quantity += product.quantity;
    } else{
        cart.push({...product, quantity: product.quantity});
    }

    localStorage.setItem("cart", JSON.stringify(cart));
}

export function removeItem(id){
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const exist = cart.findIndex((item) => id === item.id);

    if (cart[exist].quantity > 1){
        cart[exist].quantity -= 1;
    } else {
        cart = cart.filter((item) => item.id !== id);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
}

export function removeAllItems(id){
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart = cart.filter((item) => item.id !== id);

    localStorage.setItem("cart", JSON.stringify(cart));
}