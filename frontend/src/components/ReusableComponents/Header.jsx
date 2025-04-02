import React, {useEffect} from 'react';
import THRLAnimation from "@/components/Pages/HomePage/Sections/SectionComponents/Logo.jsx";
import {HamburgerMenuIcon, PersonIcon} from "@radix-ui/react-icons";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet.jsx"
import {Button} from "@/components/ui/button.jsx";
import {useNavigate} from "react-router-dom";
import {CartHeader} from "@/components/Pages/Shop/CartHeader.jsx";
import {KeyIcon} from "lucide-react";
import {useSelector} from "react-redux";

export const Header = () => {

    const navigate = useNavigate();

    const [isAdmin, setIsAdmin] = React.useState(false);
    const auth = useSelector(state => state.auth);

    useEffect(() => {
        if (auth.user?.role === "ROLE_ADMIN"){
            setIsAdmin(true);
        }else{
            setIsAdmin(false);
        }
    }, [auth.user]);

    return (
        <div className="absolute top-0 z-30 flex flex-row justify-center w-full h-24">
            <div className="flex flex-row items-center w-[90%] border-b py-4">
                <div className="w-[20%] flex justify-start text-white items-center text-center">
                    <Sheet>
                        <SheetTrigger asChild>
                            <HamburgerMenuIcon className="cursor-pointer h-8 w-8 text-white hover:text-orange-400 transition-colors"/>
                        </SheetTrigger>
                        <SheetContent side="left"  className="[&>button]:hidden bg-black/95 backdrop-blur-sm border-r border-orange-500/30 flex flex-col items-center justify-center p-8">
                            <SheetHeader className="mb-8">
                                <SheetTitle className="flex justify-center">
                                    <THRLAnimation text="THRELLIA" customFontFamily="font-deliciousHandrawn" className="text-4xl text-white" />
                                </SheetTitle>
                            </SheetHeader>

                            <div className="flex flex-col items-center justify-center space-y-4 w-full">
                                <Button type="button" onClick={() => {
                                    navigate("/tour");
                                }} variant="ghost" className="text-white hover:text-orange-400 hover:bg-black/40 text-xl font-bold tracking-wider w-full">TOUR</Button>
                                <Button variant="ghost" className="text-white hover:text-orange-400 hover:bg-black/40 text-xl font-bold tracking-wider w-full">NEWS</Button>
                                <Button variant="ghost" className="text-white hover:text-orange-400 hover:bg-black/40 text-xl font-bold tracking-wider w-full">MUSIC</Button>
                                <Button variant="ghost" className="text-white hover:text-orange-400 hover:bg-black/40 text-xl font-bold tracking-wider w-full">MEDIA</Button>
                                <Button variant="ghost" className="text-white hover:text-orange-400 hover:bg-black/40 text-xl font-bold tracking-wider w-full">SHOP</Button>
                                <Button variant="ghost" className="text-white hover:text-orange-400 hover:bg-black/40 text-xl font-bold tracking-wider w-full">ACCOUNT</Button>
                            </div>

                            <div className="mt-auto pt-8 border-t border-orange-500/30 w-full">
                                <div className="flex justify-center space-x-4 mt-4">
                                    <a href="#" className="text-white hover:text-orange-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
                                    </a>
                                    <a href="#" className="text-white hover:text-orange-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-spotify"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="4"></circle><path d="M21.9 4.8A10 10 0 1 0 4.9 21.1"></path></svg>
                                    </a>
                                    <a href="#" className="text-white hover:text-orange-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-youtube"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"></path><path d="m10 15 5-3-5-3z"></path></svg>
                                    </a>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>

                <div className="flex flex-row justify-center gap-8 w-[60%] text-center items-center text-white h-16">
                    <p onClick={() => navigate("/tour")}
                       className={"font-deliciousHandrawn cursor-pointer hover:border-b-2 text-4xl"}>Tour</p>
                    <p className={"font-deliciousHandrawn cursor-pointer hover:border-b-2 text-4xl"} onClick={() => navigate("/gallery")}>Media</p>
                    <p className={"font-deliciousHandrawn cursor-pointer hover:border-b-2 text-4xl"} onClick={() => navigate("/news")}>News</p>
                    <div className="scale-125">
                        <THRLAnimation text="THRL" customFontFamily={"font-deliciousHandrawn"}/>
                    </div>
                    <p onClick={() => navigate("/releases")}
                       className={"font-deliciousHandrawn cursor-pointer hover:border-b-2 text-4xl"}>Music</p>
                    <p className={"font-deliciousHandrawn cursor-pointer hover:border-b-2 text-4xl"} onClick={() => navigate("/shop")}>Shop</p>
                    <p className={"font-deliciousHandrawn cursor-pointer hover:border-b-2 text-4xl"}
                       onClick={() => navigate("/songs")}>Songs</p>
                </div>

                <div className="flex w-[20%] justify-end items-center gap-4 text-white">
                    {
                        isAdmin &&
                        <KeyIcon className={"cursor-pointer hover:text-red-600"} onClick={() => navigate("/admin_panel")} />
                    }
                    <PersonIcon onClick={() => navigate("/login")} className={"cursor-pointer h-8 w-8"}/>
                    <CartHeader/>
                </div>
            </div>
        </div>
    );
}