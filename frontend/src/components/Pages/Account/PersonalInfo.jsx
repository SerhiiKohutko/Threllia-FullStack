import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {Button} from "@/components/ui/button.jsx";
import {Input} from "@/components/ui/input.jsx";

export const PersonalInfo = () => {
        const [firstName, setFirstName] = useState('');
        const [lastName, setLastName] = useState('');
        const [email, setEmail] = useState('');
        const [dateOfBirth, setDateOfBirth] = useState('');
        const [country, setCountry] = useState('');
        const [updateSuccess, setUpdateSuccess] = useState(false);
        const [updateError, setUpdateError] = useState('');

        const auth = useSelector((state) => state.auth);
        const dispatch = useDispatch();
        const navigate = useNavigate();

        useEffect(() => {
            if (!localStorage.getItem('token')) {
                navigate("/auth");
                return;
            }

            if (auth.userDetails) {
                setFirstName(auth.userDetails.firstName || '');
                setLastName(auth.userDetails.lastName || '');
                setEmail(auth.userDetails.email || '');
                setDateOfBirth(auth.userDetails.dateOfBirth ?
                    new Date(auth.userDetails.dateOfBirth).toISOString().split('T')[0] : '');
                setCountry(auth.userDetails.country || '');
            }
        }, [auth, navigate]);

        const handleSubmit = (e) => {
            e.preventDefault();
            setUpdateSuccess(false);
            setUpdateError('');

            const userData = {
                firstName,
                lastName,
                email,
                dateOfBirth,
                country
            };

        };

        return (
            <div className="min-h-screen bg-black">
                <div className={"h-[6rem] bg-black"}></div>
                <div className="max-w-7xl mx-auto px-4 py-12">
                    <div className="mb-6">
                        <Button
                            className="bg-transparent hover:bg-gray-800 text-white border border-white font-medium py-2 px-4 flex items-center transition-colors duration-200"
                            onClick={() => navigate("/account")}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                            </svg>
                            Back to Account
                        </Button>
                    </div>

                    <div className="mb-8 text-left">
                        <h1 className="text-3xl font-bold tracking-wider text-white">PERSONAL INFORMATION</h1>
                        <p className="text-gray-300 mt-2">Update your personal details below.</p>
                    </div>

                    {updateSuccess && (
                        <div className="bg-green-900/80 text-white p-3 rounded mb-6 border border-green-700">
                            <p className="text-sm">Your profile has been updated successfully.</p>
                        </div>
                    )}

                    {updateError && (
                        <div className="bg-red-900/80 text-white p-3 rounded mb-6 border border-red-700">
                            <p className="text-sm">{updateError}</p>
                        </div>
                    )}


                    <div className="bg-black/70 border border-gray-300 rounded p-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                                <div>
                                    <label htmlFor="email" className="text-sm text-gray-300 block mb-1">Email</label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="bg-black/50 border border-gray-300 text-white placeholder:text-gray-500 h-12 rounded-sm focus:border-gray-100 w-full"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="dateOfBirth" className="text-sm text-gray-300 block mb-1">Date of Birth</label>
                                    <Input
                                        id="dateOfBirth"
                                        type="date"
                                        value={dateOfBirth}
                                        onChange={(e) => setDateOfBirth(e.target.value)}
                                        className="bg-black/50 border border-gray-300 text-white placeholder:text-gray-500 h-12 rounded-sm focus:border-gray-100 w-full"
                                        required
                                    />
                                </div>

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
                                    </select>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-gray-700">
                                <h3 className="text-xl font-bold text-white mb-4">Password</h3>
                                <Button
                                    type="button"
                                    className="bg-transparent hover:bg-gray-800 text-white border border-white py-2 px-4 transition-colors duration-200"
                                    onClick={() => navigate("/account/change-password")}
                                >
                                    Change Password
                                </Button>
                            </div>

                            {/* Submit Button */}
                            <div className="pt-6">
                                <Button
                                    type="submit"
                                    className="w-full md:w-auto bg-white hover:bg-gray-200 text-black font-medium py-3 px-8 rounded-sm transition-all duration-200">
                                    Save Changes
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
}