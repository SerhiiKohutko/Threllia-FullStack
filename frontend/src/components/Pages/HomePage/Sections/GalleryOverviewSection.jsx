import {Button} from "@/components/ui/button.jsx";
import {Image, Play} from "lucide-react";
import {LatestVideo} from "@/components/Pages/HomePage/Sections/SectionComponents/LatestVideo.jsx";
import {Photo} from "@/components/Pages/HomePage/Sections/SectionComponents/Photo.jsx";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getAllPhotosPaginated} from "@/redux/gallery/Action.js";
import {useNavigate} from "react-router-dom";
import {LoadingPageAlt} from "@/components/ReusableComponents/LoadingAlt.jsx";

export const GalleryOverviewSection = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const photos = useSelector(state => state.photo.photos);
    const photo = useSelector(state => state.photo);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(photo.loading);
    }, [photo.loading]);
    useEffect(() => {
        dispatch(getAllPhotosPaginated(1, "DSC"));
    }, [])


    return (
        <section id="media" className="py-24 bg-gradient-to-b from-gray-900 to-black relative">
            {loading ?
                <LoadingPageAlt title={"gallery"}/>
                :
                <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center mb-12">
                    <h2 className="text-5xl font-rubikPaint text-white mb-6 md:mb-0 dripping-text">GALLERY</h2>
                    <Button variant="ghost" onClick={() => navigate("/gallery")}
                            className="font-tradeWinds border border-amber-600 text-white hover:bg-amber-900/30">
                        VIEW ALL <Image className="ml-2 h-4 w-4"/>
                    </Button>
                </div>

                <ul className="grid grid-cols-2 md:grid-cols-4 gap-4 ">
                    {photos.length && photos.map((item, index) => (
                        <Photo index={index} key={index} imageName={item.firstElementPhotoName}/>
                    ))}
                </ul>
            </div>
            }
            <LatestVideo/>
        </section>
    );
}