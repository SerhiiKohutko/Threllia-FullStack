// First, create a new component for your border element
// Create a new file called GuitarBorder.jsx

import React, {useEffect, useState} from 'react';
export const StormfireBorder = () => {
    const [lightning, setLightning] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setLightning(true);
            setTimeout(() => setLightning(false), 200); // Quick flash
        }, Math.random() * 4000 + 3000); // Random intervals

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative w-full h-24 overflow-hidden bg-black shadow-2xl border-y border-gray-800">

            {/* Lightning Effect */}
            {lightning && (
                <div className="absolute inset-0 bg-white opacity-20 animate-flash pointer-events-none"></div>
            )}

            {/* Fire Sparks */}
            {[...Array(10)].map((_, i) => (
                <div
                    key={`spark-${i}`}
                    className="absolute w-1 h-1 bg-amber-500 rounded-full opacity-70 animate-spark"
                    style={{
                        left: `${Math.random() * 100}%`,
                        bottom: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 4}s`,
                    }}
                />
            ))}

            {/* Subtle Cracks */}
            <div className="absolute inset-0 bg-[url('/cracked-dark.png')] bg-cover opacity-10 pointer-events-none"></div>

            {/* Fire Glow at the Bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-t from-amber-700/40 to-transparent"></div>
        </div>
    );
};