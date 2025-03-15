import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button.jsx";

export const SignUpBanner = () => {
    const [lightningActive, setLightningActive] = useState(false);
    const [lightningPosition, setLightningPosition] = useState({ x: 50, y: 30 });
    const [sparklePositions, setSparklePositions] = useState(generateSparklePositions());

    // Create an array of fixed cross positions at component initialization
    const [rainPositions] = useState([...Array(80)].map(() => ({
        left: Math.random() * 100,
        height: 15 + Math.random() * 25,
        duration: 2 + Math.random() * 1.5,
        delay: Math.random() * 5
    })));

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
        // Create clusters of sparkles across the screen
        let positions = [];

        // Left side sparkles (ensure some are on left)
        for (let i = 0; i < 10; i++) {
            positions.push({
                left: Math.random() * 30, // Limit to left 30% of screen
                bottom: Math.random() * 40,
                size: 2 + Math.random() * 3,
                color: {
                    r: 255,
                    g: 150 + Math.random() * 100,
                    b: Math.random() * 50,
                    a: 0.7 + Math.random() * 0.3 // Increase base opacity
                },
                duration: 3 + Math.random() * 5,
                delay: Math.random() * 5
            });
        }

        // Middle and right sparkles
        for (let i = 0; i < 15; i++) {
            positions.push({
                left: 30 + Math.random() * 70, // Rest of screen
                bottom: Math.random() * 40,
                size: 2 + Math.random() * 3,
                color: {
                    r: 255,
                    g: 150 + Math.random() * 100,
                    b: Math.random() * 50,
                    a: 0.7 + Math.random() * 0.3 // Increase base opacity
                },
                duration: 3 + Math.random() * 5,
                delay: Math.random() * 5
            });
        }

        return positions;
    }

    // Function to create random lightning flash
    const triggerLightning = () => {
        const newX = Math.floor(Math.random() * 80) + 10;
        const newY = Math.floor(Math.random() * 40) + 10;

        setLightningPosition({ x: newX, y: newY });
        setLightningActive(true);

        // Modify sparkle behavior during lightning
        // Instead of completely regenerating, just enhance existing sparkles
        setSparklePositions(prev => prev.map(spark => ({
            ...spark,
            // Keep existing position but brighten the sparkles during lightning
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
            // Return sparkles to normal after lightning
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

        <div className="relative h-[30rem] overflow-hidden">

            {/* Dark background */}
            <div className="absolute inset-0 bg-black"></div>

            {/* Add a subtle texture overlay */}
            <div className="absolute inset-0 opacity-20"
                 style={{
                     backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\' fill=\'%23333333\' fill-opacity=\'0.4\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
                     backgroundSize: '100px 100px'
                 }}>
            </div>

            {/* Top smudgy transition area */}
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
                            opacity: 0.1, // Reduced opacity from 0.7 to 0.25
                            filter: 'blur(0.5px)',
                            animation: `rainFall ${rain.duration}s linear ${rain.delay}s infinite`
                        }}
                    ></div>
                ))}
            </div>

            {/* Lightning effects - complete lightning from top to bottom */}
            <div className="absolute inset-0 pointer-events-none">
                <svg className="absolute w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    {/* Main lightning bolt - extended to reach bottom */}
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

                    {/* Secondary lightning bolt - extended to reach bottom */}
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

            {/* Cemetery crosses - darker to match the background better */}
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

            {/* Floating orange embers - now they brighten during lightning without changing position */}
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

            {/* Main content container */}
            <div
                className="relative z-10 flex flex-col items-center justify-center h-full max-w-4xl mx-auto px-6 text-center">
                <h2 className="text-5xl font-tradeWinds text-white mb-6">
                    JOIN THE <span className="text-orange-500">NIGHTMARE</span>
                </h2>

                <p className="text-gray-300 font-medium mb-8 max-w-lg">
                    Be the first to know about exclusive tour dates, limited edition merch,
                    and special fan events.
                </p>

                <div className="w-full max-w-lg">
                    <div
                        className="h-px w-full bg-gradient-to-r from-transparent via-orange-600 to-transparent mb-8"></div>

                    <div className="flex flex-col sm:flex-row gap-4 mb-6">
                        <input
                            type="text"
                            placeholder="YOUR NAME"
                            className="flex-1 bg-gray-900 bg-opacity-70 border border-gray-800 text-white px-4 py-3 focus:border-orange-500 focus:outline-none uppercase"
                        />
                        <input
                            type="email"
                            placeholder="YOUR EMAIL"
                            className="flex-1 bg-gray-900 bg-opacity-70 border border-gray-800 text-white px-4 py-3 focus:border-orange-500 focus:outline-none uppercase"
                        />
                    </div>

                    <Button
                        className="w-full bg-orange-600 hover:bg-orange-700 text-white py-6 font-tradeWinds text-xl relative overflow-hidden group">
                        <span className="relative z-10">JOIN THE LEGION</span>
                        <span
                            className="absolute inset-0 bg-orange-800 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></span>
                    </Button>

                    <p className="text-xs text-gray-500 mt-4">
                        By signing up, you agree to receive emails from Threllia and accept our privacy policy.
                    </p>
                </div>

            </div>
            <div
                className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-t from-amber-700/40 to-transparent"></div>
            {/* CSS for animations - moved to inline styles for better compatibility */}
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
                        opacity: 0.3; // Maintain decent visibility halfway down
                    }
                    90% {
                        opacity: 0.15; // Start fading significantly at the bottom
                    }
                    100% {
                        transform: translateY(100vh); // Use viewport height to ensure it travels all the way down
                        opacity: 0.05; // Nearly invisible at the very bottom
                    }
                }
            `}</style>
        </div>
    );
};