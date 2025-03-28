import {Input} from "@/components/ui/input.jsx";
import {useForm} from "react-hook-form";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form.jsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.jsx";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {addShow, getAllSongsOrdered} from "@/redux/song/Action.js";
import {Cross1Icon} from "@radix-ui/react-icons";
import {Button} from "@/components/ui/button.jsx";
import {toast, ToastContainer} from "react-toastify";



export const TourAdmin = () => {
    const songs = useSelector(state => state.song);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllSongsOrdered());
    }, []);

    const form = useForm({
        defaultValues: {
            date: "",
            country: "",
            city: "",
            place: "",
            relatedTour: "",
            songsList: []
        },
        mode: 'onChange'
    });

    const onSubmit = (data) => {
        const { date, country, city, place, relatedTour } = data;

        if (!date || !country || !city || !place || !relatedTour) {
            toast.error("Please fill in all required fields", {
                position: "top-right",
                autoClose: 2000,
            });
            return;
        }

        // Validate date format
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateRegex.test(date)) {
            toast.error("Invalid date format. Use YYYY-MM-DD", {
                position: "top-right",
                autoClose: 2000,
            });
            return;
        }

        dispatch(addShow(data));
    };

    function handleSongsListChange(newValue) {
        const currentSongs = form.getValues("songsList");
        const updatedSongs = currentSongs.includes(newValue)
            ? currentSongs.filter((song) => song !== newValue)
            : [...currentSongs, newValue];

        form.setValue("songsList", updatedSongs);
    }

    const isFormValid =
        form.watch('date') &&
        form.watch('country') &&
        form.watch('city') &&
        form.watch('place') &&
        form.watch('relatedTour');

    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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

                    {['country', 'city', 'place', 'relatedTour'].map((fieldName) => (
                        <FormField
                            key={fieldName}
                            control={form.control}
                            name={fieldName}
                            rules={{ required: `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required` }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="text"
                                            placeholder={`Enter ${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}`}
                                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    ))}

                    <FormField
                        control={form.control}
                        name="songsList"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
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
                                </FormControl>

                                {field.value && field.value.length > 0 && (
                                    <div className="flex gap-2 flex-wrap mt-2">
                                        {field.value.map((item) => (
                                            <div
                                                key={item}
                                                onClick={() => handleSongsListChange(item)}
                                                className="flex items-center bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-sm cursor-pointer hover:bg-blue-200 transition-colors"
                                            >
                                                {item}
                                                <Cross1Icon className="ml-2 h-4 w-4 text-blue-500" />
                                            </div>
                                        ))}
                                    </div>
                                )}
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button
                        type="submit"
                        disabled={!isFormValid}
                        className="w-full"
                    >
                        Add Show
                    </Button>
                </form>
            </Form>
        </div>
    );
};