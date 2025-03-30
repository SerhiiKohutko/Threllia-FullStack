import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'react-toastify';
import {updateShowDetail} from "@/redux/tour/Action.js";
import {getAllSongsOrdered} from "@/redux/song/Action.js";
import {UpDownTrackList} from "@/components/Pages/Shop/UpDownTrackList.jsx";

const ShowDetailsEditAdmin = () => {
    const songs = useSelector(state => state.song);
    const navigate = useNavigate();
    const { showId } = useParams();
    const dispatch = useDispatch();
    const location = useLocation();

    const {
        country,
        city,
        place,
        date,
        relatedTour,
        songsList
    } = location.state || {};

    const [updatedCountry, setUpdatedCountry] = useState(country || '');
    const [updatedCity, setUpdatedCity] = useState(city || '');
    const [updatedPlace, setUpdatedPlace] = useState(place || '');
    const [updatedDate, setUpdatedDate] = useState(date || '');
    const [updatedRelatedTour, setUpdatedRelatedTour] = useState(relatedTour || '');

    const [updatedSongsList, setUpdatedSongsList] = useState(songsList || []);

    useEffect(() => {
        dispatch(getAllSongsOrdered());
    }, []);

    const handleAddSong = (value) => {
        const selectedSong = songs.songsList?.songs.find(song => song.title === value);
        if (selectedSong) {
            if (!updatedSongsList.some(song => song.id === selectedSong.id)) {
                setUpdatedSongsList([...updatedSongsList, selectedSong.title]);
            }
        }
    };

    const handleRemoveSong = (index) => {
        setUpdatedSongsList(updatedSongsList.filter((_, i) => i !== index));
    };


    const onSaveChanges = () => {
        if (!updatedCountry || !updatedCity || !updatedPlace || !updatedDate) {
            toast.error("You must add country, city, place, and date information");
            return;
        }

        const formData = {
            country: updatedCountry,
            city: updatedCity,
            place: updatedPlace,
            date: updatedDate,
            relatedTour: updatedRelatedTour,
            songsList: updatedSongsList
        };


        dispatch(updateShowDetail(showId, formData));
        navigate(`/tour/past`);
    };

    return (
        <div className="flex flex-col min-h-screen bg-black text-white">
            <div className="bg-black h-24 border-b border-orange-500"></div>

            <div className="container mx-auto px-4 py-12">
                <div className="mb-10 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 flex flex-col items-center">
                        <Input
                            value={updatedCity}
                            onChange={(e) => setUpdatedCity(e.target.value)}
                            className="w-[30%] text-center mb-4"
                            placeholder="City"
                        />
                        <Input
                            value={updatedCountry}
                            onChange={(e) => setUpdatedCountry(e.target.value)}
                            className="w-[30%] text-center"
                            placeholder="Country"
                        />
                    </h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
                    <div className="space-y-10">
                        <div className="bg-gray-900 p-6 border border-gray-800">
                            <h2 className="text-2xl font-bold mb-4 text-orange-500">SHOW INFORMATION</h2>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-gray-400 mb-2">Venue</label>
                                    <Input
                                        value={updatedPlace}
                                        onChange={(e) => setUpdatedPlace(e.target.value)}
                                        className="bg-gray-800 text-white border-gray-600 focus:border-orange-500"
                                        placeholder="Venue name"
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-400 mb-2">Show Date</label>
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
                                    <label className="block text-gray-400 mb-2">Related Tour</label>
                                    <Input
                                        value={updatedRelatedTour}
                                        onChange={(e) => setUpdatedRelatedTour(e.target.value)}
                                        className="bg-gray-800 text-white border-gray-600 focus:border-orange-500"
                                        placeholder="Tour name"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-10">
                        {/* Setlist */}

                        <UpDownTrackList handleRemoveTrack={handleRemoveSong} handleAddTrack={handleAddSong} setUpdatedTrackList={setUpdatedSongsList} updatedTrackList={updatedSongsList}/>

                    </div>
                </div>

                <div className="flex justify-center mt-8 mb-16">
                    <Button
                        onClick={onSaveChanges}
                        className="w-full md:w-1/2 lg:w-1/3 py-3 border border-orange-500 hover:bg-orange-900 hover:border-orange-400 text-lg"
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

export default ShowDetailsEditAdmin;