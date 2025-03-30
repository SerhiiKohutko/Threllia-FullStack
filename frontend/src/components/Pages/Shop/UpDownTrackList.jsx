import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.jsx";
import React, {useEffect} from "react";
import {getAllSongsOrdered} from "@/redux/song/Action.js";
import {useDispatch, useSelector} from "react-redux";

export const UpDownTrackList = ({updatedTrackList, setUpdatedTrackList, handleRemoveTrack, handleAddTrack}) => {
    const songs = useSelector(state => state.song);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllSongsOrdered());
    }, []);

    const handleMoveSongUp = (index) => {
        if (index === 0) return;
        const newList = [...updatedTrackList];
        const temp = newList[index];
        newList[index] = newList[index - 1];
        newList[index - 1] = temp;
        setUpdatedTrackList(newList);
    };

    const handleMoveSongDown = (index) => {
        if (index === updatedTrackList.length - 1) return;
        const newList = [...updatedTrackList];
        const temp = newList[index];
        newList[index] = newList[index + 1];
        newList[index + 1] = temp;
        setUpdatedTrackList(newList);
    };

    return (
        <div className="bg-gray-900 p-6 border border-gray-800">
            <h2 className="text-2xl font-bold mb-4 text-orange-500">TRACKLIST</h2>

            <div className="space-y-4">
                {updatedTrackList.map((song, index) => (
                    <div key={index}
                         className="flex items-center justify-between bg-gray-800 p-3 border-l-2 border-orange-500">
                        <div className="flex items-center">
                            <span className="text-orange-300 mr-2">{index + 1}.</span>
                            <span>{song}</span>
                        </div>
                        <div className="flex space-x-2">
                            <button
                                onClick={() => handleMoveSongUp(index)}
                                className="text-blue-500 hover:text-blue-400 px-2"
                                disabled={index === 0}>
                                ↑
                            </button>
                            <button
                                onClick={() => handleMoveSongDown(index)}
                                className="text-blue-500 hover:text-blue-400 px-2"
                                disabled={index === updatedTrackList.length - 1}>
                                ↓
                            </button>
                            <button
                                onClick={() => handleRemoveTrack(index)}
                                className="text-red-500 hover:text-red-400 px-2">
                                ✖
                            </button>
                        </div>
                    </div>
                ))}

                <div className="flex items-center space-x-2">
                    <Select
                        onValueChange={(value) => {
                            handleAddTrack(value);
                        }}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Songs"/>
                        </SelectTrigger>
                        <SelectContent>
                            {songs.songsList?.songs?.map(song => (
                                <SelectItem key={song.id} value={song.title}>
                                    {song.title}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </div>);
}