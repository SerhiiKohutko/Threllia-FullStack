import {Input} from "@/components/ui/input.jsx";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {BackgroundEffects} from "@/components/Pages/Auth/AuthPage.jsx";
import {registerUser} from "@/redux/auth/Action.js";
import {Button} from "@/components/ui/button.jsx";

export const RegistrationPage = () => {
    // State for form values and validation
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [country, setCountry] = useState('');

    // State for validation errors
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const [dateOfBirthError, setDateOfBirthError] = useState('');
    const [countryError, setCountryError] = useState('');
    const [registrationError, setRegistrationError] = useState('');

    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (auth.userDetails && localStorage.getItem('token')) {
            navigate("/account");
        }
    }, []);

    const validateForm = () => {
        let isValid = true;

        setEmailError('');
        setPasswordError('');
        setConfirmPasswordError('');
        setFirstNameError('');
        setLastNameError('');
        setDateOfBirthError('');
        setCountryError('');
        setRegistrationError('');

        if (!email) {
            setEmailError('Email is required');
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            setEmailError('Please enter a valid email address');
            isValid = false;
        }

        if (!password) {
            setPasswordError('Password is required');
            isValid = false;
        } else if (password.length < 8) {
            setPasswordError('Password must be at least 8 characters long');
            isValid = false;
        }

        if (password !== confirmPassword) {
            setConfirmPasswordError('Passwords do not match');
            isValid = false;
        }

        if (!firstName) {
            setFirstNameError('First name is required');
            isValid = false;
        }

        if (!lastName) {
            setLastNameError('Last name is required');
            isValid = false;
        }

        if (!dateOfBirth) {
            setDateOfBirthError('Date of birth is required');
            isValid = false;
        }
        if (!country) {
            setCountryError('Country is required');
            isValid = false;
        }

        return isValid;
    };

    const handleRegistration = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            setRegistrationError('Please fill all required fields correctly.');
            return;
        }

        const dobDate = new Date(dateOfBirth);

        const registrationData = {
            email,
            password,
            firstName,
            lastName,
            dateOfBirth: dobDate.toISOString().split('T')[0], // Format: YYYY-MM-DD
            country
        };

        dispatch(registerUser(registrationData, navigate))
    };

    return (
        <div className="flex min-h-screen">
            <div className="flex-1 relative overflow-hidden">
                <BackgroundEffects />

                <div className={"h-[6rem]"}></div>
                <div className="relative z-20 flex flex-col justify-center items-center px-4 py-12">
                    <div className="h-12"></div>

                    {registrationError && (
                        <div className="bg-red-900/80 text-white p-3 rounded mb-4 w-full max-w-5xl border border-red-700">
                            <p className="text-sm">{registrationError}</p>
                        </div>
                    )}

                    <div className="max-w-5xl w-full mx-auto">
                        <section className="text-white flex flex-col space-y-4 p-6 bg-black/70 rounded border border-gray-300">
                            <h1 className="text-2xl font-bold tracking-wider">BECOME A FIFTH MEMBER!</h1>
                            <p className="text-gray-300 mb-2">
                                Create your Fifth Member account to join the Fan Club and enjoy all the benefits, including presale codes, giveaways, coupons, and more!
                            </p>

                            <form onSubmit={handleRegistration} className="space-y-4 mt-2">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="email" className="text-sm text-gray-300 block mb-1">Email</label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="Enter your email"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className={`bg-black/50 border ${emailError ? 'border-red-500' : 'border-gray-300'} text-white placeholder:text-gray-500 h-12 rounded-sm focus:border-gray-100 w-full`}
                                        />
                                        {emailError && <p className="text-red-500 text-xs mt-1">{emailError}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor="firstName" className="text-sm text-gray-300 block mb-1">First Name</label>
                                        <Input
                                            id="firstName"
                                            type="text"
                                            placeholder="Enter your first name"
                                            required
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                            className={`bg-black/50 border ${firstNameError ? 'border-red-500' : 'border-gray-300'} text-white placeholder:text-gray-500 h-12 rounded-sm focus:border-gray-100 w-full`}
                                        />
                                        {firstNameError && <p className="text-red-500 text-xs mt-1">{firstNameError}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor="lastName" className="text-sm text-gray-300 block mb-1">Last Name</label>
                                        <Input
                                            id="lastName"
                                            type="text"
                                            placeholder="Enter your last name"
                                            required
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                            className={`bg-black/50 border ${lastNameError ? 'border-red-500' : 'border-gray-300'} text-white placeholder:text-gray-500 h-12 rounded-sm focus:border-gray-100 w-full`}
                                        />
                                        {lastNameError && <p className="text-red-500 text-xs mt-1">{lastNameError}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor="dateOfBirth" className="text-sm text-gray-300 block mb-1">Date of Birth</label>
                                        <Input
                                            id="dateOfBirth"
                                            type="date"
                                            required
                                            value={dateOfBirth}
                                            onChange={(e) => setDateOfBirth(e.target.value)}
                                            className={`bg-black/50 border ${dateOfBirthError ? 'border-red-500' : 'border-gray-300'} text-white placeholder:text-gray-500 h-12 rounded-sm focus:border-gray-100 w-full`}
                                        />
                                        {dateOfBirthError && <p className="text-red-500 text-xs mt-1">{dateOfBirthError}</p>}
                                    </div>
                                    <div>
                                        <label htmlFor="country" className="text-sm text-gray-300 block mb-1">Country</label>
                                        <select
                                            id="country"
                                            value={country}
                                            onChange={(e) => setCountry(e.target.value)}
                                            className={`bg-black/50 border ${countryError ? 'border-red-500' : 'border-gray-300'} text-white placeholder:text-gray-500 h-12 rounded-sm focus:border-gray-100 w-full`}
                                            required
                                        >
                                            <option value="">Select your country</option>
                                            <option value="US">United States</option>
                                            <option value="CA">Canada</option>
                                            <option value="UK">United Kingdom</option>
                                            <option value="AU">Australia</option>
                                        </select>
                                        {countryError && <p className="text-red-500 text-xs mt-1">{countryError}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor="password" className="text-sm text-gray-300 block mb-1">Password</label>
                                        <Input
                                            id="password"
                                            type="password"
                                            placeholder="Create a password"
                                            required
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className={`bg-black/50 border ${passwordError ? 'border-red-500' : 'border-gray-300'} text-white placeholder:text-gray-500 h-12 rounded-sm focus:border-gray-100 w-full`}
                                        />
                                        {passwordError && <p className="text-red-500 text-xs mt-1">{passwordError}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor="confirmPassword" className="text-sm text-gray-300 block mb-1">Confirm Password</label>
                                        <Input
                                            id="confirmPassword"
                                            type="password"
                                            placeholder="Confirm your password"
                                            required
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            className={`bg-black/50 border ${confirmPasswordError ? 'border-red-500' : 'border-gray-300'} text-white placeholder:text-gray-500 h-12 rounded-sm focus:border-gray-100 w-full`}
                                        />
                                        {confirmPasswordError && <p className="text-red-500 text-xs mt-1">{confirmPasswordError}</p>}
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <Button
                                        type="submit"
                                        className="w-full bg-red-700 hover:bg-red-800 text-white font-medium py-3 rounded-sm transition-all duration-200 mt-4">
                                        Create Account
                                    </Button>
                                </div>

                                <div className="text-center mt-4">
                                    <p className="text-gray-300">
                                        Already have an account?{" "}
                                        <a href="/login" className="text-white underline hover:text-gray-200">
                                            Sign in here
                                        </a>
                                    </p>
                                </div>
                            </form>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};