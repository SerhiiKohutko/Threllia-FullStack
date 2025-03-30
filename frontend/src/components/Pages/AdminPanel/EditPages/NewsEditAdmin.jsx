import {useDispatch} from "react-redux";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import React, {useRef, useState} from "react";
import {toast} from "react-toastify";
import {Input} from "@/components/ui/input.jsx";
import ReactQuill from "react-quill-new";
import {Button} from "@/components/ui/button.jsx";
import {updateLatestUpdateById} from "@/redux/news/Action.js";


export const NewsEditAdmin = () => {
    const navigate = useNavigate();
    const { latestUpdateId } = useParams();
    const dispatch = useDispatch();
    const location = useLocation();
    const fileInputRef = useRef(null);

    const {
        title,
        imageName,
        content
    } = location.state || {};


    const [updatedTitle, setUpdatedTitle] = useState(title || "");
    const [updatedContent, setUpdatedContent] = useState(content || "");

    const [coverImage, setCoverImage] = useState(null);
    const [coverPreview, setCoverPreview] = useState(
        imageName ? `http://localhost:8080/news/${imageName}` : '/placeholder.jpg'
    );


    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setCoverImage(file);
            const imageUrl = URL.createObjectURL(file);
            setCoverPreview(imageUrl);
        }
    };


    const onSaveChanges = () => {
        if (!updatedTitle || !updatedContent) {
            toast.error("You must add a title and content");
            return;
        }

        const formData = new FormData();

        formData.append('content', JSON.stringify({
            title : updatedTitle,
            content : updatedContent
        }));

        if (coverImage) {
            formData.append('image', coverImage);
        }

        dispatch(updateLatestUpdateById(latestUpdateId, formData));
        navigate(`/news/${latestUpdateId}`);
    };

    return (
        <div className="flex flex-col justify-center text-center min-h-screen bg-black text-white">
            <div className="bg-black h-24 border-b border-orange-500"></div>

            <div className="container mx-auto px-4 py-12 flex justify-center items-center flex-col">
                <div className="mb-10 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 flex flex-col items-center">
                        <Input
                            value={updatedTitle}
                            onChange={(e) => setUpdatedTitle(e.target.value)}
                            className="w-full text-center"
                            placeholder="Latest Update Title"
                        />
                    </h1>
                </div>

                <div className="flex flex-col mb-12 text-center w-[50%]">
                    <div className="space-y-10 ">
                        <div className="bg-gray-900 p-6 border border-gray-800">
                            <h2 className="text-2xl font-bold mb-4 text-orange-500">LATEST UPDATE CONTENT</h2>

                            <div className="space-y-4">

                                <div>
                                    <ReactQuill
                                        value={updatedContent}
                                        onChange={setUpdatedContent}
                                        theme="snow"
                                        className="bg-black text-white min-h-full"
                                        modules={{
                                            toolbar: [
                                                ['bold', 'italic', 'underline'],
                                                [{'list': 'ordered'}, {'list': 'bullet'}],
                                                ['clean']
                                            ]
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-10">
                            <div className="bg-gray-900 p-6 border border-gray-800 text-center">
                                <h2 className="text-2xl font-bold mb-4 text-orange-500">LATEST UPDATE IMAGE</h2>

                                <div className="flex flex-col items-center">
                                    <div
                                        className="relative w-64 h-64 mb-4 mx-auto group cursor-pointer"
                                        onClick={handleImageClick}
                                    >
                                        <img
                                            src={coverPreview}
                                            alt={updatedTitle || "LATEST UPDATE IMAGE"}
                                            className="w-full h-full object-cover border-2 border-orange-500 shadow-lg transition-all duration-300 group-hover:opacity-70"
                                        />
                                        <div
                                            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <span className="bg-black bg-opacity-70 text-white px-4 py-2 rounded">
                                            Change Image
                                        </span>
                                        </div>
                                    </div>

                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleImageChange}
                                        accept="image/*"
                                        className="hidden"
                                    />

                                    <Button
                                        onClick={handleImageClick}
                                        className="mt-4 bg-gray-800 hover:bg-gray-700 border border-orange-500">
                                        Upload New Image
                                    </Button>

                                    {coverImage && (
                                        <p className="text-green-500 mt-2">
                                            New image selected: {coverImage.name}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center mt-8 mb-16">
                    <Button
                        onClick={onSaveChanges}
                        className="w-full py-3 border border-orange-500 hover:bg-orange-900 hover:border-orange-400 text-lg">
                        Save Changes
                    </Button>
                </div>
            </div>

        </div>
    );
}