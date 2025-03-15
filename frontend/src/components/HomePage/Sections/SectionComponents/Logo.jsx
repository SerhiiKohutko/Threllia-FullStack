import React, { useState, useEffect } from 'react';

const THRLAnimation = ({text}) => {
    const [isHovering, setIsHovering] = useState(false);
    const [animationOpacity, setAnimationOpacity] = useState(0);

    useEffect(() => {
        let fadeOutTimeout;

        if (isHovering) {
            setAnimationOpacity(0.8);
        } else {
            fadeOutTimeout = setTimeout(() => {
                setAnimationOpacity(0);
            }, 30);
        }

        return () => {
            clearTimeout(fadeOutTimeout);
        };
    }, [isHovering]);

    return (
        <div
            className="relative"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            <div className="relative inline-block">
                {/* Main text */}
                <span className="cursor-pointer relative z-10 text-5xl font-bold font-deliciousHandrawn text-white">
                    {text}
                </span>

                {/* Blue shadow */}
                <span
                    className="absolute inset-0 text-5xl font-bold font-deliciousHandrawn z-0"
                    style={{
                        color: '#36b5ff',
                        textShadow: '0 0 8px #36b5ff',
                        opacity: animationOpacity,
                        animation: isHovering ? 'thrlShakeEnhanced 0.4s 3 both' : 'none',
                    }}
                >
                    {text}
                </span>

                {/* Red shadow */}
                <span
                    className="absolute inset-0 text-5xl font-bold font-deliciousHandrawn z-0"
                    style={{
                        color: '#ff3636',
                        textShadow: '0 0 8px #ff3636',
                        opacity: animationOpacity,
                        animation: isHovering ? 'thrlShakeEnhanced 0.4s 0.1s 3 both' : 'none',
                    }}
                >
                    {text}
                </span>

                <style jsx>{`
                    @keyframes thrlShakeEnhanced {
                        0% { transform: translate(0); }
                        20% { transform: translate(-4px, 6px); }
                        40% { transform: translate(-2px, -2px); }
                        60% { transform: translate(2px, 4px); }
                        80% { transform: translate(2px, 2px); }
                        100% { transform: translate(0); }
                    }
                `}</style>
            </div>
        </div>
    );
};

export default THRLAnimation;