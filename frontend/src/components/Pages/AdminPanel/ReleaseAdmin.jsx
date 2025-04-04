

import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from 'react-toastify';
import {addRelease} from "@/redux/releases/Action.js";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.jsx";
import {getAllSongsOrdered} from "@/redux/song/Action.js";

export const ReleaseAdmin = () => {
    const [files, setFiles] = useState([]);
    const [previews, setPreviews] = useState([]);
    const [songList, setSongList] = useState([]);
    const [members, setMembers] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllSongsOrdered());
    }, []);
    const songs = useSelector(state => state.song);

    useEffect(() => {
        form.setValue('songList', songList);
    }, [songList]);

    const form = useForm({
        defaultValues: {
            title: "",
            description: "",
            dateReleased: "",
            coverImage: files,
            songList: songList,
            nameToInstrumentsPlayed: {}
        },
        mode: 'onChange'
    });

    const handleFileChange = (event) => {
        if (event.target.files && event.target.files.length > 0) {
            const newFile = event.target.files[0];
            setFiles([newFile]);
            setPreviews([URL.createObjectURL(newFile)]);
        }
    };

    const removeFile = () => {
        setFiles([]);
        setPreviews([]);
    };

    function handleSongsListChange(newValue) {
        const updatedSongs = songList.includes(newValue)
            ? songList.filter((song) => song !== newValue)
            : [...songList, newValue];

        setSongList(updatedSongs);
    }

    const handleMoveSongUp = (index) => {
        if (index === 0) return;
        const newList = [...songList];
        const temp = newList[index];
        newList[index] = newList[index - 1];
        newList[index - 1] = temp;
        setSongList(newList);
    };

    const handleMoveSongDown = (index) => {
        if (index === songList.length - 1) return;
        const newList = [...songList];
        const temp = newList[index];
        newList[index] = newList[index + 1];
        newList[index + 1] = temp;
        setSongList(newList);
    };

    const removeSong = (index) => {
        setSongList(prev => prev.filter((_, i) => i !== index));
    };

    const handleAddMember = () => {
        setMembers(prev => [...prev, { name: '', instrument: '' }]);
    };

    const updateMember = (index, field, value) => {
        const newMembers = [...members];
        newMembers[index][field] = value;
        setMembers(newMembers);
    };

    const removeMember = (index) => {
        setMembers(prev => prev.filter((_, i) => i !== index));
    };

    const onSubmit = (data) => {
        if (!data.title || !data.description || !data.dateReleased || !data.coverImage || !data.songList || !data.nameToInstrumentsPlayed) {
            toast.error("Please fill in all required fields", {
                position: "top-right",
                autoClose: 2000,
            });
            return;
        }

        const nameToInstrumentsPlayed = members.reduce((acc, member) => {
            if (member.name && member.instrument) {
                acc[member.name] = member.instrument;
            }
            return acc;
        }, {});

        const formData = new FormData();
        formData.append('data', JSON.stringify({
            title: data.title,
            description: data.description,
            dateReleased: data.dateReleased,
            songList: songList,
            nameToInstrumentsPlayed: nameToInstrumentsPlayed
        }));

        if (files.length > 0) {
            formData.append('releaseCover', files[0]);
        }

        dispatch(addRelease(formData));
    };

    const isFormValid =
        form.watch('title') &&
        form.watch('description') &&
        form.watch('dateReleased') &&
        files.length > 0 &&
        songList.length > 0 &&
        members.length > 0;

    return (
        <div className="max-w-md mx-auto h-fit p-6 bg-white shadow-lg rounded-lg">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="title"
                        rules={{ required: "Title is required" }}
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="Enter title"
                                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="description"
                        rules={{ required: "Description is required" }}
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <textarea
                                        {...field}
                                        placeholder="Enter description"
                                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="dateReleased"
                        rules={{ required: "Date is required" }}
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="text"
                                        placeholder="Enter Date (YYYY-MM-DD)"
                                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}/>

                    <FormField
                        control={form.control}
                        name="coverImage"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <div className="relative w-full">
                                        <input
                                            type="file"
                                            id="coverImageInput"
                                            accept="image/*"
                                            onChange={(e) => {
                                                handleFileChange(e);
                                                field.onChange(e);
                                            }}
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                        />
                                        <label
                                            htmlFor="coverImageInput"
                                            className="
                                                block
                                                w-full
                                                p-3
                                                border
                                                border-gray-300
                                                rounded-md
                                                bg-white
                                                text-gray-500
                                                hover:border-blue-500
                                                transition-colors
                                                duration-300
                                                cursor-pointer
                                                flex
                                                items-center
                                                justify-between
                                            ">
                                        <span className={""}>
                                            {files.length > 0 ? files[0].name : 'Choose image'}
                                        </span>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-6 w-6 text-gray-400"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                />
                                            </svg>
                                        </label>
                                    </div>
                                </FormControl>

                                {previews.length > 0 && (
                                    <div className="mt-4 relative">
                                        <img
                                            src={previews[0]}
                                            alt="Preview"
                                            className="w-full h-40 object-cover rounded-md"
                                        />
                                        <button
                                            type="button"
                                            onClick={removeFile}
                                            className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                                        >
                                            ✖
                                        </button>
                                    </div>
                                )}
                            </FormItem>
                        )}
                    />
                    {/* Song List with Add Button and Up/Down controls */}

                    <div>
                        <div className="flex">
                            <Select
                                onValueChange={(value) => {
                                    handleSongsListChange(value);
                                }}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select Songs" />
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
                        {songList.length > 0 && (
                            <div className="mt-2">
                                {songList.map((song, index) => (
                                    <div
                                        key={index}
                                        className="flex justify-between items-center bg-gray-100 p-2 rounded mb-1"
                                    >
                                        <div className="flex items-center">
                                            <span className="text-gray-500 mr-2">{index + 1}.</span>
                                            <span>{song}</span>
                                        </div>
                                        <div className="flex space-x-2">
                                            <button
                                                type="button"
                                                onClick={() => handleMoveSongUp(index)}
                                                className="text-blue-500 hover:text-blue-700 px-2"
                                                disabled={index === 0}
                                            >
                                                ↑
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => handleMoveSongDown(index)}
                                                className="text-blue-500 hover:text-blue-700 px-2"
                                                disabled={index === songList.length - 1}
                                            >
                                                ↓
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => removeSong(index)}
                                                className="text-red-500 hover:text-red-700 px-2"
                                            >
                                                ✖
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div>
                        <Button
                            type="button"
                            onClick={handleAddMember}
                            className="mb-2">
                            Add Member
                        </Button>
                        {members.map((member, index) => (
                            <div
                                key={index}
                                className="flex space-x-2 mb-2"
                            >
                                <Input
                                    value={member.name}
                                    onChange={(e) => updateMember(index, 'name', e.target.value)}
                                    placeholder="Member Name"
                                    className="flex-1"
                                />
                                <Input
                                    value={member.instrument}
                                    onChange={(e) => updateMember(index, 'instrument', e.target.value)}
                                    placeholder="Instrument"
                                    className="flex-1"
                                />
                                <Button
                                    type="button"
                                    onClick={() => removeMember(index)}
                                    variant="destructive"
                                    className={"bg-gray-400 rounded-none"}
                                >
                                    ✖
                                </Button>
                            </div>
                        ))}
                    </div>

                    <Button
                        type="submit"
                        disabled={!isFormValid}
                        className="w-full"
                    >
                        Add Release
                    </Button>
                </form>
            </Form>
        </div>
    );
};