import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {Input} from "@/components/ui/input.jsx";
import {Button} from "@/components/ui/button.jsx";
import {
    createAddress,
    createPaymentDetails,
    getAddressDetails,
    getPaymentDetails,
    updateAddress,
    updatePaymentDetails
} from "@/redux/auth/Action.js";

export const AddressForm = () => {
    const [addressName, setAddressName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [country, setCountry] = useState('');
    const [state, setState] = useState('');
    const [number, setNumber] = useState('');
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const { id } = useParams();
    const navigate = useNavigate();
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!auth.loading && auth.user === null) {
            navigate("/login");
        }
    }, [auth.loading, auth.user, navigate]);

    useEffect(() => {
        if (id && !auth.loading) {
            setIsEditing(true);
            setAddressName(auth.addressDetails.addressName || '');
            setFirstName(auth.addressDetails.firstName || '');
            setLastName(auth.addressDetails.lastName || '');
            setAddress(auth.addressDetails.address || '');
            setCity(auth.addressDetails.city || '');
            setZipCode(auth.addressDetails.zipCode?.toString() || '');
            setCountry(auth.addressDetails.country || '');
            setState(auth.addressDetails.state || '');
            setNumber(auth.addressDetails.number || '');
        }
    }, [auth.addressDetails]);

    useEffect(() => {
        if (id) {
            dispatch(getAddressDetails(id, localStorage.getItem("token")));
        }
    }, []);


    useEffect(() => {
        if (!auth.loading){
            setLoading(false);
        }
    }, [auth.loading])

    useEffect(() => {
        if (auth.error){
            setLoading(false);
            setError(error);
        }
    },[auth.error])


    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccess(false);
        setError('');

            setLoading(true);

            const addressData = {
                addressName,
                firstName,
                lastName,
                address,
                city,
                zipCode: parseInt(zipCode, 10),
                country,
                state,
                number
            };

        if (!isEditing) {
            dispatch(createAddress(addressData, navigate));
        } else{
            dispatch(updateAddress(id, addressData, setSuccess));
        }
    };

    if (loading && isEditing) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <p className="text-white">Loading address data...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black">
            <div className={"h-[6rem] bg-black"}></div>
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="mb-6">
                    <Button
                        className="bg-transparent hover:bg-gray-800 text-white border border-white font-medium py-2 px-4 flex items-center transition-colors duration-200"
                        onClick={() => navigate("/account/addresses")}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                        </svg>
                        Back to Addresses
                    </Button>
                </div>

                <div className="mb-8 text-left">
                    <h1 className="text-3xl font-bold tracking-wider text-white">
                        {isEditing ? 'EDIT ADDRESS' : 'ADD NEW ADDRESS'}
                    </h1>
                    <p className="text-gray-300 mt-2">
                        {isEditing ? 'Update your address details below.' : 'Enter your address details below.'}
                    </p>
                </div>

                {success && (
                    <div className="bg-green-900/80 text-white p-3 rounded mb-6 border border-green-700">
                        <p className="text-sm">
                            {isEditing
                                ? 'Your address has been updated successfully.'
                                : 'Your address has been added successfully.'
                            }
                        </p>
                    </div>
                )}

                {error && (
                    <div className="bg-red-900/80 text-white p-3 rounded mb-6 border border-red-700">
                        <p className="text-sm">{error}</p>
                    </div>
                )}

                <div className="bg-black/70 border border-gray-300 rounded p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Address Name */}
                            <div>
                                <label htmlFor="addressName" className="text-sm text-gray-300 block mb-1">Address Name</label>
                                <Input
                                    id="addressName"
                                    type="text"
                                    value={addressName}
                                    onChange={(e) => setAddressName(e.target.value)}
                                    placeholder="Home, Work, etc."
                                    className="bg-black/50 border border-gray-300 text-white placeholder:text-gray-500 h-12 rounded-sm focus:border-gray-100 w-full"
                                    required
                                />
                            </div>

                            {/* First Name */}
                            <div>
                                <label htmlFor="firstName" className="text-sm text-gray-300 block mb-1">First Name</label>
                                <Input
                                    id="firstName"
                                    type="text"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    className="bg-black/50 border border-gray-300 text-white placeholder:text-gray-500 h-12 rounded-sm focus:border-gray-100 w-full"
                                    required
                                />
                            </div>

                            {/* Last Name */}
                            <div>
                                <label htmlFor="lastName" className="text-sm text-gray-300 block mb-1">Last Name</label>
                                <Input
                                    id="lastName"
                                    type="text"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    className="bg-black/50 border border-gray-300 text-white placeholder:text-gray-500 h-12 rounded-sm focus:border-gray-100 w-full"
                                    required
                                />
                            </div>

                            {/* Phone Number */}
                            <div>
                                <label htmlFor="number" className="text-sm text-gray-300 block mb-1">Phone Number</label>
                                <Input
                                    id="number"
                                    type="text"
                                    value={number}
                                    onChange={(e) => setNumber(e.target.value)}
                                    className="bg-black/50 border border-gray-300 text-white placeholder:text-gray-500 h-12 rounded-sm focus:border-gray-100 w-full"
                                    required
                                />
                            </div>

                            {/* Street Address */}
                            <div className="md:col-span-2">
                                <label htmlFor="address" className="text-sm text-gray-300 block mb-1">Street Address</label>
                                <Input
                                    id="address"
                                    type="text"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    className="bg-black/50 border border-gray-300 text-white placeholder:text-gray-500 h-12 rounded-sm focus:border-gray-100 w-full"
                                    required
                                />
                            </div>

                            {/* City */}
                            <div>
                                <label htmlFor="city" className="text-sm text-gray-300 block mb-1">City</label>
                                <Input
                                    id="city"
                                    type="text"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    className="bg-black/50 border border-gray-300 text-white placeholder:text-gray-500 h-12 rounded-sm focus:border-gray-100 w-full"
                                    required
                                />
                            </div>

                            {/* State/Province */}
                            <div>
                                <label htmlFor="state" className="text-sm text-gray-300 block mb-1">State/Province</label>
                                <Input
                                    id="state"
                                    type="text"
                                    value={state}
                                    onChange={(e) => setState(e.target.value)}
                                    className="bg-black/50 border border-gray-300 text-white placeholder:text-gray-500 h-12 rounded-sm focus:border-gray-100 w-full"
                                    required
                                />
                            </div>

                            {/* Zip/Postal Code */}
                            <div>
                                <label htmlFor="zipCode" className="text-sm text-gray-300 block mb-1">Zip/Postal Code</label>
                                <Input
                                    id="zipCode"
                                    type="text"
                                    value={zipCode}
                                    onChange={(e) => setZipCode(e.target.value)}
                                    className="bg-black/50 border border-gray-300 text-white placeholder:text-gray-500 h-12 rounded-sm focus:border-gray-100 w-full"
                                    required
                                />
                            </div>

                            {/* Country */}
                            <div>
                                <label htmlFor="country" className="text-sm text-gray-300 block mb-1">Country</label>
                                <select
                                    id="country"
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                                    className="bg-black/50 border border-gray-300 text-white placeholder:text-gray-500 h-12 rounded-sm focus:border-gray-100 w-full"
                                    required
                                >
                                    <option value="">Select your country</option>
                                    <option value="US">United States</option>
                                    <option value="CA">Canada</option>
                                    <option value="UK">United Kingdom</option>
                                    <option value="AU">Australia</option>
                                    <option value="UA">Ukraine</option>
                                    <option value="BZ">Belize</option>
                                </select>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-6">
                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full md:w-auto bg-white hover:bg-gray-200 text-black font-medium py-3 px-8 rounded-sm transition-all duration-200"
                            >
                                {loading ? 'Saving...' : isEditing ? 'Update Address' : 'Save Address'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};