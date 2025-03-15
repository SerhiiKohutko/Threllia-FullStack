import {Dialog, DialogClose, DialogContent, DialogTrigger} from "@/components/ui/dialog.jsx";
import {Button} from "@/components/ui/button.jsx";
import {Play} from "lucide-react";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {AspectRatio} from "@/components/ui/aspect-ratio.jsx";

export const FollowUsTikTokVideo = (index) => {
    const [isOpen, setIsOpen] = useState(false)


    return (
        <div key={index} className="aspect-square overflow-hidden group relative">
            <img
                src={"https://img.youtube.com/vi/zT3wFQYtvQY/maxresdefault.jpg"}
                alt={`Gallery image ${index + 1}`}
                className="w-full h-full object-cover transition duration-500 group-hover:scale-110 right-auto"
            />
            <div
                className="absolute inset-0 bg-black opacity-0 group-hover:opacity-40 transition-opacity"></div>
            <div
                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                        <Button variant="ghost"
                                className="bg-black/70 hover:text-orange-600 hover:bg-black text-white rounded-full w-12 h-12 flex items-center justify-center">
                            <Play/>
                        </Button>
                    </DialogTrigger>

                    <DialogContent className="max-w-xs w-full p-0 border-0 text-white bg-black">
                        <div className="relative">
                            <iframe
                                className="w-full"
                                height="720"
                                src={`https://www.youtube.com/embed/zT3wFQYtvQY?autoplay=1`}
                                title="YouTube video player"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
        ;
}