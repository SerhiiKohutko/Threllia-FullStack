import React, { useState, useEffect, useRef } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'react-toastify';
import {updatePhotoCollection} from "@/redux/gallery/Action.js";

const PhotoCollectionEditAdmin = () => {
    const { photoCollectionId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const fileInputRef = useRef(null);


    const {
        title,
        date,
        photos
    } = location.state || {};

    const [updatedTitle, setUpdatedTitle] = useState(title || '');
    const [updatedDate, setUpdatedDate] = useState(date || '');
    const [authorName, setAuthorName] = useState(photos[0].author.name || '');
    const [photoList, setPhotoList] = useState(photos || []);

    const [newPhotos, setNewPhotos] = useState([]);
    const [uploadedImages, setUploadedImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const photo = useSelector(state => state.photo);

    useEffect(() => {
        setLoading(photo.loading)
    },[photo.loading])

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 0) {
            const newUploadedImages = files.map(file => ({
                file,
                preview: URL.createObjectURL(file),
                isNew: true
            }));

            setUploadedImages([...uploadedImages, ...newUploadedImages]);
            setNewPhotos([...newPhotos, ...files]);

            e.target.value = '';
        }
    };

    const handleRemoveExistingPhoto = (index) => {
        const updatedList = [...photoList];
        updatedList.splice(index, 1);
        setPhotoList(updatedList);
    };

    const handleRemoveNewPhoto = (index) => {
        const updatedImages = [...uploadedImages];
        const imageToRemove = updatedImages[index];

        if (imageToRemove && imageToRemove.preview) {
            URL.revokeObjectURL(imageToRemove.preview);
        }

        updatedImages.splice(index, 1);
        setUploadedImages(updatedImages);

        const updatedNewPhotos = [...newPhotos];
        updatedNewPhotos.splice(index, 1);
        setNewPhotos(updatedNewPhotos);
    };

    const onSaveChanges = () => {
        if (!updatedTitle || !updatedDate) {
            toast.error("You must provide a title and date for the photo collection");
            return;
        }

        const formData = new FormData();

        formData.append('data', JSON.stringify({
            title: updatedTitle,
            date: updatedDate,
            author:  authorName ,
            photos: photoList.map(photo => (
                 photo.id
            ))
        }));

        newPhotos.forEach(file => {
            formData.append('photos', file);
        });

        dispatch(updatePhotoCollection(photoCollectionId, formData, navigate));
    };

    return (
        <div className="flex flex-col min-h-screen bg-black text-white">
            <div className={"h-[6rem] bg-black border-b border-white"}></div>
            <div className="container mx-auto px-4 py-12">
                <div className="mb-10 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 flex flex-col items-center">
                        <Input
                            value={updatedTitle}
                            onChange={(e) => setUpdatedTitle(e.target.value)}
                            className="w-[50%] text-center"
                            placeholder="Collection Title"
                        />
                    </h1>
                </div>

                <div className="grid grid-cols-1 gap-12 mb-12">
                    <div className="bg-gray-900 p-6 border border-gray-800">
                        <h2 className="text-2xl font-bold mb-4 text-orange-500">COLLECTION INFORMATION</h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-gray-400 mb-2">Date</label>
                                <Input
                                    type="date"
                                    value={updatedDate}
                                    onChange={(e) => setUpdatedDate(e.target.value)}
                                    className="bg-gray-800 text-white border-gray-600 focus:border-orange-500"
                                    style={{
                                        colorScheme: 'dark',
                                        opacity: 1
                                    }}
                                />
                            </div>

                            <div>
                                <label className="block text-gray-400 mb-2">Photographer</label>
                                <Input
                                    value={authorName}
                                    onChange={(e) => setAuthorName(e.target.value)}
                                    className="bg-gray-800 text-white border-gray-600 focus:border-orange-500"
                                    placeholder="Photographer Name"
                                />
                                <p className="text-gray-500 text-sm mt-1">
                                    This photographer will be credited for all photos in this collection
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-900 p-6 border border-gray-800">
                        <h2 className="text-2xl font-bold mb-4 text-orange-500">EXISTING PHOTOS</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {photoList && photoList.length > 0 ? (
                                photoList.map((photo, index) => (
                                    <div key={index} className="relative border border-gray-700 p-2 rounded-lg">
                                        <img
                                            src={photo.imageName}
                                            alt={`Photo ${index + 1}`}
                                            className="w-full h-48 object-cover mb-2 rounded"
                                        />
                                        <div className="absolute bottom-12 right-4 bg-black bg-opacity-70 p-1 rounded">
                                            <span className="text-white text-sm">© {authorName || "Photographer"}</span>
                                        </div>
                                        <Button
                                            onClick={() => handleRemoveExistingPhoto(index)}
                                            variant="destructive"
                                            className="w-full mt-2 bg-red-700 hover:bg-red-800"
                                        >
                                            Remove
                                        </Button>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-400 col-span-full">No existing photos in this collection</p>
                            )}
                        </div>
                    </div>

                    <div className="bg-gray-900 p-6 border border-gray-800">
                        <h2 className="text-2xl font-bold mb-4 text-orange-500">ADD NEW PHOTOS</h2>

                        <div className="mb-6">
                            <Button
                                onClick={() => fileInputRef.current.click()}
                                className="w-full py-10 border-2 border-dashed border-orange-500 bg-transparent hover:bg-gray-800"
                            >
                                Click to Upload Photos
                            </Button>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleImageUpload}
                                multiple
                                accept="image/*"
                                className="hidden"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {uploadedImages.length > 0 ? (
                                uploadedImages.map((image, index) => (
                                    <div key={index} className="relative border border-gray-700 p-2 rounded-lg">
                                        <img
                                            src={image.preview}
                                            alt={`New photo ${index + 1}`}
                                            className="w-full h-48 object-cover mb-2 rounded"
                                        />
                                        <div className="absolute bottom-12 right-4 bg-black bg-opacity-70 p-1 rounded">
                                            <span className="text-white text-sm">© {authorName || "Photographer"}</span>
                                        </div>
                                        <Button
                                            onClick={() => handleRemoveNewPhoto(index)}
                                            variant="destructive"
                                            className="w-full mt-2 bg-red-700 hover:bg-red-800"
                                        >
                                            Remove
                                        </Button>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-400 col-span-full">No new photos added yet</p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex justify-center mt-8 mb-16">
                    <Button
                        onClick={onSaveChanges}
                        className="w-full md:w-1/2 lg:w-1/3 py-3 border border-orange-500 hover:bg-orange-900 hover:border-orange-400 text-lg"
                        disabled={loading}
                    >
                        Save Changes
                    </Button>
                </div>
            </div>

            <style jsx>{`
                input[type="date"]::-webkit-calendar-picker-indicator {
                    filter: invert(1);
                    cursor: pointer;
                }
            `}</style>
        </div>
    );
};

export default PhotoCollectionEditAdmin;