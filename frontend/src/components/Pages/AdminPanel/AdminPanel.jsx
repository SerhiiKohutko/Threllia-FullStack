import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {TourAdmin} from "@/components/Pages/AdminPanel/TourAdmin.jsx";
import {MediaAdmin} from "@/components/Pages/AdminPanel/MediaAdmin.jsx";
import 'react-quill-new/dist/quill.snow.css';
import {NewsAdmin} from "@/components/Pages/AdminPanel/NewsAdmin.jsx";
import {ToastContainer} from "react-toastify";
import {ReleaseAdmin} from "@/components/Pages/AdminPanel/ReleaseAdmin.jsx";
import {Songs} from "@/components/Pages/Music/Songs/Songs.jsx";
import {SongsAdmin} from "@/components/Pages/AdminPanel/SongsAdmin.jsx";
import {ShopAdmin} from "@/components/Pages/AdminPanel/ShopAdmin.jsx";

export const AdminPanel = () => {
    return (
      <div>
          <ToastContainer />
          <div className={"h-[6rem] bg-black border-b border-white "}></div>

          <div className={"flex bg-gray-400 flex-row justify-center min-h-screen"}>
              <Tabs defaultValue="account" className="w-[400px] mt-4">
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