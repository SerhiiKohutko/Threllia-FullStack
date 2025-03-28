import {useState} from "react";
import {useDispatch} from "react-redux";
import {useForm} from "react-hook-form";
import {addLatestUpdate} from "@/redux/news/Action.js";
import {Input} from "@/components/ui/input.jsx";
import ReactQuill from "react-quill-new";
import {Button} from "@/components/ui/button.jsx";
import {addSong} from "@/redux/song/Action.js";

export const SongsAdmin = () => {
    const dispatch = useDispatch();

    const { control, handleSubmit, setValue, watch, reset } = useForm({
        defaultValues: {
            title: "",
            lyrics: ""
        },
        mode: "onChange",
    });



    const onSubmit = (data) => {
        dispatch(addSong(data))
        reset();
    };

    const isFormValid = watch("title") && watch("lyrics");

    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg flex flex-col w-full">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <Input
                    {...control.register("title", { required: "Title is required" })}
                    placeholder="Enter title"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <ReactQuill
                    theme="snow"
                    value={watch("lyrics")}
                    onChange={(value) => setValue("lyrics", value)}
                />

                <Button type="submit" disabled={!isFormValid} className="w-full">
                    Add Song
                </Button>
            </form>
        </div>
    );
}