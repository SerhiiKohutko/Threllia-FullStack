
import {useEffect, useState} from "react";
import {toast, ToastContainer} from "react-toastify";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form.jsx";
import {Input} from "@/components/ui/input.jsx";
import {Button} from "@/components/ui/button.jsx";
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {addPhotoCollection} from "@/redux/gallery/Action.js";


export const MediaAdmin = () => {
    const [files, setFiles] = useState([]);
    const [previews, setPreviews] = useState([]);
    const dispatch = useDispatch();
    const photo = useSelector(state => state.photo);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(photo.loading);
    }, [photo.loading]);

    const form = useForm({
        defaultValues: {
            title: "",
            author: "",
            date: "",
            photos: files
        },
        mode: 'onChange'
    });

    const handleFileChange = (event) => {
        if (event.target.files) {
            const newFiles = Array.from(event.target.files);
            setFiles(prevFiles => [...prevFiles, ...newFiles]);

            const newPreviews = newFiles.map(file => URL.createObjectURL(file));
            setPreviews(prevPreviews => [...prevPreviews, ...newPreviews]);
        }
    };

    const removeFile = (index) => {
        setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
        setPreviews(prevPreviews => prevPreviews.filter((_, i) => i !== index));
    };

    const onSubmit = (data) => {
        const { date, title, author } = data;

        if (!date || !title || !author) {
            toast.error("Please fill in all required fields", {
                position: "top-right",
                autoClose: 2000,
            });
            return;
        }

        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateRegex.test(date)) {
            toast.error("Invalid date format. Use YYYY-MM-DD", {
                position: "top-right",
                autoClose: 2000,
            });
            return;
        }

        const formData = new FormData();

        formData.append('data', JSON.stringify({
            title: title,
            author: author,
            date: date,
        }));

        files.forEach((file) => {
            formData.append('photos', file);
        });

        dispatch(addPhotoCollection(formData, form, setPreviews))

    };

    const isFormValid = form.watch('title') && form.watch('author') && form.watch('date') && files.length > 0;

    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
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
                        name="author"
                        rules={{ required: "Photograph is required" }}
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="Enter author"
                                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="date"
                        rules={{
                            required: "Date is required",
                            pattern: {
                                value: /^\d{4}-\d{2}-\d{2}$/,
                                message: "Date must be in YYYY-MM-DD format"
                            }
                        }}
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
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="photos"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        onChange={(e) => {
                                            handleFileChange(e);
                                            field.onChange(e);
                                        }}
                                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </FormControl>

                                {previews.length > 0 && (
                                    <div className="mt-4 grid grid-cols-4 gap-2">
                                        {previews.map((preview, index) => (
                                            <div key={index} className="relative">
                                                <img
                                                    src={preview}
                                                    alt={`Preview ${index}`}
                                                    className="w-full h-20 object-cover rounded-md"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => removeFile(index)}
                                                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                                                >
                                                    ✖
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </FormItem>
                        )}
                    />

                    <Button
                        type="submit"
                        disabled={!isFormValid}
                        disabled={loading}
                        className="w-full "
                    >
                        Add Collection
                    </Button>
                </form>
            </Form>
        </div>
    );
};