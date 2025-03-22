import {Button} from "@/components/ui/button.jsx";
import {Image, Play} from "lucide-react";
import {LatestVideo} from "@/components/Pages/HomePage/Sections/SectionComponents/LatestVideo.jsx";
import {Photo} from "@/components/Pages/HomePage/Sections/SectionComponents/Photo.jsx";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {photoReducer} from "@/redux/gallery/Reducer.js";
import {getAllPhotos} from "@/redux/gallery/Action.js";

export const GalleryOverviewSection = () => {
    const dispatch = useDispatch();
    const photo = useSelector(state => state.photo);
    useEffect(() => {
        dispatch(getAllPhotos());
    }, [])

    return (
        <section id="media" className="py-24 bg-gradient-to-b from-gray-900 to-black relative">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center mb-12">
                    <h2 className="text-5xl font-rubikPaint text-white mb-6 md:mb-0 dripping-text">GALLERY</h2>
                    <Button variant="ghost"
                            className="font-tradeWinds border border-amber-600 text-white hover:bg-amber-900/30">
                        VIEW ALL <Image className="ml-2 h-4 w-4"/>
                    </Button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 ">
                    {photo.photos[0] && photo.photos[0].photos?.map((item, index) => (
                        <Photo index={index} imageName={item.imageName}/>
                    ))}
                </div>
            </div>
            <LatestVideo/>
        </section>
    );
}