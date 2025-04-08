import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {TourAdmin} from "@/components/Pages/AdminPanel/TourAdmin.jsx";
import {MediaAdmin} from "@/components/Pages/AdminPanel/MediaAdmin.jsx";
import 'react-quill-new/dist/quill.snow.css';
import {NewsAdmin} from "@/components/Pages/AdminPanel/NewsAdmin.jsx";
import {ToastContainer} from "react-toastify";
import {ReleaseAdmin} from "@/components/Pages/AdminPanel/ReleaseAdmin.jsx";
import {SongsAdmin} from "@/components/Pages/AdminPanel/SongsAdmin.jsx";
import {ShopAdmin} from "@/components/Pages/AdminPanel/ShopAdmin.jsx";
import {useEffect} from "react";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {BackgroundEffectsAlt} from "@/components/Pages/Music/Releases/ReleaseDetails.jsx";

export const AdminPanel = () => {

    const auth = useSelector(state => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (auth.userObtained && !auth.userAdmin) {
            navigate("/");
        }
    }, [auth]);

    return (
        <div>
            <ToastContainer/>
            <div className={"relative z-20 pt-36 flex flex-row justify-center min-h-screen max-h-fit pb-10"}>
                <BackgroundEffectsAlt />

                <Tabs defaultValue="account" className="relative z-10 w-[400px] mt-4">
                    <TabsList>
                        <TabsTrigger value="tour">Tour</TabsTrigger>
                        <TabsTrigger value="media">Media</TabsTrigger>
                        <TabsTrigger value="news">News</TabsTrigger>
                        <TabsTrigger value="music">Music</TabsTrigger>
                        <TabsTrigger value="songs">Songs</TabsTrigger>
                        <TabsTrigger value="shop">Shop</TabsTrigger>
                    </TabsList>
                    <TabsContent value="tour">
                        <TourAdmin/>
                    </TabsContent>
                    <TabsContent value="media">
                        <MediaAdmin/>
                    </TabsContent>
                    <TabsContent value="news">
                        <NewsAdmin/>
                    </TabsContent>
                    <TabsContent value="music">
                        <ReleaseAdmin/>
                    </TabsContent>
                    <TabsContent value="songs">
                        <SongsAdmin/>
                    </TabsContent>
                    <TabsContent value="shop">
                        <ShopAdmin/>
                    </TabsContent>
                </Tabs>

            </div>
        </div>
    );
}