import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'react-toastify';
import {createProduct} from "@/redux/shop/Action.js";

// Enums as defined in your backend
const ProductType = {
    APPAREL: 'APPAREL',
    MEDIA: 'MEDIA',
    ACCESSORIES: 'ACCESSORIES'
};

const ApparelProductType = {
    SHIRTS: 'SHIRTS',
    PANTS_N_SHORTS: 'PANTS_N_SHORTS',
    OUTWEAR: 'OUTWEAR',
    HEADWEAR: 'HEADWEAR',
    FOOTWEAR: 'FOOTWEAR'
};

const ApparelSizeType = [
    'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'
];

const MediaProductType = {
    REISSUES: 'REISSUES',
    VINYL: 'VINYL',
    CD: 'CD',
    DVD: 'DVD',
    BOOKS: 'BOOKS'
};

const AccessoriesProductType = {
    JEWELRY: 'JEWELRY',
    VINYL_CARE: 'VINYL_CARE',
    BAGS_N_BACKPACKS: 'BAGS_N_BACKPACKS',
    GAMES_N_FIGURES: 'GAMES_N_FIGURES',
    STICKERS_PATCHES_BUTTONS: 'STICKERS_PATCHES_BUTTONS'
};

export const ShopAdmin = () => {
    const [files, setFiles] = useState([]);
    const [previews, setPreviews] = useState([]);
    const [apparelSizes, setApparelSizes] = useState({});
    const dispatch = useDispatch();

    const form = useForm({
        defaultValues: {
            name: "",
            price: "",
            description: "",
            type: "",
            subType: "",
            totalQuantity: "",
            coverImage: files
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

    const handleAddApparelSize = () => {
        const sizeInput = document.getElementById('apparelSizeSelect');
        const quantityInput = document.getElementById('apparelSizeQuantity');
        const size = sizeInput.value;
        const quantity = quantityInput.value;

        if (size && quantity) {
            setApparelSizes(prev => ({
                ...prev,
                [size]: parseInt(quantity)
            }));

            sizeInput.value = '';
            quantityInput.value = '';
        }
    };

    const removeApparelSize = (size) => {
        const newSizes = { ...apparelSizes };
        delete newSizes[size];
        setApparelSizes(newSizes);
    };

    const onSubmit = (data) => {
        // Validate required fields
        if (!data.name || !data.price || !data.type || !data.subType) {
            toast.error("Please fill in all required fields", {
                position: "top-right",
                autoClose: 2000,
            });
            return;
        }

        const formData = new FormData();

        const productData = {
            name: data.name,
            price: parseFloat(data.price),
            description: data.description,
            type: data.type,
            totalQuantity: data.type === ProductType.APPAREL
                ? Object.values(apparelSizes).reduce((a, b) => a + b, 0)
                : parseInt(data.totalQuantity),
        };

        switch(data.type) {
            case ProductType.APPAREL:
                productData.apparelProductType = data.subType;
                productData.map = apparelSizes;
                break;
            case ProductType.MEDIA:
                productData.mediaProductType = data.subType;
                break;
            case ProductType.ACCESSORIES:
                productData.accessoriesProductType = data.subType;
                break;
        }

        formData.append('data', JSON.stringify(productData));

        if (files.length > 0) {
            formData.append('coverImage', files[0]);
        }

        dispatch(createProduct(formData));

        form.reset();
        setPreviews([]);
        setFiles([]);
    };

    const isFormValid =
        form.watch('name') &&
        form.watch('price') &&
        form.watch('type') &&
        form.watch('subType') &&
        (form.watch('type') !== ProductType.APPAREL || Object.keys(apparelSizes).length > 0);

    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    {/* Product Name */}
                    <FormField
                        control={form.control}
                        name="name"
                        rules={{ required: "Name is required" }}
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="Enter product name"
                                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    {/* Price */}
                    <FormField
                        control={form.control}
                        name="price"
                        rules={{ required: "Price is required" }}
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="number"
                                        step="0.01"
                                        placeholder="Enter price"
                                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    {/* Description */}
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <textarea
                                        {...field}
                                        placeholder="Enter product description"
                                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    {/* Product Type */}
                    <FormField
                        control={form.control}
                        name="type"
                        rules={{ required: "Product type is required" }}
                        render={({ field }) => (
                            <FormItem>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select product type" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {Object.values(ProductType).map((type) => (
                                            <SelectItem key={type} value={type}>
                                                {type}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </FormItem>
                        )}
                    />

                    {/* Sub Type based on Product Type */}
                    {form.watch('type') && (
                        <FormField
                            control={form.control}
                            name="subType"
                            rules={{ required: "Sub type is required" }}
                            render={({ field }) => {
                                let subTypeOptions;
                                switch(form.watch('type')) {
                                    case ProductType.APPAREL:
                                        subTypeOptions = ApparelProductType;
                                        break;
                                    case ProductType.MEDIA:
                                        subTypeOptions = MediaProductType;
                                        break;
                                    case ProductType.ACCESSORIES:
                                        subTypeOptions = AccessoriesProductType;
                                        break;
                                    default:
                                        subTypeOptions = {};
                                }

                                return (
                                    <FormItem>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select sub type" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {Object.values(subTypeOptions).map((subType) => (
                                                    <SelectItem key={subType} value={subType}>
                                                        {subType}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                );
                            }}
                        />
                    )}

                    {/* Apparel Specific Size Management */}
                    {form.watch('type') === ProductType.APPAREL && (
                        <div>
                            <div className="flex space-x-2 mb-2">
                                <Select id="apparelSizeSelect">
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Size" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {ApparelSizeType.filter(size =>
                                            !Object.keys(apparelSizes).includes(size)
                                        ).map((size) => (
                                            <SelectItem key={size} value={size}>
                                                {size}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <Input
                                    id="apparelSizeQuantity"
                                    type="number"
                                    placeholder="Quantity"
                                    className="w-24"
                                />
                                <Button
                                    type="button"
                                    onClick={handleAddApparelSize}
                                >
                                    Add
                                </Button>
                            </div>
                            {Object.entries(apparelSizes).map(([size, quantity]) => (
                                <div
                                    key={size}
                                    className="flex justify-between items-center bg-gray-100 p-2 rounded mb-1"
                                >
                                    <span>{size}: {quantity}</span>
                                    <button
                                        type="button"
                                        onClick={() => removeApparelSize(size)}
                                        className="text-red-500"
                                    >
                                        ✖
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Total Quantity for Non-Apparel Products */}
                    {form.watch('type') !== ProductType.APPAREL && (
                        <FormField
                            control={form.control}
                            name="totalQuantity"
                            rules={{ required: "Quantity is required" }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="number"
                                            placeholder="Enter total quantity"
                                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    )}

                    {/* Cover Image Upload */}
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
                                            "
                                        >
                                            <span>
                                                {files.length > 0 ? files[0].name : 'Выберите файл'}
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

                    <Button
                        type="submit"
                        disabled={!isFormValid}
                        className="w-full"
                    >
                        Add Product
                    </Button>
                </form>
            </Form>
        </div>
    );
};