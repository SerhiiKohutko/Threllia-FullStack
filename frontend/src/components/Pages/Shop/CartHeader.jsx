import {Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger} from "@/components/ui/sheet.jsx";
import {BoxIcon} from "@radix-ui/react-icons";
import THRLAnimation from "@/components/Pages/HomePage/Sections/SectionComponents/Logo.jsx";
import {ScrollArea} from "@/components/ui/scroll-area.jsx";
import {Button} from "@/components/ui/button.jsx";
import React from "react";
import {useCart} from "@/components/Utils/CartProvider.jsx";
import {useNavigate} from "react-router-dom";
import {ShoppingCartIcon} from "lucide-react";

export const CartHeader = () => {
    const navigate = useNavigate();
    const {cart, removeProductFromCart, removeAllItemsFromCart} = useCart();

    const [open, setOpen] = React.useState(false);

    return (
        <Sheet open={open} onOpenChange={setOpen} dismissible>
            <SheetTrigger asChild>
                <ShoppingCartIcon onClick={() => setOpen(true)} className={"cursor-pointer h-8 w-8 text-white hover:text-orange-500 transition-colors"}/>
            </SheetTrigger>
            <SheetContent
                side="right"
                style={{maxWidth: '30vw'}}
                className="[&>button]:hidden bg-black/90 backdrop-blur-md border-l border-orange-500/30 shadow-2xl">
                <SheetHeader className="mb-8 border-b border-orange-500/30 pb-4">
                    <SheetTitle className="flex justify-center">
                        <THRLAnimation
                            text="Your Cart"
                            customFontFamily="font-deliciousHandrawn"
                            className="text-4xl text-white drop-shadow-md"
                        />
                    </SheetTitle>
                </SheetHeader>

                <ScrollArea className={"h-[70%] pr-4"}>
                    {cart.map((item, index) => (
                        <div
                            key={index}
                            className={"flex flex-row items-center justify-between mb-4 p-4 bg-gray-800/70 rounded-lg border border-orange-500/30 hover:bg-gray-700/70 transition-all duration-300"}>
                            <img
                                src={item.imageUrl}
                                alt={"product"}
                                className={"h-20 w-20 object-cover rounded-md mr-4 shadow-md"}
                            />
                            <div className={"flex flex-col flex-grow"}>
                                <p className="text-white font-bold cursor-pointer"
                                   onClick={() => {
                                       setOpen(false);

                                    navigate(`/shop/${item.productType}/${item.id}}`);

                                }}>
                                {item.productName}
                                </p>
                                <p className="text-gray-400">Quantity: {item.quantity}</p>
                            </div>
                            <div className={"flex flex-col items-end"}>
                                <p className="text-white font-semibold mb-2">${item.price}</p>
                                <div className={"flex flex-row"}>
                                    {
                                        item.quantity > 1 &&
                                        <Button
                                            onClick={() => removeAllItemsFromCart(item.id)}
                                            variant="destructive"
                                            size="sm"
                                            className="bg-white rounded-none text-black hover:bg-red-700/90 hover:text-white mr-2">
                                            Remove All
                                        </Button>
                                    }
                                    <Button
                                        onClick={() => removeProductFromCart(item.id)}
                                        variant="destructive"
                                        size="sm"
                                        className="bg-white text-black rounded-none hover:bg-red-700/90 hover:text-white">
                                        Remove
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </ScrollArea>

                <div className={"bg-gray-900/80 h-[30%] p-6 rounded-t-2xl border-t border-orange-500/30"}>
                    <div className={"flex flex-row justify-between w-full mb-6"}>
                        <p className="text-white text-xl font-bold">Total Cost</p>
                        <p className="text-white text-xl font-bold ">${
                            cart.reduce((acc, item) => acc + item.price * item.quantity, 0)
                        }</p>
                    </div>
                    <div className={"flex flex-row justify-between w-full space-x-4"}>
                        <Button
                            onClick={() => setOpen(false)}
                            variant="outline"
                            className="w-full rounded-none border-black border hover:bg-black hover:text-white hover:border-orange-500">
                            Keep Shopping
                        </Button>
                        <Button
                            onClick={() => {
                                navigate("/checkout");
                                setOpen(false);
                            }}
                            variant={"outline"}
                            className="w-full rounded-none bg-black text-white border-white border hover:bg-white hover:text-black hover:border-orange-500">
                            Checkout
                        </Button>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}