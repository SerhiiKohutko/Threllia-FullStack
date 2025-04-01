import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import {Button} from "@/components/ui/button.jsx";
import {Input} from "@/components/ui/input.jsx";
import {updateUserPassword} from "@/redux/auth/Action.js";

export const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const [updateError, setUpdateError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!auth.loading && !auth.user) {
            navigate("/login");
        }
    }, [auth.loading, auth.user, navigate]);

    useEffect(() => {
        if (auth.error){
            setPasswordError(auth.error);
        }
    }, [auth.error]);

    const validatePasswords = () => {
        if (newPassword !== confirmPassword) {
            setPasswordError('New password and confirmation do not match');
            return false;
        }

        if (newPassword.length < 8) {
            setPasswordError('Password must be at least 8 characters long');
            return false;
        }

        setPasswordError('');
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setUpdateSuccess(false);
        setUpdateError('');

        if (!validatePasswords()) {
            return;
        }

        const passwordData = {
            oldPassword : oldPassword,
            newPassword : newPassword,
            confirmPassword : confirmPassword
        };

        dispatch(updateUserPassword(passwordData, navigate));
    };

    return (
        <div className="min-h-screen bg-black">
            <ToastContainer />
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
                    <h1 className="text-3xl font-bold tracking-wider text-white">CHANGE PASSWORD</h1>
                    <p className="text-gray-300 mt-2">Update your password below.</p>
                </div>

                {updateSuccess && (
                    <div className="bg-green-900/80 text-white p-3 rounded mb-6 border border-green-700">
                        <p className="text-sm">Your password has been updated successfully.</p>
                    </div>
                )}

                {updateError && (
                    <div className="bg-red-900/80 text-white p-3 rounded mb-6 border border-red-700">
                        <p className="text-sm">{updateError}</p>
                    </div>
                )}

                <div className="bg-black/70 border border-gray-300 rounded p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 gap-6">
                            <div>
                                <label htmlFor="oldPassword" className="text-sm text-gray-300 block mb-1">Current Password</label>
                                <Input
                                    id="oldPassword"
                                    type="password"
                                    value={oldPassword}
                                    onChange={(e) => setOldPassword(e.target.value)}
                                    className="bg-black/50 border border-gray-300 text-white placeholder:text-gray-500 h-12 rounded-sm focus:border-gray-100 w-full"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="newPassword" className="text-sm text-gray-300 block mb-1">New Password</label>
                                <Input
                                    id="newPassword"
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="bg-black/50 border border-gray-300 text-white placeholder:text-gray-500 h-12 rounded-sm focus:border-gray-100 w-full"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="confirmPassword" className="text-sm text-gray-300 block mb-1">Confirm New Password</label>
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="bg-black/50 border border-gray-300 text-white placeholder:text-gray-500 h-12 rounded-sm focus:border-gray-100 w-full"
                                    required
                                />
                            </div>

                            {passwordError && (
                                <div className="bg-red-900/80 text-white p-3 rounded border border-red-700">
                                    <p className="text-sm">{passwordError}</p>
                                </div>
                            )}
                        </div>

                        <div className="pt-6">
                            <Button
                                type="submit"
                                className="w-full md:w-auto bg-white hover:bg-gray-200 text-black font-medium py-3 px-8 rounded-sm transition-all duration-200">
                                Update Password
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};