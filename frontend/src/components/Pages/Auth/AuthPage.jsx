import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {Input} from "@/components/ui/input.jsx";
import {login} from "@/redux/auth/Action.js";
import {useDispatch} from "react-redux";


export const BackgroundEffects = () => {
    const [lightningActive, setLightningActive] = useState(false);
    const [lightningPosition, setLightningPosition] = useState({x: 50, y: 30});
    const [sparklePositions, setSparklePositions] = useState(generateSparklePositions());

    // Creates an array of fixed rain positions at component initialization
    const [rainPositions] = useState([...Array(80)].map(() => ({
        left: Math.random() * 100,
        height: 15 + Math.random() * 25,
        duration: 2 + Math.random() * 1.5,
        delay: Math.random() * 5
    })));

    // Create cross positions for the graveyard effect
    const [crossPositions] = useState(
        [...Array(8)].map((_, i) => ({
            left: i * 14 + Math.random() * 5,
            width: 10 + Math.random() * 6,
            height: 100 + Math.random() * 100,
            rotate: -5 + Math.random() * 10,
            crossbarTop: 15 + Math.random() * 20,
            crossbarHeight: 10 + Math.random() * 6,
            crossbarWidth: 30 + Math.random() * 15,
        }))
    );

    function generateSparklePositions() {
        let positions = [];

        for (let i = 0; i < 10; i++) {
            positions.push({
                left: Math.random() * 30,
                bottom: Math.random() * 40,
                size: 2 + Math.random() * 3,
                color: {
                    r: 255,
                    g: 150 + Math.random() * 100,
                    b: Math.random() * 50,
                    a: 0.7 + Math.random() * 0.3
                },
                duration: 3 + Math.random() * 5,
                delay: Math.random() * 5
            });
        }

        for (let i = 0; i < 15; i++) {
            positions.push({
                left: 30 + Math.random() * 70,
                bottom: Math.random() * 40,
                size: 2 + Math.random() * 3,
                color: {
                    r: 255,
                    g: 150 + Math.random() * 100,
                    b: Math.random() * 50,
                    a: 0.7 + Math.random() * 0.3
                },
                duration: 3 + Math.random() * 5,
                delay: Math.random() * 5
            });
        }

        return positions;
    }

    const triggerLightning = () => {
        const newX = Math.floor(Math.random() * 80) + 10;
        const newY = Math.floor(Math.random() * 40) + 10;

        setLightningPosition({ x: newX, y: newY });
        setLightningActive(true);

        setSparklePositions(prev => prev.map(spark => ({
            ...spark,
            color: {
                ...spark.color,
                r: 255,
                g: 200,
                b: 80,
                a: 0.8
            }
        })));

        setTimeout(() => {
            setLightningActive(false);
            setSparklePositions(prev => prev.map(spark => ({
                ...spark,
                color: {
                    r: 255,
                    g: 150 + Math.random() * 100,
                    b: Math.random() * 50,
                    a: 0.5 + Math.random() * 0.5
                }
            })));
        }, 200);
    };

    useEffect(() => {
        const lightningInterval = setInterval(() => {
            if (Math.random() < 0.25) {
                triggerLightning();
            }
        }, 1000);

        return () => clearInterval(lightningInterval);
    }, []);

    return (
        <>
        <div className="absolute inset-0 bg-black"></div>

    <div className="absolute inset-0 opacity-20"
         style={{
             backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\' fill=\'%23333333\' fill-opacity=\'0.4\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
             backgroundSize: '100px 100px'
         }}>
    </div>

    <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black to-transparent z-10"></div>

    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        {rainPositions.map((rain, i) => (
            <div
                key={`raindrop-${i}`}
                className="absolute bg-white"
                style={{
                    left: `${rain.left}%`,
                    top: `-50px`,
                    width: '1px',
                    height: `${rain.height}px`,
                    opacity: 0.1,
                    filter: 'blur(0.5px)',
                    animation: `rainFall ${rain.duration}s linear ${rain.delay}s infinite`
                }}
            ></div>
        ))}
    </div>

    <div className="absolute inset-0 pointer-events-none">
        <svg className="absolute w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path
                className={`transition-opacity duration-75 ${lightningActive ? 'opacity-100' : 'opacity-0'}`}
                d={`M${lightningPosition.x},-10 
                 L${lightningPosition.x + 3},${lightningPosition.y} 
                 L${lightningPosition.x - 2},${lightningPosition.y + 10} 
                 L${lightningPosition.x + 5},${lightningPosition.y + 30}
                 L${lightningPosition.x - 3},${lightningPosition.y + 50}
                 L${lightningPosition.x + 7},${lightningPosition.y + 70}
                 L${lightningPosition.x},100`}
                stroke="#FF6B00"
                strokeWidth="1"
                fill="none"
                filter="drop-shadow(0 0 15px #FF6B00)"
            />

            <path
                className={`transition-opacity duration-75 ${lightningActive ? 'opacity-100' : 'opacity-0'}`}
                d={`M${lightningPosition.x + 15},-10 
                 L${lightningPosition.x + 12},${lightningPosition.y - 5} 
                 L${lightningPosition.x + 18},${lightningPosition.y + 8} 
                 L${lightningPosition.x + 10},${lightningPosition.y + 25}
                 L${lightningPosition.x + 15},${lightningPosition.y + 45}
                 L${lightningPosition.x + 8},${lightningPosition.y + 65}
                 L${lightningPosition.x + 12},100`}
                stroke="#FF9500"
                strokeWidth="1"
                fill="none"
                filter="drop-shadow(0 0 12px #FF9500)"
            />
        </svg>

        <div
            className={`absolute w-full h-full bg-orange-500 mix-blend-overlay transition-opacity duration-100 ${lightningActive ? 'opacity-10' : 'opacity-0'}`}
        ></div>
    </div>

    <div className="absolute bottom-0 left-0 w-full">
        <div className="relative h-52 w-full">
            {crossPositions.map((cross, i) => (
                <div
                    key={i}
                    className="absolute bottom-0 bg-gray-800"
                    style={{
                        left: `${cross.left}%`,
                        width: `${cross.width}px`,
                        height: `${cross.height}px`,
                        transform: `rotate(${cross.rotate}deg)`,
                        opacity: 0.7,
                    }}
                >
                    <div
                        className="absolute bg-gray-800"
                        style={{
                            top: `${cross.crossbarTop}%`,
                            left: '50%',
                            height: `${cross.crossbarHeight}px`,
                            width: `${cross.crossbarWidth}px`,
                            transform: 'translate(-50%, -50%)',
                        }}
                    ></div>
                </div>
            ))}
        </div>
    </div>

    <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {sparklePositions.map((spark, i) => (
            <div
                key={`sparkle-${i}`}
                className="absolute rounded-full"
                style={{
                    left: `${spark.left}%`,
                    bottom: `${spark.bottom}%`,
                    width: `${spark.size}px`,
                    height: `${spark.size}px`,
                    backgroundColor: `rgba(${spark.color.r}, ${spark.color.g}, ${spark.color.b}, ${spark.color.a})`,
                    filter: lightningActive ? 'blur(1.5px) brightness(1.5)' : 'blur(1px)',
                    boxShadow: lightningActive
                        ? '0 0 5px 2px rgba(255,146,10,0.5)'
                        : '0 0 3px 1px rgba(255,146,10,0.3)',
                    animation: `float ${spark.duration}s ease-in-out ${spark.delay}s infinite`,
                    transition: 'all 0.15s ease-out',
                }}
            ></div>
        ))}
    </div>

            <div
                className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-t from-amber-700/40 to-transparent"></div>

            {/* Animations */}
            <style jsx>{`
                @keyframes float {
                    0%, 100% {
                        transform: translateY(0) rotate(0deg);
                    }
                    50% {
                        transform: translateY(-40px) rotate(10deg);
                    }
                }

                @keyframes rainFall {
                    0% {
                        transform: translateY(0%);
                        opacity: 0.1;
                    }
                    50% {
                        opacity: 0.3;
                    }
                    90% {
                        opacity: 0.15;
                    }
                    100% {
                        transform: translateY(100vh);
                        opacity: 0.05;
                    }
                }
            `}</style>
        </>
    );
};





export const AuthPage = () => {
    // State for form values and validation
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [authError, setAuthError] = useState('');

    const dispatch = useDispatch();


    const validateForm = () => {
        let isValid = true;

        setEmailError('');
        setPasswordError('');
        setAuthError('');

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
        }

        return isValid;
    };

    const handleSignIn = (e) => {
        e.preventDefault();

        if (validateForm()) {
            setAuthError('Invalid email or password. Please try again.');
        }

        dispatch(login({email: email, password: password}));
    };

    return (
        <div className="flex min-h-screen">
            {/* Main content - Auth section */}
            <div className="flex-1 relative overflow-hidden">
                <BackgroundEffects/>

                <div className="relative z-20 flex flex-col justify-center items-center px-4 py-12">
                    <div className="h-24"></div>

                    {/* Auth error message */}
                    {authError && (
                        <div className="bg-red-900/80 text-white p-3 rounded mb-4 w-full max-w-5xl border border-red-700">
                            <p className="text-sm">{authError}</p>
                        </div>
                    )}

                    <div className="flex flex-col md:flex-row gap-8 max-w-5xl w-full mx-auto">
                        {/* Sign In Section */}
                        <section className="text-white flex flex-col space-y-4 flex-1 p-6 bg-black/70 rounded border border-gray-300">
                            <h1 className="text-2xl font-bold tracking-wider">SIGN IN</h1>
                            <p className="text-gray-300 mb-2">If you are already part of the family → enter email and password</p>

                            <form onSubmit={handleSignIn} className="space-y-4 mt-2">
                                <div>
                                    <Input
                                        type="text"
                                        placeholder="Enter email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className={`bg-black/50 border ${emailError ? 'border-red-500' : 'border-gray-300'} text-white placeholder:text-gray-500 h-12 rounded-sm focus:border-gray-100 w-full`}
                                    />
                                    {emailError && <p className="text-red-500 text-xs mt-1">{emailError}</p>}
                                </div>

                                <div>
                                    <Input
                                        type="password"
                                        placeholder="Enter password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className={`bg-black/50 border ${passwordError ? 'border-red-500' : 'border-gray-300'} text-white placeholder:text-gray-500 h-12 rounded-sm focus:border-gray-100 w-full`}
                                    />
                                    {passwordError && <p className="text-red-500 text-xs mt-1">{passwordError}</p>}
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full bg-white hover:bg-gray-200 text-black font-medium py-3 rounded-sm transition-all duration-200 mt-4"
                                >
                                    Sign In
                                </Button>
                            </form>
                        </section>

                        {/* Sign Up Section */}
                        <section className="text-white flex flex-col space-y-4 flex-1 p-6 justify-between bg-black/70 rounded border border-gray-300">
                            <h1 className="text-2xl font-bold tracking-wider">NEW HERE? BECOME A FIFTH MEMBER!</h1>
                            <p className="text-gray-300 mb-2">
                                It's free and easy! Create your Fifth Member account to join the Fan Club and enjoy all the benefits, including presale codes, giveaways, coupons, and more!
                            </p>

                            <Button
                                className="w-full bg-red-700 hover:bg-red-800 text-white font-medium py-3 rounded-sm transition-all duration-200 mt-auto"
                                onClick={() => {
                                    // Handle redirect to registration page
                                    console.log('Redirecting to registration page');
                                }}
                            >
                                Create an account!
                            </Button>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};