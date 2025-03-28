import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {TourAdmin} from "@/components/Pages/AdminPanel/TourAdmin.jsx";
import {MediaAdmin} from "@/components/Pages/AdminPanel/MediaAdmin.jsx";
import 'react-quill-new/dist/quill.snow.css';
import {NewsAdmin} from "@/components/Pages/AdminPanel/NewsAdmin.jsx";
import {ToastContainer} from "react-toastify";
import {ReleaseAdmin} from "@/components/Pages/AdminPanel/ReleaseAdmin.jsx";
import {Songs} from "@/components/Pages/Music/Songs/Songs.jsx";
import {SongsAdmin} from "@/components/Pages/AdminPanel/SongsAdmin.jsx";

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
                      <Tabs>
                          <TabsList>
                              <TabsTrigger value="add">Add</TabsTrigger>
                              <TabsTrigger value="update">Update</TabsTrigger>
                              <TabsTrigger value="delete">Delete</TabsTrigger>
                          </TabsList>
                          <TabsContent value="add">
                              <TourAdmin/>
                          </TabsContent>
                          <TabsContent value="update">Tour</TabsContent>
                          <TabsContent value="delete">Tour</TabsContent>
                      </Tabs>
                  </TabsContent>
                  <TabsContent value="media">
                      <Tabs>
                          <TabsList>
                              <TabsTrigger value="add">Add</TabsTrigger>
                              <TabsTrigger value="update">Update</TabsTrigger>
                              <TabsTrigger value="delete">Delete</TabsTrigger>
                          </TabsList>
                          <TabsContent value="add">
                              <MediaAdmin/>
                          </TabsContent>
                          <TabsContent value="update">Tour</TabsContent>
                          <TabsContent value="delete">Tour</TabsContent>
                      </Tabs>
                  </TabsContent>
                  <TabsContent value="news">
                      <Tabs>
                          <TabsList>
                              <TabsTrigger value="add">Add</TabsTrigger>
                              <TabsTrigger value="update">Update</TabsTrigger>
                              <TabsTrigger value="delete">Delete</TabsTrigger>
                          </TabsList>
                          <TabsContent value="add">
                              <NewsAdmin/>
                          </TabsContent>
                          <TabsContent value="update">Tour</TabsContent>
                          <TabsContent value="delete">Tour</TabsContent>
                      </Tabs>
                  </TabsContent>
                  <TabsContent value="music">
                      <Tabs>
                          <TabsList>
                              <TabsTrigger value="add">Add</TabsTrigger>
                              <TabsTrigger value="update">Update</TabsTrigger>
                              <TabsTrigger value="delete">Delete</TabsTrigger>
                          </TabsList>
                          <TabsContent value="add">
                              <ReleaseAdmin/>
                          </TabsContent>
                          <TabsContent value="update">Tour</TabsContent>
                          <TabsContent value="delete">Tour</TabsContent>
                      </Tabs>
                  </TabsContent>
                  <TabsContent value="songs">
                      <Tabs>
                          <TabsList>
                              <TabsTrigger value="add">Add</TabsTrigger>
                              <TabsTrigger value="update">Update</TabsTrigger>
                              <TabsTrigger value="delete">Delete</TabsTrigger>
                          </TabsList>
                          <TabsContent value="add">
                              <SongsAdmin/>
                          </TabsContent>
                          <TabsContent value="update">Tour</TabsContent>
                          <TabsContent value="delete">Tour</TabsContent>
                      </Tabs>
                  </TabsContent>
                  <TabsContent value="shop">6</TabsContent>
              </Tabs>

          </div>
      </div>
    );
}