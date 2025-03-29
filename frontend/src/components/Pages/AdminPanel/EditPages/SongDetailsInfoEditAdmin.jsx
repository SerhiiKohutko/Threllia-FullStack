import React from 'react';
import { Button } from '@/components/ui/button.jsx';
import { Play } from 'lucide-react';
import {useLocation, useNavigate, useParams} from "react-router-dom";
import ReactQuill from "react-quill-new";
import {Input} from "@/components/ui/input.jsx";
import {useDispatch} from "react-redux";
import {toast} from "react-toastify";
import {updateSong} from "@/redux/song/Action.js";


const SongDetailsInfoEditAdmin = () => {
    const navigate = useNavigate();
    const {songId} = useParams();
    const dispatch = useDispatch();

    const location = useLocation();
    const { title, lyrics, authors } = location.state || {};

    const [updatedTitle, setUpdatedTitle] = React.useState(title);
    const [updatedLyrics, setUpdatedLyrics] = React.useState(lyrics);
    const [updatedAuthors, setUpdatedAuthors] = React.useState(authors || []);
    const [newAuthor, setNewAuthor] = React.useState("");

    const handleAddAuthor = () => {
        if (newAuthor.trim()) {
            setUpdatedAuthors([...updatedAuthors, newAuthor.trim()]);
            setNewAuthor("");
        }
    };

    const handleRemoveAuthor = (index) => {
        setUpdatedAuthors(updatedAuthors.filter((_, i) => i !== index));
    };


    function onSaveChanges(){

        if (updatedAuthors.length < 1 || !updatedTitle || !updatedLyrics) {
            toast.error("You must add a title, authors and lyrics");
            return;
        }

        dispatch(updateSong(songId , {
            title : updatedTitle,
            lyrics : updatedLyrics,
            authors : updatedAuthors
        }))

        navigate("/songs")
    }
    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-b bg-black text-white">
            <div className={"bg-black h-[6rem] border-b border-white"}></div>
            <div className="container mx-auto px-4 py-12 text-center">
                <h1 className="text-5xl md:text-7xl font-bold mb-2 flex flex-row justify-center ">
                    <span className="text-white font-rubikPaint"></span>
                    <Input value={updatedTitle} onChange={(e) => setUpdatedTitle(e.target.value)}
                           className={"w-[50%]"}/>
                </h1>
                <div className="text-xl text-gray-400 italic font-rubikPaint">
                    WRITTEN BY
                    {updatedAuthors.map((author, index) => (
                        <span key={index} className="mx-1">
                            {author}
                            <button onClick={() => handleRemoveAuthor(index)} className="text-red-500 ml-2">✖</button>
                        </span>
                    ))}
                </div>
                <div className="flex items-center justify-center mt-4">
                    <Input value={newAuthor} onChange={(e) => setNewAuthor(e.target.value)} placeholder="Add author"
                           className="w-[20%]"/>
                    <Button onClick={handleAddAuthor} className="ml-2">Add</Button>
                </div>
            </div>
            <div className="flex flex-col items-center text-center">
                <h2 className="text-4xl font-bold mb-6">LYRICS</h2>
                <div className="text-lg space-y-4 mb-6">
                    <ReactQuill value={updatedLyrics} onChange={setUpdatedLyrics} theme="snow" className={"min-h-[15rem]"}/></div>
            </div>
            <div className={"flex flex-row justify-center"}>
                <Button onClick={() => onSaveChanges()} className={"w-[35%] border-white border hover:border-orange-500"}>Saved Changes</Button>
            </div>
        </div>
    );
};

export default SongDetailsInfoEditAdmin;