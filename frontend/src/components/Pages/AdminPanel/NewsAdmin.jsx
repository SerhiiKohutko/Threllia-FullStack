import ReactQuill from "react-quill-new";
import {useState} from "react";
import {Button} from "@/components/ui/button.jsx";
import {toast} from "react-toastify";
import {Input} from "@/components/ui/input.jsx";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form.jsx";
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {addLatestUpdate} from "@/redux/news/Action.js";


export const NewsAdmin = () => {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState("");
    const dispatch = useDispatch();

    const { control, handleSubmit, setValue, watch, reset } = useForm({
        defaultValues: {
            title: "",
            content: "",
            photo: null,
        },
        mode: "onChange",
    });


    const handleFileChange = (event) => {
        const newFile = event.target.files[0];
        if (newFile) {
            setFile(newFile);
            setPreview(URL.createObjectURL(newFile));
            setValue("photo", newFile);
        }
    };

    const removeFile = () => {
        setFile(null);
        setPreview("");
        setValue("photo", null);
    };

    const onSubmit = (data) => {
        const formData = new FormData();

        formData.append('content', JSON.stringify({
            title: data.title,
            content : data.content,
        }));

        formData.append('image', data.photo);

        dispatch(addLatestUpdate(formData))

        reset();
        setFile(null);
        setPreview("");
    };

    const isFormValid = watch("content") && watch("title") && file;

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
                    value={watch("content")}
                    onChange={(value) => setValue("content", value)}
                />

                <Input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                {preview && (
                    <div className="flex flex-col items-center">
                        <img src={preview} alt="Preview" className="w-32 h-32 object-cover mt-2" />
                        <button type="button" onClick={removeFile} className="text-red-500">
                            Remove
                        </button>
                    </div>
                )}


                <Button type="submit" disabled={!isFormValid} className="w-full">
                    Add Latest Update
                </Button>
            </form>
        </div>
    );
};
