import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import ReactQuill from 'react-quill-new';
import { toast } from 'react-hot-toast';
import {updateProductById} from "@/redux/shop/Action.js";

export const ProductDetailsEditAdmin = () => {
    const navigate = useNavigate();
    const { productId, categoryName } = useParams();
    const dispatch = useDispatch();
    const location = useLocation();
    const fileInputRef = useRef(null);

    const {
        name,
        price,
        description,
        totalQuantity,
        imageUrl,
        sizes
    } = location.state || {};

    const [updatedName, setUpdatedName] = useState(name || '');
    const [updatedPrice, setUpdatedPrice] = useState(price || 0);
    const [updatedDescription, setUpdatedDescription] = useState(description || '');
    const [updatedQuantity, setUpdatedQuantity] = useState(totalQuantity || 0);

    // Size quantities for apparel
    const [sizeQuantities, setSizeQuantities] = useState(
        sizes && Object.keys(sizes).length === 0 ? {
            'S': 0,
            'M': 0,
            'L': 0,
            'XL': 0,
            'XXL': 0,
            'XXXL': 0
        } : sizes
    );

    // Image upload state
    const [productImage, setProductImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(
        imageUrl || 'https://www.metallica.com/dw/image/v2/BCPJ_PRD/on/demandware.static/-/Sites-met-master/default/dw76259a49/images/hi-res/Wherever_I_May_Roam_Guest_Pass_Plaque.jpg?sw=650'
    );



    const isApparel = categoryName?.toLowerCase() === 'apparel';

    useEffect(() => {
        // Fetch product data if needed
    }, [categoryName, dispatch]);

    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProductImage(file);

            const imageUrl = URL.createObjectURL(file);
            setImagePreview(imageUrl);
        }
    };

    const handleSizeQuantityChange = (size, value) => {
        setSizeQuantities({
            ...sizeQuantities,
            [size]: parseInt(value) || 0
        });
    };

    const onSaveChanges = () => {
        if (!updatedName || updatedPrice < 0 || !updatedDescription) {
            toast.error("You must add a name, price, and description");
            return;
        }

        const formData = new FormData();

        const productData = {
            name: updatedName,
            price: updatedPrice,
            description: updatedDescription,
            type: categoryName.toUpperCase()
        };

        if (isApparel) {
            productData.map = sizeQuantities;
        } else {
            productData.totalQuantity = updatedQuantity;
        }

        formData.append('data', JSON.stringify(productData));

        if (productImage) {
            formData.append('coverImage', productImage);
        }

        dispatch(updateProductById(productId, formData))
        navigate(`/shop/${categoryName}/${productId}`);
    };

    return (
        <div className="flex flex-col min-h-screen bg-black text-white">
            <div className="bg-black h-24 border-b border-red-600"></div>

            <div className="container mx-auto px-4 py-12">
                <div className="mb-10 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 flex flex-col items-center">
                        <Input
                            value={updatedName}
                            onChange={(e) => setUpdatedName(e.target.value)}
                            className="w-[30%] text-center"
                            placeholder="Product Name"
                        />
                    </h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
                    {/* Left Column */}
                    <div className="space-y-10">
                        <div className="bg-gray-900 p-6 border border-gray-800">
                            <h2 className="text-2xl font-bold mb-4 text-red-600">PRODUCT INFORMATION</h2>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-gray-400 mb-2">Price ($)</label>
                                    <Input
                                        type="number"
                                        value={updatedPrice}
                                        onChange={(e) => setUpdatedPrice(parseFloat(e.target.value))}
                                        min="0.01"
                                        step="0.01"
                                        className="bg-gray-800 text-white border-gray-600 focus:border-red-600"
                                    />
                                </div>

                                {isApparel ? (
                                    <div>
                                        <label className="block text-gray-400 mb-2">Size Quantities</label>
                                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                                            {Object.keys(sizeQuantities).map(size => (
                                                <div key={size} className="flex flex-col">
                                                    <span className="text-sm mb-1">{size}</span>
                                                    <Input
                                                        type="number"
                                                        value={sizeQuantities[size]}
                                                        onChange={(e) => handleSizeQuantityChange(size, e.target.value)}
                                                        min="0"
                                                        className="bg-gray-800 text-white border-gray-600 focus:border-red-600"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <label className="block text-gray-400 mb-2">Available Quantity</label>
                                        <Input
                                            type="number"
                                            value={updatedQuantity}
                                            onChange={(e) => setUpdatedQuantity(parseInt(e.target.value))}
                                            min="0"
                                            className="bg-gray-800 text-white border-gray-600 focus:border-red-600"
                                        />
                                    </div>
                                )}

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

                    </div>

                    {/* Right Column */}
                    <div>
                        {/* Product Image */}
                        <div className="bg-gray-900 p-6 border border-gray-800 text-center">
                            <h2 className="text-2xl font-bold mb-4 text-red-600">PRODUCT IMAGE</h2>

                            <div className="flex flex-col items-center">
                                <div
                                    className="relative w-64 h-64 mb-4 mx-auto group cursor-pointer"
                                    onClick={handleImageClick}
                                >
                                    <img
                                        src={imagePreview}
                                        alt={updatedName || "Product image"}
                                        className="w-full h-full object-cover border-2 border-red-600 shadow-lg transition-all duration-300 group-hover:opacity-70"
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
                                    className="mt-4 bg-gray-800 hover:bg-gray-700 border border-red-600">
                                    Upload New Image
                                </Button>

                                {productImage && (
                                    <p className="text-green-500 mt-2">
                                        New image selected: {productImage.name}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center mt-8 mb-16">
                    <Button
                        onClick={onSaveChanges}
                        className="w-full md:w-1/2 lg:w-1/3 py-3 border border-red-600 hover:bg-red-900 hover:border-red-400 text-lg">
                        Save Changes
                    </Button>
                </div>
            </div>

            <style jsx>{`
                .ql-container.ql-snow {
                    border-color: #4a5568;
                }
                .ql-toolbar.ql-snow {
                    border-color: #4a5568;
                    background-color: #1a202c;
                }
                .ql-toolbar.ql-snow .ql-picker-label {
                    color: #e2e8f0;
                }
                .ql-snow .ql-stroke {
                    stroke: #e2e8f0;
                }
                .ql-snow .ql-fill {
                    fill: #e2e8f0;
                }
                .ql-editor {
                    min-height: 120px;
                }
            `}</style>
        </div>
    );
};