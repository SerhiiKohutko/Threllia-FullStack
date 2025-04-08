import React, {useState} from "react";
import {Dam, Play} from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog.jsx";
import {Button} from "@/components/ui/button.jsx";

export const LatestVideo = () => {
    const [isOpen, setIsOpen] = useState(false)


    return (
        <div className="mt-16">
            <h3 className="text-3xl font-rubikPaint text-white text-center mb-8">
                LATEST VIDEO
            </h3>

            <div className="max-w-4xl mx-auto px-4 relative aspect-video bg-gray-800">
                <img
                    src="https://img.youtube.com/vi/69Ahr-ikG38/maxresdefault.jpg"
                    alt="Video thumbnail"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black opacity-40"/>

                <div className="absolute inset-0 flex items-center justify-center">
                    <Dialog open={isOpen} onOpenChange={setIsOpen}>
                        <DialogTrigger asChild>
                            <Button
                                variant="ghost"
                                className="bg-amber-700 hover:bg-amber-600 text-white rounded-full w-20 h-20 flex items-center justify-center"
                            >
                                <Play className="h-8 w-8 ml-1"/>
                            </Button>
                        </DialogTrigger>

                        <DialogContent className="max-w-4xl p-0 aspect-video border-0 text-white">
                            <iframe
                                width="100%"
                                height="100%"
                                src={`https://www.youtube.com/embed/69Ahr-ikG38?autoplay=1`}
                                title="YouTube video player"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </DialogContent>
                    </Dialog>
                </div>

                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent p-6">
                    <h4 className="text-white font-tradeWinds text-2xl">
                        'Are You Dead Yet' - Cover
                    </h4>
                    <p className="text-gray-400">Released February 28, 2025</p>
                </div>
            </div>
        </div>
    );
}