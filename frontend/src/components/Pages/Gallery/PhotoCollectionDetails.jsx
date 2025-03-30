import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {deletePhotoCollection, getPhotoCollectionDetails} from "@/redux/gallery/Action.js";
import {Hero} from "@/components/ReusableComponents/Hero.jsx";
import bgImage from  "@/resources/bg_2.png"
import {Button} from "@/components/ui/button.jsx";
import {getFormattedDate} from "@/components/Utils/DateParser.js";


export const PhotoCollectionDetails = () => {
    const {photoCollectionId} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const photoCollection = useSelector(state => state.photo.galleryItemDetails);

    const isAdmin = true;

    useEffect(() => {
        dispatch(getPhotoCollectionDetails(photoCollectionId));
    }, [dispatch, photoCollectionId]);

    const renderImageGrid = () => {
        if (!photoCollection?.photos || photoCollection?.photos.length === 0) {
            return <p className="text-white font-rubikPaint text-5xl pb-5">No images found in this collection.</p>;
        }

        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                {photoCollection?.photos?.map((image, index) => (
                    <div key={index} className={`relative overflow-hidden rounded-lg ${
                        index === 0 ? 'md:col-span-2 md:row-span-2' : ''
                    }`}>
                        <img
                            src={"http://localhost:8080/photos/" + image.imageName}
                            alt={`Image ${index + 1}`}
                            className="w-full h-full object-cover"
                        />
                        {image.author && (
                            <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 p-1 rounded">
                                <span className="text-white text-xl">© {image.author.name}</span>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        );
    };

    function handleDelete() {
        dispatch(deletePhotoCollection(photoCollectionId));
        navigate("/gallery")
    }

    return (
        <div>
            <Hero pageTitle={photoCollection?.title} background={bgImage} />

            <div className="flex flex-col items-center bg-black">
                <div className="text-white text-5xl flex-row text-center font-deliciousHandrawn border-b border-orange-300 w-[70%] mb-6">
                    <p className={"pb-3"}>{getFormattedDate(photoCollection?.date)}</p>
                    {/*If profile is admin - edit & deletion available*/}
                    {
                        isAdmin && <>
                            <Button onClick={() => navigate(`/admin/gallery/${photoCollectionId}`, {
                                state: {
                                    title : photoCollection?.title,
                                    date : photoCollection?.date,
                                    photos : photoCollection?.photos
                                }
                            })}
                                    variant={"ghost"} className={"border rounded-none border-orange-500 mt-5 mr-4"}>Edit</Button>

                            <Button onClick={() => handleDelete()} variant={"ghost"} className={"border bg-red-700 text-white rounded-none border-orange-500 mt-5 mb-5"}>Delete</Button>
                        </>
                    }
                </div>

                <div className="w-[70%] max-w-7xl">
                    {renderImageGrid()}
                </div>
            </div>
        </div>
    );
}