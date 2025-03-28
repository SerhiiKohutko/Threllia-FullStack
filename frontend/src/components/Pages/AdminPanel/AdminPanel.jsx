import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {TourAdmin} from "@/components/Pages/AdminPanel/TourAdmin.jsx";
import {MediaAdmin} from "@/components/Pages/AdminPanel/MediaAdmin.jsx";

export const AdminPanel = () => {
    return (
      <div>
          <div className={"h-[6rem] bg-black "}></div>

          <div className={"flex flex-row justify-center min-h-screen"}>
              <Tabs defaultValue="account" className="w-[400px]">
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
                  <TabsContent value="news">3</TabsContent>
                  <TabsContent value="music">4</TabsContent>
                  <TabsContent value="songs">5</TabsContent>
                  <TabsContent value="shop">6</TabsContent>
              </Tabs>

          </div>
      </div>
    );
}