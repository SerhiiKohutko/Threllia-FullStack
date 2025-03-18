import React from 'react';
import { Button } from '@/components/ui/button';
import { Volume2, Play, Info, Calendar } from 'lucide-react';

const SongDetailsSection = () => {
    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-black to-gray-700 text-white">
            <div className="container mx-auto px-4 py-12 text-center">
                <h1 className="text-5xl md:text-7xl font-bold mb-2">
                    <span className="text-white font-rubikPaint">SO FAR</span>{" "}
                    <span className="text-orange-500 font-rubikPaint">ALL QUIET</span>
                </h1>
                <p className="text-xl text-gray-400 italic font-rubikPaint">WRITTEN BY JACK MORRIS</p>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
                    {/* Left side - Song details */}
                    <div className="flex flex-col items-center    pt-6">
                        <div className="text-center font-tradeWinds">
                            <h2 className="text-4xl font-bold mb-2">TOTAL PERFORMANCES</h2>
                            <p className="text-orange-500 text-3xl font-bold mb-6">123</p>

                            <div className="mb-8">
                                <p className="text-xl font-bold italic mb-1">FIRST PERFORMED LIVE:</p>
                                <p className="text-2xl font-bold">JULY 14, 1992</p>
                                <p className="text-gray-400">MUNICH, GERMANY</p>
                            </div>

                            <div>
                                <p className="text-xl font-bold italic mb-1">MOST RECENT:</p>
                                <p className="text-2xl font-bold">MARCH 15, 2023</p>
                                <p className="text-gray-400">LOS ANGELES, CA, USA</p>
                            </div>
                        </div>
                        <div className="  p-6">
                            <h2 className="text-4xl font-bold mb-6 text-center font-tradeWinds">RELEASED ON ALBUM</h2>
                            <div className="flex flex-col items-center">
                                <div>
                                    <img
                                        src="data:image/jpeg;base64,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"
                                        alt="Live Album"
                                        className="w-full h-auto border border-gray-800 cursor-pointer"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="border border-orange-900  p-6">
                        <div className="flex flex-col items-center text-center">
                            <h2 className="text-4xl font-bold mb-6">LYRICS</h2>

                            <div className="text-lg space-y-4 mb-6">
                                <p>You take a mortal man</p>
                                <p>And put him in control</p>
                                <p>Watch him become a God</p>
                                <p>Watch people's heads a-roll</p>
                                <p>A-roll</p>
                                <p>A-roll</p>

                                <p>Just like the pied piper</p>
                                <p>Led rats through the streets</p>
                                <p>We dance like marionettes</p>
                                <p>Swaying to the symphony of destruction</p>
                                <p>You take a mortal man</p>
                                <p>And put him in control</p>
                                <p>Watch him become a God</p>
                                <p>Watch people's heads a-roll</p>
                                <p>A-roll</p>
                                <p>A-roll</p>

                                <p>Just like the pied piper</p>
                                <p>Led rats through the streets</p>
                                <p>We dance like marionettes</p>
                                <p>Swaying to the symphony of destruction</p>
                                <p>You take a mortal man</p>
                                <p>And put him in control</p>
                                <p>Watch him become a God</p>
                                <p>Watch people's heads a-roll</p>
                                <p>A-roll</p>
                                <p>A-roll</p>

                                <p>Just like the pied piper</p>
                                <p>Led rats through the streets</p>
                                <p>We dance like marionettes</p>
                                <p>Swaying to the symphony of destruction</p>
                            </div>
                            <Button variant="outline"
                                    className="w-full bg-transparent border-orange-800 text-white hover:bg-orange-900 mb-2 flex items-center justify-center gap-2">
                                <Play size={18}/>
                                <span>PLAY SONG</span>
                            </Button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default SongDetailsSection;