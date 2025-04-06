import React, {useState, useRef} from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import ReactQuill from 'react-quill-new';
import {toast, ToastContainer} from 'react-toastify';
import {updateRelease} from "@/redux/releases/Action.js";
import {Input} from "@/components/ui/input.jsx";
import {Button} from "@/components/ui/button.jsx";
import {UpDownTrackList} from "@/components/Pages/Shop/UpDownTrackList.jsx";



const ReleaseDetailsEditAdmin = () => {
    const navigate = useNavigate();
    const { releaseId } = useParams();
    const dispatch = useDispatch();
    const location = useLocation();
    const fileInputRef = useRef(null);

    const {
        title,
        coverName,
        description,
        trackList,
        dateReleased,
        nameToInstrumentsPlayed
    } = location.state || {};

    const [updatedTitle, setUpdatedTitle] = useState(title || '');
    const [updatedDescription, setUpdatedDescription] = useState(description || '');
    const [updatedDateReleased, setUpdatedDateReleased] = useState(dateReleased || '');

    // Track list management
    const [updatedTrackList, setUpdatedTrackList] = useState(trackList || []);

    // Band members management
    const [updatedBandMembers, setUpdatedBandMembers] = useState(nameToInstrumentsPlayed || {});
    const [newMemberName, setNewMemberName] = useState('');
    const [newMemberInstrument, setNewMemberInstrument] = useState('');

    // Image upload state
    const [coverImage, setCoverImage] = useState(null);
    const [coverPreview, setCoverPreview] = useState(
        coverName ? coverName : '/placeholder.jpg'
    );


    const handleAddTrack = (value) => {
        const trackList = updatedTrackList.includes(value) ? updatedTrackList.filter((track) => track !== value) : [...updatedTrackList, value];
        setUpdatedTrackList(trackList);
    };

    const handleRemoveTrack = (index) => {
        setUpdatedTrackList(updatedTrackList.filter((_, i) => i !== index));
    };

    const handleAddBandMember = () => {
        if (newMemberName.trim() && newMemberInstrument.trim()) {
            setUpdatedBandMembers({
                ...updatedBandMembers,
                [newMemberName.trim()]: newMemberInstrument.trim()
            });
            setNewMemberName('');
            setNewMemberInstrument('');
        }
    };

    const handleRemoveBandMember = (name) => {
        const updatedMembers = { ...updatedBandMembers };
        delete updatedMembers[name];
        setUpdatedBandMembers(updatedMembers);
    };

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
        if (!updatedTitle || !updatedDescription || updatedTrackList.length < 1 || !updatedBandMembers) {
            toast.error("You must add a title, description, and at least one track");
            return;
        }

        const formData = new FormData();

        formData.append('data', JSON.stringify({
            title: updatedTitle,
            description: updatedDescription,
            songList : updatedTrackList,
            dateReleased: updatedDateReleased,
            nameToInstrumentsPlayed: updatedBandMembers,
        }));

        if (coverImage) {
            formData.append('releaseCover', coverImage);
        }

        dispatch(updateRelease(releaseId, formData));
        navigate(`/releases/${releaseId}`);
    };

    return (
        <div className="flex flex-col min-h-screen bg-black text-white">
            <ToastContainer/>
            <div className="bg-black h-24 border-b border-orange-500"></div>

            <div className="container mx-auto px-4 py-12">
                <div className="mb-10 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 flex flex-col items-center">
                        <Input
                            value={updatedTitle}
                            onChange={(e) => setUpdatedTitle(e.target.value)}
                            className="w-[30%] text-center"
                            placeholder="Release Title"
                        />
                    </h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
                    <div className="space-y-10">
                        <div className="bg-gray-900 p-6 border border-gray-800">
                            <h2 className="text-2xl font-bold mb-4 text-orange-500">RELEASE INFORMATION</h2>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-gray-400 mb-2">Release Date</label>
                                    <Input
                                        type="date"
                                        value={updatedDateReleased}
                                        onChange={(e) => setUpdatedDateReleased(e.target.value)}
                                        className="bg-gray-800 text-white border-gray-600 focus:border-orange-500"
                                        style={{
                                            colorScheme: 'dark',
                                            opacity: 1
                                        }}
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-400 mb-2">Description</label>
                                    <ReactQuill
                                        value={updatedDescription}
                                        onChange={setUpdatedDescription}
                                        theme="snow"
                                        className="bg-black text-white min-h-full"
                                        modules={{
                                            toolbar: [
                                                ['bold', 'italic', 'underline'],
                                                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                                                ['clean']
                                            ]
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Band Members */}
                        <div className="bg-gray-900 p-6 border border-gray-800">
                            <h2 className="text-2xl font-bold mb-4 text-orange-500">BAND MEMBERS</h2>

                            <div className="space-y-4">
                                {Object.entries(updatedBandMembers).map(([name, instrument], index) => (
                                    <div key={index} className="flex items-center justify-between bg-gray-800 p-3 border-l-2 border-orange-500">
                                        <div>
                                            <span className="block text-white">{name}</span>
                                            <span className="text-orange-300">{instrument}</span>
                                        </div>
                                        <button
                                            onClick={() => handleRemoveBandMember(name)}
                                            className="text-red-500 hover:text-red-400"
                                        >
                                            ✖
                                        </button>
                                    </div>
                                ))}

                                <div className="flex items-center space-x-2">
                                    <Input
                                        value={newMemberName}
                                        onChange={(e) => setNewMemberName(e.target.value)}
                                        placeholder="Member Name"
                                        className="flex-1"
                                    />
                                    <Input
                                        value={newMemberInstrument}
                                        onChange={(e) => setNewMemberInstrument(e.target.value)}
                                        placeholder="Instrument"
                                        className="flex-1"
                                    />
                                    <Button onClick={handleAddBandMember}>Add</Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-10">
                        {/* Album Cover */}
                        <div className="bg-gray-900 p-6 border border-gray-800 text-center">
                            <h2 className="text-2xl font-bold mb-4 text-orange-500">ALBUM COVER</h2>

                            <div className="flex flex-col items-center">
                                <div
                                    className="relative w-64 h-64 mb-4 mx-auto group cursor-pointer"
                                    onClick={handleImageClick}
                                >
                                    <img
                                        src={coverPreview}
                                        alt={updatedTitle || "Album cover"}
                                        className="w-full h-full object-cover border-2 border-orange-500 shadow-lg transition-all duration-300 group-hover:opacity-70"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
                                    Upload New Cover
                                </Button>

                                {coverImage && (
                                    <p className="text-green-500 mt-2">
                                        New image selected: {coverImage.name}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Tracklist */}
                        <div className="bg-gray-900 p-6 border border-gray-800">
                            <h2 className="text-2xl font-bold mb-4 text-orange-500">TRACKLIST</h2>

                           <UpDownTrackList setUpdatedTrackList={setUpdatedTrackList} updatedTrackList={updatedTrackList} handleAddTrack={handleAddTrack} handleRemoveTrack={handleRemoveTrack} />

                        </div>
                    </div>
                </div>

                <div className="flex justify-center mt-8 mb-16">
                    <Button
                        onClick={onSaveChanges}
                        className="w-full md:w-1/2 lg:w-1/3 py-3 border border-orange-500 hover:bg-orange-900 hover:border-orange-400 text-lg">
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

export default ReleaseDetailsEditAdmin;